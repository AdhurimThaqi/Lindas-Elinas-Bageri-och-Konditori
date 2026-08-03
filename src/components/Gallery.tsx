"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/content/gallery";
import { BakeryImage } from "./BakeryImage";
import { Tilt } from "./motion";

/**
 * Responsive uniform-grid gallery with an accessible lightbox: keyboard
 * navigation (arrows + Escape), focus trapping, swipe support on mobile and
 * descriptive alt text. No autoplay carousel.
 */
export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length,
      ),
    [],
  );
  const showNext = useCallback(
    () =>
      setOpenIndex((i) => (i === null ? i : (i + 1) % galleryImages.length)),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "Tab") {
        // Only interactive elements live inside; keep focus within the dialog.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button",
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [openIndex, close, showPrev, showNext]);

  const active = openIndex === null ? null : galleryImages[openIndex]!;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {galleryImages.map((img, i) => (
          <li key={img.src} className="aspect-square">
            <Tilt className="group h-full" glare max={8}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative block h-full w-full overflow-hidden rounded-lg border border-line bg-white text-left shadow-soft transition-shadow group-hover:shadow-lift"
              aria-label={`Öppna bild: ${img.alt}`}
            >
              <BakeryImage
                src={img.src}
                alt={img.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                placeholderLabel={img.category}
                className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-3 text-xs font-semibold text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {img.category}
              </span>
            </button>
            </Tilt>
          </li>
        ))}
      </ul>

      {active && openIndex !== null ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Bild ${openIndex + 1} av ${galleryImages.length}: ${active.alt}`}
          ref={dialogRef}
          tabIndex={-1}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            if (dx > 50) showPrev();
            else if (dx < -50) showNext();
            touchStartX.current = null;
          }}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/30 transition-colors hover:bg-cream/20"
            aria-label="Stäng"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={showPrev}
            className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/30 transition-colors hover:bg-cream/20 sm:left-6"
            aria-label="Föregående bild"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          <figure className="max-h-[85vh] w-full max-w-3xl">
            <BakeryImage
              src={active.src}
              alt={active.alt}
              sizes="(min-width: 768px) 768px, 100vw"
              quality={90}
              placeholderLabel={active.category}
              className="mx-auto aspect-[4/3] w-full rounded-lg"
            />
            <figcaption className="mt-3 text-center text-sm text-cream/80">
              <span className="font-semibold text-cream">{active.category}</span>
              {" · "}
              {active.alt}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/30 transition-colors hover:bg-cream/20 sm:right-6"
            aria-label="Nästa bild"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
