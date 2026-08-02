import Script from "next/script";

/**
 * Optional, privacy-friendly analytics. Nothing loads unless
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured. Plausible is cookieless, so no
 * consent banner is required when it is the only analytics in use. If you
 * switch to a tracker that sets non-essential cookies, add a consent gate.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
