import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/content/site";
import { telHref } from "@/lib/utils";
import { BakeryImage } from "./BakeryImage";
import { OpeningStatus } from "./OpeningStatus";
import { BerryMark } from "./decor";
import { Reveal } from "./Reveal";
import { Floating, Parallax, Magnetic, DrawStroke } from "./motion";

// Ragged "torn paper" edge used to mask the polaroid inset.
const TORN_MASK =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 250' preserveAspectRatio='none'><path fill='white' d='M0,12 L14,4 L28,13 L42,3 L56,12 L70,4 L84,13 L98,3 L112,12 L126,4 L140,13 L154,3 L168,12 L182,4 L200,10 L200,240 L186,246 L172,237 L158,247 L144,237 L130,246 L116,237 L102,247 L88,237 L74,246 L60,237 L46,247 L32,237 L18,246 L0,240 Z'/></svg>",
  );
const tornStyle: React.CSSProperties = {
  WebkitMaskImage: `url("${TORN_MASK}")`,
  maskImage: `url("${TORN_MASK}")`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

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
              <span className="stroke-underline">mitt i Edsberg</span>.
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

                {/* Torn-paper polaroid inset with a handwritten sticker */}
                <div className="absolute -bottom-10 -left-3 z-10 w-40 -rotate-6 [animation:float-soft_5.5s_ease-in-out_infinite] sm:w-48 lg:-left-8 lg:w-56">
                  <div style={{ filter: "drop-shadow(0 18px 28px rgba(29,26,24,0.3))" }}>
                    <div className="bg-white p-2 pb-3" style={tornStyle}>
                      <BakeryImage
                        src="/images/pastries.svg"
                        alt="Nygräddade bakverk från Lindas & Elinas."
                        sizes="240px"
                        placeholderLabel="Nybakat"
                        className="aspect-[5/4] w-full"
                      />
                    </div>
                  </div>
                  <span className="font-hand absolute -right-2 -top-5 rotate-6 text-3xl font-bold text-[color:var(--color-berry)] sm:text-4xl">
                    Nybakat!
                  </span>
                </div>

                {/* Sedan 2018 gold badge (matches the reference design) */}
                <div className="absolute -top-5 right-4 z-10 flex aspect-square w-20 -rotate-6 flex-col items-center justify-center rounded-full bg-[color:var(--color-gold)] text-cream shadow-lift ring-4 ring-cream [animation:float-soft_6s_ease-in-out_infinite_0.5s] sm:w-24">
                  <span className="font-serif text-base italic leading-none">
                    Sedan
                  </span>
                  <span className="font-serif text-2xl font-semibold leading-none">
                    2018
                  </span>
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
