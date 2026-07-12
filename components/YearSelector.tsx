"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { permanentRedirect, useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { getYears } from "@/helpers/queries";
import { Years } from "@/helpers/types";

type YearSelectorProps = {
  className?: string;
};

export default function YearSelector({ className }: YearSelectorProps) {
  const { data: validYears } = useQuery<Years[]>({
    queryKey: ['years'],
    queryFn: getYears,
  });

  const params = useParams<{ locale: string; year: string }>();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string>(new Date().getFullYear().toString());

  const yearsList = useMemo(
    () => (validYears ?? []).map(it => it.year),
    [validYears]
  );

  const setYear = (value: string) => {
    const pathnameSplit = pathname.split("/");
    const currentYearIndex = pathnameSplit.findIndex(it => it === params.year);

    if (currentYearIndex >= 0) {
      pathnameSplit[currentYearIndex] = String(value);
      permanentRedirect(pathnameSplit.join("/"));
    } else {
      permanentRedirect("/");
    }
  };

  useEffect(() => {
    if (yearsList.length === 0) return;
    const newSelected =
      yearsList.find(year => params.year === year) ?? yearsList[0];
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
            "w-(--button-width) border focus:outline-none bg-dark-gray",
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
