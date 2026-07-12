"use client";

import { Log } from "@/helpers/types";
import Image from "next/image";
import { GoHeartFill, GoInfinity } from "react-icons/go";
import { ImHeartBroken } from "react-icons/im";
import { RiLoopRightLine } from "react-icons/ri";
import Link from "next/link";
import { useParams } from "next/navigation";

type CardProps = {
  cardData: Log;
};

export default function Card({ cardData }: CardProps) {
  const { locale } = useParams()
  
  return (
    <>
      <Link
        href={`/${locale}/media/${cardData.IdMediaPk}`}
        className="card__image relative group text-left hover:scale-101"
      >
        <div className="card__image relative border-pink border">
          <Image
            src={cardData.ImagePath}
            alt={cardData.MediaName}
            className="duration-300 brightness-40 group-hover:brightness-70"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className="card__title absolute bottom-0 px-2 py-1.5 font-semibold lowercase">
          <span className="group-hover:bg-blue group-hover:text-dark-gray">
            {cardData.MediaName}
          </span>
        </div>
        <div className="flex gap-x-1 absolute top-0 px-2 py-1.5">
          {Boolean(cardData.Enjoy) && (
            <GoHeartFill className="text-red-500 stroke-white stroke-1 w-3 h-3" />
          )}
          {Boolean(cardData.Replay) && (
            <RiLoopRightLine className="text-green-500 stroke-white stroke-1 w-3 h-3" />
          )}
          
          {Boolean(cardData.EternalSuffering) && (
            <GoInfinity className="text-blue-500 stroke-white stroke-1 w-3 h-3" />
          )}

          {Boolean(cardData.Hate) && (
            <ImHeartBroken className="text-purple-500 stroke-white stroke-1 w-3 h-3" />
          )}
        </div>
      </Link>
    </>
  );
}
