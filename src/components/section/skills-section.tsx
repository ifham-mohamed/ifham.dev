import { SectionEyebrow } from "@/components/ui";
import { getCoreSkillNames, getSkillsByCategory } from "@/data";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";

/**
 * SkillsSection — a capability map, not a keyword dump.
 *
 * The previous version rendered 37 bordered pills inside eight bordered cards:
 * 45 boxes to communicate a list of words. Quantity was the only thing that
 * came through, and quantity is the least interesting fact here.
 *
 * Three changes carry the redesign:
 *
 *  1. Names are set as text on a divided grid rather than as pills. Chrome
 *     removed, spacing does the grouping.
 *  2. Core technologies are weighted up and everything else recedes, so the
 *     eye lands on depth instead of counting breadth. "Core" comes from the
 *     existing `featuredSkills` list — it is a curated emphasis, NOT a
 *     proficiency score. The data holds no levels, percentages or years, so
 *     none are shown: no bars, no stars, no "90% React".
 *  3. Domain expertise is pulled out entirely, because e-commerce and supply
 *     chain are things you understand, not things you install.
 */

/** One technology name. Core reads at full contrast, the rest recede. */
function SkillName({ skill, isCore }: { skill: Skill; isCore: boolean }) {
  const Icon = skill.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap text-xs",
        isCore ? "font-medium text-foreground" : "text-muted-foreground"
      )}
    >
      {Icon && <Icon className="size-3 shrink-0 opacity-80" />}
      {skill.name}
    </span>
  );
}

export default function SkillsSection() {
  const core = getCoreSkillNames();
  const groups = getSkillsByCategory().filter((g) => g.skills.length > 0);

  const tooling = groups.filter((g) => g.category !== "domain");
  const domain = groups.find((g) => g.category === "domain");

  return (
    <div className="flex flex-col gap-8">
      {/* The 1px gaps over a hairline background draw every rule in the grid
          at once — no per-cell border juggling, and no line ever doubles. */}
      <div className="grid grid-cols-1 gap-px border-y border-hairline bg-hairline min-[30rem]:grid-cols-2">
        {tooling.map((group) => (
          <div
            key={group.category}
            className="flex flex-col gap-2.5 bg-background px-1 py-4 min-[30rem]:px-4 min-[30rem]:first:pl-1"
          >
            <SectionEyebrow className="text-muted-foreground/70">
              {group.label}
            </SectionEyebrow>

            {/* gap-x is wide enough that names group by eye without needing a
                separator between them. */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {group.skills.map((skill) => (
                <SkillName
                  key={`${group.category}-${skill.name}`}
                  skill={skill}
                  isCore={core.has(skill.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Domain expertise ----------------
          Deliberately outside the grid and set larger. These are problem
          domains rather than tools, and putting them in the same cell as
          "Nginx" would imply they are the same kind of thing. */}
      {domain && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <SectionEyebrow>{domain.label}</SectionEyebrow>
            <span className="text-2xs text-muted-foreground/70">
              Business and system knowledge, not tooling
            </span>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {domain.skills.map((skill) => (
              <li
                key={skill.name}
                className="inline-flex items-center gap-2 text-sm text-foreground/85"
              >
                <span
                  aria-hidden
                  className="size-1 flex-none rounded-full bg-brand/70"
                />
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
