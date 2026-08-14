import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Icons } from "@/components/icons";
import {
  ActionLink,
  ANCHOR_OFFSET,
  AvailabilityStatus,
  CopyEmail,
  CopyValueButton,
  SectionEyebrow,
  SectionIndex,
  Tag,
  TagRow,
} from "@/components/ui";
import {
  getPublicRepos,
  personalInfo,
  projects,
  socialLinks,
} from "@/data";

const GITHUB_ACHIEVEMENTS = [
  { label: "Pull Shark ×3", description: "Earned three times" },
  {
    label: "Pair Extraordinaire",
    description: "Co-authored merged pull requests",
  },
  {
    label: "Quickdraw",
    description: "Closed an issue or pull request within five minutes",
  },
  { label: "YOLO", description: "Merged a pull request without review" },
  { label: "Pro", description: "GitHub Pro account" },
] as const;

/** A compact, truthful GitHub profile assembled from source links already in project data. */
function GitHubProfileCard() {
  const github = socialLinks.GitHub;
  const repos = getPublicRepos();
  const selected = [...repos]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 3);
  const handle = github?.url.split("/").filter(Boolean).at(-1) ?? "ifham-mohamed";

  return (
    <aside
      aria-label="GitHub profile and featured repositories"
      className="overflow-hidden rounded-lg border border-border bg-surface"
    >
      <div className="relative overflow-hidden border-b border-hairline p-4">
        <div
          aria-hidden
          className="matrix-texture pointer-events-none absolute inset-0 opacity-75"
        />

        <div className="relative flex items-center gap-3">
          <div className="relative size-14 flex-none overflow-hidden rounded-full border border-border-strong bg-surface-raised shadow-sm">
            <Image
              src={personalInfo.avatarUrl}
              alt=""
              fill
              sizes="56px"
              className="scale-[1.72] object-cover object-[50%_12%]"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {personalInfo.name}
            </p>
            <p className="truncate font-mono text-2xs text-muted-foreground">
              @{handle} · {personalInfo.title}
            </p>
          </div>

          <Icons.github
            aria-hidden
            className="size-5 flex-none text-muted-foreground"
          />
        </div>

        <dl className="relative mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-hairline bg-hairline">
          <div className="flex flex-col bg-surface/95 px-3 py-2.5">
            <dt className="order-2 text-2xs text-muted-foreground">
              Public repositories
            </dt>
            <dd className="order-1 font-mono text-lg font-medium tabular-nums text-foreground">
              {repos.length}
            </dd>
          </div>
          <div className="flex flex-col bg-surface/95 px-3 py-2.5">
            <dt className="order-2 text-2xs text-muted-foreground">
              Case studies
            </dt>
            <dd className="order-1 font-mono text-lg font-medium tabular-nums text-foreground">
              {projects.length}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <SectionEyebrow>Featured repositories</SectionEyebrow>

        <ul className="divide-y divide-hairline border-y border-hairline">
          {selected.map((repo) => (
            <li key={repo.href}>
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/repo flex items-center justify-between gap-3 py-2.5"
              >
                <span className="min-w-0">
                  <span className="block truncate font-mono text-xs text-foreground/90 transition-colors group-hover/repo:text-brand-hover">
                    {repo.name}
                  </span>
                  <span className="block truncate text-2xs text-muted-foreground">
                    {repo.projectName}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 flex-none text-subtle-foreground transition-transform group-hover/repo:-translate-y-0.5 group-hover/repo:translate-x-0.5"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2.5">
          <SectionEyebrow>GitHub achievements</SectionEyebrow>
          <TagRow>
            {GITHUB_ACHIEVEMENTS.map(({ label, description }) => (
              <Tag key={label} variant="outline" title={description}>
                {label}
              </Tag>
            ))}
          </TagRow>
        </div>

        {github && (
          <a
            href={github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/profile inline-flex w-fit items-center gap-1.5 text-xs font-medium text-brand transition-colors hover:text-brand-hover"
          >
            View full GitHub profile
            <ArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform group-hover/profile:-translate-y-0.5 group-hover/profile:translate-x-0.5"
            />
          </a>
        )}
      </div>
    </aside>
  );
}

/** Closing contact action paired with a concise, data-driven proof panel. */
export default function ContactSection() {
  const linkedin = socialLinks.LinkedIn;
  const phoneHref = `tel:${personalInfo.phone.replace(/\s/g, "")}`;

  return (
    <section id="contact" className={ANCHOR_OFFSET}>
      <div className="grid gap-7 rounded-lg border border-border bg-surface-raised p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)] lg:items-stretch lg:gap-8">
        <div className="flex min-w-0 flex-col gap-7">
          <div className="flex flex-col gap-3">
            <SectionEyebrow>
              <SectionIndex value={9} />
              Let&apos;s work together
            </SectionEyebrow>

            <h2 className="max-w-[22ch] text-2xl font-semibold leading-tight tracking-tight text-foreground">
              Have a project, role or engineering problem worth discussing?
            </h2>

            <p className="max-w-[56ch] text-base leading-relaxed text-muted-foreground">
              I&apos;m open to software engineering roles, freelance builds and
              conversations about systems that need to hold up in production.
            </p>
          </div>

          <AvailabilityStatus location={personalInfo.location} />

          <div className="flex flex-col gap-2 min-[26rem]:flex-row min-[26rem]:flex-wrap min-[26rem]:items-center">
            <ActionLink
              href={`mailto:${personalInfo.email}`}
              variant="primary"
              size="md"
              external={false}
              icon={<Mail aria-hidden className="size-4" />}
              className="justify-center min-[26rem]:justify-start"
            >
              Send me an email
            </ActionLink>

            {linkedin && (
              <ActionLink
                href={linkedin.url}
                size="md"
                icon={<Icons.linkedin className="size-4 opacity-70" />}
                className="justify-center min-[26rem]:justify-start"
              >
                LinkedIn
              </ActionLink>
            )}

            <ActionLink
              href={phoneHref}
              external={false}
              size="md"
              icon={<Phone aria-hidden className="size-4 opacity-70" />}
              className="justify-center min-[26rem]:justify-start"
            >
              Call me
            </ActionLink>
          </div>

          <div className="grid gap-3 border-t border-hairline pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5">
            <CopyEmail
              email={personalInfo.email}
              className="border-0 pt-0"
            />

            <div className="flex w-fit items-center gap-2">
              <a
                href={phoneHref}
                className="group/phone inline-flex w-fit items-center gap-2 rounded-md text-sm text-foreground transition-colors hover:text-brand-hover"
                aria-label={`Call ${personalInfo.name} at ${personalInfo.phone}`}
              >
                <span className="grid size-8 place-items-center rounded-md border border-border-strong bg-surface text-muted-foreground transition-colors group-hover/phone:bg-brand-subtle group-hover/phone:text-brand-hover">
                  <Phone aria-hidden className="size-3.5" />
                </span>
                <span className="font-mono tabular-nums">
                  {personalInfo.phone}
                </span>
              </a>
              <CopyValueButton
                value={personalInfo.phone.replace(/\s/g, "")}
                label="phone number"
              />
            </div>
          </div>
        </div>

        <GitHubProfileCard />
      </div>
    </section>
  );
}
