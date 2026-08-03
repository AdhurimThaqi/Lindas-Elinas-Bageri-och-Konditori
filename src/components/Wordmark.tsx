"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn, withBasePath } from "@/lib/utils";
import { BerryMark } from "./decor";

/**
 * Brand wordmark: the real logo (transparent) plus a typographic lockup.
 * `light` uses the white logo + white text for dark backgrounds (the header).
 */
export function Wordmark({
  className,
  compact = false,
  light = false,
  markSize = 48,
}: {
  className?: string;
  compact?: boolean;
  light?: boolean;
  markSize?: number;
}) {
  const [logoOk, setLogoOk] = useState(true);
  const logoSrc = light ? "/images/logo-white.svg" : "/images/logo-transparent.svg";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5",
        light ? "text-white" : "text-charcoal",
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
            src={withBasePath(logoSrc)}
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
          <span
            className={cn(
              "mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em]",
              light ? "text-white/70" : "text-[color:var(--color-ink-muted)]",
            )}
          >
            Bageri &amp; Konditori
          </span>
        )}
      </span>
    </Link>
  );
}
