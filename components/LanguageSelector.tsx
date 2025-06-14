"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useTranslations, useLocale } from "next-intl";
import { permanentRedirect } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type Lang = {
  url: string;
  name: string;
};

type LanguageSelectorProps = {
  className?: string;
};

export default function LanguageSelector({ className }: LanguageSelectorProps) {
  const t = useTranslations("components.LanguageSelector");
  const langList: Lang[] = t.raw("languages");

  const currentLanguage = useLocale();

  const [selected, setSelected] = useState<Lang>(
    () =>
      langList.find((lang) => lang.url.replace("/", "") === currentLanguage) ||
      langList[0]
  );

  const setLanguage = (value: Lang) => {
    permanentRedirect(value.url);
  };

  useEffect(() => {
    const newSelected =
      langList.find((lang) => lang.url.replace("/", "") === currentLanguage) ||
      langList[0];
    setSelected(newSelected);
  }, [currentLanguage, langList]);

  return (
    <div className={`${className} w-36`}>
      <Listbox value={selected} onChange={setLanguage}>
        <ListboxButton
          className={clsx(
            "relative block w-full bg-(--color-dark-gray) border-white border border-l py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25"
          )}
        >
          {selected.name}
          <BiChevronDown
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-(--button-width) border p-1 focus:outline-none bg-(--color-dark-gray)",
            "transition duration-100 ease-in"
          )}
        >
          {langList
            .filter((item) => item.name !== selected.name)
            .map((lang) => (
              <ListboxOption
                key={lang.name}
                value={lang}
                className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1 select-none "
              >
                <div className="text-sm/6 text-white">{lang.name}</div>
              </ListboxOption>
            ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
