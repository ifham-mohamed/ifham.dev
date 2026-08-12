import * as React from "react";
import { cn } from "@/lib/utils";
import { LogoTile } from "./logo-tile";
import { MetaDate } from "./metadata";

/**
 * TimelineItem — the header line shared by every dated entry on the site:
 * work, education, activities and projects.
 *
 * All four rebuilt this independently. They agreed on the shape but drifted on
 * the details — one used `items-start`, the others `items-center`; two
 * truncated the subtitle and two wrapped it; each repeated the same
 * `hidden sm:inline` + `sm:hidden` pair to move the date below the title on
 * small screens, which put every date into the DOM twice.
 *
 * Here the date renders once and is simply pushed to a second line by
 * `flex-wrap` when the row runs out of width, so it stays a single node for
 * assistive tech and there is one string to keep correct.
 */
export function TimelineItem({
  title,
  subtitle,
  date,
  dateTime,
  logoUrl,
  logoFit = "contain",
  badges,
  align = "center",
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Already-formatted date or range. */
  date?: string;
  /** Machine-readable value for the <time> element. */
  dateTime?: string;
  logoUrl?: string;
  logoFit?: "contain" | "cover";
  /** Status badges and tags rendered beside the title. */
  badges?: React.ReactNode;
  /** `start` when the title is likely to wrap to several lines. */
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap gap-x-3 gap-y-1.5",
        align === "start" ? "items-start" : "items-center",
        className
      )}
    >
      <LogoTile
        src={logoUrl}
        alt={typeof title === "string" ? title : ""}
        fit={logoFit}
      />

      {/* min-w-0 lets the title truncate; the basis keeps the row from
          collapsing before the date has a reason to wrap. */}
      <div className="flex min-w-0 flex-1 basis-40 flex-col gap-0.5 text-left">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="truncate text-sm font-medium text-foreground">
            {title}
          </span>
          {badges}
        </div>

        {subtitle && (
          <span className="truncate text-xs text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>

      {date && (
        // One node, two positions: it wraps to its own line under the title on
        // narrow screens and sits at the end of the row once there is room.
        <MetaDate
          dateTime={dateTime}
          className="w-full flex-none pl-[3.25rem] sm:w-auto sm:pl-0"
        >
          {date}
        </MetaDate>
      )}
    </div>
  );
}

export default TimelineItem;
