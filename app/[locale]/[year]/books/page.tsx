"use client"

import FullListLayout from "@/components/FullListLayout";
import ListSection from "@/components/ListSection";
import logList from "@/data/list.json";
import { getYearFromCustomDate } from "@/helpers/dates";
import { MediaTypeEnum } from "@/helpers/types";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function BookPage() {
  const t = useTranslations("pages");
  const params = useParams<{ locale: string; year: string }>()

  const bookList = logList.filter((log) => {
    const start = String(getYearFromCustomDate(log.startDate));

    let end = start
    if (log.endDate) end = String(getYearFromCustomDate(log.endDate));

    return (start === params.year || end === params.year) && log.media.idMedia === MediaTypeEnum.BOOK;
  });

  return (
    <FullListLayout title={t("misc.books")}>
      <ListSection data={bookList} customClass="mx-10 my-5" />
    </FullListLayout>
  );
}
