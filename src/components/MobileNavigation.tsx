"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, X } from "lucide-react";
import { nav, business } from "@/content/site";
import { telHref } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Accessible slide-in menu drawer. Traps focus while open, restores focus to
 * the trigger on close, closes on Escape, and locks body scroll.
 */
export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
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
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Meny">
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-cream shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Wordmark compact />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-charcoal"
            aria-label="Stäng meny"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Huvudmeny">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-3 font-serif text-2xl text-charcoal transition-colors hover:bg-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-line px-5 py-5">
          <Link href="/bestall" onClick={onClose} className="btn btn-primary w-full">
            Beställ tårta
          </Link>
          <a href={telHref()} className="btn btn-ghost w-full">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Ring {business.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}
