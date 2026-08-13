import { ChevronRight } from "lucide-react";
import { ANCHOR_OFFSET } from "@/components/ui";

/**
 * ConceptsList — engineering concepts as secondary metadata.
 *
 * ── Why text rows and not pills ──
 *
 * Measured across all 185 concepts in the fifteen projects: median length 48
 * characters, p90 62, max 72. Only 9% come in under 28 characters. A pill is
 * the right container for "React" and the wrong one for "Multi-tenant SaaS
 * architecture with row-level tenant isolation", and a mixed layout — 17 pills
 * scattered through 168 wrapped rows — reads worse than either. So every
 * concept gets the same compact text row.
 *
 * ── Why no grouping ──
 *
 * Architecture / Data integrity / Security / Testing / Infrastructure would
 * need a classification that does not exist: `conceptsLearned` is a flat array
 * of free-form strings with no category field, and sorting 185 of them by hand
 * is authored metadata, not derived. The brief said not to invent grouping the
 * data cannot support, so the list stays flat and complete.
 *
 * ── Why a native <details> ──
 *
 * Collapsed by default, because this is the one section explicitly ranked
 * below Problem, Architecture, Challenges and Outcomes — and a dozen rows of
 * dense phrases between Outcomes and the tech stack flattens that hierarchy.
 *
 * `<details>` rather than a JS disclosure: keyboard operable for free, no
 * hydration cost, and the content stays in the DOM and in the accessibility
 * tree whether open or closed. Crawlers index it either way — nothing here is
 * hidden from anything, it is only folded.
 */
export function ConceptsList({
  items,
  id,
}: {
  items: readonly string[];
  /** Anchor target for the case-study table of contents. */
  id?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <details
      id={id}
      className={`max-w-[46rem]${id ? ` ${ANCHOR_OFFSET}` : ""}`}
    >
      <summary
        className={[
          // The summary doubles as the section heading, so a collapsed section
          // costs one line instead of two.
          "flex cursor-pointer list-none items-center gap-2 py-1",
          "font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground",
          "transition-colors hover:text-foreground",
          // No focus styling here on purpose. <summary> is natively focusable
          // and globals.css already gives every focusable element the same
          // 2px brand outline. A local ring would be a second, different
          // focus treatment on one control.
          "[&::-webkit-details-marker]:hidden",
        ].join(" ")}
      >
        <ChevronRight
          aria-hidden
          className="size-3.5 transition-transform duration-200 [[open]_&]:rotate-90"
        />
        Concepts &amp; skills
        <span className="tabular-nums text-muted-foreground/55">
          {items.length}
        </span>
      </summary>

      {/* Softer than the tech stack: no fill, no border, no chip. Just a
          marker and the text, two columns wide once there is room. */}
      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 min-[40rem]:grid-cols-2">
        {items.map((concept) => (
          <li
            key={concept}
            className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground"
          >
            <span
              aria-hidden
              className="mt-[0.5em] size-1 flex-none rounded-full bg-border"
            />
            {/* No truncation — a 72-character concept wraps rather than
                being clipped to fit a shape it was never meant to. */}
            <span className="min-w-0">{concept}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default ConceptsList;
