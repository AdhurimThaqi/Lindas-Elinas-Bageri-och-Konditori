import type { NextConfig } from "next";

/**
 * Static export configuration for GitHub Pages.
 *
 * The site is deployed as a static export (`output: "export"`), so it works on
 * any static host. Because there is no Node server, image optimization is
 * disabled and the cake-enquiry form submits via a prefilled email.
 *
 * BASE PATH: GitHub *project* Pages serve the site from a sub-path
 * (https://<user>.github.io/<repo>/), so assets must be prefixed with that
 * repo name or every CSS/JS/image request 404s and the page renders unstyled.
 * We set it explicitly (the auto-injection in the Pages workflow does not
 * reliably patch a TypeScript next.config). It is only applied for production
 * builds so local `next dev` stays at the root.
 *
 * If you move to a custom domain or a user/organization Pages site (served from
 * the root), set NEXT_PUBLIC_BASE_PATH="" in the build to disable the prefix.
 */
const repoBasePath = "/Lindas-Elinas-Bageri-och-Konditori";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.NODE_ENV === "production"
      ? repoBasePath
      : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    // Required for static export: no server-side optimization is available.
    unoptimized: true,
  },
  // Expose the base path to client components (used for raw asset URLs).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
