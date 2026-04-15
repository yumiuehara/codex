import clsx from "clsx";
import { useTranslations } from "next-intl";
import YearSelector from "./YearSelector";
import Image from "next/image";
import { FaSquareLetterboxd } from "react-icons/fa6";
import { SiMyanimelist } from "react-icons/si";
import { TbDeviceTvFilled } from "react-icons/tb";
import { FaSteam } from "react-icons/fa";
import Link from "next/link";

export type InformationProps = {
  movieCount: number;
  animeCount: number;
  bookCount: number;
  mangaCount: number;
  tvSeriesCount: number;
  gameCount: number;
  year: string;
  customClass?: string
};

export function InformationBlocks({ ...props }: InformationProps) {
  const t = useTranslations("components.Information");

  return (
    <div className={clsx("flex flex-col text-white w-[100%] self-center py-2.5 gap-y-2", props.customClass)}>
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

export function InformationLine({ ...props }: InformationProps) {
  const t = useTranslations("components.Information");

  return (
    <div className={clsx("w-full relative bg-pink min-h-18 px-8 lg:py-5 py-2 lg:flex-row flex-col gap-4 flex items-center justify-between border-y", props.customClass)}>
      <div className="gap-4 items-center flex -mt-17 lg:-mt-20">
        <div className="flex flex-col gap-y-2 mt-7">
          <div className="flex gap-2">
            <Link href="https://steamcommunity.com/id/pasteldepeido/" target="_blank">
              <div className="bg-pink w-8 h-8 border flex items-center justify-center">
                <FaSteam className="w-4 h-4 fill-white" />
              </div>
            </Link>
            <Link href="https://letterboxd.com/uehara/" target="_blank">
              <div className="bg-pink w-8 h-8 border flex items-center justify-center">
                <FaSquareLetterboxd className="w-4 h-4 fill-white" />
              </div>
            </Link>
            <Link href="https://myanimelist.net/profile/uehara" target="_blank">
              <div className="bg-pink w-8 h-8 border flex items-center justify-center">
                <SiMyanimelist className="w-4 h-4 fill-white" />
              </div>
            </Link>
            <Link href="https://mydramalist.com/profile/uehara" target="_blank">
              <div className="bg-pink w-8 h-8 border flex items-center justify-center">
                <TbDeviceTvFilled className="w-4 h-4 fill-white" />
              </div>  
            </Link>  
          </div> 
          <div className="text-sm wrap-break-word">
            yumi; cachorro salsinha; sardinha;
          </div>     
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-4 items-center">
        <YearSelector />
        <div className="flex flex-wrap gap-2 items-center justify-center">
            <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("games", { count: props.gameCount })}</div>
            <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("manga", { count: props.mangaCount })}</div>
            <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("anime", { count: props.animeCount })}</div>
            <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("movies", { count: props.movieCount })}</div>
            <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("series", { count: props.tvSeriesCount })}</div>
            <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("books", { count: props.bookCount })}</div>
        </div>
      </div>
    </div>
  );
}

function InformationItem({content}: {content: string}) {
  const number = content.match(/\d+/)?.[0] || "0";
  const text = content.match(/\D+/)?.[0];

  return (
    <div className="w-full h-[80px] md:h-[100px] lg:h-[120px] w-full cursor-pointer shadow-sm border border-white hover:border-(--color-pink) group bg-black/40 transition-all flex flex-col items-center justify-center">
      <span className="text-xs md:text-sm font-bold uppercase group-hover:text-black group-hover:bg-(--color-blue) px-1">
        {text}
      </span>
      <div className="text-base md:text-5xl font-semibold mt-1 text-pink drop-shadow-md/50">
        {number}
      </div>
    </div>
  );
}