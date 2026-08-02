import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/content/site";

// Required for `output: export` (static hosting such as GitHub Pages).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
