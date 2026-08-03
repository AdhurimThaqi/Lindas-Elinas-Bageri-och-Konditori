import { categories } from "@/content/site";
import { CategoryCard } from "./CategoryCard";
import { RevealGroup, Reveal } from "./Reveal";

/**
 * Homepage assortment preview — a handwritten heading and five compact
 * category cards in a row, matching the reference design.
 */
export function AssortmentPreview() {
  return (
    <section className="bg-cream">
      <div className="container-page py-12 md:py-16">
        <Reveal>
          <h2 className="font-hand text-center text-4xl text-charcoal sm:text-5xl">
            Något gott för varje stund
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-[color:var(--color-ink-soft)]">
            Från nygräddat matbröd till festtårtor och mättande lunch – vårt
            utbud formas av hantverk, säsong och det som är som allra godast just
            nu.
          </p>
        </Reveal>

        <RevealGroup className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:max-w-none lg:grid-cols-5">
          {categories.map((cat, i) => (
            <Reveal as="div" key={cat.slug}>
              <CategoryCard category={cat} className="h-full" priority={i === 0} />
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
