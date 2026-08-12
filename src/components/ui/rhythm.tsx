import * as React from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

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
  title: string;
  description?: string;
  count?: number;
  action?: { label: string; href: string };
  headingAs?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(RHYTHM.section, className)}>
      <SectionHeading
        as={headingAs}
        eyebrow={eyebrow}
        title={title}
        description={description}
        anchor={id}
        count={count}
        action={action}
      />
      {children}
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
