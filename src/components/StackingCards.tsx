"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  cubicBezier,
  easeIn,
  easeInOut,
  easeOut,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { CustomRichText } from "./CustomRichText";
import { DynamicIcon } from "lucide-react/dynamic";

export type StackingCardsProps = { stackingCards: any };
const items = 5;

export default function StackingCards({ stackingCards }: StackingCardsProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 20%", "90% end"],
  });
  const MotionButton = motion.create(Button);
  return (
    <div
      ref={ref}
      className="container-padding relative"
      style={{ height: `calc(${items}*66svh)` }}
    >
      <div className="container-padding bg-mix-multiply bg-petroleo sticky top-0 z-2 grid min-h-dvh items-center gap-4 overflow-hidden p-8 text-white md:gap-12 lg:flex lg:justify-center">
        <div className="pointer-events-none absolute top-0 left-0 z-1 h-full w-full bg-[url('/dot-grid.webp')] bg-repeat mix-blend-multiply"></div>
        <div className="md:1/2 relative z-3 max-w-150 shrink lg:w-1/3 xl:w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-creme mb-4 font-serif text-[clamp(2.25rem,3svw,3rem)] leading-none tracking-tight text-balance sm:mb-8"
          >
            {stackingCards.headline}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
            className="prose-sm xl:prose mb-3 leading-relaxed text-balance text-white! opacity-80"
          >
            <CustomRichText data={stackingCards.lead as any} />
          </motion.div>
        </div>
        <div className="cardstack relative z-3 h-full min-h-64 w-full md:mt-0 lg:min-w-80">
          {stackingCards?.cards?.map((card: any, index: number) => {
            return (
              <Card
                key={card.id}
                card={card}
                progress={scrollYProgress}
                index={index}
                total={stackingCards.cards.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
type CardProps = {
  card: any;
  progress: MotionValue<number>;
  index: number;
  total: number;
};
const Card = ({ card, progress, index, total }: CardProps) => {
  const { translateY, rotate } = useTransform(
    progress,
    [index / total, (index + 1) / total],
    {
      translateY: ["100vh", "0vh"],
      rotate: [0, ((index / total) * 2 - 1) * 6],
    },
    { ease: cubicBezier(0, 1, 0.33, 1) },
  );

  return (
    <motion.div
      style={{
        translateY,
        rotate,
        left: (index / (total - 1)) * 100 + "%",
        translateX: (index / (total - 1)) * -100 + "%",
      }}
      className={cn(
        "text-petroleo absolute top-1/2 flex aspect-6/5 max-h-56 w-xs max-w-full shrink-0 -translate-y-1/2 flex-col justify-between rounded-xs border border-stone-900/10 bg-white p-6 shadow-md/5 sm:max-h-max lg:w-sm",
      )}
    >
      <div className="flex justify-between gap-3">
        <h3 className="mb-5 text-[clamp(1.3rem,3svw,1.8rem)] leading-[1.2] font-bold text-balance">
          {card.title}
        </h3>
        <DynamicIcon
          name={card.iconSlug}
          size={36}
          className="text-marrom shrink-0"
        />
      </div>

      <div className="sm:prose-sm max-w-prose text-xs leading-normal! tracking-wide text-balance">
        <CustomRichText data={card.text as any} />
      </div>
    </motion.div>
  );
};
