import {
  business,
  openingHours,
  getSiteUrl,
  social,
  seo,
  faq,
  type WeekdayKey,
} from "@/content/site";

const DAY_SCHEMA: Record<WeekdayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, generated from typed config — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Bakery / LocalBusiness structured data. Deliberately omits aggregateRating
 * (no verified, actively-maintained rating available).
 */
export function LocalBusinessJsonLd() {
  const url = getSiteUrl();

  const openingHoursSpecification = (
    Object.keys(openingHours) as WeekdayKey[]
  )
    .filter((day) => openingHours[day].length > 0)
    .flatMap((day) =>
      openingHours[day].map((iv) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_SCHEMA[day],
        opens: iv.open,
        closes: iv.close,
      })),
    );

  const data = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${url}/#bakery`,
    name: business.name,
    description: business.positioning,
    url,
    telephone: business.phone.e164,
    email: business.email,
    image: `${url}${seo.ogImage}`,
    priceRange: "$$",
    foundingDate: String(business.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: business.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Sollentuna",
    },
    openingHoursSpecification,
    sameAs: [social.facebook, social.instagram],
    servesCuisine: ["Bakery", "Pastry", "Breakfast", "Lunch"],
  };

  return <JsonLdScript data={data} />;
}

/** FAQ structured data built from the central faq config. */
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <JsonLdScript data={data} />;
}

export interface Crumb {
  name: string;
  href: string;
}

/** Breadcrumb structured data for internal pages. */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${url}${item.href}`,
    })),
  };
  return <JsonLdScript data={data} />;
}
