"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { WheatMark } from "./decor";

/**
 * A bakery "seal" / wax-stamp badge: a cream disc with slowly-rotating curved
 * text around the rim and a stacked "Sedan 2018" mark in the centre. Rotation
 * pauses for prefers-reduced-motion.
 */
export function SealBadge({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ring = "· BAGERI & KONDITORI · EDSBERGS TORG ";

  return (
    <div
      className={cn(
        "aspect-square rounded-full bg-cream shadow-lift ring-1 ring-line",
        className,
      )}
    >
      <div className="relative h-full w-full">
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={
          reduce ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }
        }
        aria-hidden="true"
      >
        <defs>
          <path
            id="seal-ring"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
          />
        </defs>
        <text
          style={{ fontSize: "9px", letterSpacing: "1.5px", fontWeight: 600 }}
          className="fill-[color:var(--color-berry)] uppercase"
        >
          <textPath href="#seal-ring" startOffset="0">
            {ring}
            {ring}
          </textPath>
        </text>
      </motion.svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <WheatMark className="h-5 w-5 text-[color:var(--color-gold)]" />
        <span className="mt-1 font-serif text-[0.7rem] uppercase leading-none tracking-[0.2em] text-[color:var(--color-berry)]">
          Sedan
        </span>
        <span className="font-serif text-2xl font-semibold leading-none text-charcoal">
          2018
        </span>
      </div>
      </div>
    </div>
  );
}
