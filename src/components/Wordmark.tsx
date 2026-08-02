import Link from "next/link";
import { cn } from "@/lib/utils";
import { BerryMark } from "./decor";

/**
 * Text-based wordmark. No real logo file was supplied, so this is a restrained
 * typographic lockup rather than a fabricated icon. If a real logo is added,
 * swap this component's contents for the asset.
 */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 text-charcoal",
        className,
      )}
      aria-label="Lindas & Elinas Bageri och Konditori — till startsidan"
    >
      <BerryMark className="h-6 w-6 shrink-0 text-[color:var(--color-raspberry)] transition-transform duration-300 group-hover:rotate-6" />
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
