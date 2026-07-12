"use client"

import Hero from "@/components/Hero";
import ListSection from "@/components/ListSection";
import { getLogs, getYears } from "@/helpers/queries";
import { Log, Years } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";
import { notFound, useParams } from 'next/navigation'
import { AiOutlineLoading } from "react-icons/ai";

export default function Home() {
  const params = useParams<{ locale: string; year: string }>()

  const { data: validYears, isPending, isLoading: isLoadingYears, error: yearErrors } = useQuery<Years[]>({
    queryKey: ['years', params.year, params.locale],
    queryFn: getYears,
  });
  
  const { data, isLoading, error } = useQuery<Log[]>({
    queryKey: ['logs', params.year],
    queryFn: () => getLogs(params.year),
    enabled: !!validYears
  });

  if (isPending || isLoadingYears) return <AiOutlineLoading className="animate-spin" />

  if (!validYears || yearErrors) {
    notFound();
  }

  const isValidYear =
    /^\d{4}$/.test(params.year) &&
    validYears.some(it => it.year == params.year);

  if (!isValidYear) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-5">
      <Hero
        year={params.year}
      />

      {isLoading && <div className="w-full flex items-center justify-center p-10">
        <AiOutlineLoading className="animate-spin" />
      </div>}
      
      {error && <p>Erro: {error.message}</p>}

      {data && data.length > 0 &&
        <ListSection
          customClass="mx-8 sm:mx-10 my-5"
          data={data}
        />
      }
    </div>
  );
}
