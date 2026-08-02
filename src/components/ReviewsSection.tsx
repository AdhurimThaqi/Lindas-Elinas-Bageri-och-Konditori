import { Star, ExternalLink } from "lucide-react";
import { reviews, socialProof, externalLinks } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { ReviewCard } from "./ReviewCard";
import { Reveal, RevealGroup } from "./Reveal";

/**
 * "Älskat i Edsberg". Shows real, verified reviews when present in config.
 * Otherwise a tasteful social-proof summary — no fabricated quotes or names.
 */
export function ReviewsSection() {
  const hasReviews = reviews.length > 0;

  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Röster från kvarteret"
        title="Älskat i Edsberg"
        intro="Ett bageri lever av sina gäster. Här är det som gör att många kommer tillbaka – dag efter dag."
      />

      {hasReviews ? (
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal as="div" key={i}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </RevealGroup>
      ) : (
        <div className="mt-12 grid gap-8 rounded-2xl border border-line bg-white p-8 shadow-soft md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            {(socialProof.ratingText || socialProof.reviewCountText) && (
              <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[color:var(--color-gold)] text-[color:var(--color-gold)]"
                    />
                  ))}
                </span>
                <span className="text-sm font-semibold text-charcoal">
                  {[socialProof.ratingText, socialProof.reviewCountText]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </div>
            )}

            <p className="max-w-md text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              Gäster återkommer gärna till det breda utbudet, det trevliga
              bemötandet och den prisvärda fikan – med nybakat bröd, frukost och
              lunch mitt på Edsbergs torg.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {socialProof.themes.map((theme) => (
                <li
                  key={theme}
                  className="rounded-full bg-paper px-3 py-1.5 text-sm font-medium text-[color:var(--color-berry)]"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 md:min-w-52">
            <a
              href={externalLinks.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost justify-between"
            >
              Läs på Google
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={externalLinks.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost justify-between"
            >
              Läs på Tripadvisor
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
