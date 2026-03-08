"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { permanentRedirect, useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type YearSelectorProps = {
  className?: string;
  years: Set<number>
};

export default function YearSelector({ className, years }: YearSelectorProps) {
  const params = useParams<{ locale: string; year: string }>()
  const pathname = usePathname()

  const yearsList = Array.from(years)

  const [selected, setSelected] = useState<number>(
      () =>
        yearsList.find((year) => Number(params.year) === year) ||
        yearsList[0]
    );

  const setYear = (value: number) => {
    const pathnameSplit = pathname.split("/");
    const currentYearIndex = pathnameSplit.findIndex(it => it == params.year)

    if (currentYearIndex >= 0) {
      pathnameSplit[currentYearIndex] = String(value)
      permanentRedirect(pathnameSplit.join("/"))
    } else {
      permanentRedirect("/")
    }
  };

  useEffect(() => {
    const newSelected =
      yearsList.find((year) => Number(params.year) === year) ||
      yearsList[0];
    setSelected(newSelected);
  }, [params.year, yearsList]);

  return (
    <div className={`${className} w-36`}>
      <Listbox value={selected} onChange={setYear}>
        <ListboxButton
          className={clsx(
            "relative block w-full bg-(--color-dark-gray) border-white border border-l py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25"
          )}
        >
          {selected}
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
          {yearsList
            .filter((item) => item !== selected)
            .map((it, index) => (
              <ListboxOption
                key={index}
                value={it}
                className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1 select-none "
              >
                <div className="text-sm/6 text-white">{it}</div>
              </ListboxOption>
            ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
