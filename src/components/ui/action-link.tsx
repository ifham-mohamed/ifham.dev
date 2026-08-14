import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionVariant = "primary" | "secondary" | "quiet";

const VARIANTS: Record<ActionVariant, string> = {
  primary:
    "bg-foreground text-background border-transparent hover:bg-foreground/88",
  secondary:
    "border-border-strong bg-surface text-foreground/80 hover:text-brand-hover hover:bg-surface-raised",
  quiet:
    "border-transparent bg-transparent text-muted-foreground hover:text-brand-hover",
};

type ActionSize = "sm" | "md";

/**
 * `md` exists for the contact section's CTAs. 32px is fine for an inline
 * action beside body copy, but the primary control on a conversion moment
 * needs a comfortable touch target — 40px clears the WCAG 2.5.8 minimum with
 * room to spare.
 */
const SIZES: Record<ActionSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ActionVariant;
  size?: ActionSize;
  /** Shows the ↗ glyph. Defaults on for external links. */
  external?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

/**
 * ActionLink — every CTA on the site.
 *
 * Replaces the hand-rolled `btn-sheen` button strings, which shipped a
 * shimmer animation on each of them. The affordance here is a small arrow
 * shift on hover: enough to register, not enough to distract.
 */
export function ActionLink({
  href,
  children,
  variant = "secondary",
  size = "sm",
  external,
  icon,
  className,
}: ActionLinkProps) {
  const isExternal = external ?? /^https?:|^mailto:/.test(href);

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group/action inline-flex items-center gap-1.5 rounded-md border",
        "font-medium transition-colors duration-200",
        SIZES[size],
        VARIANTS[variant],
        className
      )}
    >
      {icon}
      {children}
      <ArrowUpRight
        aria-hidden
        className={cn(
          "size-3.5 opacity-60 transition-transform duration-200",
          "group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5"
        )}
      />
    </Link>
  );
}

/**
 * ActionButton — same shape as ActionLink for real <button> actions
 * (copy to clipboard, etc.).
 */
export function ActionButton({
  children,
  variant = "secondary",
  size = "sm",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  variant?: ActionVariant;
  size?: ActionSize;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group/action inline-flex items-center gap-1.5 rounded-md border",
        "font-medium transition-colors duration-200 cursor-pointer",
        SIZES[size],
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default ActionLink;
