import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionVariant = "primary" | "secondary" | "quiet";

const VARIANTS: Record<ActionVariant, string> = {
  primary:
    "bg-foreground text-background border-transparent hover:bg-foreground/88",
  secondary:
    "border-border bg-background text-foreground/80 hover:text-foreground hover:bg-muted/60",
  quiet:
    "border-transparent bg-transparent text-muted-foreground hover:text-foreground",
};

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ActionVariant;
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
        "group/action inline-flex items-center gap-1.5 h-8 px-3 rounded-md border",
        "text-xs font-medium transition-colors duration-200",
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
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { variant?: ActionVariant }) {
  return (
    <button
      type="button"
      className={cn(
        "group/action inline-flex items-center gap-1.5 h-8 px-3 rounded-md border",
        "text-xs font-medium transition-colors duration-200 cursor-pointer",
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
