import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { BakeryImage } from "@/components/BakeryImage";
import { Reveal } from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/content/site";
import { WheatMark, BerryMark } from "@/components/decor";

export const metadata: Metadata = {
  title: "Om oss – bageri i Edsberg sedan 2018",
  description:
    "Lindas & Elinas är ett lokalt bageri och konditori på Edsbergs torg i Sollentuna sedan 2018. Vi bakar på plats – bröd, fika, mat och tårtor för firande.",
  alternates: { canonical: "/om-oss" },
};

const values = [
  {
    title: "Bakat på plats",
    text: "Bröd och bakverk gräddas i vårt eget bageri – doften av nybakat hör till vardagen på torget.",
  },
  {
    title: "Nära och lokalt",
    text: "Vi är en del av Edsberg och möter våra gäster varje dag, från tidig morgon till eftermiddagsfika.",
  },
  {
    title: "Plats för firande",
    text: "När något ska firas hjälper vi gärna till med tårtor och smörgåstårtor efter dina önskemål.",
  },
];

export default function OmOssPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hem", href: "/" },
          { name: "Om oss", href: "/om-oss" },
        ]}
      />
      <PageHero
        eyebrow="Om oss"
        title="Ett lokalt bageri med plats för både vardag och fest"
        intro="På Edsbergs torg i Sollentuna bakar vi på plats – för morgonen på språng, dagens lunch, den långa fikan och livets stora firanden."
        crumbs={[
          { name: "Hem", href: "/" },
          { name: "Om oss", href: "/om-oss" },
        ]}
      />

      <section className="container-page grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16">
        <Reveal y={24}>
          <BakeryImage
            src="/images/storefront.jpg"
            alt="Lindas & Elinas bageri på Edsbergs torg."
            sizes="(min-width: 1024px) 46vw, 90vw"
            placeholderLabel="Butiken på torget"
            className="mask-arch aspect-[4/5] w-full shadow-lift"
          />
        </Reveal>
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              Sedan {business.established} har Lindas &amp; Elinas funnits mitt
              på Edsbergs torg. Här möts nybakat bröd, välfyllda montrar och
              människor på väg till jobbet, dagens lunch eller en stunds fika.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              Vi bakar på plats och har ett brett sortiment för både vardag och
              fest – matbröd, kaffebröd, bakverk, tårtor, smörgåstårtor,
              smörgåsar, frukost och lunch. När något ska firas hjälper vi gärna
              till att hitta rätt.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              Framför allt vill vi att du ska känna dig välkommen – med ett
              trevligt bemötande och något gott för stunden.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="Det vi håller kärt"
            title="Nybakat, nära och med hjärta"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="div" key={v.title} delay={i * 0.06}>
                <div className="surface-card h-full p-6">
                  <WheatMark className="h-8 w-8 text-[color:var(--color-gold)]" />
                  <h3 className="mt-4 font-serif text-xl text-charcoal">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading eyebrow="Vår historia" title="En del av Edsberg" />
        <div className="mt-10 max-w-2xl">
          <Reveal>
            <div className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-raspberry)] font-serif text-lg font-semibold text-white">
                  <BerryMark className="h-6 w-6 text-white" />
                </span>
              </div>
              <div className="pb-2">
                <p className="font-serif text-2xl text-charcoal">2018</p>
                <p className="mt-1 leading-relaxed text-[color:var(--color-ink-soft)]">
                  Lindas &amp; Elinas Bageri och Konditori öppnar på Edsbergs
                  torg och blir en del av vardagen i Edsberg.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 flex gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white">
                  <WheatMark className="h-6 w-6 text-[color:var(--color-gold)]" />
                </span>
              </div>
              <div>
                <p className="font-serif text-2xl text-charcoal">Idag</p>
                <p className="mt-1 leading-relaxed text-[color:var(--color-ink-soft)]">
                  Vi bakar på plats varje dag och hjälper gärna till inför
                  firanden både stora och små.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/bestall" className="btn btn-primary">
              Beställ tårta
            </Link>
            <Link href="/kontakt" className="btn btn-secondary">
              Hitta hit &amp; kontakt
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
