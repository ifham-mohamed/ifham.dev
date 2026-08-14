"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNavItems, sectionAnchors } from "@/config/navigation.config";
import { personalInfo } from "@/data";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * MobileNav — the small-screen menu.
 *
 * Hand-rolled rather than pulling in a dialog dependency: the project has
 * @radix-ui accordion, avatar, separator, slot and tooltip, but no dialog, and
 * a single panel does not justify another package.
 *
 * That means owning the full contract, which a `hidden`-toggled div does not
 * give you:
 *   - Escape closes.
 *   - Tab cycles inside the panel instead of walking the page behind it.
 *   - Focus returns to the trigger on close, so the keyboard user does not get
 *     dropped at the top of the document.
 *   - Background scroll is locked while open.
 *   - The trigger reports state via aria-expanded / aria-controls.
 *
 * Flat by design: primary routes, then homepage anchors. No nested menus.
 *
 * -- Why the panel is portalled --
 *
 * It used to render in place, inside <SiteHeader>. That worked at the top of
 * the page and broke the moment you scrolled, which is what made the bug look
 * intermittent.
 *
 * The header gains `backdrop-blur-sm` once scrolled, and `backdrop-filter`
 * makes an element a containing block for its `position: fixed` descendants.
 * So `fixed inset-0 top-14` stopped resolving against the viewport and started
 * resolving against the 56px-tall header - the panel was clipped to roughly one
 * row, showing "Home" and nothing beneath it.
 *
 * Portalling to <body> puts the panel outside that containing block entirely,
 * so it is measured against the viewport whatever the header is doing. The
 * alternative - dropping the blur - would have changed the header's design to
 * work around a stacking rule.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = `mobile-nav-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Lock background scroll, compensating for the scrollbar so the page
    // behind does not shift sideways as it disappears.
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      previouslyFocused?.focus?.();
    };
  }, [open, close]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground sm:hidden"
      >
        {open ? (
          <X aria-hidden className="size-5" />
        ) : (
          <Menu aria-hidden className="size-5" />
        )}
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 top-14 z-40 sm:hidden">
            {/* Scrim. A plain dim, not a blur — blurring the whole page behind a
                menu is expensive on mobile GPUs for no legibility gain. */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={close}
              className="absolute inset-0 bg-background/80"
            />

            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="relative max-h-full overflow-y-auto border-b border-hairline bg-surface px-4 pb-8 pt-2 shadow-sm"
            >
              <nav aria-label="Primary" className="flex flex-col">
                {mainNavItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        // 48px rows: comfortable targets, and the text stays
                        // large enough to read as navigation rather than a list.
                        "flex h-12 items-center justify-between border-b border-hairline text-base transition-colors",
                        active
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-brand-hover"
                      )}
                    >
                      {item.label}
                      {active && (
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-brand"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Homepage anchors. Shown everywhere because they are absolute
                  links back to "/" — from /blog they still work. */}
              <nav aria-label="On this page" className="mt-6 flex flex-col gap-3">
                <span className="font-mono text-2xs uppercase tracking-[0.14em] text-subtle-foreground">
                  On this page
                </span>
                <div className="grid grid-cols-2 gap-x-4">
                  {sectionAnchors.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className="flex h-11 items-center text-sm text-muted-foreground transition-colors hover:text-brand-hover"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <Link
                href="/Ifham_Mohamed_SE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="mt-6 flex h-11 items-center justify-center rounded-md bg-foreground text-sm font-medium text-background"
              >
                View résumé
                <span className="sr-only">
                  {" "}
                  — PDF, {personalInfo.name} (opens in a new tab)
                </span>
              </Link>
            </div>
            </div>,
          document.body
        )}
    </>
  );
}

export default MobileNav;
