import { LogoTile, Section, SectionEyebrow, StatusBadge } from "@/components/ui";
import { activities } from "@/data";
import type { Activity } from "@/types";
import { ArrowUpRight } from "lucide-react";

/**
 * ActivitiesSection — initiative, not a second experience list.
 *
 * The previous version gave each activity its own bordered panel with a logo
 * tile, a title row, a metadata row and a footer — the same treatment as a
 * paid role. Five of those in a column made volunteering look like five more
 * jobs, and buried the only thing that matters here: what kind of initiative
 * each one shows.
 *
 * Now it is a divided list. The left column carries period and category, the
 * right carries the contribution. The category is what makes the section
 * scannable — you can see two open-source efforts and two coordination roles
 * without reading a word of prose.
 */

/** "2022" + "Present" -> "2022 — Present"; identical years collapse to one. */
function formatPeriod(activity: Activity) {
  return activity.start === activity.end
    ? activity.start
    : `${activity.start} — ${activity.end}`;
}

/**
 * Drops a detail already contained in the heading.
 *
 * The data legitimately repeats itself — "Hacktoberfest Participant" has
 * organisation "Hacktoberfest" and role "Participant" — and printing all three
 * reads as a stutter. This keeps whichever parts add something.
 */
function subline(activity: Activity) {
  const heading = activity.title.toLowerCase();
  return [activity.organization, activity.role]
    .filter((part) => part && !heading.includes(part.toLowerCase()))
    .join(" · ");
}

function isOngoing(activity: Activity) {
  return (
    activity.end === "Present" ||
    activity.end === String(new Date().getFullYear())
  );
}

export default function ActivitiesSection() {
  return (
    <Section
      id="activities"
      eyebrow="Community"
      index={7}
      title="Activities & leadership"
      description="Open-source contribution, coordination and community work alongside the engineering."
    >
      <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
        {activities.map((activity) => {
          const detail = subline(activity);
          const host = activity.href
            ? activity.href.replace(/^https?:\/\//, "").replace(/\/$/, "")
            : null;

          return (
            <li
              key={activity.id}
              className="grid gap-1.5 py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
            >
              {/* --- Metadata --- */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:flex-col sm:items-start sm:gap-1.5">
                <time className="font-mono text-2xs tabular-nums text-muted-foreground">
                  {formatPeriod(activity)}
                </time>
                {activity.category && (
                  <SectionEyebrow>
                    {activity.category}
                  </SectionEyebrow>
                )}
              </div>

              {/* --- Contribution --- */}
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex min-w-0 items-start gap-2.5">
                  {/* Only mounts when a real logo exists. Five identical
                      initial-monograms would be repetition carrying no
                      information — the organisation is named right here. */}
                  {activity.logoUrl && (
                    <LogoTile
                      src={activity.logoUrl}
                      alt={activity.organization}
                      className="mt-0.5 size-8"
                    />
                  )}

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="text-sm font-medium text-foreground">
                        {activity.title}
                      </h3>
                      {isOngoing(activity) && <StatusBadge label="Ongoing" />}
                    </div>

                    {detail && (
                      <p className="text-xs text-muted-foreground">{detail}</p>
                    )}
                  </div>
                </div>

                {activity.description && (
                  <p className="max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                )}

                {activity.href && (
                  <a
                    href={activity.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/site mt-0.5 inline-flex w-fit items-center gap-1 font-mono text-2xs text-subtle-foreground transition-colors hover:text-brand-hover"
                  >
                    {host}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3 transition-transform duration-200 group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5"
                    />
                    <span className="sr-only">
                      {activity.organization} (opens in a new tab)
                    </span>
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
