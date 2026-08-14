import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectVisual } from "./project-visual";
import { StatusBadge, Tag, TagRow } from "@/components/ui";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * FeaturedProjectCard — a substantial project row, not a product card.
 *
 * This is the homepage tier of a three-level structure and is deliberately
 * the thinnest: `/projects` is the full directory and `/projects/[slug]` is
 * the case study. The job here is only to make opening the case study feel
 * worthwhile.
 *
 * An earlier pass showed the problem statement *and* the system summary —
 * about 400 characters per project — plus three full `conceptsLearned`
 * sentences. That is a case study in miniature, which is exactly the level
 * distinction this section is supposed to preserve. It now shows one sentence
 * and three short signals.
 *
 * Nothing is authored here: category splits off the existing title, the
 * description trims `oneLiner`, and signals come from the project's own
 * `signals` field (itself a compression of its `conceptsLearned`).
 */

/** Splits "DynaPOS - Multi-Tenant SaaS POS Platform" into name + category. */
function splitTitle(title: string) {
  const i = title.indexOf(" - ");
  return i > 0
    ? { name: title.slice(0, i), category: title.slice(i + 3) }
    : { name: title, category: undefined };
}

/** First sentence, capped at a word boundary. */
function shortDescription(text: string, max = 155) {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  const sentence = (match?.[0] ?? text).trim();
  if (sentence.length <= max) return sentence;

  const clipped = sentence.slice(0, max);
  const lastSpace = clipped.lastIndexOf(" ");
  const safe = lastSpace > max * 0.6 ? clipped.slice(0, lastSpace) : clipped;
  return `${safe.replace(/[\s,;:–—-]+$/, "")}…`;
}

/** Four is enough to place the stack; the rest is a count. */
const MAX_TAGS = 4;

export function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { name, category } = splitTitle(project.title);
  const signals = project.signals?.slice(0, 3) ?? [];
  const tags = project.technologies?.slice(0, MAX_TAGS) ?? [];
  const overflow = (project.technologies?.length ?? 0) - tags.length;
  const summary = project.oneLiner ?? project.description;

  return (
    <article
      className={cn(
        "group relative rounded-lg border border-border bg-surface p-4 sm:p-5",
        "transition-colors duration-200",
        "hover:border-border-strong hover:bg-surface-hover",
        "focus-within:border-border-strong"
      )}
    >
      <div className="grid gap-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-6">
        {/* ---------------- Metadata rail ----------------
            A row on mobile, a column on wide screens. Same markup, so the
            reading order is metadata → title → visual at every width. */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-2xs text-muted-foreground sm:flex-col sm:items-start sm:gap-2">
          <span className="tabular-nums text-subtle-foreground">
            {String(index).padStart(2, "0")}
          </span>
          <span className="tabular-nums">{project.dates}</span>
          {project.active && <StatusBadge label="Active" />}
          {project.featured && <Tag variant="brand">Featured</Tag>}
          {/* What he personally did — one of the four things a recruiter is
              scanning for, so it stays in the rail rather than the prose. */}
          {project.role && (
            <span className="text-muted-foreground sm:max-w-full">
              {project.role}
            </span>
          )}
        </div>

        {/* ---------------- Content column ---------------- */}
        <div className="flex min-w-0 flex-col gap-3.5">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {name}
            </h3>
            {category && (
              <p className="text-xs text-muted-foreground">{category}</p>
            )}
          </div>

          <ProjectVisual
            image={project.image}
            video={project.video}
            visual={project.visual}
            title={name}
          />

          {summary && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {shortDescription(summary)}
            </p>
          )}

          {/* Engineering signals. Distinct from the stack below: these say
              what was hard, the tags say what it was written in. */}
          {signals.length > 0 && (
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {signals.map((signal) => (
                <li
                  key={signal}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80"
                >
                  <span
                    aria-hidden
                    className="size-1 flex-none rounded-full bg-brand"
                  />
                  {signal}
                </li>
              ))}
            </ul>
          )}

          {tags.length > 0 && (
            <TagRow>
              {tags.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
              {overflow > 0 && (
                <Tag variant="ghost">+{overflow} technologies</Tag>
              )}
            </TagRow>
          )}

          {/* The one link in the card. It carries the destination, stretches
              over the whole container via the pseudo-element, and names the
              project so its accessible name is not a bare "View case study"
              repeated four times down the page. */}
          <Link
            href={`/projects/${project.id}`}
            aria-label={`View case study: ${name}`}
            className={cn(
              "inline-flex w-fit items-center gap-1.5 text-xs font-medium text-foreground outline-none",
              "after:absolute after:inset-0 after:rounded-lg",
              "focus-visible:after:ring-2 focus-visible:after:ring-brand"
            )}
          >
            View case study
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default FeaturedProjectCard;
