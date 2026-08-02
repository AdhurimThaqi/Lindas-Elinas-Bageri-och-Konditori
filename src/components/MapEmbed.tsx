"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { business } from "@/content/site";
import { mapEmbedHref, fullAddress } from "@/lib/utils";

/**
 * Click-to-load Google Map. Nothing is requested from Google until the visitor
 * chooses to load the map, which improves both performance and privacy.
 */
export function MapEmbed({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className}>
      {loaded ? (
        <iframe
          src={mapEmbedHref()}
          title={`Karta till ${business.name}, ${fullAddress()}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="img-placeholder group flex h-full w-full flex-col items-center justify-center gap-3 text-center"
          aria-label="Ladda karta från Google Maps"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[color:var(--color-berry)] shadow-soft transition-transform duration-300 group-hover:scale-105">
            <MapPin className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg text-charcoal">Visa karta</span>
          <span className="max-w-xs px-4 text-sm text-[color:var(--color-ink-muted)]">
            Kartan laddas från Google Maps först när du klickar.
          </span>
        </button>
      )}
    </div>
  );
}
