/**
 * =========================================================================
 * CENTRAL SITE CONTENT — the single source of truth for the whole website.
 * =========================================================================
 *
 * The bakery owner can keep the site current by editing THIS FILE only.
 * Telephone numbers, address, opening hours, campaigns, reviews, navigation
 * and SEO defaults all live here. See CONTENT_GUIDE.md for a friendly guide.
 *
 * Nothing in here should be invented (prices, allergens, availability etc.).
 * Where a fact is unknown, prefer a carefully worded, editable string.
 */

export type WeekdayKey =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export interface OpeningInterval {
  /** 24h "HH:MM" in Europe/Stockholm local time. */
  open: string;
  close: string;
}

export interface SpecialHours {
  /** ISO date "YYYY-MM-DD" (Europe/Stockholm). */
  date: string;
  label: string;
  /** Empty array = closed all day. */
  intervals: OpeningInterval[];
}

export interface NavItem {
  href: string;
  label: string;
}

export interface ProductCategory {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Optional editorial size hint used by the homepage preview grid. */
  feature?: boolean;
}

export interface SeasonalCampaign {
  enabled: boolean;
  eyebrow: string;
  title: string;
  description: string;
  /** Human-readable date range, e.g. "Januari–mars". */
  dateRange: string;
  badge?: string;
  image: string;
  imageAlt: string;
  cta: { label: string; href: string };
}

