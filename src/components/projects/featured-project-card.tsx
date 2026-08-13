import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectVisual } from "./project-visual";
import { Divider, StatusBadge, Tag, TagRow } from "@/components/ui";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * FeaturedProjectCard — the homepage's editorial project card.
 *
 * The section used to be an accordion of one-line summaries, which read as a
 * directory. Everything shown here already existed in the project data and was
 * simply not surfaced: the problem statement, the system summary, the concepts
 * the build actually required, the role.
 *
 * Nothing is authored in this component. `category` is split off the existing
 * title, `problem` and `oneLiner` are trimmed to their first sentence, and the
 * highlights are the first three `conceptsLearned` verbatim.
 */

/** Splits "DynaPOS - Multi-Tenant SaaS POS Platform" into name + category. */
function splitTitle(title: string) {
  const i = title.indexOf(" - ");
  return i > 0
    ? { name: title.slice(0, i), category: title.slice(i + 3) }
    : { name: title, category: undefined };
}

/**
 * First sentence, capped.
 *
 * Project `problem` fields run to several sentences of constraints; the card
 * needs the opening claim only. The cap catches the cases where the first
 * sentence is itself a paragraph.
 */
function firstSentence(text: string, max = 190) {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  const sentence = (match?.[0] ?? text).trim();
  if (sentence.length <= max) return sentence;

  // Back off to the last word boundary so the ellipsis never lands mid-word.
  const clipped = sentence.slice(0, max);
  const lastSpace = clipped.lastIndexOf(" ");
  const safe = lastSpace > max * 0.6 ? clipped.slice(0, lastSpace) : clipped;
  return `${safe.replace(/[\s,;:–—-]+$/, "")}…`;
}

const MAX_TAGS = 5;

export function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { name, category } = splitTitle(project.title);
  const highlights = project.conceptsLearned?.slice(0, 3) ?? [];
  const tags = project.technologies?.slice(0, MAX_TAGS) ?? [];
  const overflow = (project.technologies?.length ?? 0) - tags.length;
  const href = `/projects/${project.id}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-lg border border-border bg-surface p-4 sm:p-5",
        "transition-colors duration-200",
        "hover:border-foreground/15 hover:bg-surface-hover",
        "focus-within:border-foreground/25"
      )}
    >
      {/* --- Metadata --- */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-2xs text-muted-foreground">
        <span className="tabular-nums text-muted-foreground/55">
          {String(index).padStart(2, "0")}
        </span>
        <span aria-hidden className="h-3 w-px bg-hairline" />
        <span className="tabular-nums">{project.dates}</span>
        {project.active && <StatusBadge label="Active" />}
        {project.featured && <Tag variant="brand">Featured</Tag>}
        {project.role && (
          <span className="ml-auto truncate text-muted-foreground/80">
            {project.role}
          </span>
        )}
      </div>

      {/* --- Name + category --- */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {/* The stretched link makes the whole card activatable while keeping
              one real, correctly-labelled link in the accessibility tree. */}
          <Link
            href={href}
            className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-brand"
          >
            {name}
          </Link>
        </h3>
        {category && (
          <p className="text-xs text-muted-foreground">{category}</p>
        )}
      </div>

      {/* --- Visual --- */}
      <ProjectVisual
        image={project.image}
        video={project.video}
        visual={project.visual}
        title={name}
      />

      {/* --- Problem then system --- */}
      <div className="flex flex-col gap-2.5">
        {project.problem && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="mr-2 font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground/60">
              Problem
            </span>
            {firstSentence(project.problem)}
          </p>
        )}
        {project.oneLiner && (
          <p className="text-sm leading-relaxed text-foreground/80">
            {firstSentence(project.oneLiner, 210)}
          </p>
        )}
      </div>

      {/* --- Highlights + stack --- */}
      {highlights.length > 0 && (
        <>
          <Divider />
          <ul className="flex flex-col gap-1.5">
            {highlights.map((item) => (
              <li
                key={item}
                className="relative pl-4 text-xs leading-relaxed text-foreground/75 before:absolute before:left-0 before:top-[0.55em] before:size-1 before:rounded-full before:bg-brand/60"
              >
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {tags.length > 0 && (
        <TagRow>
          {tags.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
          {overflow > 0 && <Tag variant="ghost">+{overflow}</Tag>}
        </TagRow>
      )}

      {/* --- CTA. A span, not a link: the stretched link above already owns
              the destination, and nesting a second one would be invalid. --- */}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-foreground">
        View case study
        <ArrowRight
          aria-hidden
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </article>
  );
}

export default FeaturedProjectCard;
