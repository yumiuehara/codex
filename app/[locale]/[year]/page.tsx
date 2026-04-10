"use client"

import Hero from "@/components/Hero";
import ListSection from "@/components/ListSection";
import logList from "@/data/list.json";
import { getYearFromCustomDate } from "@/helpers/dates";
import { MediaTypeEnum } from "@/helpers/types";
import { useTranslations } from "next-intl";
import { useParams } from 'next/navigation'

export default function Home() {
  const t = useTranslations("pages");
  const params = useParams<{ locale: string; year: string }>()

  const filteredLogs = logList.filter((log) => {
    const start = String(getYearFromCustomDate(log.startDate));

    let end = start
    if (log.endDate) end = String(getYearFromCustomDate(log.endDate));

    return start === params.year || end === params.year;
  }).sort((a, b) => b.id - a.id);

  const {
    [MediaTypeEnum.ANIME]: animeList = [],
    [MediaTypeEnum.MANGA]: mangaList = [],
    [MediaTypeEnum.MOVIE]: movieList = [],
    [MediaTypeEnum.GAME]: gameList = [],
    [MediaTypeEnum.TV_SERIES]: seriesList = [],
    [MediaTypeEnum.BOOK]: bookList = [],
  } = filteredLogs.reduce((acc, log) => {
    const id = log.media.idMedia as MediaTypeEnum;
    acc[id] = [...(acc[id] ?? []), log];
    return acc;
  }, {} as Record<MediaTypeEnum, typeof logList>);

  return (
    <div className="flex flex-col gap-y-5">
      <Hero
        year={params.year}
        animeCount={animeList.length}
        bookCount={bookList.length}
        gameCount={gameList.length}
        mangaCount={mangaList.length}
        movieCount={movieList.length}
        tvSeriesCount={seriesList.length}
        customClass="px-8 sm:px-10"
      />

      {filteredLogs.length > 0 &&
        <ListSection
          customClass="mx-8 sm:mx-10 my-5"
          data={filteredLogs}
        />
      }
    </div>
  );
}
