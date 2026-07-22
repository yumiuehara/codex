import Image from "next/image";
import { InformationLine } from "./Information";
import { useSearchParams } from "next/navigation";

export default function Hero() {
  const searchParams = useSearchParams()
  const currentYear = searchParams.get('year') ?? new Date().getFullYear().toString()
  
  return (
    <div>
      <section className="flex items-center justify-center w-full h-[100px] lg:h-[150px] bg-(--color-pink) relative">
        <Image
          src={`/hero.webp`}
          width={0}
          height={0}
          alt="hero"
          sizes="100vw"
          className="w-[100%] h-[100px] lg:h-[150px] object-cover mix-blend-screen"
        />

        <div className="absolute font-bold text-9xl leading flex flex-col items-center justify-center w-[100%] h-[100%] bg-(--color-pink)/50">
        </div>
      </section>

      <InformationLine year={currentYear} />
    </div>
  );
}
