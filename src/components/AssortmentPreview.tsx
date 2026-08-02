import { categories } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { CategoryCard } from "./CategoryCard";
import { RevealGroup, Reveal } from "./Reveal";

/**
 * Homepage assortment preview. Uses an asymmetric editorial grid so the five
 * categories don't read as identical rounded rectangles.
 */
export function AssortmentPreview() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Vårt sortiment"
        title="Något gott för varje stund"
        intro="Från nygräddat matbröd till festtårtor och mättande lunch – vårt utbud formas av hantverk, säsong och det som är som allra godast just nu."
      />

      <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        <Reveal as="div" className="lg:col-span-1 lg:row-span-2">
          <CategoryCard
            category={categories[0]!}
            aspect="aspect-[4/5] lg:aspect-[3/5]"
            arch
            priority
            className="h-full"
            sizes="(min-width: 1024px) 33vw, 90vw"
          />
        </Reveal>
        {categories.slice(1).map((cat) => (
          <Reveal as="div" key={cat.slug}>
            <CategoryCard category={cat} aspect="aspect-[16/10]" className="h-full" />
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
}
