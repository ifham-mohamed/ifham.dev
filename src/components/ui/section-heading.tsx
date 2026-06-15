import Link from "next/link";
import { ArrowRight, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionAction {
  label: string;
  href: string;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  /** When set, renders the heading as an anchor target with a hover # link. */
  anchor?: string;
  /** Total count shown as a badge on the right (e.g. number of projects). */
  count?: number;
  /** Unit label shown next to the count (e.g. "projects"). */
  countLabel?: string;
  /** Optional right-aligned link (e.g. "View all"). */
  action?: SectionAction;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: As = "h2",
  anchor,
  count,
  countLabel,
  action,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const showRight = count != null || action != null;

  return (
    <div
      className={cn(
        "group/heading flex flex-col gap-1.5",
        isCenter && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/55",
            isCenter ? "justify-center" : "justify-start"
          )}
        >
          <span
            aria-hidden
            className="inline-block w-6 h-px bg-foreground/30 mr-2 align-middle"
          />
          {eyebrow}
        </div>
      )}

      <div
        className={cn(
          "flex gap-x-3 gap-y-1.5",
          isCenter
            ? "flex-col items-center"
            : "flex-wrap items-center justify-between"
        )}
      >
        <As
          id={anchor}
          className={cn(
            "text-xl md:text-[1.6rem] font-semibold tracking-tight leading-tight scroll-mt-24",
            anchor && "inline-flex items-center gap-2"
          )}
        >
          {title}
          {anchor && (
            <Link
              href={`#${anchor}`}
              aria-label={`Link to ${title} section`}
              className={cn(
                "inline-flex items-center justify-center size-6 rounded-md text-muted-foreground/70",
                "opacity-0 -translate-x-1 transition-all duration-200",
                "group-hover/heading:opacity-100 group-hover/heading:translate-x-0",
                "hover:text-foreground hover:bg-muted/60",
                "focus-visible:opacity-100 focus-visible:translate-x-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              <Hash className="size-4" aria-hidden />
            </Link>
          )}
        </As>

        {showRight && (
          <div className="flex items-center gap-2">
            {count != null && (
              <span
                className="inline-flex items-baseline gap-1 h-7 px-2.5 rounded-full border border-border bg-muted/40 text-xs font-medium tabular-nums"
                aria-label={countLabel ? `${count} ${countLabel}` : `${count}`}
              >
                <span className="font-semibold text-foreground">{count}</span>
                {countLabel && (
                  <span className="text-muted-foreground">{countLabel}</span>
                )}
              </span>
            )}
            {action && (
              <Link
                href={action.href}
                className={cn(
                  "group/all inline-flex items-center gap-1 h-7 pl-3 pr-2.5 rounded-full",
                  "border border-border bg-background text-xs font-medium text-foreground/80",
                  "hover:text-foreground hover:bg-muted/60 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                {action.label}
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover/all:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            )}
          </div>
        )}
      </div>

      {description && (
        <p
          className={cn(
            "text-sm text-muted-foreground",
            isCenter && "max-w-[60ch]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
