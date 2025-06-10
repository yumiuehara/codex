"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import LanguageSelector from "./LanguageSelector";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { Transition } from "@headlessui/react";

type NavProps = {
  className?: string;
};

export default function Navbar({ className }: NavProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations("components.Navbar");
  const locale = useLocale();
  const links: [string, string][] = Object.entries(t.raw("links"));

  return (
    <div
      className={`${className} flex items-center justify-between border-b py-2 px-5 relative`}
    >
      <Link
        href={`/${locale}`}
        className="text-3xl text-(--color-red) font-bold tracking-widest"
      >
        {t("title")}
      </Link>

      <div className="hidden md:flex items-center justify-center text-sm">
        {links.map(([key, val]: [string, string], index: number) => (
          <div key={key} className="flex">
            <Link href={`/${key}`} className="px-2">
              {val}
            </Link>

            {index < 5 && <p>•</p>}
          </div>
        ))}
      </div>

      <LanguageSelector className="hidden md:flex" />

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
              {links.map(([key, val]: [string, string]) => (
                <Link
                  href={`/${key}`}
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
