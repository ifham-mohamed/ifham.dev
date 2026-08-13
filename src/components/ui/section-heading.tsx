import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SectionEyebrow — the small uppercase label above a section title.
 *
 * Set in mono. It is a classifier rather than prose, and the wider tracking
 * plus fixed-width figures separate it from the heading beneath without
 * needing a rule, a colour or extra weight.
 */
export function SectionEyebrow({
  as: As = "span",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & {
  /** Use a heading element where the eyebrow *is* the section's heading. */
  as?: "span" | "h2" | "h3";
}) {
  return (
    <As
      className={cn(
        "font-mono text-2xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/**
 * SectionIndex — the `01 /` prefix on a section eyebrow.
 *
 * Split out so the numbering is one implementation rather than a string
 * pasted per section. The digits sit at lower contrast than the label: the
 * number is a wayfinding aid, not something to read.
 */
export function SectionIndex({ value }: { value: number }) {
  return (
    <>
      <span className="text-muted-foreground/55 tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span aria-hidden className="mx-1.5 text-muted-foreground/35">
        /
      </span>
    </>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  /** Renders a `01 /` prefix before the eyebrow. */
  index?: number;
  title: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2";
  /** Anchor id for deep links and the footer's jump links. */
  anchor?: string;
  /** Rendered as plain mono text beside the title, not a badge. */
  count?: number;
  action?: { label: string; href: string };
}

/**
 * SectionHeading — one heading treatment for the whole site.
 *
 * The original carried a decorative rule, a pill-shaped count badge and a
 * hover-revealed hash link, all three competing with the section content for
 * attention. The count is now quiet metadata and the anchor is silent.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  className,
  as: As = "h2",
  anchor,
  count,
  action,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {eyebrow && (
        <SectionEyebrow>
          {index != null && <SectionIndex value={index} />}
          {eyebrow}
        </SectionEyebrow>
      )}

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <As
          id={anchor}
          className="text-xl font-semibold text-foreground scroll-mt-24"
        >
          {title}
          {count != null && (
            <span className="ml-2 font-mono text-sm font-normal tabular-nums text-muted-foreground/70">
              {count}
            </span>
          )}
        </As>

        {action && (
          <Link
            href={action.href}
            className="group/all inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {action.label}
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover/all:translate-x-0.5"
            />
          </Link>
        )}
      </div>

      {description && (
        <p className="text-sm text-muted-foreground max-w-[62ch]">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
