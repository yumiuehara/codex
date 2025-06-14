"use client";

import { Log } from "@/helpers/types";
import Image from "next/image";
import { GoHeartFill } from "react-icons/go";

import { useState } from "react";
import {
  CloseButton,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { ImCross } from "react-icons/im";

type CardProps = {
  cardData: Log;
};

export default function Card({ cardData }: CardProps) {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("components.Card");
  const format = useFormatter();

  const currentLanguage = locale.toLowerCase();

  const formatDate = (date: string) => {
    const dateSplit = date.split("-");
    const day = Number(dateSplit[0]);
    const month = Number(dateSplit[1]);
    const year = Number(dateSplit[2]);

    if (day && month) {
      const date = new Date(year, month + 1, day);
      return format.dateTime(date, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } else if (month) {
      const date = new Date(year, month + 1, 1);
      return format.dateTime(date, {
        year: "numeric",
        month: "short",
      });
    } else {
      const date = new Date(year, 1, 1);
      return format.dateTime(date, {
        year: "numeric",
      });
    }
  };

  return (
    <>
      <button
        className="card__image relative group text-left hover:scale-101"
        onClick={() => setIsOpen(true)}
      >
        <div className="card__image relative border-(--color-pink) border-1">
          <Image
            src={cardData.media.image}
            alt={cardData.media.name}
            className="duration-300 brightness-40 group-hover:brightness-70"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className="card__title absolute bottom-0 px-2 py-1.5 font-semibold lowercase">
          <span className="group-hover:bg-(--color-blue) group-hover:text-dark-gray">
            {cardData.media.name}
          </span>
        </div>
        {cardData.like && (
          <div className="absolute top-0 px-2 py-1.5">
            <GoHeartFill className="text-red-500 stroke-white stroke-1" />
          </div>
        )}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="bg-black/60 fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            className={
              "w-[550px] h-[350px] space-y-4 border-2 border-(--color-blue) bg-(--color-dark-gray) bg-[top_right] bg-no-repeat p-10 flex flex-col justify-between"
            }
            style={{
              backgroundImage: `var(--smooth-dark-gray-gradient), url(${cardData.media.image})`,
            }}
          >
            <div>
              <CloseButton className="float-right">
                <ImCross className="text-white w-6 h-6 stroke-red-500 stroke-[1.5]" />
              </CloseButton>
              <DialogTitle className="font-bold text-xl uppercase mb-5">
                {cardData.media.name}
              </DialogTitle>
              <Description className="flex flex-col">
                {cardData.description && (
                  <span className="mb-5">
                    {
                      cardData.description[
                        currentLanguage as keyof typeof cardData.description
                      ]
                    }
                  </span>
                )}
              </Description>
            </div>

            <div className="flex justify-between items-center">
              {cardData.like ? (
                <GoHeartFill className="text-red-500 stroke-white stroke-1" />
              ) : (
                <div />
              )}

              <div className="flex flex-col items-end">
                <span className="text-sm">
                  {t("startDate", { date: formatDate(cardData.startDate) })}
                </span>
                {cardData.endDate && (
                  <span className="text-sm">
                    {t("endDate", { date: formatDate(cardData.endDate) })}
                  </span>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
