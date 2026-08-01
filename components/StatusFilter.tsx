"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import clsx from "clsx";

export default function StatusFilter() {
  const status = ["all", "COMPLETED", "ONHOLD", "ONGOING", "DROPPED", "BACKLOG"];

  const statusColors: Record<string, string> = {
    COMPLETED: "bg-green-600",
    DROPPED: "bg-red-600",
    ONGOING: "bg-blue-600",
    ONHOLD: "bg-yellow-600",
    BACKLOG: "bg-gray-600",
  };

  const t = useTranslations("components.MediaInformation");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = searchParams.get("status") ?? "all";

  const handleClick = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (item === "all" || selected === item) {
      params.delete("status");
    } else {
      params.set("status", item);
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div className="w-full relative justify-center min-h-8 px-8 lg:py-2 py-4 border-b text-sm flex gap-4 flex-wrap">
      {status.map((item, index) => {
        const isSelected = selected === item;
        return (
          <button
            type="button"
            key={index}
            onClick={() => handleClick(item)}
            className={clsx(
              "border px-2 flex flex-row items-center justify-center gap-2 transition-colors cursor-pointer",
              isSelected
                ? "bg-white text-black border-white"
                : "border-current hover:bg-white/10"
            )}
          >
            {statusColors[item] && (
              <div className={`${statusColors[item]} w-2 h-2 rounded-full`} />
            )}
            {t(item)}
          </button>
        );
      })}
    </div>
  );
}
