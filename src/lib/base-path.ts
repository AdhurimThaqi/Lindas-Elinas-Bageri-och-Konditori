/**
 * Single source of truth for the GitHub Pages project sub-path.
 *
 * GitHub *project* Pages serve from https://<user>.github.io/<repo>/, so every
 * root-relative asset must be prefixed with the repo name. This constant is
 * derived from NODE_ENV (which Next inlines into the client bundle), so it works
 * without relying on build-time env injection — both next.config.ts and the
 * runtime `withBasePath` helper import it, keeping them in lockstep.
 *
 * Applied only in production builds; empty in dev so localhost stays at root.
 * For a custom domain / user Pages site (served from root) set
 * NEXT_PUBLIC_BASE_PATH="" in the build to disable the prefix.
 */
const REPO_BASE_PATH = "/Lindas-Elinas-Bageri-och-Konditori";

export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? REPO_BASE_PATH : "");
