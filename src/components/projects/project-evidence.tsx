import { SectionEyebrow } from "@/components/ui";
import type { ProjectEvidenceItem } from "@/types";
import { cn } from "@/lib/utils";

/**
 * ProjectEvidence — the strongest figures from a case study, before the case
 * study begins.
 *
 * Renders `project.evidence`, which restates figures already asserted in that
 * project's own `outcomes`. Two projects have no numeric outcomes at all, and
 * for those this returns `null` — an absent strip is the correct output, not a
 * padded one.
 *
 * Not a KPI banner. The numbers are set in mono at 28px in plain foreground,
 * with no colour, no fill, no card per figure. Hairline dividers group them;
 * that is the whole treatment. A row of large coloured numerals on a portfolio
 * reads as marketing, and these are meant to read as measurements.
 */
export function ProjectEvidence({
  items,
  className,
}: {
  items?: readonly ProjectEvidenceItem[];
  className?: string;
}) {
  // No evidence in the data means no component. See the type's doc comment.
  if (!items || items.length === 0) return null;

  return (
    <section
      aria-label="Project evidence"
      className={cn("flex max-w-case-text flex-col gap-3", className)}
    >
      <SectionEyebrow>
        Evidence
      </SectionEyebrow>

      {/*
        One strip on desktop with vertical hairlines between figures; a 2x2
        grid below 34rem, where four columns would give each figure ~80px and
        wrap "Versioned migrations" onto three lines.

        `auto-cols-fr` + `grid-flow-col` keeps the columns even regardless of
        whether a project supplies two, three or four figures.
      */}
      <dl
        className={cn(
          "grid grid-cols-2 gap-x-6 gap-y-6 border-y border-hairline py-5",
          "min-[34rem]:auto-cols-fr min-[34rem]:grid-flow-col",
          "min-[34rem]:divide-x min-[34rem]:divide-hairline",
          "min-[34rem]:gap-y-0"
        )}
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              "flex min-w-0 flex-col gap-1",
              // First column sits flush with the text margin; the rest are
              // inset so the dividers have room to breathe.
              "min-[34rem]:px-5",
              i === 0 && "min-[34rem]:pl-0",
              i === items.length - 1 && "min-[34rem]:pr-0"
            )}
          >
            <dt className="sr-only">{item.detail ?? item.label}</dt>
            <dd className="flex flex-col gap-1">
              {/* 28px — large enough to register while scanning, small
                  enough that it is not the loudest thing on the page. */}
              <span className="font-mono text-[1.75rem] font-medium leading-none tabular-nums tracking-tight text-foreground">
                {item.value}
              </span>
              <span className="text-xs font-medium text-foreground/80">
                {item.label}
              </span>
              {item.detail && (
                <span className="text-2xs leading-snug text-muted-foreground">
                  {item.detail}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default ProjectEvidence;
