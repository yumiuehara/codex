"use client"

import Hero from "@/components/Hero";
import ListSection from "@/components/ListSection";
import logList from "@/data/list.json";
import { getYearFromCustomDate } from "@/helpers/dates";
import { MediaTypeEnum } from "@/helpers/types";
import { useTranslations } from "next-intl";
import { notFound, useParams } from 'next/navigation'

const validYears = new Set<number>(logList.map(item => getYearFromCustomDate(item.endDate || item.startDate)));

export default function Home() {
  const t = useTranslations("pages");
  const params = useParams<{ locale: string; year: string }>()

  if (!/^\d{4}$/.test(params.year) || !validYears.has(Number(params.year))) {
    notFound();
  }

  const filteredLogs = logList.filter((log) => {
    const start = String(getYearFromCustomDate(log.startDate));

    let end = start
    if (log.endDate) end = String(getYearFromCustomDate(log.endDate));

    return start === params.year || end === params.year;
  });

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
      />

      {animeList.length > 0 &&
        <ListSection
          customClass="mx-10 my-5"
          title={t("misc.anime")}
          data={animeList}
          seeAllUrl={`${params.year}/anime`}
          sliceItems
        />
      }


      {mangaList.length > 0 && 
        <ListSection
          customClass="mx-10 my-5"
          title={t("misc.manga")}
          data={mangaList}
          seeAllUrl={`${params.year}/manga`}
          sliceItems
        />
      }

      {movieList.length > 0 &&
        <ListSection
          customClass="mx-10 my-5"
          title={t("misc.movies")}
          data={movieList}
          seeAllUrl={`${params.year}/movies`}
          sliceItems
        />
      }

      {gameList.length > 0 &&
        <ListSection
          customClass="mx-10 my-5"
          title={t("misc.games")}
          data={gameList}
          seeAllUrl={`${params.year}/games`}
          sliceItems
        />
      }

      {seriesList.length > 0 &&
        <ListSection
          customClass="mx-10 my-5"
          title={t("misc.series")}
          data={seriesList}
          seeAllUrl={`${params.year}/series`}
          sliceItems
        />
      }

      {bookList.length > 0 &&
        <ListSection
          customClass="mx-10 my-5"
          title={t("misc.books")}
          data={bookList}
          seeAllUrl={`${params.year}/books`}
          sliceItems
        />
      }
    </div>
  );
}
