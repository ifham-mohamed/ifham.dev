import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  BackLink,
  MetaItem,
  MetadataRow,
  SectionEyebrow,
  StatusBadge,
  Tag,
} from "@/components/ui";
import type { Project } from "@/types";

/**
 * CaseStudyHero — the opening of every /projects/[slug] page.
 *
 * Generic over `Project`. Nothing here is specific to any one project: the
 * title split, the actions and the rail all derive from fields every project
 * has, and each block renders only when its data exists.
 *
 * The change that matters is what this component *stops* doing. The page used
 * to print `oneLiner` in the hero and then `overview` immediately beneath it
 * with no heading between — two introductory paragraphs in a row, 200 and 500
 * characters, saying much the same thing. The hero now takes the short
 * proposition only; `overview` moves under an Overview heading where it reads
 * as a section rather than a repeat.
 *
 * Layout is 12 columns from 1100px: eight for the reading column, four for a
 * rail carrying the signals and the links. Below that it stacks. The rail
 * exists because a 1200px viewport with a 700px text column has 400px of
 * nothing on the right, and the signals are the most useful thing to put in
 * it — they are evidence, not decoration.
 */

/** "Source" is what the data calls it; "Repository" is what people read. */
const ACTION_LABEL: Record<string, string> = {
  Source: "Repository",
  Live: "Live product",
  Website: "Website",
  Demo: "Live demo",
  Documentation: "Documentation",
  Report: "Report",
  "Case Study": "Case study",
};

/** Splits "DynaPOS - Multi-Tenant SaaS POS Platform" into name + category. */
function splitTitle(title: string) {
  const i = title.indexOf(" - ");
  return i > 0
    ? { name: title.slice(0, i), category: title.slice(i + 3) }
    : { name: title, category: undefined };
}

/**
 * Real links only, de-duplicated.
 *
 * `project.href` repeats one of the `links` entries on every project that has
 * both, and is an empty string on at least one — so it is folded in by URL
 * rather than rendered as a separate action.
 */
function getActions(project: Project) {
  const seen = new Set<string>();
  const actions: { label: string; href: string; external: boolean }[] = [];

  const addAction = (label: string, href: string) => {
    actions.push({
      label,
      href,
      external: /^https?:|^mailto:/.test(href),
    });
  };

  for (const link of project.links ?? []) {
    if (!link.href || seen.has(link.href)) continue;
    seen.add(link.href);
    addAction(ACTION_LABEL[link.type] ?? link.type, link.href);
  }

  if (project.href && !seen.has(project.href)) {
    addAction("Visit project", project.href);
  }

  return actions;
}

export function CaseStudyHero({ project }: { project: Project }) {
  const { name, category } = splitTitle(project.title);
  const actions = getActions(project);
  const signals = project.signals?.slice(0, 3) ?? [];

  return (
    <header className="flex flex-col gap-6">
      <BackLink href="/projects">All projects</BackLink>

      <div className="grid gap-8 min-[1100px]:grid-cols-12 min-[1100px]:gap-10">
        {/* ---------------- Reading column ---------------- */}
        <div className="flex flex-col gap-4 min-[1100px]:col-span-8">
          <MetadataRow>
            <time>{project.dates}</time>
            {project.role && <MetaItem>{project.role}</MetaItem>}
            {project.active && <StatusBadge label="Active" />}
            {project.featured && <Tag variant="brand">Featured</Tag>}
          </MetadataRow>

          {/* Strong, but capped at 2rem/2.25rem. A case study is a document;
              a 4rem display face would be a landing page. */}
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {name}
            {category && (
              <>
                <span aria-hidden className="mx-2 text-border-strong">
                  —
                </span>
                <span className="text-muted-foreground">{category}</span>
              </>
            )}
          </h1>

          {/* The single proposition. `overview` deliberately does not appear
              here — it belongs to the Overview section below. */}
          {project.oneLiner && (
            <p className="max-w-case-text text-base leading-relaxed text-muted-foreground">
              {project.oneLiner}
            </p>
          )}

          {/* Actions live in the reading column below 1100px, where the rail
              has collapsed and they would otherwise be stranded at the end. */}
          {actions.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 min-[1100px]:hidden">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  className="group/act inline-flex h-9 items-center gap-1.5 rounded-md border border-border-strong bg-surface px-3 text-xs font-medium text-foreground/85 transition-colors hover:bg-surface-raised hover:text-brand-hover"
                >
                  {action.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 opacity-60 transition-transform duration-200 group-hover/act:translate-x-0.5 group-hover/act:-translate-y-0.5"
                  />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- Rail ---------------- */}
        {(signals.length > 0 || actions.length > 0) && (
          <aside
            aria-label="Project summary"
            className="hidden min-[1100px]:col-span-4 min-[1100px]:flex min-[1100px]:flex-col min-[1100px]:gap-5 min-[1100px]:rounded-lg min-[1100px]:border min-[1100px]:border-border min-[1100px]:bg-surface min-[1100px]:p-5"
          >
            {signals.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <SectionEyebrow>
                  At a glance
                </SectionEyebrow>
                <ul className="flex flex-col gap-2">
                  {signals.map((signal) => (
                    <li
                      key={signal}
                      className="flex items-start gap-2 text-xs leading-relaxed text-foreground/80"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.45em] size-1 flex-none rounded-full bg-brand"
                      />
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {actions.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-hairline pt-4">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className="group/act inline-flex items-center justify-between gap-2 text-xs font-medium text-brand transition-colors hover:text-brand-hover"
                  >
                    {action.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 opacity-50 transition-transform duration-200 group-hover/act:translate-x-0.5 group-hover/act:-translate-y-0.5"
                    />
                  </Link>
                ))}
              </div>
            )}
          </aside>
        )}
      </div>
    </header>
  );
}

export default CaseStudyHero;
