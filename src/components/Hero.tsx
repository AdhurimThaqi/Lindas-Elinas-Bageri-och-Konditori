import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/content/site";
import { telHref } from "@/lib/utils";
import { BakeryImage } from "./BakeryImage";
import { OpeningStatus } from "./OpeningStatus";
import { Reveal } from "./Reveal";
import { Magnetic, DrawStroke } from "./motion";

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

// Ragged vertical "torn paper" edge where the cream copy tears down into
// the cake image on the right column.
const TORN_VERTICAL =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 600' preserveAspectRatio='none'><path fill='white' d='M0,0 L47,0 L33,24 L53,48 L36,72 L50,96 L32,120 L55,144 L38,168 L48,192 L34,216 L54,240 L37,264 L51,288 L33,312 L53,336 L36,360 L50,384 L32,408 L55,432 L38,456 L48,480 L34,504 L54,528 L37,552 L51,576 L44,600 L0,600 Z'/></svg>",
  );
const tornVerticalStyle: React.CSSProperties = {
  WebkitMaskImage: `url("${TORN_VERTICAL}")`,
  maskImage: `url("${TORN_VERTICAL}")`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  filter: "drop-shadow(3px 0 7px rgba(29,26,24,0.10))",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid w-full max-w-[90rem] items-stretch lg:grid-cols-2">
        {/* LEFT — copy */}
        <div className="flex flex-col justify-center px-5 py-10 sm:px-8 lg:py-16 lg:pl-8 lg:pr-14 xl:pl-10">
          <div className="max-w-[520px]">
            <Reveal variant="blur">
              <p className="font-hand text-2xl text-[color:var(--color-berry)]">
                {business.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.06} variant="blur">
              <h1 className="mt-2 pb-3 text-[2.9rem] font-medium leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.5rem]">
                Nybakat på riktigt,{" "}
                <span className="relative inline-block whitespace-nowrap">
                  mitt i Edsberg.
                  <DrawStroke
                    viewBox="0 0 300 20"
                    d="M4 11 C 70 4, 150 4, 210 9 S 285 15, 296 8"
                    strokeWidth={5}
                    delay={0.55}
                    className="pointer-events-none absolute inset-x-0 -bottom-[0.24em] h-[0.3em] w-full text-[color:var(--color-raspberry)]"
                  />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-[color:var(--color-ink-soft)]">
                Bröd, bakverk, tårtor och lunch – gjort på plats för
                vardagsfikan, morgonen på språng och livets stora firanden.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
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
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
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
        </div>

        {/* RIGHT — one dominant cake image, full-bleed */}
        <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[560px]">
          <BakeryImage
            src="/images/hero-cake.svg"
            alt="Raspberrytårta från Lindas & Elinas."
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholderLabel="Festtårta"
            className="absolute inset-0 h-full w-full"
          />

          {/* Torn-paper edge: the cream side tears down into the image */}
          <div
            aria-hidden="true"
            style={tornVerticalStyle}
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-16 -translate-x-px bg-cream lg:block xl:w-20"
          />

          {/* Gold Sedan 2018 seal — upper-left of the cake */}
          <div className="absolute left-5 top-5 z-10 flex aspect-square w-20 -rotate-6 flex-col items-center justify-center rounded-full bg-[color:var(--color-gold)] text-cream shadow-lift ring-4 ring-cream/70 [animation:float-soft_6s_ease-in-out_infinite] sm:w-24">
            <span className="font-serif text-base italic leading-none">Sedan</span>
            <span className="font-serif text-2xl font-semibold leading-none">
              2018
            </span>
          </div>

          {/* Torn-paper polaroid of buns — lower-left edge */}
          <div className="absolute -left-4 bottom-6 z-10 w-32 -rotate-6 [animation:float-soft_5.5s_ease-in-out_infinite] sm:w-40 lg:w-44">
            <div style={{ filter: "drop-shadow(0 16px 26px rgba(29,26,24,0.32))" }}>
              <div className="bg-white p-1.5 pb-2.5" style={tornStyle}>
                <BakeryImage
                  src="/images/logo.jpg"
                  alt="Lindas & Elinas logotyp."
                  sizes="200px"
                  fit="contain"
                  placeholderLabel="Lindas & Elinas"
                  className="aspect-[5/4] w-full bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
