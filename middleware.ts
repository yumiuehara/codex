import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request)

  const url = request.nextUrl
  const { pathname } = url

  const isHome = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname === '/'
  )

  if (isHome && !url.searchParams.has('year')) {
    url.searchParams.set('year', new Date().getFullYear().toString())
    const redirect = NextResponse.redirect(url)
    response.headers.forEach((value, key) => {
      if (key === 'set-cookie') redirect.headers.append(key, value)
    })
    return redirect
  }

  return response
}
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};