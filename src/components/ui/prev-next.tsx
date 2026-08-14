import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PrevNext — pagination footer for the blog-post and case-study pages.
 *
 * ── Layout ──
 *
 * Three columns on desktop — previous left, an index link centred, next right —
 * placed by explicit `col-start` rather than by document flow. That is what
 * lets a missing previous leave column one genuinely empty instead of pulling
 * `next` leftwards, so nothing has to be padded with a placeholder card.
 * The centre column is `auto`, so when no index link is passed it collapses to
 * zero width and the layout is an ordinary two-card split.
 *
 * DOM order is visual order at every width, so keyboard focus follows what you
 * see. On mobile the three items simply stack.
 *
 * ── Weight ──
 *
 * The title is the only thing set in the foreground colour; the direction
 * label sits above it as a quiet uppercase kicker and the meta line below is
 * quieter still. Hover moves the arrow and lifts the border — nothing scales,
 * nothing fades in. This block is an exit, not an attraction, and it should
 * not out-shout the case study it follows.
 */

type Item = {
  href: string;
  title: string;
  /** Optional third line — a date range, never an invented category. */
  meta?: string;
} | null;

function NavCard({
  item,
  direction,
  className,
}: {
  item: NonNullable<Item>;
  direction: "previous" | "next";
  className?: string;
}) {
  const isNext = direction === "next";
  const Arrow = isNext ? ChevronRight : ChevronLeft;

  return (
    <Link
      href={item.href}
      // "Next" alone tells a screen-reader user the direction and nothing about
      // the destination. The visible label stays short; the accessible one
      // names the article.
      aria-label={`${isNext ? "Next" : "Previous"} article: ${item.title}`}
      className={cn(
        // Compact on purpose: enough padding to read as a target, not enough
        // to become a panel.
        "group flex flex-col gap-1 rounded-lg border border-border px-4 py-3",
        "transition-colors hover:border-border-strong hover:bg-surface-hover",
        isNext && "items-end text-right",
        className
      )}
    >
      <span className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-[0.12em] text-subtle-foreground">
        {!isNext && (
          <Arrow
            aria-hidden
            className="size-3 transition-transform duration-200 group-hover:-translate-x-0.5"
          />
        )}
        {isNext ? "Next" : "Previous"}
        {isNext && (
          <Arrow
            aria-hidden
            className="size-3 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
      </span>

      {/* The strongest element in the block. */}
      <span className="text-sm font-medium leading-snug text-foreground/90 transition-colors group-hover:text-brand-hover">
        {item.title}
      </span>

      {item.meta && (
        <span className="text-2xs text-subtle-foreground">{item.meta}</span>
      )}
    </Link>
  );
}

export function PrevNext({
  previous,
  next,
  label = "Pagination",
  index,
}: {
  previous: Item;
  next: Item;
  label?: string;
  /** Centred escape hatch back to the listing, e.g. "All projects". */
  index?: { href: string; label: string };
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label={label}
      className={cn(
        "grid grid-cols-1 gap-3 border-t border-hairline pt-8",
        "sm:grid-cols-[1fr_auto_1fr] sm:items-stretch sm:gap-4"
      )}
    >
      {/* No `else` branch. A missing previous renders nothing at all — the
          explicit column placement below keeps `next` on the right without a
          spacer standing in for a project that does not exist. */}
      {previous && (
        <NavCard item={previous} direction="previous" className="sm:col-start-1" />
      )}

      {index && (
        <Link
          href={index.href}
          // A plain link, not a third card: it is a fallback, and giving it the
          // same border as the two real destinations would make three equal
          // choices out of one primary pair.
          className="group inline-flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground transition-colors hover:text-brand-hover sm:col-start-2 sm:self-center sm:px-2"
        >
          {index.label}
          <ChevronRight
            aria-hidden
            className="size-3.5 opacity-50 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      )}

      {next && (
        <NavCard item={next} direction="next" className="sm:col-start-3" />
      )}
    </nav>
  );
}

/** BackLink — the "← All projects" / "← All posts" affordance. */
export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-brand-hover"
    >
      <ChevronLeft
        aria-hidden
        className="size-3.5 transition-transform group-hover:-translate-x-0.5"
      />
      {children}
    </Link>
  );
}

export default PrevNext;
