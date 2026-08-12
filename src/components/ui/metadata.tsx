import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * MetadataRow — the `date · role · status` line.
 *
 * Five files each hand-built this, including the `<span className="h-3 w-px
 * bg-border" />` separators, which meant every one of them also had to
 * hand-handle "don't render a divider before an item that isn't there".
 * Passing children through here inserts separators only between the items
 * that actually rendered.
 *
 * Metadata is set in mono: it is the one place on the site where the content
 * is genuinely machine-ish — dates, durations, counts, versions — and the
 * narrower figures read as deliberate against the sans body copy rather than
 * as decoration.
 */
export function MetadataRow({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2.5 gap-y-1.5",
        "font-mono text-2xs text-muted-foreground",
        className
      )}
      {...props}
    >
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span aria-hidden className="h-3 w-px flex-none bg-hairline" />
          )}
          {child}
        </React.Fragment>
      ))}
    </div>
  );
}

/** MetaItem — one cell of a MetadataRow, optionally with a leading icon. */
export function MetaItem({
  icon,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & { icon?: React.ReactNode }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}

/**
 * MetaDate — a date or range.
 *
 * Renders once and reflows, replacing the `hidden sm:inline` + `sm:hidden`
 * pair that duplicated every date into the DOM twice across eight sites. Two
 * copies of the same text is a screen-reader nuisance and it meant a date
 * could be changed in one branch and not the other.
 */
export function MetaDate({
  children,
  dateTime,
  className,
}: {
  children: React.ReactNode;
  dateTime?: string;
  className?: string;
}) {
  return (
    <time
      dateTime={dateTime}
      className={cn(
        "font-mono text-2xs tabular-nums text-muted-foreground",
        className
      )}
    >
      {children}
    </time>
  );
}

/**
 * Metric — one headline number.
 *
 * The figure is the evidence, so it gets the weight; the label is metadata and
 * recedes. Mono keeps digits the same width, which matters when three sit in a
 * row and would otherwise look unaligned.
 */
export function Metric({
  value,
  label,
  context,
  detail,
  className,
}: {
  value: string;
  label: string;
  /** One visible line naming the work the number came from. */
  context?: string;
  /** Longer form for assistive tech and the title tooltip. */
  detail?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Below 30rem this is a compact row — figure in a fixed left column,
        // text beside it — which keeps three metrics to roughly the height of
        // one stacked card. Above it, each becomes a column of the strip.
        "flex items-baseline gap-3 py-3",
        "min-[30rem]:flex-col min-[30rem]:items-start min-[30rem]:gap-1.5 min-[30rem]:px-4 min-[30rem]:py-4",
        "min-[30rem]:first:pl-0 min-[30rem]:last:pr-0",
        className
      )}
    >
      <dt className="sr-only">{detail ?? label}</dt>
      <dd className="contents">
        <span
          title={detail}
          className={cn(
            "w-[4.5rem] flex-none font-mono text-xl font-medium tabular-nums tracking-tight text-foreground",
            "min-[30rem]:w-auto min-[30rem]:text-2xl"
          )}
        >
          {value}
        </span>

        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-xs font-medium text-foreground/80">
            {label}
          </span>
          {context && (
            <span className="text-2xs leading-snug text-muted-foreground">
              {context}
            </span>
          )}
        </span>
      </dd>
    </div>
  );
}

/**
 * MetricGrid — the evidence strip.
 *
 * Rules horizontally rather than sitting in a bordered box: three enclosed
 * cards read as a pricing table, which is exactly the marketing-page
 * association the strip needs to avoid. Hairlines above, below and between
 * give the same grouping with none of the weight.
 */
export function MetricGrid({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"dl">) {
  return (
    <dl
      className={cn(
        "grid border-y border-hairline",
        // Three columns at 320px leaves ~90px each, which breaks "40–65%" onto
        // two lines — so rows below 30rem, columns above it.
        "grid-cols-1 divide-y divide-hairline",
        "min-[30rem]:grid-cols-3 min-[30rem]:divide-x min-[30rem]:divide-y-0",
        className
      )}
      {...props}
    />
  );
}
