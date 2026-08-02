import { Phone, Mail, MapPin, Navigation } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./decor";
import { business, social, externalLinks } from "@/content/site";
import { telHref, mailtoHref, fullAddress } from "@/lib/utils";
import { OpeningHours } from "./OpeningHours";
import { OpeningStatus } from "./OpeningStatus";
import { MapEmbed } from "./MapEmbed";

/**
 * Strong location block: address, live open status, hours, contact, map and
 * directions. Reused on the homepage and contact page.
 */
export function LocationPanel({ withMap = true }: { withMap?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <OpeningStatus className="mb-6" />

        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-[color:var(--color-berry)]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-charcoal">Adress</p>
              <p className="text-[color:var(--color-ink-soft)]">{fullAddress()}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-[color:var(--color-berry)]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-charcoal">Telefon</p>
              <a href={telHref()} className="link-underline text-[color:var(--color-ink-soft)]">
                {business.phone.display}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-[color:var(--color-berry)]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-charcoal">E-post</p>
              <a href={mailtoHref()} className="link-underline break-all text-[color:var(--color-ink-soft)]">
                {business.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-7 rounded-xl border border-line bg-white p-5 shadow-soft">
          <p className="font-serif text-xl text-charcoal">Öppettider</p>
          <OpeningHours className="mt-3" />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={externalLinks.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Hitta hit
          </a>
          <a href={telHref()} className="btn btn-ghost">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Ring oss
          </a>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-charcoal"
            aria-label="Följ oss på Facebook"
          >
            <FacebookIcon className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-charcoal"
            aria-label={`Följ oss på Instagram (${social.instagramHandle})`}
          >
            <InstagramIcon className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {withMap ? (
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-soft">
          <MapEmbed className="aspect-[4/3] w-full lg:h-full lg:aspect-auto lg:min-h-[420px]" />
        </div>
      ) : null}
    </div>
  );
}
