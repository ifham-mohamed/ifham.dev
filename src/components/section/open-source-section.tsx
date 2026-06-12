import Link from "next/link";
import { Icons } from "@/components/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowUpRight, GitMerge, Sparkles, Star, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Achievement {
  name: string;
  count?: number;
  icon: LucideIcon;
  description: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    name: "Pull Shark",
    count: 3,
    icon: GitMerge,
    description: "Pull Shark achievement, earned three times",
  },
  {
    name: "Pair Extraordinaire",
    icon: Users,
    description: "Pair Extraordinaire achievement",
  },
  {
    name: "Quickdraw",
    icon: Zap,
    description: "Quickdraw achievement",
  },
  {
    name: "YOLO",
    icon: Sparkles,
    description: "YOLO achievement",
  },
  {
    name: "Pro",
    icon: Star,
    description: "GitHub Pro account",
  },
];

const GITHUB_URL = "https://github.com/ifham-mohamed";

export default function OpenSourceSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6 w-full">
      <SectionHeading
        eyebrow="OPEN SOURCE"
        title="Building in public"
        description="GitHub achievements & open-source presence."
        anchor="open-source"
      />

      <div
        className={cn(
          "w-full border border-border rounded-xl bg-card/50 backdrop-blur-sm",
          "transition-all duration-200",
          "hover:border-foreground/20 hover:bg-card/80 hover:shadow-sm",
          "p-3 md:p-4 flex flex-col gap-4"
        )}
      >
        <div className="flex items-center gap-x-3 justify-between">
          <div className="flex items-center gap-x-3 flex-1 min-w-0">
            <div
              aria-hidden
              className="inline-flex size-10 md:size-11 items-center justify-center rounded-lg border border-border bg-background ring-1 ring-border/40 shadow-sm flex-none"
            >
              <Icons.github className="size-5 text-foreground/85" />
            </div>
            <div className="flex-1 min-w-0 gap-1 flex flex-col">
              <span className="font-semibold leading-tight truncate">
                github.com/ifham-mohamed
              </span>
              <span className="font-sans text-xs text-muted-foreground truncate">
                Open source contributions & personal projects
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pl-13 md:pl-14">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
            Achievements
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {ACHIEVEMENTS.map((badge) => {
              const Icon = badge.icon;
              const label = badge.count
                ? `${badge.name} ×${badge.count}`
                : badge.name;
              return (
                <span
                  key={badge.name}
                  aria-label={badge.description}
                  className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-border bg-background text-[11px] font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:bg-muted/40"
                >
                  <Icon className="size-3.5 text-foreground/60" aria-hidden />
                  {label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border/60 mt-1 -mx-3 md:-mx-4 px-3 md:px-4 pt-3">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "btn-sheen group/cta inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md",
              "bg-foreground text-background text-xs font-medium",
              "shadow-sm hover:shadow-md transition-all duration-200",
              "hover:gap-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            Visit GitHub profile
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
