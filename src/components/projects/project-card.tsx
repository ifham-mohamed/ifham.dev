import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectVisual } from "./project-visual";
import { StatusBadge, Tag, TagRow } from "@/components/ui";
import type { ProjectVisual as ProjectVisualType } from "@/types";
import { cn } from "@/lib/utils";

/**
 * ProjectCard — one entry in the /projects directory.
 *
 * Ordered to answer five questions in the order they get asked: what is it
 * (title + category), when (date), what problem (description), what makes it
 * interesting (signals + stack), where to read more (CTA).
 *
 * The card has exactly one link. Its pseudo-element covers the whole card, so
 * the surface is clickable without nesting interactive elements — a card
 * wrapped in an anchor containing more anchors is invalid, and screen readers
 * announce the inner ones as separate stops with no context.
 *
 * Height is content-driven with a floor rather than a fixed frame: `min-h`
 * stops a one-line description from collapsing a card next to a three-line
 * neighbour, while `mt-auto` pins the CTA to the bottom so the row of cards
 * still aligns.
 */

const MAX_TAGS = 4;

interface ProjectCardProps {
  index: number;
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  signals?: readonly string[];
  active?: boolean;
  featured?: boolean;
  image?: string;
  video?: string;
  visual?: ProjectVisualType;
  headingLevel?: 2 | 3;
  className?: string;
}

/** Splits "DynaPOS - Multi-Tenant SaaS POS Platform" into name + category. */
function splitTitle(title: string) {
  const i = title.indexOf(" - ");
  return i > 0
    ? { name: title.slice(0, i), category: title.slice(i + 3) }
    : { name: title, category: undefined };
}

export function ProjectCard({
  index,
  title,
  href,
  description,
  dates,
  tags,
  signals,
  active,
  featured,
  image,
  video,
  visual,
  headingLevel = 3,
  className,
}: ProjectCardProps) {
  const { name, category } = splitTitle(title);
  const visible = tags?.slice(0, MAX_TAGS) ?? [];
  const overflow = (tags?.length ?? 0) - visible.length;
  const shownSignals = signals?.slice(0, 3) ?? [];
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      className={cn(
        "group relative flex min-h-[22rem] flex-col overflow-hidden rounded-lg border border-border bg-surface",
        "transition-colors duration-200",
        "hover:border-border-strong hover:bg-surface-hover",
        "focus-within:border-border-strong",
        className
      )}
    >
      <ProjectVisual
        image={image}
        video={video}
        visual={visual}
        title={title}
        ratio="compact"
      />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* --- When / status --- */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-2xs text-muted-foreground">
          <span className="tabular-nums text-subtle-foreground">
            {String(index).padStart(2, "0")}
          </span>
          <span className="tabular-nums">{dates}</span>
          {active && <StatusBadge label="Active" />}
          {featured && <Tag variant="brand">Featured</Tag>}
        </div>

        {/* --- What is it --- */}
        <div className="flex flex-col gap-1">
          <Heading className="text-base font-semibold leading-snug tracking-tight text-foreground">
            {href ? (
              <Link
                href={href}
                className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-brand"
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </Heading>
          {category && (
            <p className="text-xs text-muted-foreground">{category}</p>
          )}
        </div>

        {/* --- What problem. Clamped rather than truncated: the title always
              shows in full, only the description is capped. --- */}
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* --- What makes it interesting --- */}
        {shownSignals.length > 0 && (
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {shownSignals.map((signal) => (
              <li
                key={signal}
                className="inline-flex items-center gap-1.5 text-2xs font-medium text-foreground/75"
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

        {visible.length > 0 && (
          <TagRow>
            {visible.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {overflow > 0 && <Tag variant="ghost">+{overflow}</Tag>}
          </TagRow>
        )}

        {/* --- Where to read more --- */}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-foreground">
          Case study
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}

export default ProjectCard;
