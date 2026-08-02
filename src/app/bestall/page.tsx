import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { OrderForm } from "@/components/OrderForm";
import { OrderSteps } from "@/components/OrderSteps";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { OpeningHours } from "@/components/OpeningHours";
import { Reveal } from "@/components/Reveal";
import { faq, business } from "@/content/site";
import { telHref } from "@/lib/utils";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Beställ tårta & smörgåstårta",
  description:
    "Skicka en förfrågan om tårta eller smörgåstårta till födelsedag, student, dop, jubileum eller kalas. Vi återkommer och bekräftar. Bageri i Edsberg, Sollentuna.",
  alternates: { canonical: "/bestall" },
};

export default function BestallPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hem", href: "/" },
          { name: "Beställ tårta", href: "/bestall" },
        ]}
      />
      <PageHero
        eyebrow="Beställ tårta"
        title="Vad ska vi fira?"
        intro="Berätta om ditt tillfälle så hjälper vi dig att hitta rätt tårta eller smörgåstårta. Fyll i formuläret eller ring oss direkt."
        crumbs={[
          { name: "Hem", href: "/" },
          { name: "Beställ tårta", href: "/bestall" },
        ]}
      />

      <div className="container-page py-16 md:py-20">
        <div className="mb-14">
          <OrderSteps />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <OrderForm />
          </div>

          <aside className="space-y-6 lg:pt-2">
            <Reveal>
              <div className="surface-card p-6">
                <h2 className="font-serif text-xl text-charcoal">
                  Hellre prata direkt?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                  Ring oss så hjälper vi dig med din beställning och svarar på
                  frågor om innehåll, storlek och tillfälle.
                </p>
                <a href={telHref()} className="btn btn-primary mt-4 w-full">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Ring {business.phone.display}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="surface-card p-6">
                <h2 className="font-serif text-xl text-charcoal">Öppettider</h2>
                <OpeningHours className="mt-3" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="surface-card p-6">
                <h2 className="font-serif text-xl text-charcoal">Vanliga frågor</h2>
                <dl className="mt-3 space-y-4">
                  {faq.slice(0, 3).map((item) => (
                    <div key={item.question}>
                      <dt className="text-sm font-semibold text-charcoal">
                        {item.question}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                        {item.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </>
  );
}
