import { business } from "@/content/site";

/**
 * Tiny classnames helper — joins truthy class strings.
 * Keeps components readable without pulling in a dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** tel: href built from the business phone number. */
export function telHref(): string {
  return `tel:${business.phone.e164}`;
}

/** mailto: href, optionally with a subject and body. */
export function mailtoHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${business.email}${query ? `?${query}` : ""}`;
}

/** Google Maps directions link to the exact address. */
export function directionsHref(): string {
  const dest = `${business.address.street}, ${business.address.postalCode} ${business.address.city}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
}

/** Google Maps embed URL (no API key required) centred on the address. */
export function mapEmbedHref(): string {
  const q = `${business.name}, ${business.address.street}, ${business.address.postalCode} ${business.address.city}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`;
}

/** Full single-line address string. */
export function fullAddress(): string {
  const a = business.address;
  return `${a.street}, ${a.postalCode} ${a.city}`;
}
