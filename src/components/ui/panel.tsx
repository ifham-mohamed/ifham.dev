import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Panel — the single card surface used across the site.
 *
 * Before this existed the same class string was pasted into nine components,
 * so restyling a card meant nine edits. Everything that looks like a card now
 * routes through here.
 */

type PanelOptions = {
  /** Adds hover affordance. Use for panels that are clickable or expandable. */
  interactive?: boolean;
  /** Removes the default padding so the child can control its own layout. */
  flush?: boolean;
};

/**
 * The panel class string, exposed so elements that cannot be a `<Panel>` —
 * Radix `AccordionItem`, `next/link` — can still wear the same surface.
 */
export function panelClass({
  interactive = false,
  flush = false,
}: PanelOptions = {}) {
  return cn(
    "relative w-full min-w-0 overflow-hidden rounded-lg border border-border bg-surface",
    "transition-colors duration-200",
    !flush && "p-4",
    interactive &&
      "hover:border-foreground/15 hover:bg-surface-hover data-[state=open]:border-foreground/15 data-[state=open]:bg-surface-hover"
  );
}

type PanelProps = React.ComponentPropsWithoutRef<"div"> & PanelOptions;

export function Panel({
  className,
  interactive = false,
  flush = false,
  ...props
}: PanelProps) {
  return (
    <div
      className={cn(panelClass({ interactive, flush }), className)}
      {...props}
    />
  );
}

/**
 * PanelRow — the header line shared by every list panel:
 * logo · title stack · trailing meta.
 */
export function PanelRow({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex items-center gap-3 min-w-0 w-full", className)}
      {...props}
    />
  );
}

/**
 * PanelBody — indented content beneath a PanelRow, aligned to the title
 * rather than the logo.
 */
export function PanelBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-4 sm:pl-[3.25rem]", className)}
      {...props}
    />
  );
}

/**
 * PanelFooter — the hairline-separated action strip at the bottom of a panel.
 * Negative margins let it span the full panel width regardless of body indent.
 */
export function PanelFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border-t border-hairline pt-3 mt-1",
        "-mx-4 px-4 sm:-ml-[4.25rem] sm:pl-[4.25rem]",
        className
      )}
      {...props}
    />
  );
}

/** FieldLabel — the small uppercase label above a group ("Tech stack"). */
export function FieldLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className={cn(
        "text-2xs font-medium uppercase tracking-[0.12em] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export default Panel;
