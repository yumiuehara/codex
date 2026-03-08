"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import LanguageSelector from "./LanguageSelector";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import YearSelector from "./YearSelector";

type NavProps = {
  className?: string;
  years: Set<number>
};

export default function Navbar({ className, years }: NavProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations("components.Navbar");
  const locale = useLocale();
  const params = useParams<{ locale: string; year: string }>()
  const links: [string, string][] = Object.entries(t.raw("links"));
  const currentYear = params.year || new Date().getFullYear();

  const buildUrl = (key?: string, index?: number) => {
    if (key && index) {
      if (index <= links.length - 2) {
        return `/${locale}/${currentYear}/${key}`
      } else {
        return `/${locale}/${key}`
      }
    }

    return params.year ? `/${locale}/${params.year}` : `/${locale}/`
  }

  return (
    <div
      className={`${className} flex items-center justify-between border-b py-2 px-5 relative`}
    >
      <Link
        href={buildUrl()}
        className="text-3xl text-(--color-red) font-bold tracking-widest"
      >
        {t("title")}
      </Link>

      <div className="hidden md:flex items-center justify-center text-sm">
        {links.map(([key, val]: [string, string], index: number) => (
          <div key={key} className="flex">
            <Link href={buildUrl(key, index)} className="px-2">
              {val}
            </Link>

            {index < links.length - 1 && <p>•</p>}
          </div>
        ))}
      </div>

      <div className="flex gap-x-2">
        {params.year && <YearSelector className="hidden md:flex" years={years} />}
        <LanguageSelector className="hidden md:flex" />
      </div>

      <button className="flex md:hidden" onClick={() => setIsOpen(true)}>
        <GiHamburgerMenu />
      </button>

      {isOpen && (
        <Transition show={isOpen}>
          <div className="bg-(--color-dark-gray) md:hidden no-scroll absolute flex flex-col inset-0 max-w-screen h-screen text-white z-5 transition duration-300 ease-in data-closed:opacity-0">
            <MdClose
              className="w-8 h-8 justify-right m-4"
              onClick={() => setIsOpen(false)}
            />
            <div className="flex flex-col items-center justify-center h-full gap-y-10">
              {links.map(([key, val]: [string, string], index: number) => (
                <Link
                  href={buildUrl(key, index)}
                  key={key}
                  className="px-2"
                  onClick={() => setIsOpen(false)}
                >
                  {val}
                </Link>
              ))}
            </div>
          </div>
        </Transition>
      )}
    </div>
  );
}
