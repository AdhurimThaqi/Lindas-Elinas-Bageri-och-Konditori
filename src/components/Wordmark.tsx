"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn, withBasePath } from "@/lib/utils";
import { BerryMark } from "./decor";

/**
 * Brand wordmark: the real logo (public/images/logo.jpg) paired with a
 * typographic lockup for legibility and SEO. The logo is black artwork on a
 * white JPEG background; `mix-blend-multiply` drops that white against the light
 * header/footer so it reads as transparent. If the logo file is missing it
 * falls back to a small berry mark, so the header/footer never break.
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
        className="inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: markSize, height: markSize }}
      >
        {logoOk ? (
          <Image
            src={withBasePath("/images/logo.jpg")}
            alt=""
            width={markSize}
            height={markSize}
            className="h-full w-full object-contain mix-blend-multiply"
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
