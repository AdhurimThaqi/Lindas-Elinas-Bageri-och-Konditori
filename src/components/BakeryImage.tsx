"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { WheatMark } from "./decor";

interface BakeryImageProps {
  src: string;
  alt: string;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Small label shown on the placeholder while the real photo is missing. */
  placeholderLabel?: string;
  quality?: number;
}

/**
 * Responsive image with a graceful, on-brand placeholder. If the photo file
 * is not present yet (or fails to load), an elegant aspect-ratio placeholder
 * keeps the finished layout intact — no component change needed when the
 * real image is dropped in at the same path. Parent controls the aspect ratio.
 */
export function BakeryImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className,
  placeholderLabel,
  quality = 82,
}: BakeryImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="img-placeholder absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
          role="img"
          aria-label={alt}
        >
          <WheatMark className="h-10 w-10 text-[color:var(--color-gold)] opacity-70" />
          {placeholderLabel ? (
            <span className="px-6 font-serif text-lg text-[color:var(--color-ink-muted)]">
              {placeholderLabel}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
