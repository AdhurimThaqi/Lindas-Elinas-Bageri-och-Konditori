import { categories } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { CategoryCard } from "./CategoryCard";
import { RevealGroup, Reveal } from "./Reveal";

/**
 * Homepage assortment preview — five equal category cards in a row, matching
 * the reference design.
 */
export function AssortmentPreview() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Vårt sortiment"
        title="Något gott för varje stund"
        intro="Från nygräddat matbröd till festtårtor och mättande lunch – vårt utbud formas av hantverk, säsong och det som är som allra godast just nu."
        align="center"
      />

      <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((cat, i) => (
          <Reveal as="div" key={cat.slug}>
            <CategoryCard category={cat} className="h-full" priority={i === 0} />
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
}
