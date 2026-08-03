import { categories } from "@/content/site";
import { CategoryCard } from "./CategoryCard";
import { RevealGroup, Reveal } from "./Reveal";
import { DecorField } from "./BakeryDecor";

/**
 * Homepage assortment preview — a handwritten heading and five compact
 * category cards in a row, matching the reference design.
 */
export function AssortmentPreview() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <DecorField
        sprites={[
          { icon: "croissant", className: "left-[4%] top-8 h-14 w-14", rotate: -12, float: 7 },
          { icon: "flower", className: "right-[5%] top-14 h-16 w-16", rotate: 8, float: 8, floatDelay: 0.6 },
          { icon: "whisk", className: "bottom-10 left-[8%] hidden h-12 w-12 md:block", rotate: 14, float: 6.5, floatDelay: 0.3 },
        ]}
      />
      <div className="container-page relative py-12 md:py-16">
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
