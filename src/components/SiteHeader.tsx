"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { AnnouncementBar } from "./AnnouncementBar";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-line bg-cream/85 backdrop-blur-md"
            : "border-transparent bg-cream",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <Wordmark />

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Huvudmeny"
          >
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-[0.95rem] font-semibold text-charcoal transition-colors hover:text-[color:var(--color-berry)]",
                    active && "text-[color:var(--color-berry)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/bestall" className="btn btn-primary hidden md:inline-flex">
              Beställ tårta
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-charcoal md:hidden"
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
