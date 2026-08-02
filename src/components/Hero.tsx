import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/content/site";
import { telHref } from "@/lib/utils";
import { BakeryImage } from "./BakeryImage";
import { OpeningStatus } from "./OpeningStatus";
import { CurveStroke } from "./decor";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <Reveal>
            <p className="eyebrow">{business.tagline}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
              Nybakat på riktigt,{" "}
              <span className="stroke-underline text-[color:var(--color-berry)]">
                mitt i Edsberg
              </span>
              .
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              Bröd, bakverk, tårtor och lunch – gjort på plats för
              vardagsfikan, morgonen på språng och livets stora firanden.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/bestall" className="btn btn-primary">
                Beställ tårta
              </Link>
              <Link href="/sortiment" className="btn btn-secondary">
                Se vårt utbud
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <OpeningStatus />
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal link-underline"
              >
                Öppettider &amp; hitta hit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={telHref()}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal link-underline"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {business.phone.display}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Layered photo composition */}
        <div className="relative">
          <CurveStroke
            className="pointer-events-none absolute -left-8 -top-10 z-0 hidden h-28 w-72 text-[color:var(--color-gold)] opacity-60 lg:block"
          />
          <Reveal y={24}>
            <div className="relative">
              <BakeryImage
                src="/images/hero-cakes.webp"
                alt="Dukat bord med tårtor och bakverk från Lindas & Elinas."
                priority
                sizes="(min-width: 1024px) 42vw, 90vw"
                placeholderLabel="Tårtor & bakverk"
                className="mask-arch aspect-[4/5] w-full shadow-lift"
              />

              {/* Smaller detail image */}
              <div className="absolute -bottom-8 -left-6 w-40 sm:w-48 lg:-left-10 lg:w-56">
                <BakeryImage
                  src="/images/cake-detail.webp"
                  alt="Närbild på en dekorerad tårta."
                  sizes="220px"
                  placeholderLabel="Detalj"
                  className="aspect-square w-full rounded-lg border-4 border-cream shadow-lift"
                />
              </div>

              {/* Sedan 2018 badge */}
              <div className="absolute -right-3 top-5 rotate-3 rounded-full bg-cream px-4 py-3 text-center shadow-lift ring-1 ring-line lg:-right-6">
                <span className="block font-serif text-lg leading-none text-[color:var(--color-berry)]">
                  Sedan
                </span>
                <span className="block font-serif text-2xl font-semibold leading-none text-charcoal">
                  2018
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
