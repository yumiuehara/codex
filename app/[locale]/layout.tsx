import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import logList from "@/data/list.json";
import { getYearFromCustomDate } from "@/helpers/dates";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "codex",
  description: "i enjoy making lists",
};

const validYears = new Set<number>(logList.map(item => getYearFromCustomDate(item.endDate || item.startDate)));

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string, year: string, favorite: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${inconsolata.variable} antialiased font-(family-name:--font-inconsolata)`}
      >
        <NextIntlClientProvider>
          <div className="min-h-screen flex justify-center">
            <div className="w-7xl flex flex-col my-0 md:my-12 md:border border-0">
              <Navbar years={validYears} />
              <main className="mb-10">{children}</main>
            </div>
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
