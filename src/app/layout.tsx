import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Analytics } from "@/components/Analytics";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { getSiteUrl, seo } from "@/content/site";
import { withBasePath } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fff8ef",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.defaultDescription,
  applicationName: seo.siteName,
  keywords: [
    "bageri Sollentuna",
    "konditori Sollentuna",
    "bageri Edsberg",
    "tårta Sollentuna",
    "smörgåstårta Sollentuna",
    "fika Edsberg",
    "lunch Edsberg",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seo.locale,
    siteName: seo.siteName,
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    url: getSiteUrl(),
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" className={`${cormorant.variable} ${manrope.variable}`}>
      <body
        className="paper-grain"
        style={{
          cursor: `url(${withBasePath("/images/cursor.svg")}) 16 16, auto`,
        }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-cream"
        >
          Hoppa till innehåll
        </a>
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <MobileActionBar />
        </div>
        <LocalBusinessJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
