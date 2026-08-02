import { openingHoursSummary, specialHours, holidayNote } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Static opening-hours table (server-rendered, no client JS). Pairs well with
 * the client <OpeningStatus /> pill for the live "open now" state.
 */
export function OpeningHours({ className }: { className?: string }) {
  return (
    <div className={className}>
      <dl className="divide-y divide-[color:var(--color-line)]">
        {openingHoursSummary.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 py-2.5"
          >
            <dt className="text-[color:var(--color-ink-soft)]">{row.label}</dt>
            <dd className="font-semibold tabular-nums">{row.value}</dd>
          </div>
        ))}
      </dl>

      {specialHours.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-[color:var(--color-ink-soft)]">
          {specialHours.map((s) => (
            <li key={s.date} className="flex justify-between gap-4">
              <span>{s.label}</span>
              <span className="font-medium">
                {s.intervals.length === 0
                  ? "Stängt"
                  : s.intervals
                      .map((iv) => `${iv.open}–${iv.close}`)
                      .join(", ")}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p
        className={cn(
          "mt-4 text-sm leading-relaxed text-[color:var(--color-ink-muted)]",
        )}
      >
        {holidayNote}
      </p>
    </div>
  );
}
