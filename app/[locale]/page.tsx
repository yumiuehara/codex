import Information from "@/components/Information";
import ListSection from "@/components/ListSection";
import logList from "@/data/list.json";
import { MediaTypeEnum } from "@/helpers/types";
import { useLocale, useTranslations } from "next-intl";

const animeList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.ANIME
);
const mangaList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.MANGA
);
const movieList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.MOVIE
);
const gameList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.GAME
);
const seriesList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.TV_SERIES
);
const bookList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.BOOK
);

export default function Home() {
  const locale = useLocale();
  const t = useTranslations("pages");

  return (
    <div className="flex flex-col gap-y-5">
      <Information
        animeCount={animeList.length}
        bookCount={bookList.length}
        gameCount={gameList.length}
        mangaCount={mangaList.length}
        movieCount={movieList.length}
        tvSeriesCount={seriesList.length}
      />

      <ListSection
        title={t("misc.anime")}
        data={animeList}
        seeAllUrl={`${locale}/anime`}
        sliceItems
      />
      <ListSection
        title={t("misc.manga")}
        data={mangaList}
        seeAllUrl={`${locale}/manga`}
        sliceItems
      />
      <ListSection
        title={t("misc.movies")}
        data={movieList}
        seeAllUrl={`${locale}/movies`}
        sliceItems
      />
      <ListSection
        title={t("misc.games")}
        data={gameList}
        seeAllUrl={`${locale}/games`}
        sliceItems
      />
      <ListSection
        title={t("misc.series")}
        data={seriesList}
        seeAllUrl={`${locale}/series`}
        sliceItems
      />
      <ListSection
        title={t("misc.books")}
        data={bookList}
        seeAllUrl={`${locale}/books`}
        sliceItems
      />
    </div>
  );
}
