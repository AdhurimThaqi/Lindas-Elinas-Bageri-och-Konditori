import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BakeryImage } from "./BakeryImage";
import { Reveal } from "./Reveal";
import { BerryMark } from "./decor";

export function StorySection() {
  return (
    <section className="bg-paper">
      <div className="container-page grid items-center gap-10 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal y={24} className="order-2 lg:order-1">
          <figure className="relative">
            <BakeryImage
              src="/images/interior.webp"
              alt="Interiör från bageriet på Edsbergs torg med välfyllda montrar."
              sizes="(min-width: 1024px) 46vw, 90vw"
              placeholderLabel="I bageriet"
              className="aspect-[5/4] w-full rounded-lg shadow-lift"
            />
            <figcaption className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-charcoal shadow-soft ring-1 ring-line">
              <BerryMark className="h-4 w-4 text-[color:var(--color-raspberry)]" />
              Edsbergs torg · Sedan 2018
            </figcaption>
          </figure>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">Vårt hörn av Edsberg</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
              Bakat här. Serverat med hjärta.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              Sedan 2018 har Lindas &amp; Elinas varit en del av vardagen på
              Edsbergs torg. Här möts doften av nybakat bröd, välfyllda montrar
              och människor på väg till jobbet, dagens lunch eller en lång fika.
              Vi bakar på plats och hjälper gärna till när det är dags att fira
              något extra.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Link
              href="/om-oss"
              className="mt-7 inline-flex items-center gap-2 text-charcoal link-underline font-semibold"
            >
              Läs mer om oss
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