export interface Review {
  quote: string;
  author: string;
  /** Only include when explicitly provided/verified. */
  source?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/* ---------------------------------------------------------------------- */
/* Business core                                                          */
/* ---------------------------------------------------------------------- */

export const business = {
  name: "Lindas & Elinas Bageri och Konditori",
  shortName: "Lindas & Elinas",
  legalName: "Lindas & Elinas Bageri och Konditori",
  established: 2018,
  tagline: "Bageri & konditori på Edsbergs torg",
  positioning:
    "Ett lokalt bageri och konditori på Edsbergs torg i Sollentuna. Vi bakar på plats med ett brett sortiment för vardagsfika, frukost, lunch och livets stora firanden.",
  address: {
    street: "Edsbergs torg 14",
    postalCode: "192 52",
    city: "Sollentuna",
    country: "Sverige",
    countryCode: "SE",
  },
  /** Approximate coordinates for Edsbergs torg, Sollentuna (map centring). */
  geo: {
    latitude: 59.4497,
    longitude: 17.9536,
  },
  phone: {
    /** Display format used in copy. */
    display: "08-35 20 13",
    /** E.164 format used for tel: links. */
    e164: "+46835 2013".replace(/\s/g, ""),
  },
  email: "lindas.elinas@hotmail.com",
} as const;

/* ---------------------------------------------------------------------- */
/* Opening hours                                                          */
/* ---------------------------------------------------------------------- */

/**
 * Regular weekly opening hours in Europe/Stockholm local time.
 * An empty interval array means closed that day.
 */
export const openingHours: Record<WeekdayKey, OpeningInterval[]> = {
  mon: [{ open: "06:00", close: "18:00" }],
  tue: [{ open: "06:00", close: "18:00" }],
  wed: [{ open: "06:00", close: "18:00" }],
  thu: [{ open: "06:00", close: "18:00" }],
  fri: [{ open: "06:00", close: "18:00" }],
  sat: [{ open: "08:00", close: "16:00" }],
  sun: [{ open: "08:00", close: "16:00" }],
};

/** Human labels for weekdays (Swedish). */
export const weekdayLabels: Record<WeekdayKey, string> = {
  mon: "Måndag",
  tue: "Tisdag",
  wed: "Onsdag",
  thu: "Torsdag",
  fri: "Fredag",
  sat: "Lördag",
  sun: "Söndag",
};

/** Grouped display rows for compact hours tables. */
export const openingHoursSummary: { label: string; value: string }[] = [
  { label: "Måndag–Fredag", value: "06:00–18:00" },
  { label: "Lördag", value: "08:00–16:00" },
  { label: "Söndag", value: "08:00–16:00" },
];

/**
 * Holiday / special-date exceptions. Add entries here to override the
 * regular hours for a specific date. Old dates can be safely removed.
 * Example (closed):      { date: "2026-12-25", label: "Juldagen", intervals: [] }
 * Example (short day):   { date: "2026-12-24", label: "Julafton", intervals: [{ open: "08:00", close: "13:00" }] }
 */
export const specialHours: SpecialHours[] = [];

export const holidayNote =
  "Öppettiderna kan variera vid helgdagar och storhelger. Kontakta oss gärna om du är osäker.";

/* ---------------------------------------------------------------------- */
/* Announcement bar                                                        */
/* ---------------------------------------------------------------------- */

export const announcement = {
  enabled: true,
  /** Keep it short. Examples of good copy are listed in CONTENT_GUIDE.md. */
  message: "Nybakat från kl. 06 på vardagar – välkommen in på Edsbergs torg.",
  /** Optional link; leave href empty to render plain text. */
  link: { label: "", href: "" },
} as const;

/* ---------------------------------------------------------------------- */
/* Navigation & social                                                     */
/* ---------------------------------------------------------------------- */

export const nav: NavItem[] = [
  { href: "/sortiment", label: "Sortiment" },
  { href: "/bestall", label: "Beställ tårta" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];

export const social = {
  facebook: "https://www.facebook.com/LindasochElinas",
  instagram: "https://www.instagram.com/lindaselinas",
  instagramHandle: "@lindaselinas",
} as const;

/* ---------------------------------------------------------------------- */
/* External links (editable)                                               */
/* ---------------------------------------------------------------------- */

export const externalLinks = {
  /** Google Maps directions to the exact address. */
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Edsbergs torg 14, 192 52 Sollentuna"),
  /** Google Business listing / reviews. Update with the real place URL. */
  googleReviews:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Lindas & Elinas Bageri och Konditori Sollentuna"),
  /** Tripadvisor listing. Update with the real listing URL when available. */
  tripadvisor:
    "https://www.tripadvisor.com/Search?q=" +
    encodeURIComponent("Lindas & Elinas Bageri Sollentuna"),
  /** Too Good To Go — link to the store in the app/web when available. */
  tooGoodToGo: "https://www.toogoodtogo.com/sv-se",
} as const;

/* ---------------------------------------------------------------------- */
/* Product categories                                                      */
/* ---------------------------------------------------------------------- */

export const categories: ProductCategory[] = [
  {
    slug: "tartor",
    title: "Tårtor",
    short: "Tårtor för livets firanden",
    description:
      "Från klassiska gräddtårtor till festtårtor för födelsedag, student, dop och jubileum. Berätta vad du firar så hjälper vi dig att hitta rätt.",
    image: "/images/cake-detail.webp",
    imageAlt: "Närbild på en dekorerad tårta från Lindas & Elinas.",
    feature: true,
  },
  {
    slug: "bakverk-kaffebrod",
    title: "Bakverk & kaffebröd",
    short: "Till kaffet och fikat",
    description:
      "Nygräddade bakverk, bullar och kaffebröd i montern varje dag – med säsongens godaste när det är dags.",
    image: "/images/pastries.webp",
    imageAlt: "Ett urval av bakverk och kaffebröd i bageriets monter.",
  },
  {
    slug: "matbrod",
    title: "Matbröd",
    short: "Nygräddat varje dag",
    description:
      "Bröd bakat på plats för frukostbordet, mackan och middagen. Utbudet varierar med dagen och säsongen.",
    image: "/images/bread.webp",
    imageAlt: "Nybakat matbröd på ett bageribord.",
  },
  {
    slug: "smorgastartor",
    title: "Smörgåstårtor",
    short: "För sällskap som samlas",
    description:
      "Matiga smörgåstårtor till kalaset, jobbet och familjefirandet. Beställ i god tid så gör vi i ordning.",
    image: "/images/sandwich-cake.webp",
    imageAlt: "En dekorerad smörgåstårta.",
  },
  {
    slug: "frukost-lunch",
    title: "Frukost & lunch",
    short: "Morgon, macka och dagens",
    description:
      "Frukost på språng, smörgåsar och lunch mitt på Edsbergs torg. Aktuellt utbud kan variera – kom in eller hör av dig.",
    image: "/images/breakfast-lunch.webp",
    imageAlt: "Frukost och lunch serverat i bageriet.",
  },
];

/** Reusable disclaimer used across the assortment page. */
export const assortmentDisclaimer =
  "Utbudet kan variera med dag och säsong. Kontakta oss gärna om du söker något särskilt eller vill fråga om innehåll och allergener.";

export const allergyNotice =
  "Har du frågor om innehåll eller allergener? Fråga oss gärna i butiken eller när du gör en beställning så berättar vi mer.";

/* ---------------------------------------------------------------------- */
/* Seasonal campaign                                                       */
/* ---------------------------------------------------------------------- */

/**
 * The seasonal feature. Set `enabled: false` to fall back to the evergreen
 * custom-cake panel. Swap the fields to feature semlor, studenttårtor,
 * nationaldagsbakelser, mors dag, alla hjärtans dag or julbak.
 */
export const seasonalCampaign: SeasonalCampaign = {
  enabled: false,
  eyebrow: "Just nu i bageriet",
  title: "Säsongens allra godaste",
  description:
    "Vi följer årstiderna i bageriet. Just nu bakar vi det som är som allra godast för stunden – kom in och se dagens monter.",
  dateRange: "",
  badge: "Säsong",
  image: "/images/pastries.webp",
  imageAlt: "Säsongens bakverk i bageriets monter.",
  cta: { label: "Se vårt utbud", href: "/sortiment" },
};

/* ---------------------------------------------------------------------- */
/* Reviews / social proof                                                  */
/* ---------------------------------------------------------------------- */

/**
 * Only add entries here that are REAL and verified. If this array is empty,
 * the site shows a tasteful social-proof summary without fabricated quotes.
 */
export const reviews: Review[] = [];

/** Editable, because these change over time. Update from your listings. */
export const socialProof = {
  /** Set to null while unverified to hide numeric claims. */
  ratingText: null as string | null, // e.g. "4,5 av 5"
  reviewCountText: null as string | null, // e.g. "Över 200 omdömen"
  /** Recurring themes customers mention — safe, non-fabricated highlights. */
  themes: [
    "Stort utbud",
    "Trevligt bemötande",
    "Prisvärd fika",
    "Nybakat bröd",
    "Frukost och lunch",
  ],
};

/* ---------------------------------------------------------------------- */
/* FAQ                                                                     */
/* ---------------------------------------------------------------------- */

export const faq: FaqItem[] = [
  {
    question: "Hur beställer jag en tårta eller smörgåstårta?",
    answer:
      "Skicka en tårtförfrågan via formuläret på sidan Beställ, eller ring oss på 08-35 20 13. Berätta gärna tillfälle, önskat datum och antal personer så återkommer vi och bekräftar.",
  },
  {
    question: "Är beställningen bekräftad direkt?",
    answer:
      "Nej. En förfrågan är inte en bekräftad beställning. Vi hör av oss och bekräftar detaljer, och först då är din beställning klar.",
  },
  {
    question: "Vad kostar tårtorna?",
    answer:
      "Pris beror på storlek, typ och önskemål. Kontakta oss för aktuellt utbud och pris.",
  },
  {
    question: "Kan ni ta hänsyn till allergier?",
    answer:
      "Berätta om allergier och önskemål när du gör din förfrågan så gör vi vad vi kan. Fråga oss gärna om innehåll och allergener.",
  },
  {
    question: "Hur lång tid i förväg behöver jag beställa?",
    answer:
      "Det varierar med säsong och tillfälle. Hör av dig så tidigt du kan, särskilt inför helger och högtider, så hittar vi en lösning tillsammans.",
  },
];

/* ---------------------------------------------------------------------- */
/* Order form options                                                      */
/* ---------------------------------------------------------------------- */

export const orderFormOptions = {
  orderTypes: [
    { value: "tarta", label: "Tårta" },
    { value: "smorgastarta", label: "Smörgåstårta" },
    { value: "annat", label: "Annat" },
  ],
  occasions: [
    "Födelsedag",
    "Student",
    "Dop",
    "Bröllop",
    "Jubileum",
    "Kalas",
    "Fika på jobbet",
    "Annat",
  ],
} as const;

export const orderLeadTimeNote =
  "Tips: hör av dig i god tid, särskilt inför helger och högtider.";

/* ---------------------------------------------------------------------- */
/* SEO defaults                                                            */
/* ---------------------------------------------------------------------- */

export const seo = {
  siteName: "Lindas & Elinas Bageri och Konditori",
  defaultTitle:
    "Lindas & Elinas Bageri och Konditori – Bageri i Edsberg, Sollentuna",
  titleTemplate: "%s | Lindas & Elinas Bageri och Konditori",
  defaultDescription:
    "Lokalt bageri och konditori på Edsbergs torg i Sollentuna sedan 2018. Nybakat matbröd, bakverk, tårtor, smörgåstårtor, frukost och lunch – gjort på plats.",
  locale: "sv_SE",
  /** Social sharing image (placeholder path — replace with a real 1200×630). */
  ogImage: "/images/og-image.webp",
} as const;

/** Resolve the canonical base URL from env, with a safe fallback. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv.replace(/\/$/, "");
  }
  return "https://lindaselinas.se";
}
