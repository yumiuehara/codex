"use client";

import { getYearFromCustomDate } from "@/helpers/dates";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { permanentRedirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import logList from "@/data/list.json";

type YearSelectorProps = {
  className?: string;
};

export default function YearSelector({ className }: YearSelectorProps) {
  const years = new Set<number>(logList.map(item => getYearFromCustomDate(item.endDate || item.startDate)));
  const params = useParams<{ locale: string; year: string }>()

  const yearsList = Array.from(years)

  const [selected, setSelected] = useState<number>(
      () =>
        yearsList.find((year) => Number(params.year) === year) ||
        yearsList[0]
    );

  const setYear = (value: number) => {
    const pathnameSplit = window.location.pathname.split("/");
    const currentPagePath = pathnameSplit[pathnameSplit.length - 1];

    const isHomePage = !isNaN(Number(currentPagePath))

    if (isHomePage) permanentRedirect(`/${value}`);
    else permanentRedirect(`/${value}/${currentPagePath}`);
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
            "relative block w-full border-white border border-l pr-8 pl-3 text-left text-sm/6 text-white font-bold",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25"
          )}
        >
          {selected}
          <BiChevronDown
            className="group pointer-events-none absolute top-1 right-2.5 size-4 fill-white"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-(--button-width) border focus:outline-none bg-(--color-dark-gray)",
            "transition duration-100 ease-in"
          )}
        >
          {yearsList
            .filter((item) => item !== selected)
            .map((it, index) => (
              <ListboxOption
                key={index}
                value={it}
                className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 select-none"
              >
                <div className="text-sm/6 text-white">{it}</div>
              </ListboxOption>
            ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
