import type { NextConfig } from "next";

/**
 * Static export configuration for GitHub Pages.
 *
 * The site is deployed as a static export (`output: "export"`), so it works on
 * any static host (GitHub Pages, Netlify, S3, …). Because there is no Node
 * server in that setup, image optimization is disabled and the cake-enquiry
 * form submits via a prefilled email (see OrderForm). If you later deploy to a
 * Node host such as Vercel, you can remove `output: "export"` and re-add a
 * server route/action for form delivery.
 *
 * The GitHub Pages workflow (actions/configure-pages) injects the correct
 * basePath/assetPrefix at build time for the project subpath.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    // Required for static export: no server-side optimization is available.
    unoptimized: true,
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
