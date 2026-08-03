import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { AssortmentPreview } from "@/components/AssortmentPreview";
import { StorySection } from "@/components/StorySection";
import { SeasonalFeature } from "@/components/SeasonalFeature";
import { CakeOrderSection } from "@/components/CakeOrderSection";
import { Gallery } from "@/components/Gallery";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Sustainability } from "@/components/Sustainability";
import { LocationPanel } from "@/components/LocationPanel";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Lokalt bageri och konditori på Edsbergs torg i Sollentuna sedan 2018. Nybakat bröd, bakverk, tårtor, smörgåstårtor, frukost och lunch – gjort på plats. Beställ tårta eller kom förbi.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AssortmentPreview />
      <StorySection />
      <SeasonalFeature />
      <CakeOrderSection />

      <section id="galleri" className="container-page scroll-mt-28 py-20 md:py-28">
        <SectionHeading
          eyebrow="Ur våra montrar"
          title="Lite av det vi bakar"
          intro="Ett smakprov på tårtor, bakverk, bröd och stämningen i butiken på Edsbergs torg."
        />
        <div className="mt-12">
          <Gallery />
        </div>
      </section>

      <ReviewsSection />
      <Sustainability />

      <section className="bg-paper">
        <div className="container-page py-20 md:py-28">
          <SectionHeading
            eyebrow="Hitta hit"
            title="Välkommen till Edsbergs torg"
            intro="Mitt på torget i Edsberg, Sollentuna. Kika in för fika, frukost, lunch eller för att prata tårta – du känner igen oss på skylten vid nummer 14."
          />
          <div className="mt-12">
            <LocationPanel />
          </div>
        </div>
      </section>
    </>
  );
}
