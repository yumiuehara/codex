import Image from "next/image";
import { InformationLine, type InformationProps } from "./Information";

export default function Hero({year, ...props}: {year: string} & InformationProps) {
  return (
    <div>
      <section className="flex items-center justify-center w-full h-[150px] bg-(--color-pink) relative">
        <Image
          src={`/hero-${year}.webp`}
          width={0}
          height={0}
          alt=""
          sizes="100vw"
          className="w-[100%] h-[150px] object-cover mix-blend-screen"
        />

        <div className="absolute font-bold text-9xl leading flex flex-col items-center justify-center w-[100%] h-[100%] bg-(--color-pink)/50">
        </div>
      </section>
      <InformationLine {...props} year={year} />
    </div>
  );
}
