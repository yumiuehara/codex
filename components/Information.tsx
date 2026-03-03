import clsx from "clsx";
import { useTranslations } from "next-intl";

export type InformationProps = {
  movieCount: number;
  animeCount: number;
  bookCount: number;
  mangaCount: number;
  tvSeriesCount: number;
  gameCount: number;
  customClass?: string
};

export default function Information({ ...props }: InformationProps) {
  const t = useTranslations("components.Information");

  return (
    <div className={clsx("flex flex-col text-white w-[50%] self-center py-2.5 gap-y-2", props.customClass)}>
        <div className="grid grid-cols-6 gap-x-10 place-items-center">
            <InformationItem content={t("games", { count: props.gameCount })} />
            <InformationItem content={t("manga", { count: props.mangaCount })} />
            <InformationItem content={t("anime", { count: props.animeCount })} />
            <InformationItem content={t("movies", { count: props.movieCount })} />
            <InformationItem content={t("series", { count: props.tvSeriesCount })} />
            <InformationItem content={t("books", { count: props.bookCount })} />
        </div>
        
    </div>
  );
}

function InformationItem({content}: {content: string}) {
  const number = content.match(/\d+/)?.[0] || "0";
  const text = content.match(/[a-zA-Záàâãéèêíïóôõöúçñ]+/i)?.[0];

  return (
    <div className="w-[100px] h-[100px] cursor-pointer shadow-sm border border-white group hover:border-(--color-pink) bg-white/5 backdrop-blur-xs transition-all flex flex-col items-center justify-center">
      <span className="text-sm font-bold uppercase text-(--color-blue) group-hover:text-black group-hover:bg-(--color-blue) px-1">
        {text}
      </span>
      <div className="text-5xl font-semibold mt-1 text-pink-500">
        {number}
      </div>
    </div>
  );
}