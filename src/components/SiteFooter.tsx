import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./decor";
import {
  business,
  nav,
  social,
  openingHoursSummary,
} from "@/content/site";
import { telHref, mailtoHref, directionsHref, fullAddress } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-paper">
      {/* Extra bottom padding on mobile so the sticky action bar never covers content. */}
      <div className="container-page grid gap-10 py-14 pb-28 md:grid-cols-2 md:pb-14 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            Lokalt bageri och konditori på Edsbergs torg i Sollentuna sedan{" "}
            {business.established}. Bakat på plats, serverat med hjärta.
          </p>
          <div className="mt-5 flex gap-3">
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

        <nav aria-label="Sidfotsmeny">
          <h2 className="font-serif text-lg">Utforska</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-[color:var(--color-ink-soft)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/integritet"
                className="link-underline text-[color:var(--color-ink-soft)]"
              >
                Integritetspolicy
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-serif text-lg">Kontakt</h2>
          <ul className="mt-4 space-y-3 text-sm text-[color:var(--color-ink-soft)]">
            <li>
              <a href={directionsHref()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-charcoal">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-berry)]" aria-hidden="true" />
                {fullAddress()}
              </a>
            </li>
            <li>
              <a href={telHref()} className="flex items-center gap-2.5 hover:text-charcoal">
                <Phone className="h-4 w-4 shrink-0 text-[color:var(--color-berry)]" aria-hidden="true" />
                {business.phone.display}
              </a>
            </li>
            <li>
              <a href={mailtoHref()} className="flex items-center gap-2.5 break-all hover:text-charcoal">
                <Mail className="h-4 w-4 shrink-0 text-[color:var(--color-berry)]" aria-hidden="true" />
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg">Öppettider</h2>
          <dl className="mt-4 space-y-2 text-sm">
            {openingHoursSummary.map((row) => (
              <div key={row.label} className="flex justify-between gap-3">
                <dt className="text-[color:var(--color-ink-soft)]">{row.label}</dt>
                <dd className="font-medium tabular-nums text-charcoal">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="font-hand mt-4 text-3xl text-[color:var(--color-berry)]">
            Hjärtligt välkommen in!
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-[color:var(--color-ink-muted)] sm:flex-row">
          <p>
            © {year} {business.name}
          </p>
          <p>Edsbergs torg · Sollentuna</p>
        </div>
      </div>
    </footer>
  );
}
