import Link from "next/link";
import { Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  /** When set, renders the heading as an anchor target with a hover # link. */
  anchor?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: As = "h2",
  anchor,
}: SectionHeadingProps) {
  const isCenter = align === "center";
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
