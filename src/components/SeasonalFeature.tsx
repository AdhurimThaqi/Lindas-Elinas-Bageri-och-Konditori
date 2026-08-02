import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { seasonalCampaign } from "@/content/site";
import { BakeryImage } from "./BakeryImage";
import { Reveal } from "./Reveal";
import { BerryMark } from "./decor";

/**
 * Data-driven seasonal campaign. Falls back to an evergreen custom-cake panel
 * when the campaign is disabled. Swap fields in site.ts to feature semlor,
 * studenttårtor, julbak etc. without touching this component.
 */
export function SeasonalFeature() {
  const c = seasonalCampaign;

  const content = c.enabled
    ? {
        eyebrow: c.eyebrow,
        title: c.title,
        description: c.description,
        dateRange: c.dateRange,
        badge: c.badge,
        image: c.image,
        imageAlt: c.imageAlt,
        cta: c.cta,
      }
    : {
        eyebrow: "Alltid hos oss",
        title: "Tårtor på beställning – året runt",
        description:
          "Även mellan säsongerna bakar vi tårtor för det ni firar. Berätta vad ni planerar så hjälper vi dig att hitta rätt.",
        dateRange: "",
        badge: "På beställning",
        image: "/images/cake-detail.webp",
        imageAlt: "Närbild på en dekorerad beställningstårta.",
        cta: { label: "Skicka en tårtförfrågan", href: "/bestall" },
      };

  return (
    <section className="container-page py-20 md:py-28">
      <div className="relative overflow-hidden rounded-2xl bg-charcoal text-cream shadow-lift">
        <div className="grid items-stretch gap-0 lg:grid-cols-2">
          <div className="relative order-2 min-h-[280px] lg:order-1 lg:min-h-full">
            <BakeryImage
              src={content.image}
              alt={content.imageAlt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholderLabel={content.title}
              className="h-full w-full"
            />
          </div>

          <div className="order-1 flex flex-col justify-center p-8 sm:p-12 lg:order-2">
            <Reveal>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[color:var(--color-raspberry)]" aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--color-raspberry)]">
                  {content.eyebrow}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-3xl leading-tight text-cream sm:text-4xl">
                {content.title}
              </h2>
            </Reveal>
            {content.badge || content.dateRange ? (
              <Reveal delay={0.1}>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {content.badge ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1 text-sm font-medium text-cream ring-1 ring-cream/20">
                      <BerryMark className="h-3.5 w-3.5 text-[color:var(--color-raspberry)]" />
                      {content.badge}
                    </span>
                  ) : null}
                  {content.dateRange ? (
                    <span className="text-sm text-cream/70">{content.dateRange}</span>
                  ) : null}
                </div>
              </Reveal>
            ) : null}
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/80">
                {content.description}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href={content.cta.href}
                className="btn btn-primary mt-8 self-start"
              >
                {content.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
