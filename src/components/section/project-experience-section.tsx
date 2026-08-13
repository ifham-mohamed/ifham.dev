import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { getFeaturedProjects, projects } from "@/data";

/**
 * ProjectExperienceSection — the homepage's centrepiece.
 *
 * Previously an accordion of collapsed one-line summaries, which read as a
 * directory of links rather than as evidence. Each project already carried a
 * problem statement, a system summary, a dozen named concepts and a role — all
 * of it collapsed behind a chevron.
 *
 * The cards are a consistent stacked layout rather than alternating
 * content-left / content-right. Alternation needs roughly 900px to give both
 * halves room; the page column is 672px, so alternating would have produced
 * two cramped ~320px columns and a *weaker* rhythm, not a stronger one.
 * Differentiation comes from each project's own motif instead.
 *
 * No client JavaScript: this renders entirely on the server.
 */
export default function ProjectExperienceSection({
  limit = 4,
}: {
  limit?: number;
}) {
  const featured = getFeaturedProjects(limit);

  return (
    <div className="flex flex-col gap-4">
      {featured.map((project, i) => (
        <FeaturedProjectCard
          key={project.id}
          project={project}
          index={i + 1}
        />
      ))}

      {/* Count comes from the data, so it cannot drift as projects are added. */}
      <Link
        href="/projects"
        className="group/all inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-3 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-surface hover:text-foreground"
      >
        View all {projects.length} projects
        <ArrowRight
          aria-hidden
          className="size-3.5 transition-transform duration-200 group-hover/all:translate-x-0.5"
        />
      </Link>
    </div>
  );
}
