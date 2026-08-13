"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * CaseStudyToc — "on this page" for the widest screens only.
 *
 * ── Where the space comes from ──
 *
 * The rail is sized by subtraction, not by taste:
 *
 *     shell 75rem  −  rail 10rem  −  gap 2.5rem  =  wide 62.5rem
 *
 * so the article column at full width is exactly `--container-case-wide` and
 * the rail is precisely what the shell has left. Prose sits at
 * `--container-case-text` (47rem) inside that column and never moves, at any
 * width.
 *
 * 10rem is 160px, and the longest label — "Concepts & skills" — measures about
 * 105px at `text-xs`, so nothing wraps.
 *
 * ── Scrolling is CSS, not JavaScript ──
 *
 * These are plain anchors. `html { scroll-behavior: smooth }` in globals.css
 * does the animation and the reduced-motion block there already switches it to
 * `auto`, so honouring the preference costs nothing here. The sticky-header
 * offset is likewise handled by `ANCHOR_OFFSET` (`scroll-mt-24` = 96px) on the
 * targets, clearing the 3.5rem header. A JS scroll handler would have had to
 * re-implement all three and would break browser history.
 *
 * JavaScript is used for exactly one thing: knowing which section you are in.
 */

export type TocItem = { id: string; label: string };

/** Header is h-14 (56px); the observation band starts just below it. */
const HEADER_OFFSET = 80;

/** Matches the `min-[75rem]` rail breakpoint. Below this, nothing is observed. */
const RAIL_QUERY = "(min-width: 75rem)";

/**
 * Shared by case studies and blog posts. The two differ only in what they
 * call their sections, so `label` is a prop rather than a reason to keep a
 * second copy of the observer, the media gate and the rail markup.
 */
export function CaseStudyToc({
  items,
  label = "Case study sections",
}: {
  items: readonly TocItem[];
  label?: string;
}) {
  const [active, setActive] = React.useState<string | null>(null);
  const [enabled, setEnabled] = React.useState(false);

  // Gate on the media query so phones and tablets never run the observer for
  // a rail they cannot see. In an effect, so there is no hydration mismatch.
  React.useEffect(() => {
    const mq = window.matchMedia(RAIL_QUERY);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (!enabled || items.length === 0) return;

    const ids = items.map((i) => i.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Topmost section in the band wins, in document order — otherwise the
        // highlight jumps around whenever two sections overlap it.
        const first = ids.find((id) => visible.has(id));
        if (first) setActive(first);
      },
      {
        // A band from just under the header down to 40% of the viewport.
        rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    nodes.forEach((n) => observer.observe(n));

    // At the very bottom of the page the last section can sit entirely below
    // the band, which would leave the highlight stuck on whatever came before
    // it. Nothing else in the observer can catch this case.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        if (atBottom) setActive(ids[ids.length - 1]);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, items]);

  if (items.length === 0) return null;

  return (
    // Hidden below 1200px by CSS, and no floating mobile affordance to replace
    // it — the article's own headings are the structure on small screens.
    <aside className="hidden min-[75rem]:block">
      <nav
        aria-label={label}
        // Header is 3.5rem; 5rem leaves it clear without hugging.
        className="sticky top-20"
      >
        {/* The thin rule is the list's own left border, so it spans exactly the
            items — not a decorative line of arbitrary height. */}
        <ol className="flex flex-col border-l border-hairline">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id} className="relative">
                {/* The active marker sits on top of the rule rather than
                    beside it, so nothing shifts when it appears. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-px top-0 h-full w-px transition-colors",
                    isActive ? "bg-brand" : "bg-transparent"
                  )}
                />
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "block py-1.5 pl-3 text-xs leading-snug transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground/70 hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}

export default CaseStudyToc;
