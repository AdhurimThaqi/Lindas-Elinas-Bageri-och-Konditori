"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Hand-drawn underline beneath the hero heading. It draws itself once the
 * page is actually visible — i.e. after the intro preloader has lifted — so
 * the animation is never spent behind the loading curtain on first visit.
 */
export function HeroUnderline({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduce) {
      setPlay(true);
      return;
    }
    // If the preloader already ran this session, the page is visible now.
    const seen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("le-preloaded");
    if (seen) {
      const t = window.setTimeout(() => setPlay(true), 250);
      return () => window.clearTimeout(t);
    }
    // Otherwise wait for the preloader to finish, with a safety fallback.
    const onDone = () => setPlay(true);
    window.addEventListener("preloader:done", onDone);
    const fallback = window.setTimeout(() => setPlay(true), 3200);
    return () => {
      window.removeEventListener("preloader:done", onDone);
      window.clearTimeout(fallback);
    };
  }, [reduce]);

  return (
    <svg
      viewBox="0 0 300 20"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M4 11 C 70 4, 150 4, 210 9 S 285 15, 296 8"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        animate={play ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </svg>
  );
}
