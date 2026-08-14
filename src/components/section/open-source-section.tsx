import Image from "next/image";
import { Icons } from "@/components/icons";
import {
  Divider,
  Section,
  SectionEyebrow,
  Tag,
  TagRow,
} from "@/components/ui";
import { getPublicRepos, personalInfo, projects, socialLinks } from "@/data";
import { ArrowUpRight } from "lucide-react";

/**
 * OpenSourceSection — evidence of building in public.
 *
 * The previous version led with five GitHub achievement badges — Pull Shark,
 * YOLO, Quickdraw. Those are participation trophies: YOLO is awarded for
 * merging without review. Presenting them as the proof of engineering quality
 * actively undersells work that includes ten public repositories.
 *
 * So the badges move to the end at the smallest size on the page, and the
 * evidence becomes the repositories themselves — all of which were already in
 * the project data as "Source" links. No GitHub API call: a rate-limited
 * request that renders an empty box when it fails is worse than no module, and
 * decorating a section is not a good reason to add a network dependency.
 *
 * The counts are computed, so they cannot drift as projects are added.
 */

interface Achievement {
  name: string;
  count?: number;
  description: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { name: "Pull Shark", count: 3, description: "Earned three times" },
  { name: "Pair Extraordinaire", description: "Co-authored merged pull requests" },
  { name: "Quickdraw", description: "Closed an issue or pull request within 5 minutes" },
  { name: "YOLO", description: "Merged a pull request without review" },
  { name: "Pro", description: "GitHub Pro account" },
];

/** A derived figure. Mono, so the numbers align down the row. */
function RepoStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-lg font-medium tabular-nums text-foreground">
        {value}
      </span>
      <span className="text-2xs leading-snug text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function OpenSourceSection() {
  const github = socialLinks.GitHub;
  const repos = getPublicRepos();

  const personal = repos.filter((r) => r.isPersonal).length;
  const collaborative = repos.length - personal;

  // Featured first, then the rest — capped so this stays a sample, not a list.
  const selected = [...repos]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 5);

  return (
    <Section
      id="open-source"
      eyebrow="Open source"
      index={8}
      title="Building in public"
      description="Source is public where it can be, and every project here is written up as a case study."
    >
      <div className="flex flex-col gap-6">
        {/* ---------------- Profile identity ---------------- */}
        <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
          {/* Grid motif — technical texture, not a contribution heatmap.
              A fake heatmap would imply activity data this site does not have. */}
          <div
            aria-hidden
            className="matrix-texture pointer-events-none absolute inset-0 opacity-[0.7]"
            style={{
              maskImage:
                "radial-gradient(120% 100% at 88% 0%, black, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(120% 100% at 88% 0%, black, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col gap-4 p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="relative size-10 flex-none overflow-hidden rounded-full border border-border-strong bg-surface-raised shadow-sm">
                <Image
                  src={personalInfo.avatarUrl}
                  alt=""
                  fill
                  sizes="40px"
                  className="scale-[2.15] object-cover object-[50%_23%]"
                />
              </span>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-medium text-foreground">
                  {personalInfo.name}
                </span>
                <span className="truncate font-mono text-2xs text-muted-foreground">
                  @ifham-mohamed · Open-source engineering
                </span>
              </div>

              <Icons.github
                aria-hidden
                className="hidden size-5 flex-none text-subtle-foreground min-[30rem]:block"
              />

              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/gh inline-flex h-8 flex-none items-center gap-1.5 rounded-md border border-transparent bg-foreground px-3 text-xs font-medium text-background transition-colors hover:bg-foreground/88"
                >
                  View GitHub
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 opacity-70 transition-transform duration-200 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5"
                  />
                </a>
              )}
            </div>

            <Divider />

            <dl className="grid grid-cols-2 gap-4 min-[30rem]:grid-cols-4">
              <RepoStat value={repos.length} label="Public repositories" />
              <RepoStat value={personal} label="Personal repositories" />
              {/* Plain "&" — this is a JS string prop, not JSX text, so an
                  HTML entity here would render as literal "&amp;". */}
              <RepoStat value={collaborative} label="Team & org repositories" />
              <RepoStat value={projects.length} label="Documented case studies" />
            </dl>
          </div>
        </div>

        {/* ---------------- Selected public work ---------------- */}
        {selected.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <SectionEyebrow>Selected repositories</SectionEyebrow>

            <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
              {selected.map((repo) => (
                <li key={repo.href}>
                  <a
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/repo flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <span className="min-w-0 truncate font-mono text-xs text-foreground/85 transition-colors group-hover/repo:text-foreground">
                      <span className="text-subtle-foreground">
                        {repo.owner}/
                      </span>
                      {repo.name}
                    </span>

                    <span className="flex flex-none items-center gap-2">
                      <span className="hidden text-2xs text-muted-foreground min-[26rem]:inline">
                        {repo.projectName}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover/repo:opacity-100"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ---------------- Achievements, deliberately last ---------------- */}
        <div className="flex flex-col gap-2">
          <SectionEyebrow>
            GitHub achievements
          </SectionEyebrow>
          <TagRow>
            {ACHIEVEMENTS.map(({ name, count, description }) => (
              <Tag key={name} variant="outline" title={description}>
                {count ? `${name} ×${count}` : name}
              </Tag>
            ))}
          </TagRow>
        </div>
      </div>
    </Section>
  );
}
