"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { nav, business } from "@/content/site";
import { cn, telHref } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { AnnouncementBar } from "./AnnouncementBar";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="bg-charcoal text-white">
        <div className="container-page flex h-[60px] items-center justify-between gap-4">
          <Wordmark light />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Huvudmeny">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-[0.95rem] font-medium text-white/90 transition-colors hover:text-white",
                    active && "text-white",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-[color:var(--color-raspberry)]" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/bestall" className="btn btn-primary hidden lg:inline-flex">
              Beställ tårta
            </Link>
            <a
              href={telHref()}
              aria-label={`Ring ${business.phone.display}`}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-white/90 ring-1 ring-white/20 transition-colors hover:bg-white/10 lg:inline-flex"
            >
              <Phone className="h-4.5 w-4.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-white/20 transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Öppna meny"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
