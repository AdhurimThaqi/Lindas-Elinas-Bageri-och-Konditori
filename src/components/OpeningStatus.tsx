"use client";

import { useEffect, useState } from "react";
import { getOpeningStatus, type OpeningStatus as Status } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * "Open now" indicator. Computes status in Europe/Stockholm time on the client
 * to avoid hydration mismatches and to never claim open based on the visitor's
 * local time zone. Renders a neutral fallback until mounted.
 */
export function OpeningStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpeningStatus(new Date()));
    update();
    // Re-check every minute so the label stays accurate on long visits.
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const isOpen = status?.state === "open";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold",
        status === null && "border-line bg-white text-[color:var(--color-ink-muted)]",
        isOpen && "border-transparent bg-[color:var(--color-sage)]/20 text-[color:var(--color-berry)]",
        status && !isOpen && "border-line bg-white text-[color:var(--color-ink-soft)]",
        className,
      )}
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2 w-2 rounded-full",
          status === null && "bg-[color:var(--color-ink-muted)]",
          isOpen && "bg-[color:var(--color-sage)]",
          status && !isOpen && "bg-[color:var(--color-gold)]",
        )}
      />
      {status === null ? "Se öppettider" : status.message}
    </span>
  );
}
