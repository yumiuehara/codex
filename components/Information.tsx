import clsx from "clsx";
import { useTranslations } from "next-intl";
import YearSelector from "./YearSelector";
import { FaSquareLetterboxd } from "react-icons/fa6";
import { SiMyanimelist } from "react-icons/si";
import { TbDeviceTvFilled } from "react-icons/tb";
import { FaSteam } from "react-icons/fa";
import Link from "next/link";
import { MediaTypeEnum, Total } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading } from "react-icons/ai";
import { getTotals } from "@/helpers/queries";

export type InformationProps = {
  year: string;
  customClass?: string
};

export function InformationLine({ ...props }: InformationProps) {
  const t = useTranslations("components.Information");

  const { data, isLoading } = useQuery<Total[]>({
    queryKey: ['totals', props.year],
    queryFn: () => getTotals(props.year),
  });

  const totalGame = data?.find(it => it.IdMediaTypePk == MediaTypeEnum.GAME)?.total || 0
  const totalManga = data?.find(it => it.IdMediaTypePk == MediaTypeEnum.MANGA)?.total || 0
  const totalAnime =  data?.find(it => it.IdMediaTypePk == MediaTypeEnum.ANIME)?.total || 0
  const totalMovie =  data?.find(it => it.IdMediaTypePk == MediaTypeEnum.MOVIE)?.total || 0
  const totalSeries =  data?.find(it => it.IdMediaTypePk == MediaTypeEnum.TV_SERIES)?.total || 0
  const totalBooks =  data?.find(it => it.IdMediaTypePk == MediaTypeEnum.BOOK)?.total || 0

  return (
    <div className={clsx("w-full relative bg-pink min-h-18 px-8 lg:py-5 py-2 lg:flex-row flex-col gap-4 flex items-center justify-between border-y", props.customClass)}>
      <div className="gap-4 items-center flex -mt-17 lg:-mt-20">
        <div className="flex flex-col items-center lg:items-start gap-y-2 mt-7">
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
          {isLoading ? <AiOutlineLoading className="animate-spin"/> :
            <>
              <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("games", { count: totalGame })}</div>
              <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("manga", { count: totalManga })}</div>
              <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("anime", { count: totalAnime })}</div>
              <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("movies", { count: totalMovie })}</div>
              <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("series", { count: totalSeries })}</div>
              <div className="border border-dark-gray px-0.5 lg:px-2 bg-white/70 text-black lg:text-sm text-xs">{t("books", { count: totalBooks })}</div>
            </>
          }
        </div>
      </div>
      
    </div>
  );
}