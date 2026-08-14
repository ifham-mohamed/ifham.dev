"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Divider } from "@/components/ui";
import { CONTAINER } from "@/components/ui";
import { mainNavItems } from "@/config/navigation.config";
import { personalInfo } from "@/data";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

/**
 * SiteHeader — one navigation model, kept quiet.
 *
 * A sticky header only, no sidebar. The page is a single narrow column, so a
 * rail would compete with the content for the same horizontal space and give
 * the site two competing navigation systems.
 *
 * On scroll it gains a hairline and a light surface — enough to separate it
 * from the content underneath, without the heavy frosted-glass panel that
 * makes text behind it swim.
 *
 * Height is 3.5rem and is load-bearing: `ANCHOR_OFFSET` in `rhythm.tsx` is set
 * to clear it. Change one and change the other.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { isScrolled } = useScroll(8);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        isScrolled
          ? "border-b border-hairline bg-surface/90 backdrop-blur-sm"
          : "border-b border-transparent bg-surface"
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 items-center justify-between gap-3 px-4 sm:px-6",
          CONTAINER.chrome
        )}
      >
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2"
          aria-label={`${personalInfo.name} — home`}
        >
          <span
            aria-hidden
            className="grid size-7 flex-none place-items-center rounded-md border border-border bg-surface-raised font-mono text-2xs font-medium tracking-tight"
          >
            {personalInfo.initials}
          </span>
          {/* The full name appears once there is room for it; the monogram
              alone carries the brand on small screens. */}
          <span className="hidden truncate text-sm font-medium tracking-tight min-[26rem]:inline">
            {personalInfo.name}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-0.5 sm:flex">
            {mainNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-brand-hover"
                  )}
                >
                  {item.label}
                  {/* Subtle but unambiguous: a 1px brand rule under the
                      current route, paired with aria-current for anyone not
                      seeing it. */}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2.5 -bottom-px h-px bg-brand"
                    />
                  )}
                </Link>
              );
            })}

            <Divider orientation="vertical" className="mx-1.5 h-4" />

            <Link
              href="/Ifham_Mohamed_SE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border-strong bg-surface px-2.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-surface-raised hover:text-brand-hover"
            >
              <FileText aria-hidden className="size-3.5 opacity-70" />
              Résumé
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </Link>
          </div>

          {/* 40px on mobile to match the menu trigger, 28px once it sits in a
              dense desktop row where pointer precision is higher. */}
          <ModeToggle className="size-10 sm:size-8" />

          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
