import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { business } from "@/content/site";
import { telHref, mailtoHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description:
    "Så hanterar Lindas & Elinas Bageri och Konditori personuppgifter från kontakt- och beställningsformulär, e-post och externa tjänster.",
  alternates: { canonical: "/integritet" },
  robots: { index: true, follow: true },
};

export default function IntegritetPage() {
  const analyticsEnabled = Boolean(
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hem", href: "/" },
          { name: "Integritetspolicy", href: "/integritet" },
        ]}
      />
      <PageHero
        title="Integritetspolicy"
        intro="Vi värnar om din integritet. Här beskriver vi kortfattat hur vi hanterar uppgifter du delar med oss via webbplatsen."
        crumbs={[
          { name: "Hem", href: "/" },
          { name: "Integritetspolicy", href: "/integritet" },
        ]}
      />

      <div className="container-page py-16 md:py-20">
        <div className="prose-bakery mx-auto max-w-2xl space-y-8 text-[color:var(--color-ink-soft)]">
          <section>
            <h2 className="text-2xl text-charcoal">Beställnings- och kontaktformulär</h2>
            <p className="mt-3 leading-relaxed">
              När du skickar en tårtförfrågan eller kontaktar oss via
              webbplatsen lämnar du uppgifter som namn, telefonnummer och
              eventuellt e-post samt information om din förfrågan. Vi använder
              uppgifterna enbart för att kunna svara dig och hantera din
              förfrågan. Vi säljer aldrig dina uppgifter vidare.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">E-postkommunikation</h2>
            <p className="mt-3 leading-relaxed">
              Om du mejlar oss sparas meddelandet i vår e-post så länge det
              behövs för att hjälpa dig. Kontakta oss om du vill att vi tar bort
              din korrespondens.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">Webbanalys</h2>
            <p className="mt-3 leading-relaxed">
              {analyticsEnabled
                ? "Vi använder en integritetsvänlig webbanalys för att förstå hur webbplatsen används. Statistiken är anonymiserad och används endast för att förbättra sidan."
                : "Den här webbplatsen använder i nuläget ingen spårande webbanalys och sätter inga analyskakor."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">Externa länkar och karta</h2>
            <p className="mt-3 leading-relaxed">
              Webbplatsen länkar till externa tjänster som Google Maps, Facebook,
              Instagram och Too Good To Go. När du väljer att öppna kartan eller
              besöka dessa tjänster gäller respektive tjänsts egna villkor och
              integritetspolicy. Kartan laddas först när du själv klickar för att
              visa den.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-charcoal">Kontakt</h2>
            <p className="mt-3 leading-relaxed">
              Har du frågor om hur vi hanterar dina uppgifter? Kontakta oss på{" "}
              <a href={telHref()} className="link-underline font-semibold text-charcoal">
                {business.phone.display}
              </a>{" "}
              eller{" "}
              <a href={mailtoHref()} className="link-underline font-semibold text-charcoal">
                {business.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
