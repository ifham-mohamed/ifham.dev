import * as React from "react";
import { cn } from "@/lib/utils";
import {
  SectionEyebrow,
  SectionHeading,
  SectionIndex,
} from "./section-heading";

/**
 * Vertical rhythm.
 *
 * Every stacking distance on the site comes from these four steps. Before this
 * existed, section spacing was chosen per page — the homepage used gap-16, the
 * case study gap-10, the blog gap-12 — so the page felt like it changed pace
 * as you scrolled between routes.
 *
 * Four steps is deliberate. A scale with more rungs invites picking the one
 * that "looks right" for a given section, which is how you end up back at
 * twenty-one values.
 */
export const RHYTHM = {
  /** Between top-level sections of a page. */
  page: "flex flex-col gap-16 sm:gap-20",
  /** Between a section heading and its body. */
  section: "flex flex-col gap-6",
  /** Between a sub-heading and its body, and between panels in a list. */
  block: "flex flex-col gap-4",
  /** Within a tightly-bound group: title + subtitle, tag rows. */
  group: "flex flex-col gap-2",
} as const;

export type RhythmStep = keyof typeof RHYTHM;

/**
 * Scroll offset for anchor targets.
 *
 * The header is sticky at 3.5rem, so an anchor with no scroll-margin lands
 * flush against the viewport top and the header covers the heading you jumped
 * to. 6rem clears the header with breathing room above the title.
 *
 * Applied to the element that carries the `id`, which is the point: it used to
 * sit on the <h2> while the id was on the <section>, so it never took effect.
 * Keep this in step with the header height in `site-header.tsx`.
 */
export const ANCHOR_OFFSET = "scroll-mt-24";

/** Stack — vertical flow at one of the four rhythm steps. */
export function Stack({
  gap = "block",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { gap?: RhythmStep }) {
  return <div className={cn(RHYTHM[gap], className)} {...props} />;
}

/**
 * Section — a titled top-level region.
 *
 * Owns the `<section>` element, the anchor id used by the footer's jump links,
 * and the heading-to-body distance, so no page sets those individually.
 */
export function Section({
  id,
  eyebrow,
  index,
  title,
  description,
  count,
  action,
  headingAs,
  className,
  children,
}: {
  id: string;
  eyebrow: string;
  /** Position in the page's numbered index, e.g. 1 renders "01 /". */
  index?: number;
  title: string;
  description?: string;
  count?: number;
  action?: { label: string; href: string };
  headingAs?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(RHYTHM.section, ANCHOR_OFFSET, className)}
    >
      <SectionHeading
        as={headingAs}
        eyebrow={eyebrow}
        index={index}
        title={title}
        description={description}
        count={count}
        action={action}
      />
      {children}
    </section>
  );
}

/**
 * EditorialSection — label column beside a body column.
 *
 * Used by the narrative sections (About, Experience) where the heading acts as
 * a running margin note rather than a banner. List sections keep the
 * full-width `Section` above, because a 9rem label column would squeeze a grid
 * of project cards for no editorial gain.
 *
 * The label column is 9rem: inside the 42rem page column that leaves the body
 * at roughly 31rem, which holds ~67 characters of body copy — inside the 60–70
 * target — and is still wide enough for a metric row beside bullets.
 *
 * Not sticky. These sections are short enough to sit on screen at once, so a
 * sticky label would never reach the point of sticking, and it would buy a
 * mobile reset for nothing.
 */
export function EditorialSection({
  id,
  index,
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  id: string;
  index?: number;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("flex flex-col", ANCHOR_OFFSET, className)}>
      <div className="grid gap-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
        <div className="flex flex-col gap-2">
          <SectionEyebrow>
            {index != null && <SectionIndex value={index} />}
            {eyebrow}
          </SectionEyebrow>
          <h2 className="text-xl font-semibold leading-snug tracking-tight text-foreground">
            {title}
          </h2>
          {description && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="flex min-w-0 flex-col">{children}</div>
      </div>
    </section>
  );
}

/**
 * Divider — every hairline on the site.
 *
 * `inline` is the variant that runs from a label out to the right margin,
 * which is how case-study sections are separated.
 */
export function Divider({
  orientation = "horizontal",
  inline = false,
  className,
}: {
  orientation?: "horizontal" | "vertical";
  /** Grows to fill remaining space in a flex row. */
  inline?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "block bg-hairline",
        orientation === "horizontal" ? "h-px w-full" : "h-3 w-px",
        inline && "flex-1",
        className
      )}
    />
  );
}
