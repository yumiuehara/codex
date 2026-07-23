"use client"

import Hero from "@/components/Hero";
import ListSection from "@/components/ListSection";
import { getLogs } from "@/helpers/queries";
import { Log } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from 'next/navigation'
import { AiOutlineLoading } from "react-icons/ai";

export default function Home() {
  const searchParams = useSearchParams()
  const currentYear = searchParams.get('year') ?? undefined
  
  const { data, isLoading, error } = useQuery<Log[]>({
    queryKey: ['logs', currentYear],
    queryFn: () => getLogs(currentYear),
  });

  if (error) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-5">
      <Hero />

      {isLoading && <div className="w-full flex items-center justify-center p-10">
        <AiOutlineLoading className="animate-spin" />
      </div>}

      {data && data.length > 0 &&
        <ListSection
          customClass="mx-8 sm:mx-10 my-5"
          data={data}
        />
      }
    </div>
  );
}
