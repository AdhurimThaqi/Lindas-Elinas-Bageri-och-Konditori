import Link from "next/link";
import { announcement } from "@/content/site";

/**
 * Thin announcement bar above the navigation. Content and enabled-state come
 * from the central config (announcement in src/content/site.ts).
 */
export function AnnouncementBar() {
  if (!announcement.enabled || !announcement.message) return null;

  const hasLink = announcement.link.href && announcement.link.label;

  return (
    <div className="bg-[color:var(--color-raspberry)] text-white">
      <div className="container-page flex items-center justify-center gap-2.5 py-1 text-center text-[0.78rem] font-medium tracking-wide">
        <p>
          {announcement.message}
          {hasLink ? (
            <>
              {" "}
              <Link
                href={announcement.link.href}
                className="underline underline-offset-4 hover:text-[color:var(--color-raspberry)]"
              >
                {announcement.link.label}
              </Link>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}
