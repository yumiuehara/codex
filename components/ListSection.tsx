import { Log } from "@/helpers/types";
import Card from "./Card";
import { MdChevronRight } from "react-icons/md";
import { useTranslations } from "next-intl";
import Link from "next/link";

type ListSectionProps = {
  title?: string;
  data: Log[];
  seeAllUrl?: string;
  sliceItems?: boolean;
};

const rowMinSize = 7;

export default function ListSection({
  title,
  data,
  seeAllUrl,
  sliceItems,
}: ListSectionProps) {
  const t = useTranslations("components.ListSection");

  const list = sliceItems ? data.slice(0, 7) : data;

  const isMultiple = list.length % rowMinSize == 0;

  const fillRows = list.length < rowMinSize || !isMultiple;

  return (
    <section className="flex flex-col mx-10 my-5">
      <div className="flex justify-between items-center text-sm mb-5">
        {title && <h2 className="font-bold text-2xl uppercase">{title}</h2>}
        {data.length > 4 && seeAllUrl && (
          <Link href={seeAllUrl}>
            <button className="flex items-center">
              <span className="lowercase">{t("seeAll")}</span>
              <MdChevronRight />
            </button>
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-y-2 justify-between">
        {list.length > 0 &&
          list.map((log) => <Card cardData={log} key={log.id} />)}

        {fillRows &&
          Array(Math.abs(rowMinSize - (list.length % rowMinSize)))
            .fill(0)
            .map((_, i) => (
              <div key={`empty-${i}`} aria-hidden className="card__title" />
            ))}
      </div>
    </section>
  );
}
