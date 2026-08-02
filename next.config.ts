import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Silence workspace-root inference warnings in monorepo-like setups.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
