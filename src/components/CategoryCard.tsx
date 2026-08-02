import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductCategory } from "@/content/site";
import { cn } from "@/lib/utils";
import { BakeryImage } from "./BakeryImage";

interface CategoryCardProps {
  category: ProductCategory;
  /** Aspect ratio class for the image area (varies the layout rhythm). */
  aspect?: string;
  /** Grid placement / span classes supplied by the parent. */
  className?: string;
  /** Curved top mask for the occasional editorial accent. */
  arch?: boolean;
  priority?: boolean;
  sizes?: string;
}

/**
 * Editorial category card: photo + title + short line + link. Deliberately not
 * an e-commerce product tile — no prices, varied aspect ratios via props.
 */
export function CategoryCard({
  category,
  aspect = "aspect-[4/3]",
  className,
  arch = false,
  priority = false,
  sizes = "(min-width: 1024px) 30vw, 90vw",
}: CategoryCardProps) {
  return (
    <Link
      href={`/sortiment#${category.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift",
        className,
      )}
    >
      <div className={cn("relative w-full overflow-hidden", aspect)}>
        <BakeryImage
          src={category.image}
          alt={category.imageAlt}
          sizes={sizes}
          priority={priority}
          placeholderLabel={category.title}
          className={cn(
            "h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
            arch && "mask-arch",
          )}
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-[color:var(--color-berry)] backdrop-blur-sm">
          {category.short}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-center justify-between gap-2 font-serif text-2xl text-charcoal">
          {category.title}
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-[color:var(--color-berry)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
          {category.description}
        </p>
        <span className="mt-4 text-sm font-semibold text-charcoal link-underline self-start">
          Se sortiment
        </span>
      </div>
    </Link>
  );
}
