import FullListLayout from "@/components/FullListLayout";
import ListSection from "@/components/ListSection";
import logList from "@/data/list.json";
import { MediaTypeEnum } from "@/helpers/types";
import { useTranslations } from "next-intl";

const animeList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.ANIME
);

export default function AnimePage() {
  const t = useTranslations("pages");

  return (
    <FullListLayout title={t("misc.anime")}>
      <ListSection data={animeList} />
    </FullListLayout>
  );
}
