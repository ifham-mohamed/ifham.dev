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
 * -- Two columns from 1024px --
 *
 * This used to be a single stack, justified by the homepage being a 672px
 * column. That is no longer true: the page moved to the 75rem shell, and four
 * full-width cards across 1200px left each card's content column running about
 * 1080px - far past the measure the card was built against, and a long scroll
 * for only four items.
 *
 * Two up puts each card back near 580px, close to its original width. The
 * card's own internal grid (a 6rem metadata rail beside the content) is
 * untouched and still has room.
 *
 * Still not alternating content-left / content-right: differentiation comes
 * from each project's motif, and mirroring the layout every other card makes a
 * grid harder to scan rather than more interesting.
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
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
        className="group/all inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-3 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-surface hover:text-foreground lg:col-span-2"
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
