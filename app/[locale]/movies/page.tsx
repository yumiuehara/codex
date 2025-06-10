import FullListLayout from "@/components/FullListLayout";
import ListSection from "@/components/ListSection";
import logList from "@/data/list.json";
import { MediaTypeEnum } from "@/helpers/types";
import { useTranslations } from "next-intl";

const movieList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.MOVIE
);

export default function MoviePage() {
  const t = useTranslations("pages");
  return (
    <FullListLayout title={t("misc.movies")}>
      <ListSection data={movieList} />
    </FullListLayout>
  );
}
