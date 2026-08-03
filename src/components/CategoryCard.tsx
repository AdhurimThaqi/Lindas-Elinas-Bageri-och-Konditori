import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductCategory } from "@/content/site";
import { cn } from "@/lib/utils";
import { BakeryImage } from "./BakeryImage";
import { Tilt } from "./motion";

interface CategoryCardProps {
  category: ProductCategory;
  /** Aspect ratio class for the image area. */
  aspect?: string;
  /** Grid placement / span classes supplied by the parent. */
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Editorial category card: photo + title + short line + a pink circular
 * action button — matching the reference design. No prices.
 */
export function CategoryCard({
  category,
  aspect = "aspect-[4/3]",
  className,
  priority = false,
  sizes = "(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw",
}: CategoryCardProps) {
  return (
    <Tilt className={cn("group", className)} glare max={6}>
      <Link
        href={`/sortiment#${category.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-shadow duration-300 group-hover:shadow-lift"
      >
        <div className={cn("relative w-full overflow-hidden", aspect)}>
          <BakeryImage
            src={category.image}
            alt={category.imageAlt}
            sizes={sizes}
            priority={priority}
            placeholderLabel={category.title}
            className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-xl text-charcoal sm:text-2xl">
            {category.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            {category.short}
          </p>
          <span className="mt-4 flex justify-end">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-raspberry)] text-white shadow-[0_8px_18px_-10px_rgba(216,90,120,0.9)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </span>
        </div>
      </Link>
    </Tilt>
  );
}
