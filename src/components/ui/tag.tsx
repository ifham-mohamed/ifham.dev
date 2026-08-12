import * as React from "react";
import { cn } from "@/lib/utils";

type TagVariant = "default" | "outline" | "brand" | "ghost";

const VARIANTS: Record<TagVariant, string> = {
  /** Standard tech / skill pill. */
  default: "border-border bg-background text-foreground/75",
  /** Quieter — for secondary metadata like company badges. */
  outline: "border-transparent bg-muted/70 text-muted-foreground",
  /** The one accent use at this scale. Reserved for "Featured". */
  brand: "border-brand/25 bg-brand-subtle text-brand",
  /** No chrome at all — counts, overflow indicators. */
  ghost: "border-transparent bg-transparent text-muted-foreground",
};

type TagProps = React.ComponentPropsWithoutRef<"span"> & {
  variant?: TagVariant;
};

/**
 * Tag — every small pill on the site: technologies, skills, courses,
 * badges, achievements. One size, one shape, four tones.
 */
export function Tag({ className, variant = "default", ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-6 px-2 rounded-md border",
        "text-2xs font-medium whitespace-nowrap",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}

/** TagRow — consistent wrapping container for a group of tags. */
export function TagRow({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)} {...props} />
  );
}

export default Tag;
