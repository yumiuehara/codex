"use client"

import FullListLayout from "@/components/FullListLayout";
import ListSection from "@/components/ListSection";
import { getLogs } from "@/helpers/queries";
import { Log, MediaTypeEnum } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";

export default function BookPage() {
  const t = useTranslations("pages");
  const params = useParams<{ locale: string; year: string }>()

  const { data, isLoading } = useQuery<Log[]>({
      queryKey: ['book', params.year],
      queryFn: () => getLogs(params.year, MediaTypeEnum.BOOK),
  });

  return (
    <FullListLayout title={t("misc.books")}>
      {isLoading && <AiOutlineLoading className="animate-spin" />}

      {data && <ListSection data={data} customClass="mx-10 my-5" />}
    </FullListLayout>
  );
}
