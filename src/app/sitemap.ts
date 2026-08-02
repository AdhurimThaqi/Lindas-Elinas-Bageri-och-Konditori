import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/content/site";

// Required for `output: export` (static hosting such as GitHub Pages).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/sortiment", priority: 0.9, changeFrequency: "weekly" },
    { path: "/bestall", priority: 0.9, changeFrequency: "monthly" },
    { path: "/om-oss", priority: 0.7, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.8, changeFrequency: "monthly" },
    { path: "/integritet", priority: 0.3, changeFrequency: "monthly" },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
