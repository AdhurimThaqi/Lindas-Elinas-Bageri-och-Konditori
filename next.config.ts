import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/base-path";

/**
 * Static export configuration for GitHub Pages.
 *
 * The site is deployed as a static export (`output: "export"`), so it works on
 * any static host. Because there is no Node server, image optimization is
 * disabled and the cake-enquiry form submits via a prefilled email.
 *
 * This config is authoritative — the Pages workflow's `static_site_generator`
 * auto-injection is intentionally disabled so it cannot shadow these settings.
 * BASE_PATH (the /<repo>/ sub-path) is shared with the runtime `withBasePath`
 * helper via src/lib/base-path.ts so asset URLs and config stay in lockstep.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH || undefined,
  images: {
    // Required for static export: no server-side optimization is available.
    unoptimized: true,
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
