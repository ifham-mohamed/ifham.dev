import {
  ActionLink,
  Divider,
  LogoTile,
  MetaItem,
  MetadataRow,
  StatusBadge,
  Tag,
  TagRow,
} from "@/components/ui";
import { workExperience } from "@/data";
import type { RoleMetric } from "@/types";
import { MapPin } from "lucide-react";

/**
 * WorkSection — a résumé translated into web UI.
 *
 * Two changes from the previous version:
 *
 * 1. No accordion. Every role's impact was behind a click, which is the exact
 *    opposite of what this section is for — a recruiter should not have to
 *    interact to find out what was shipped. With two roles there is no length
 *    problem to solve by hiding things.
 * 2. No cards. Roles are entries on a shared timeline rule, so they read as
 *    one continuous history rather than as unrelated tiles.
 *
 * Dropping the accordion also removed the last reason for this file to be a
 * client component, so it now renders on the server and ships no JavaScript.
 */

/** A figure this role owns, sized so the number is findable while scanning. */
function RoleMetrics({ metrics }: { metrics: readonly RoleMetric[] }) {
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col gap-0.5">
          <dt className="sr-only">{metric.label}</dt>
          <dd className="font-mono text-xl font-medium tabular-nums tracking-tight text-foreground">
            {metric.value}
          </dd>
          <span className="max-w-[22ch] text-2xs leading-snug text-muted-foreground">
            {metric.label}
          </span>
        </div>
      ))}
    </dl>
  );
}

export default function WorkSection() {
  return (
    // The rule lives on the list, so it runs unbroken behind every entry
    // instead of restarting per item.
    <ol className="relative flex flex-col gap-10 border-l border-hairline">
      {workExperience.map((work) => {
        const isPresent = !work.end || work.end === "Present";
        const employmentType = work.badges?.[0];
        const bullets = work.highlights ?? work.responsibilities?.slice(0, 4);

        return (
          <li key={work.id} className="group/role relative pl-5 sm:pl-6">
            {/* A node, not an ornament: 5px, knocked out of the rule by a ring
                in the page colour so no extra shape is needed. */}
            <span
              aria-hidden
              className="absolute -left-[3px] top-3.5 size-[5px] rounded-full bg-border ring-4 ring-background transition-colors group-hover/role:bg-brand"
            />

            <div className="flex flex-col gap-4">
              {/* --- Company / role / period --- */}
              <div className="flex min-w-0 items-start gap-3">
                <LogoTile src={work.logoUrl} alt={work.company} />

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="text-sm font-medium text-foreground">
                      {work.company}
                    </h3>
                    {employmentType && (
                      <Tag variant="outline">{employmentType}</Tag>
                    )}
                    {isPresent && <StatusBadge label="Present" />}
                  </div>

                  <p className="text-sm text-muted-foreground">{work.title}</p>

                  <MetadataRow>
                    <time>{`${work.start} — ${work.end ?? "Present"}`}</time>
                    {work.location && (
                      <MetaItem
                        icon={<MapPin aria-hidden className="size-3" />}
                      >
                        {work.location}
                      </MetaItem>
                    )}
                  </MetadataRow>
                </div>
              </div>

              {/* --- Impact --- */}
              {work.metrics && work.metrics.length > 0 && (
                <RoleMetrics metrics={work.metrics} />
              )}

              {bullets && bullets.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {bullets.map((item) => (
                    <li
                      key={item}
                      className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.62em] before:size-1 before:rounded-full before:bg-border"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* --- Technology --- */}
              {work.technologies && work.technologies.length > 0 && (
                <TagRow>
                  {work.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </TagRow>
              )}

              {work.href && (
                <div className="flex flex-col gap-3">
                  <Divider />
                  <ActionLink href={work.href} variant="quiet" className="px-0">
                    {work.company}
                  </ActionLink>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
