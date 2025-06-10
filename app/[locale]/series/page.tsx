import FullListLayout from "@/components/FullListLayout";
import ListSection from "@/components/ListSection";
import logList from "@/data/list.json";
import { MediaTypeEnum } from "@/helpers/types";
import { useTranslations } from "next-intl";

const seriesList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.TV_SERIES
);

export default function SeriesPage() {
  const t = useTranslations("pages");
  return (
    <FullListLayout title={t("misc.series")}>
      <ListSection data={seriesList} />
    </FullListLayout>
  );
}
