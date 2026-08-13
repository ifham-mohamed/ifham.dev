import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Page width, in one place.
 *
 * `prose` is the reading column every text route uses. `wide` is for routes
 * that are a grid rather than a document — currently only the /projects
 * directory, where a 42rem column forced fifteen cards into a two-up list
 * about eight screens long.
 *
 * `chrome` is the header and footer. It tracks `wide` on purpose: if the
 * chrome stayed at 42rem, the /projects grid would extend past the header on
 * both sides and the page would look broken. The cost is that on the four
 * `prose` routes the header now spans wider than the content beneath it —
 * the standard "chrome spans, content centres" arrangement.
 *
 * To go back to a uniformly narrow site, set `wide` and `chrome` to
 * `max-w-2xl`. Nothing else needs to change.
 *
 * `wide` and `chrome` moved from 72rem to 75rem so they match the case-study
 * shell. They have to: if the article shell were wider than the header, the
 * case study would visibly overhang its own navigation on large screens.
 */
export const CONTAINER = {
  prose: "max-w-2xl", // 42rem / 672px
  wide: "max-w-case-shell", // 75rem / 1200px
  chrome: "max-w-case-shell",
  /** Long-form article shell. Same width as `wide`, named for intent. */
  shell: "max-w-case-shell", // 75rem / 1200px
} as const;

export type ContainerWidth = keyof typeof CONTAINER;

export function PageContainer({
  width = "prose",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { width?: ContainerWidth }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        CONTAINER[width],
        className
      )}
      {...props}
    />
  );
}

export default PageContainer;
