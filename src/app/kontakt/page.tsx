import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Navigation, Cake } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { LocationPanel } from "@/components/LocationPanel";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { business, externalLinks, holidayNote, faq } from "@/content/site";
import { telHref, mailtoHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kontakt, öppettider & hitta hit",
  description:
    "Kontakta Lindas & Elinas Bageri och Konditori på Edsbergs torg 14, Sollentuna. Telefon 08-35 20 13, öppettider, vägbeskrivning och karta.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hem", href: "/" },
          { name: "Kontakt", href: "/kontakt" },
        ]}
      />
      <FaqJsonLd />
      <PageHero
        eyebrow="Kontakt"
        title="Hitta hit & hör av dig"
        intro="Kom förbi på Edsbergs torg, ring oss eller skicka ett mejl. Vi hjälper dig gärna."
        crumbs={[
          { name: "Hem", href: "/" },
          { name: "Kontakt", href: "/kontakt" },
        ]}
      />

      {/* Quick actions — extra easy on mobile */}
      <div className="container-page pt-10">
        <div className="grid gap-3 sm:grid-cols-3">
          <a href={telHref()} className="btn btn-primary w-full">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Ring {business.phone.display}
          </a>
          <a
            href={externalLinks.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Vägbeskrivning
          </a>
          <Link href="/bestall" className="btn btn-ghost w-full">
            <Cake className="h-4 w-4" aria-hidden="true" />
            Beställ tårta
          </Link>
        </div>
      </div>

      <section className="container-page py-14 md:py-16">
        <LocationPanel />
      </section>

      <section className="bg-paper">
        <div className="container-page grid gap-10 py-16 md:py-20 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-3xl sm:text-4xl">Kontaktuppgifter</h2>
              <p className="mt-4 max-w-md leading-relaxed text-[color:var(--color-ink-soft)]">
                Har du en fråga om sortiment, beställning eller något annat? Hör
                av dig så återkommer vi så snart vi kan.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={telHref()}
                  className="flex items-center gap-3 rounded-lg border border-line bg-white p-4 shadow-soft transition-colors hover:border-charcoal"
                >
                  <Phone className="h-5 w-5 text-[color:var(--color-berry)]" aria-hidden="true" />
                  <span>
                    <span className="block text-sm text-[color:var(--color-ink-muted)]">
                      Telefon
                    </span>
                    <span className="font-semibold text-charcoal">
                      {business.phone.display}
                    </span>
                  </span>
                </a>
                <a
                  href={mailtoHref()}
                  className="flex items-center gap-3 rounded-lg border border-line bg-white p-4 shadow-soft transition-colors hover:border-charcoal"
                >
                  <Mail className="h-5 w-5 text-[color:var(--color-berry)]" aria-hidden="true" />
                  <span>
                    <span className="block text-sm text-[color:var(--color-ink-muted)]">
                      E-post
                    </span>
                    <span className="break-all font-semibold text-charcoal">
                      {business.email}
                    </span>
                  </span>
                </a>
              </div>

              <div className="mt-6 rounded-lg bg-[color:var(--color-sage)]/15 p-4 text-sm text-[color:var(--color-ink-soft)]">
                {holidayNote}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div>
              <h2 className="text-3xl sm:text-4xl">Vanliga frågor</h2>
              <dl className="mt-6 space-y-5">
                {faq.map((item) => (
                  <div key={item.question} className="border-b border-line pb-5">
                    <dt className="font-semibold text-charcoal">
                      {item.question}
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-[color:var(--color-ink-soft)]">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
