"use client"
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Media } from "@/helpers/types";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import StarRating from "@/components/StarRating";
import { AiOutlineLoading } from "react-icons/ai";
import { GoHeartFill } from "react-icons/go";
import { BiSolidDislike } from "react-icons/bi";
import { IoInfiniteSharp } from "react-icons/io5";
import { IoReloadCircle } from "react-icons/io5";
import { getMediaById } from "@/helpers/queries";
import { useFormatter, useTranslations } from "next-intl";

export default function MediaInformationPage() {
    const params = useParams<{ locale: string; id: string }>()
    const t = useTranslations("components.MediaInformation");
    const format = useFormatter();

    if (!params.id) {
        notFound();
    }

    const { data, isLoading, error } = useQuery<Media>({
        queryKey: ['media', params.id],
        queryFn: () => getMediaById(params.id),
    });

    const formatDate = (date: string | number) => {
        const dateSplit = String(date).split("-");
        const year = Number(dateSplit[0]);
        const month = Number(dateSplit[1]);
        const day = Number(dateSplit[2]);

        if (day && month) {
        const date = new Date(year, month - 1, day);
        return format.dateTime(date, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
        } else if (month) {
        const date = new Date(year, month - 1, 1);
        return format.dateTime(date, {
            year: "numeric",
            month: "numeric",
        });
        } else {
        const date = new Date(year, 1, 1);
        return format.dateTime(date, {
            year: "numeric",
        });
        }
    };

    return <section className="w-full flex flex-col items-center justify-center pt-16 px-10">
            {isLoading && <AiOutlineLoading className="animate-spin" />}

            {error && <p>Erro: {error.message}</p>}

            {data && 
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-10">
                        <div
                            className="media__image relative"
                        >
                            <div className="media__image relative border-pink border-2 overflow-hidden">
                                    <Image fill alt={data.MediaName} src={data.ImagePath} className="absolute inset-0 size-full object-cover" />

                                    <Image src={data.ImagePath} fill alt={data.MediaName}
                                        className="absolute inset-0 size-full object-cover
                                                    animate-[slice-1_2.4s_steps(2)_infinite]" />

                                    <Image src={data.ImagePath} fill alt={data.MediaName}
                                        className="absolute inset-0 size-full object-cover
                                                    animate-[slice-2_3.1s_steps(2)_infinite]" />

                                    <Image src={data.ImagePath} fill alt={data.MediaName}
                                        className="absolute inset-0 size-full object-cover
                                                    animate-[slice-3_2.8s_steps(2)_infinite]" />
                                
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-between">
                            <div className="flex flex-col mb-2">
                                <div className="font-extrabold md:text-4xl text-2xl mb-3 flex md:flex-row flex-col gap-x-4">
                                    <span className="text-gray-600">#{data.IdMediaPk}</span> 
                                    <span>
                                        <span className="text-blue">{"> "}</span>
                                        {data.MediaName}
                                        <span className="text-pink">_</span>
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="bg-blue text-gray-800 w-fit px-2 py-1 lowercase text-sm">{t(data?.MediaTypeName)}</div>
                                    {!data.logs.length && <div className="border border-gray-600 px-2 py-1 font-bold w-fit text-sm">backlog</div>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 text-xs md:text-sm mb-2">
                                {data?.logs.map((log, index) => 
                                    <div key={index} className="bg-white/5 p-4 border-l-2 border-blue">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2 mb-2 text-gray-400">
                                                {log.StartDate &&
                                                    <div className="flex items-center gap-1"> 
                                                        <FaCalendarAlt />
                                                        {formatDate(log.StartDate)}
                                                    </div>
                                                }
                                                
                                                {log.EndDate && 
                                                    <>
                                                        <p>→</p>
                                                        <div className="flex items-center gap-1">
                                                            <FaCalendarAlt />
                                                            {formatDate(log.EndDate)}
                                                        </div>
                                                    </>
                                                }
                                            </div>

                                            {log.Score && <StarRating defaultValue={log.Score} />}
                                        </div>

                                        {log.Description && 
                                            <div className="flex mb-2">
                                                <div className="text-pink pr-1">{'"'}</div>
                                                {log.Description}
                                                <div className="text-pink pl-1">{'"'}</div>
                                            </div>
                                        }
                                        
                                        <div className="flex flex-wrap justify-between items-center border-t-gray-700 border-t gap-2 pt-2">
                                            <div className="flex flex-row flex-wrap gap-2 items-center text-xs">
                                                {log.MediaStatus && <StatusTag text={log.MediaStatus}/>}
                                                {Boolean(log.Enjoy) && <div className="flex items-center justify-center gap-2 px-2 py-1 bg-red/50 w-fit"><GoHeartFill /> {t("like")}</div>}
                                                {Boolean(log.Hate) && <div className="flex items-center justify-center gap-2 px-2 py-1 bg-purple-500/50 w-fit"><BiSolidDislike /> {t("hate")}</div>}
                                                {Boolean(log.EternalSuffering) && <div className="flex items-center justify-center gap-2 px-2 py-1 bg-blue-500/50 w-fit"> <IoInfiniteSharp /> {t("suffering")}</div>}
                                                {Boolean(log.Replay) && <div className="flex items-center justify-center gap-2 px-2 py-1 bg-green-500/50 w-fit"><IoReloadCircle />{t("replay")}</div>}
                                                {log.MediaStatus !== "COMPLETED" && log.Progress && log.ProgressTotal && 
                                            <ProgressBar current={log.Progress} total={log.ProgressTotal} />
                                        }
                                            </div>

                                            <div className="text-xs text-gray-500">#{log.IdLogPk}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
    </section>
}

type StatusTagProps = {
  text: string;
};

const statusColors: Record<string, string> = {
  COMPLETED: "border-green-600",
  DROPPED: "border-red-600",
  ONGOING: "border-blue-600",
  ONHOLD: "border-yellow-600",
};

function StatusTag({ text }: StatusTagProps) {
  const t = useTranslations("components.MediaInformation");

  return (
    <div className={`border ${statusColors[text]} px-2 py-1 font-bold`}>{t(text)}</div>
  );
}

function ProgressBar({ current = 0, total = 100 }) {
  const pct = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0

  return (
    <div className="w-25 text-gray-100 flex gap-2 items-center justify-center text-xs border py-1 px-2 border-gray-600">
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div>
        {current}/{total}
      </div>
    </div>
  )
}