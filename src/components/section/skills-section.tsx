import { getSkillsByCategory } from "@/data";
import type { SkillCategory } from "@/types";
import {
  Cloud,
  Code2,
  Database,
  LayoutTemplate,
  Lightbulb,
  type LucideIcon,
  Network,
  Plug,
  Server,
} from "lucide-react";

const CATEGORY_ICON: Record<SkillCategory, LucideIcon> = {
  languages: Code2,
  frontend: LayoutTemplate,
  backend: Server,
  databases: Database,
  cloud: Cloud,
  architecture: Network,
  integrations: Plug,
  domain: Lightbulb,
};

export default function SkillsSection() {
  const groups = getSkillsByCategory().filter(
    (group) => group.skills.length > 0
  );

  return (
    <div className="flex flex-col gap-3 w-full min-w-0">
      {groups.map((group) => {
        const Icon = CATEGORY_ICON[group.category];
        return (
          <div
            key={group.category}
            className="w-full min-w-0 max-w-full overflow-hidden border border-border rounded-xl bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-foreground/20 hover:bg-card/80 hover:shadow-sm p-3 md:p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-x-3 justify-between">
              <div className="flex items-center gap-x-2.5 flex-1 min-w-0">
                <div
                  aria-hidden
                  className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-background ring-1 ring-border/40 shadow-sm flex-none"
                >
                  <Icon className="size-3.5 text-foreground/80" />
                </div>
                <h3 className="text-sm font-semibold text-foreground/90 truncate">
                  {group.label}
                </h3>
              </div>
              <span className="inline-flex items-center h-5 px-1.5 rounded-md border border-border bg-muted/60 text-[10px] tabular-nums text-muted-foreground flex-none">
                {group.skills.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={`${group.category}-${skill.name}`}
                  className="inline-flex items-center gap-1.5 h-6 px-2 rounded-md border border-border bg-background text-[11px] font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:bg-muted/40"
                >
                  {skill.icon && (
                    <skill.icon className="size-3.5 rounded overflow-hidden object-contain" />
                  )}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
