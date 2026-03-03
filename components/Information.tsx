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
    <div className={clsx("flex flex-col text-white md:w-[80%] w-[50%] self-center py-2.5 gap-y-2", props.customClass)}>
        <div className="grid grid-cols-3 gap-x-2 lg:grid-cols-6 lg:gap-x-10 gap-y-5 place-items-center">
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
  const text = content.match(/\D+/)?.[0];

  return (
    <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] cursor-pointer shadow-sm border border-white hover:border-(--color-pink) group bg-black/40 transition-all flex flex-col items-center justify-center">
      <span className="text-xs md:text-sm font-bold uppercase group-hover:text-black group-hover:bg-(--color-blue) px-1">
        {text}
      </span>
      <div className="text-base md:text-5xl font-semibold mt-1 text-pink drop-shadow-md/50">
        {number}
      </div>
    </div>
  );
}