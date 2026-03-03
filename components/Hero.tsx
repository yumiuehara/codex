import Image from "next/image";
import Information from "./Information";
import type { InformationProps } from "./Information";

export default function Hero({...props}: InformationProps) {
  return (
    <section className="flex items-center justify-center border-b relative">
      <Image
        src="/hero.webp"
        width={0}
        height={0}
        alt=""
        sizes="100vw"
        className="w-[100%] h-[350px] object-cover"
      />

      <div className="absolute font-bold text-9xl leading flex flex-col items-center justify-center w-[100%] h-[100%]">
        <span className="drop-shadow-lg bg-linear-to-bl from-(--color-pink) via-(--color-red) to-(--color-pink) bg-clip-text text-transparent">
          2025
        </span>
        <Information {...props}  />
      </div>
    </section>
  );
}
