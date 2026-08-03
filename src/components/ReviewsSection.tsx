import { Star, ExternalLink } from "lucide-react";
import {
  reviews,
  reviewsNote,
  socialProof,
  externalLinks,
} from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { ReviewCard } from "./ReviewCard";
import { Reveal, RevealGroup } from "./Reveal";
import { DecorField } from "./BakeryDecor";

function RatingStat({ rating, meta }: { rating: string; meta: string }) {
  return (
    <div className="text-center">
      <p className="flex items-center justify-center gap-2 font-serif text-4xl text-charcoal">
        {rating}
        <Star className="h-7 w-7 fill-[color:var(--color-gold)] text-[color:var(--color-gold)]" aria-hidden="true" />
      </p>
      <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">{meta}</p>
    </div>
  );
}

/**
 * "Älskat i Edsberg" — real, verified reviews (Google & Tripadvisor) with the
 * rating summary and review quotes.
 */
export function ReviewsSection() {
  const hasReviews = reviews.length > 0;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <DecorField
        sprites={[
          { icon: "wheat", className: "left-[4%] top-16 hidden h-16 w-16 md:block", rotate: -10, float: 8 },
          { icon: "heart", className: "right-[5%] bottom-20 hidden h-14 w-14 md:block", rotate: 12, float: 7, floatDelay: 0.4 },
        ]}
      />
      <div className="container-page">
        <SectionHeading
          eyebrow="Det säger gästerna"
          title="Älskat i Edsberg"
          align="center"
        />

      {/* Rating summary */}
      <Reveal>
        <div className="mx-auto mt-10 flex max-w-lg items-start justify-center gap-12 sm:gap-20">
          <RatingStat
            rating={socialProof.google.rating}
            meta={socialProof.google.meta}
          />
          <RatingStat
            rating={socialProof.tripadvisor.rating}
            meta={socialProof.tripadvisor.meta}
          />
        </div>
      </Reveal>

      {hasReviews ? (
        <>
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal as="div" key={i}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </RevealGroup>
          <p className="mt-8 text-center text-sm italic text-[color:var(--color-ink-muted)]">
            {reviewsNote}
          </p>
        </>
      ) : null}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={externalLinks.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Läs på Google
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={externalLinks.tripadvisor}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Läs på Tripadvisor
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      </div>
    </section>
  );
}
