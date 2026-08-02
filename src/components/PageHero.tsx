import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "./JsonLd";
import { Reveal } from "./Reveal";
import { BerryMark } from "./decor";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
}

/** Shared editorial hero for interior pages, with a visible breadcrumb. */
export function PageHero({ eyebrow, title, intro, crumbs }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="container-page py-12 md:py-16">
        <nav aria-label="Brödsmulor" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[color:var(--color-ink-muted)]">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 ? (
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                ) : null}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-charcoal">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-charcoal">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow ? (
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <BerryMark className="h-4 w-4 text-[color:var(--color-raspberry)]" />
              {eyebrow}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={0.05}>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
              {intro}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
