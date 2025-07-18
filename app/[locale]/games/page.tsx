import FullListLayout from "@/components/FullListLayout";
import ListSection from "@/components/ListSection";
import logList from "@/data/list.json";
import { MediaTypeEnum } from "@/helpers/types";
import { useTranslations } from "next-intl";

const gameList = logList.filter(
  (log) => log.media.idMedia === MediaTypeEnum.GAME
);

export default function GamePage() {
  const t = useTranslations("pages");
  return (
    <FullListLayout title={t("misc.games")}>
      <ListSection data={gameList} />
    </FullListLayout>
  );
}
