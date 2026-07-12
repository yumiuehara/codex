"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function NotFoundPage() {
  const t = useTranslations("pages.NotFoundPage");
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-10">
      <Image
        src="/huh.png"
        width={600}
        height={500}
        alt={t("notFoundImageAlt")}
      />
      <p className="font-bold text-5xl">{t("message")}</p>
    </div>
  );
}
