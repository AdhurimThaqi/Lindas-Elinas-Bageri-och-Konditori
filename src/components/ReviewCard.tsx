import type { Review } from "@/content/site";
import { BerryMark } from "./decor";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="surface-card flex h-full flex-col p-6">
      <BerryMark className="h-6 w-6 text-[color:var(--color-raspberry)]" />
      <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug text-charcoal">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-5 text-sm font-semibold text-[color:var(--color-ink-soft)]">
        {review.author}
        {review.source ? (
          <span className="font-normal text-[color:var(--color-ink-muted)]">
            {" "}
            · {review.source}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
