import FullListLayout from "@/components/FullListLayout";
import ListSection from "@/components/ListSection";
import logList from "@/data/list.json";
import { MediaTypeEnum } from "@/helpers/types";
import { useTranslations } from "next-intl";

const mangaList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.MANGA
);

export default function MangaPage() {
  const t = useTranslations("pages");
  return (
    <FullListLayout title={t("misc.manga")}>
      <ListSection data={mangaList} />
    </FullListLayout>
  );
}
