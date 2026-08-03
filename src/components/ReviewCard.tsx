import type { Review } from "@/content/site";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="surface-card flex h-full flex-col p-6">
      <span
        aria-hidden="true"
        className="font-serif text-5xl leading-none text-[color:var(--color-raspberry)]"
      >
        &ldquo;
      </span>
      <blockquote className="-mt-2 flex-1 font-serif text-xl leading-snug text-charcoal">
        {review.quote}
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
