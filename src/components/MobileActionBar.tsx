"use client";

import Link from "next/link";
import { Phone, MapPin, Cake } from "lucide-react";
import { business, externalLinks } from "@/content/site";
import { telHref } from "@/lib/utils";

/**
 * Tasteful sticky action bar for mobile: Ring · Vägbeskrivning · Beställ.
 * Hidden on md+ screens. The footer adds bottom padding so this never covers
 * footer content. Uses safe-area inset for notched devices.
 */
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-3">
        <a
          href={telHref()}
          className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-charcoal"
        >
          <Phone className="h-5 w-5 text-[color:var(--color-berry)]" aria-hidden="true" />
          Ring
          <span className="sr-only">{business.phone.display}</span>
        </a>
        <a
          href={externalLinks.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-x border-line py-2.5 text-xs font-semibold text-charcoal"
        >
          <MapPin className="h-5 w-5 text-[color:var(--color-berry)]" aria-hidden="true" />
          Vägbeskrivning
        </a>
        <Link
          href="/bestall"
          className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-charcoal"
        >
          <Cake className="h-5 w-5 text-[color:var(--color-berry)]" aria-hidden="true" />
          Beställ
        </Link>
      </div>
    </div>
  );
}
