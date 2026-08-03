import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/content/site";
import { telHref, withBasePath } from "@/lib/utils";
import { BakeryImage } from "./BakeryImage";
import { OpeningStatus } from "./OpeningStatus";
import { BerryMark } from "./decor";
import { Reveal } from "./Reveal";
import { Floating, Parallax, Magnetic, DrawStroke } from "./motion";
import { SealBadge } from "./SealBadge";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Floating decorative bits */}
      <Floating className="left-[5%] top-[24%] hidden lg:block" duration={7}>
        <BerryMark className="h-7 w-7 text-[color:var(--color-raspberry)] opacity-30" />
      </Floating>
      <Floating className="bottom-[16%] left-[42%] hidden lg:block" duration={8} delay={0.6}>
        <BerryMark className="h-5 w-5 text-[color:var(--color-berry)] opacity-30" />
      </Floating>

      <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <Reveal variant="blur">
            <p className="eyebrow">{business.tagline}</p>
          </Reveal>
          <Reveal delay={0.06} variant="blur">
            <h1 className="mt-4 text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
              Nybakat på riktigt,{" "}
              <span className="stroke-underline text-gradient-animated">
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
              <Magnetic strength={0.25}>
                <Link href="/bestall" className="btn btn-primary">
                  Beställ tårta
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link href="/sortiment" className="btn btn-secondary">
                  Se vårt utbud
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <OpeningStatus />
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal link-underline"
              >
                Öppettider &amp; hitta hit
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
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
          {/* Draw-on accent stroke arcing over the top of the image */}
          <DrawStroke
            d="M4 46C70 8 150 6 214 30c40 15 78 8 100-20"
            viewBox="0 0 320 60"
            strokeWidth={2.4}
            className="pointer-events-none absolute -top-6 left-6 z-0 hidden h-12 w-[78%] text-[color:var(--color-gold)] opacity-70 lg:block"
          />
          <Reveal variant="scale">
            <Parallax offset={26}>
              <div className="relative">
                <BakeryImage
                  src="/images/storefront.jpg"
                  alt="Lindas & Elinas entré på Edsbergs torg 14 i Sollentuna."
                  priority
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  placeholderLabel="Vår butik på Edsbergs torg 14"
                  className="mask-arch aspect-[4/5] w-full shadow-lift"
                />

                {/* Logo stamp overlay (gentle float) */}
                <div className="absolute -bottom-7 -left-5 h-28 w-28 [animation:float-soft_5s_ease-in-out_infinite] sm:h-32 sm:w-32 lg:-left-9 lg:h-36 lg:w-36">
                  <span className="flex h-full w-full items-center justify-center rounded-full border-4 border-cream bg-white p-3 shadow-lift">
                    <Image
                      src={withBasePath("/images/logo-transparent.svg")}
                      alt="Lindas & Elinas Bageri och Konditori logotyp"
                      width={144}
                      height={144}
                      className="h-full w-full rounded-full object-contain"
                    />
                  </span>
                </div>

                {/* Sedan 2018 seal/stamp badge (gentle float), on the top-right corner */}
                <SealBadge className="absolute -top-7 right-3 z-10 w-24 [animation:float-soft_6s_ease-in-out_infinite_0.5s] sm:right-4 sm:w-28 lg:w-32" />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
