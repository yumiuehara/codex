import { ReactNode } from "react";
import Hero from "./Hero";

type FullListLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function FullListLayout({
  title,
  children,
}: FullListLayoutProps) {
  return (
    <section>
      <Hero />

      <div className="py-10 md:px-4 px-0">
        <h1 className="text-3xl font-bold text-center">{title}</h1>

        {children}
      </div>
    </section>
  );
}
