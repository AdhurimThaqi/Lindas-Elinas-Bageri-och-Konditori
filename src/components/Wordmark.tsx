"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn, withBasePath } from "@/lib/utils";
import { BerryMark } from "./decor";

/**
 * Brand wordmark: the real logo paired with a typographic lockup for legibility
 * and SEO. We use logo-transparent.svg — the logo with its white JPEG background
 * keyed out to genuine alpha via an SVG colour-matrix filter — so it is fully
 * transparent on any background. Falls back to a small berry mark if missing.
 */
export function Wordmark({
  className,
  compact = false,
  markSize = 56,
}: {
  className?: string;
  compact?: boolean;
  markSize?: number;
}) {
  const [logoOk, setLogoOk] = useState(true);

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 text-charcoal",
        className,
      )}
      aria-label="Lindas & Elinas Bageri och Konditori — till startsidan"
    >
      <span
        className="inline-flex shrink-0 items-center justify-center"
        style={{ width: markSize, height: markSize }}
      >
        {logoOk ? (
          <Image
            src={withBasePath("/images/logo-transparent.svg")}
            alt=""
            width={markSize}
            height={markSize}
            className="h-full w-full object-contain"
            onError={() => setLogoOk(false)}
            priority
          />
        ) : (
          <BerryMark className="h-6 w-6 text-[color:var(--color-raspberry)]" />
        )}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold tracking-tight sm:text-[1.35rem]">
          Lindas &amp; Elinas
        </span>
        {!compact && (
          <span className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
            Bageri &amp; Konditori
          </span>
        )}
      </span>
    </Link>
  );
}
