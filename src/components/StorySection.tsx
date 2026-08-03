import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BakeryImage } from "./BakeryImage";
import { Reveal } from "./Reveal";
import { WheatMark } from "./decor";
import { DecorField } from "./BakeryDecor";

export function StorySection() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <DecorField
        sprites={[
          { icon: "heart", className: "right-[6%] top-10 h-14 w-14", rotate: 10, float: 7.5 },
          { icon: "cupcake", className: "bottom-8 right-[14%] hidden h-16 w-16 lg:block", rotate: -8, float: 8, floatDelay: 0.5 },
        ]}
      />
      <div className="container-page relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14">
        {/* Image with a black circular badge overlapping its right side */}
        <Reveal y={24} className="order-2 lg:order-1">
          <div className="relative">
            <BakeryImage
              src="/images/interior.svg"
              alt="Interiör från bageriet på Edsbergs torg med välfyllda montrar."
              sizes="(min-width: 1024px) 46vw, 90vw"
              placeholderLabel="I bageriet"
              className="aspect-[5/4] w-full rounded-xl shadow-lift"
            />
            <div className="absolute -right-4 top-1/2 flex aspect-square w-24 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-charcoal text-center text-cream shadow-lift sm:-right-6 sm:w-28">
              <span className="px-2 font-serif text-[0.78rem] leading-tight">
                Edsbergs torg
              </span>
              <span className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cream/70">
                Sedan 2018
              </span>
            </div>
          </div>
        </Reveal>

        <div className="relative order-1 lg:order-2 lg:pl-4">
          <Reveal>
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-[2.6rem]">
              Bakat här. Serverat med hjärta.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl leading-relaxed text-[color:var(--color-ink-soft)]">
              Sedan 2018 har Lindas &amp; Elinas varit en del av vardagen på
              Edsbergs torg. Här möts doften av nybakat bröd, välfyllda montrar
              och människor på väg till jobbet, dagens lunch eller en lång fika.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-xl leading-relaxed text-[color:var(--color-ink-soft)]">
              Vi bakar på plats och hjälper gärna till när det är dags att fira
              något extra.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <Link
              href="/om-oss"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-charcoal link-underline"
            >
              Läs mer om oss
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>

          {/* Thin botanical branch toward the right edge */}
          <WheatMark
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 bottom-0 hidden h-24 w-24 rotate-12 text-[color:var(--color-gold)] opacity-40 lg:block"
          />
        </div>
      </div>
    </section>
  );
}
