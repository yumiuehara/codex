
import clsx from "clsx";
import { TbStarFilled } from "react-icons/tb";

export default function StarRating({ total = 5, defaultValue = 0 }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: total }, (_, i) => {
        const val = i + 1;
        const filled = val <= defaultValue;
        return (
          <TbStarFilled key={i} className={clsx(filled ? 'text-yellow-500' : '', 'w-3 h-3')} />
        );
      })}
    </div>
  );
};