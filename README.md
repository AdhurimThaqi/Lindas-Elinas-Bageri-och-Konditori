# Lindas & Elinas Bageri och Konditori

Production website for **Lindas & Elinas Bageri och Konditori** — a local bakery
and pastry shop on Edsbergs torg in Sollentuna, Sweden.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion ·
Lucide · Zod**. Warm, editorial, conversion-focused and accessible (WCAG 2.2 AA
target), with all business content driven from a single configuration file.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the local dev server                    |
| `npm run build`     | Production build                              |
| `npm run start`     | Serve the production build                     |
| `npm run lint`      | Run ESLint                                     |
| `npm run typecheck` | TypeScript type-check (no emit)               |

---

## Deployment

The site is a standard Next.js app and deploys cleanly to **Vercel** (recommended),
Netlify, or any Node host.

1. Push the repository to your Git provider.
2. Import the project in Vercel.
3. Set the environment variables you need (see below). At minimum set
   `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy. The build command is `npm run build`.

Everything works with **zero configuration** — the order form falls back to a
prefilled email, analytics stays off, and images show elegant placeholders until
you add the real photos.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in only what you need. All values
are optional.

| Variable                          | Purpose                                                                 |
| --------------------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Canonical production URL (metadata, sitemap, JSON-LD).                   |
| `ORDER_INBOX_EMAIL`               | Where server-side order enquiries are delivered.                        |
| `RESEND_API_KEY` + `ORDER_FROM_EMAIL` | Deliver enquiries by email via [Resend](https://resend.com).        |
| `ORDER_WEBHOOK_URL`               | Alternatively POST enquiries to a webhook (Zapier, Make, Formspree…).   |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`    | Enable privacy-friendly analytics (off when empty).                     |

Secrets (`RESEND_API_KEY`, `ORDER_WEBHOOK_URL`) are read **only on the server**
and never exposed to the browser.

---

## Editing the site content

**Almost everything is edited in one file:** [`src/content/site.ts`](src/content/site.ts).
See [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md) for a friendly, non-technical guide.
Quick pointers:

### Opening hours

Edit the `openingHours` object (and the `openingHoursSummary` display rows) in
`src/content/site.ts`. Times are in 24-hour `HH:MM` in Swedish (Europe/Stockholm)
time. An empty array for a day means closed.

### Holiday exceptions

Add entries to the `specialHours` array, e.g.

```ts
export const specialHours = [
  { date: "2026-12-24", label: "Julafton", intervals: [{ open: "08:00", close: "13:00" }] },
  { date: "2026-12-25", label: "Juldagen", intervals: [] }, // closed
];
```

The "Open now" status and the hours tables update automatically. Old dates can be
removed at any time.

### Seasonal campaign

Edit the `seasonalCampaign` object. Set `enabled: true` and fill in the title,
description, date range, badge and image to feature semlor, studenttårtor, jul,
mors dag, alla hjärtans dag, etc. Set `enabled: false` to show the evergreen
custom-cake panel instead.

### Announcement bar

Edit the `announcement` object (`enabled`, `message`, optional `link`).

### Reviews

Add **only real, verified** reviews to the `reviews` array. When it's empty the
site shows a tasteful social-proof summary with links to Google and Tripadvisor
instead of fabricated quotes. Ratings/counts live in `socialProof` and can be
left `null` until verified.

### Images

Drop real photos into `public/images/` using the exact filenames in
[`ASSET_CHECKLIST.md`](ASSET_CHECKLIST.md). No code changes are needed — until a
file exists, an on-brand placeholder keeps the layout intact.

### Form delivery

By default the order form opens a prefilled email (no setup). To receive
submissions server-side, set `ORDER_INBOX_EMAIL` plus **either** Resend
(`RESEND_API_KEY` + `ORDER_FROM_EMAIL`) **or** a webhook (`ORDER_WEBHOOK_URL`).

### Analytics

Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to enable cookieless analytics. When unset,
no analytics script loads and no cookie banner is needed.

### Production domain

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://lindaselinas.se`). This drives
canonical URLs, Open Graph, the sitemap and structured data.

---

## Project structure

```
src/
  app/                 # Routes (App Router), sitemap, robots, API route
  components/          # Reusable UI components
  content/
    site.ts            # ← single source of truth for business content
    gallery.ts         # gallery image list
  lib/
    hours.ts           # Europe/Stockholm open-status logic
    utils.ts           # tel/mail/maps helpers, cn()
    order-schema.ts    # shared Zod schema for the enquiry form
public/images/         # photos (see ASSET_CHECKLIST.md)
```

## Routes

`/` · `/sortiment` · `/bestall` · `/om-oss` · `/kontakt` · `/integritet`
· custom `not-found` · `sitemap.xml` · `robots.txt`
