import { Icons } from "@/components/icons";
import {
  ActionLink,
  Panel,
  PanelFooter,
  RHYTHM,
  Section,
  Tag,
  TagRow,
} from "@/components/ui";
import { GitMerge, Sparkles, Star, Users, Zap } from "lucide-react";
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
  { name: "Quickdraw", icon: Zap, description: "Quickdraw achievement" },
  { name: "YOLO", icon: Sparkles, description: "YOLO achievement" },
  { name: "Pro", icon: Star, description: "GitHub Pro account" },
];

const GITHUB_URL = "https://github.com/ifham-mohamed";
const GITHUB_HANDLE = "github.com/ifham-mohamed";

export default function OpenSourceSection() {
  return (
    <Section
      id="open-source"
      eyebrow="Open source"
      index={7}
      title="Building in public"
      action={{ label: "GitHub", href: GITHUB_URL }}
    >
      <Panel className={RHYTHM.block}>
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className="grid size-10 flex-none place-items-center rounded-md border border-border bg-background"
          >
            <Icons.github className="size-4 text-foreground/80" />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate font-mono text-sm text-foreground">
              {GITHUB_HANDLE}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Contributions &amp; personal projects
            </span>
          </div>
        </div>

        <TagRow>
          {ACHIEVEMENTS.map(({ name, count, icon: Icon, description }) => (
            <Tag key={name} title={description}>
              <Icon aria-hidden className="size-3 text-muted-foreground" />
              {count ? `${name} ×${count}` : name}
            </Tag>
          ))}
        </TagRow>

        <PanelFooter className="sm:ml-0 sm:pl-0">
          <ActionLink href={GITHUB_URL} variant="primary">
            View profile
          </ActionLink>
        </PanelFooter>
      </Panel>
    </Section>
  );
}
