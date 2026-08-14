import * as React from "react";
import { cn } from "@/lib/utils";

type TagVariant = "default" | "outline" | "brand" | "ghost";

const VARIANTS: Record<TagVariant, string> = {
  /**
   * Technologies, skills, coursework — metadata, not controls.
   *
   * Was `bg-background` + `font-medium`, which lifted each chip *above* the
   * surface it sat on and made a stack of seventeen read as a row of buttons.
   * A recessed fill, a hairline border and normal weight put them back into
   * the page. There is deliberately no hover state: a tag is not interactive.
   */
  default: "border-hairline bg-surface-raised text-muted-foreground font-normal",
  /** Quieter still — secondary metadata like employment type. */
  outline: "border-transparent bg-surface-raised text-subtle-foreground font-normal",
  /** The one accent use at this scale. Reserved for "Featured". */
  brand: "border-brand/25 bg-brand-subtle text-brand font-medium",
  /** No chrome at all — counts, overflow indicators. */
  ghost: "border-transparent bg-transparent text-subtle-foreground font-normal",
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
        // Tighter box and a 4px radius. `rounded-md` read as a control; this
        // reads as a label.
        "inline-flex items-center gap-1.5 h-[1.375rem] px-1.5 rounded border",
        "text-2xs whitespace-nowrap",
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
