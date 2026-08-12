"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { mainNavItems } from "@/config/navigation.config";
import { personalInfo } from "@/data";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

/**
 * SiteHeader — replaces the floating icon dock.
 *
 * Three deliberate changes from the dock:
 *  1. `next/link`, not raw `<a>`. The dock forced a full page reload on every
 *     nav click, which defeated client-side routing entirely.
 *  2. Text labels instead of icon-only. Icons without labels are a guessing
 *     game for anyone who does not hover.
 *  3. Top-anchored, so it stops covering content at the bottom of the viewport
 *     and the page no longer needs its `pb-28` clearance hack.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { isScrolled } = useScroll(8);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65",
        "transition-[border-color,box-shadow] duration-300",
        isScrolled ? "border-b border-hairline" : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 min-w-0"
          aria-label={`${personalInfo.name} — home`}
        >
          <span
            aria-hidden
            className="grid size-7 flex-none place-items-center rounded-md border border-border bg-background text-2xs font-semibold tracking-tight"
          >
            {personalInfo.initials}
          </span>
          <span className="truncate text-sm font-medium tracking-tight">
            {personalInfo.name}
          </span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {mainNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-2 py-1.5 text-xs font-medium transition-colors sm:px-2.5",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-2 -bottom-px h-px bg-brand sm:inset-x-2.5"
                  />
                )}
              </Link>
            );
          })}

          <span aria-hidden className="mx-1 h-4 w-px bg-border" />

          <ModeToggle className="size-7 text-muted-foreground hover:text-foreground" />
        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
