import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Info } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BakeryImage } from "@/components/BakeryImage";
import { Reveal } from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { WheatMark } from "@/components/decor";
import {
  assortmentDisclaimer,
  allergyNotice,
  business,
} from "@/content/site";
import { telHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sortiment – bröd, bakverk, tårtor & lunch",
  description:
    "Utforska vårt sortiment: matbröd, bakverk och kaffebröd, tårtor, smörgåstårtor samt frukost, smörgåsar och lunch. Bakat på plats i Edsberg, Sollentuna.",
  alternates: { canonical: "/sortiment" },
};

interface AssortmentSection {
  slug: string;
  label: string;
  title: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  seasonal?: string;
}

const sections: AssortmentSection[] = [
  {
    slug: "tartor",
    label: "Tårtor",
    title: "Tårtor för livets firanden",
    image: "/images/cake-detail.svg",
    imageAlt: "Dekorerad tårta från Lindas & Elinas.",
    paragraphs: [
      "Ska något firas? Hos oss kan du fråga om tårtor till födelsedagar, studenten, dop, jubileum och andra tillställningar – stora som små.",
      "Berätta vad du planerar, önskat datum och ungefär hur många ni är, så hjälper vi dig att hitta rätt. En förfrågan är inte en bekräftad beställning; vi återkommer och bekräftar detaljerna med dig.",
    ],
    seasonal:
      "Säsongens tårtor, som studenttårtor och mors dag-tårtor, dyker upp när det är dags. Hör av dig i god tid inför högtider.",
  },
  {
    slug: "smorgastartor",
    label: "Smörgåstårtor",
    title: "Smörgåstårtor för sällskap",
    image: "/images/sandwich-cake.svg",
    imageAlt: "Dekorerad smörgåstårta.",
    paragraphs: [
      "Matiga smörgåstårtor passar perfekt till familjefirandet, jobbet, kalaset eller den lite större fikan när många ska samlas.",
      "Kontakta oss för att prata innehåll, storlek och antal personer. Vi gör i ordning efter överenskommelse – beställ gärna i god tid.",
    ],
  },
  {
    slug: "bakverk-kaffebrod",
    label: "Bakverk & kaffebröd",
    title: "Bakverk & kaffebröd",
    image: "/images/pastries.svg",
    imageAlt: "Ett urval bakverk och kaffebröd i montern.",
    paragraphs: [
      "I montern hittar du nygräddade bakverk, bullar och kaffebröd – perfekt till kaffet, fikat eller att ta med hem.",
      "Utbudet varierar över dagen och året, med säsongens godaste när det är dags. Kom in och se vad som frestar just idag.",
    ],
    seasonal:
      "Säsongsfavoriter som semlor och julens bakverk bakar vi under respektive säsong.",
  },
  {
    slug: "matbrod",
    label: "Matbröd",
    title: "Nygräddat matbröd",
    image: "/images/bread.svg",
    imageAlt: "Nybakat matbröd på ett bageribord.",
    paragraphs: [
      "Vi bakar bröd på plats för frukostbordet, mackan och middagen. Färskt bröd hör vardagen till – och gör den lite godare.",
      "Vilket bröd som finns kan variera med dagen och säsongen. Titta in så ser du dagens utbud, eller hör av dig om du undrar över något särskilt.",
    ],
  },
  {
    slug: "frukost-lunch",
    label: "Frukost, smörgåsar & lunch",
    title: "Frukost, smörgåsar & lunch",
    image: "/images/breakfast-lunch.svg",
    imageAlt: "Frukost och lunch serverat i bageriet.",
    paragraphs: [
      "Börja dagen med frukost, ta en smörgås på språng eller stanna till för lunch mitt på Edsbergs torg.",
      "Det aktuella utbudet kan variera. Är du nyfiken på vad vi serverar just nu? Kom förbi eller kontakta oss så berättar vi mer.",
    ],
  },
];

export default function SortimentPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hem", href: "/" },
          { name: "Sortiment", href: "/sortiment" },
        ]}
      />
      <PageHero
        eyebrow="Vårt sortiment"
        title="Bakat på plats – för vardag och fest"
        intro="Ett brett utbud för fika, frukost, lunch och firande. Här är en översikt över vad du kan hitta hos oss."
        crumbs={[
          { name: "Hem", href: "/" },
          { name: "Sortiment", href: "/sortiment" },
        ]}
      />

      {/* Category navigation */}
      <div className="sticky top-16 z-30 border-b border-line bg-cream/90 backdrop-blur-md md:top-20">
        <div className="container-page flex gap-2 overflow-x-auto py-3">
          {sections.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="whitespace-nowrap rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-charcoal"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container-page py-16 md:py-20">
        {/* Disclaimer */}
        <Reveal>
          <div className="mb-14 flex items-start gap-3 rounded-xl border border-line bg-white p-5 shadow-soft">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--color-berry)]" aria-hidden="true" />
            <p className="text-[color:var(--color-ink-soft)]">{assortmentDisclaimer}</p>
          </div>
        </Reveal>

        <div className="space-y-20 md:space-y-28">
          {sections.map((section, i) => (
            <section
              key={section.slug}
              id={section.slug}
              className="scroll-mt-40 grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              aria-labelledby={`${section.slug}-heading`}
            >
              <Reveal
                y={24}
                className={i % 2 === 1 ? "lg:order-2" : undefined}
              >
                <BakeryImage
                  src={section.image}
                  alt={section.imageAlt}
                  sizes="(min-width: 1024px) 46vw, 90vw"
                  placeholderLabel={section.label}
                  className="aspect-[4/3] w-full rounded-lg shadow-lift"
                />
              </Reveal>

              <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
                <Reveal>
                  <span className="eyebrow flex items-center gap-2">
                    <WheatMark className="h-4 w-4 text-[color:var(--color-gold)]" />
                    {section.label}
                  </span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 id={`${section.slug}-heading`} className="mt-3 text-3xl sm:text-4xl">
                    {section.title}
                  </h2>
                </Reveal>
                {section.paragraphs.map((p, idx) => (
                  <Reveal key={idx} delay={0.1 + idx * 0.05}>
                    <p className="mt-4 leading-relaxed text-[color:var(--color-ink-soft)]">
                      {p}
                    </p>
                  </Reveal>
                ))}
                {section.seasonal ? (
                  <Reveal delay={0.2}>
                    <p className="mt-4 rounded-lg bg-paper px-4 py-3 text-sm text-[color:var(--color-berry)]">
                      {section.seasonal}
                    </p>
                  </Reveal>
                ) : null}
                <Reveal delay={0.24}>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/bestall" className="btn btn-primary">
                      Beställ &amp; fråga
                    </Link>
                    <a href={telHref()} className="btn btn-ghost">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {business.phone.display}
                    </a>
                  </div>
                </Reveal>
              </div>
            </section>
          ))}
        </div>

        {/* Allergy notice */}
        <Reveal>
          <div className="mt-20 rounded-xl bg-[color:var(--color-sage)]/15 p-6 text-center">
            <p className="mx-auto max-w-2xl text-[color:var(--color-ink-soft)]">
              {allergyNotice}
            </p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
