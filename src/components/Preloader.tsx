"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { withBasePath } from "@/lib/utils";

type Phase = "loading" | "leaving" | "gone";

/**
 * Bakery-style intro preloader: the logo "fills up" with a warm gradient from
 * the bottom (like dough rising / a jar filling), then the whole panel lifts
 * away like a curtain to reveal the site.
 *
 * - Shows once per browser session (sessionStorage), so it delights without
 *   nagging on every navigation.
 * - Fully skipped for prefers-reduced-motion (no delay, removed immediately).
 * - Never traps focus and auto-dismisses; access is not blocked.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  // Default "loading" so it covers the page from the very first paint (SSR).
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("le-preloaded");

    if (reduce || seen) {
      // Defer so we don't setState synchronously inside the effect body.
      const skip = window.setTimeout(() => {
        setPhase("gone");
        window.dispatchEvent(new Event("preloader:done"));
      }, 0);
      return () => window.clearTimeout(skip);
    }

    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setPhase("leaving"), 1700);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (phase === "gone") return null;

  const maskUrl = `url("${withBasePath("/images/logo-transparent.svg")}")`;
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: maskUrl,
    maskImage: maskUrl,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream"
      initial={false}
      animate={phase === "leaving" ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === "leaving") {
          window.sessionStorage.setItem("le-preloaded", "1");
          document.body.style.overflow = "";
          setPhase("gone");
          window.dispatchEvent(new Event("preloader:done"));
        }
      }}
      role="status"
      aria-label="Laddar Lindas & Elinas Bageri och Konditori"
    >
      {/* Soft pulsing glow */}
      <motion.span
        aria-hidden="true"
        className="absolute h-64 w-64 rounded-full bg-[color:var(--color-raspberry)] opacity-10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating "flour" dots */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)]"
          style={{ left: `${38 + i * 8}%`, top: "62%" }}
          animate={{ y: [0, -70 - i * 10, 0], opacity: [0, 0.7, 0] }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}

      {/* Logo that fills up */}
      <div className="relative h-36 w-36 sm:h-44 sm:w-44">
        {/* Empty outline of the logo */}
        <div
          className="absolute inset-0"
          style={{
            ...maskStyle,
            background:
              "color-mix(in srgb, var(--color-charcoal) 14%, transparent)",
          }}
          aria-hidden="true"
        />
        {/* Rising warm fill, clipped to the logo shape */}
        <div className="absolute inset-0 overflow-hidden" style={maskStyle} aria-hidden="true">
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--color-berry)] via-[color:var(--color-raspberry)] to-[color:var(--color-gold)]"
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Shimmer on the rising surface */}
            <span className="absolute inset-x-0 top-0 h-6 bg-white/30 blur-md" />
          </motion.div>
        </div>
      </div>

      {/* Wordmark */}
      <motion.p
        className="mt-7 font-serif text-2xl text-charcoal sm:text-3xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        Lindas &amp; Elinas
      </motion.p>
      <motion.p
        className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
      >
        Bageri &amp; Konditori
      </motion.p>

      {/* Loading bar */}
      <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-[color:var(--color-line)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[color:var(--color-raspberry)] to-[color:var(--color-berry)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
