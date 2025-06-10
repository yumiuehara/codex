import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageSelector from "./LanguageSelector";

type InformationProps = {
  movieCount: number;
  animeCount: number;
  bookCount: number;
  mangaCount: number;
  tvSeriesCount: number;
  gameCount: number;
};

export default function Information({ ...props }: InformationProps) {
  const t = useTranslations("components.Information");

  return (
    <section className="flex items-center justify-center border-b">
      <div className="flex w-full flex-col md:flex-row">
        <Image
          src="/hero.webp"
          width={0}
          height={0}
          alt=""
          sizes="100vw"
          className="w-[100%] md:w-[60%] h-auto"
        />

        <div className="flex flex-col text-white w-[100%] md:w-[40%] text-center md:text-right pt-5 md:pt-0 px-5 pb-5 justify-end">
          <div className="font-bold text-xl md:text-7xl">
            {t("yearSummary", { year: "2025" })}
          </div>
          <ul className="text-xl md:text-5xl">
            <li>{t("games", { count: props.gameCount })}</li>
            <li>{t("manga", { count: props.mangaCount })}</li>
            <li>{t("anime", { count: props.animeCount })}</li>
            <li>{t("movies", { count: props.movieCount })}</li>
            <li>{t("series", { count: props.tvSeriesCount })}</li>
            <li>{t("books", { count: props.bookCount })}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
