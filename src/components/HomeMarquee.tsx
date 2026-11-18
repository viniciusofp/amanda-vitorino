import { Home } from "@/payload-types";
import React from "react";
import Marquee from "react-fast-marquee";

export type HomeMarqueeProps = {
  marquee:
    | {
        item?: string | null;
        id?: string | null;
      }[]
    | null;
};

export default async function HomeMarquee({ marquee }: HomeMarqueeProps) {
  if (!marquee) return null;
  return (
    <section className="bg-marrom text-creme border-marrom-700 relative sticky top-0 z-5 grid h-12 w-full items-center justify-center border-y">
      <Marquee speed={40}>
        <p className="pl-2 tracking-wide uppercase">
          {marquee?.map((word) => (
            <React.Fragment key={word.id}>
              {word.item}
              <span className="mx-2 inline-block"> · </span>
            </React.Fragment>
          ))}
          {marquee?.map((word) => (
            <React.Fragment key={word.id}>
              {word.item}
              <span className="mx-2 inline-block"> · </span>
            </React.Fragment>
          ))}
          {marquee?.map((word) => (
            <React.Fragment key={word.id}>
              {word.item}
              <span className="mx-2 inline-block"> · </span>
            </React.Fragment>
          ))}
        </p>
      </Marquee>
    </section>
  );
}
