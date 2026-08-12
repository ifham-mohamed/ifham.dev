import { Tag, TagRow } from "@/components/ui";
import { getSkillsByCategory } from "@/data";

/**
 * SkillsSection — one panel per category previously meant eight bordered
 * cards stacked vertically, each with its own icon tile and count badge:
 * a lot of chrome around what is fundamentally a list of words.
 *
 * This renders as a definition list with a hairline between rows. Same
 * information, roughly a third of the vertical space, and the eye can scan
 * the category column without stepping over card edges.
 */
export default function SkillsSection() {
  const groups = getSkillsByCategory().filter((g) => g.skills.length > 0);

  return (
    <dl className="flex w-full flex-col divide-y divide-hairline overflow-hidden rounded-lg border border-border bg-surface">
      {groups.map((group) => (
        <div
          key={group.category}
          className="flex flex-col gap-2 p-4 sm:flex-row sm:items-baseline sm:gap-4"
        >
          <dt className="flex-none text-2xs font-medium uppercase tracking-[0.12em] text-muted-foreground sm:w-32 sm:pt-0.5">
            {group.label}
          </dt>
          <dd className="min-w-0 flex-1">
            <TagRow>
              {group.skills.map((skill) => (
                <Tag key={`${group.category}-${skill.name}`}>
                  {skill.icon && (
                    <skill.icon className="size-3.5 object-contain" />
                  )}
                  {skill.name}
                </Tag>
              ))}
            </TagRow>
          </dd>
        </div>
      ))}
    </dl>
  );
}
