import Link from "next/link";
import { ProjectVisual } from "./project-visual";
import { ArrowUpRight } from "lucide-react";
import { Tag, TagRow } from "@/components/ui";
import type { ProjectVisual as ProjectVisualType } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  visual?: ProjectVisualType;
  className?: string;
}

/**
 * ProjectCard — grid card for /projects.
 *
 * Rebuilt off the shadcn Card stack (Card/CardHeader/CardContent/CardFooter
 * for what is four lines of text) onto plain markup, and the description no
 * longer round-trips through react-markdown just to render a sentence — that
 * pulled the whole markdown parser into a listing page.
 */
export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  visual,
  className,
}: ProjectCardProps) {
  const visible = tags?.slice(0, 4) ?? [];
  const overflow = (tags?.length ?? 0) - visible.length;

  return (
    <Link
      href={href || "#"}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface",
        "transition-colors duration-200 hover:border-foreground/15 hover:bg-surface-hover",
        !href && "pointer-events-none",
        className
      )}
    >
      {/* Was a 16:9 box containing the project's first letter at 2rem — half
          the card height to say nothing. ProjectVisual picks the strongest
          available representation instead. */}
      <ProjectVisual
        image={image}
        video={video}
        visual={visual}
        title={title}
      />

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium leading-snug text-foreground">
            {title}
          </h3>
          <ArrowUpRight
            aria-hidden
            className="size-3.5 flex-none translate-y-0.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>

        <time className="text-2xs tabular-nums text-muted-foreground">
          {dates}
        </time>

        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {visible.length > 0 && (
          <TagRow className="mt-auto pt-2">
            {visible.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {overflow > 0 && <Tag variant="ghost">+{overflow}</Tag>}
          </TagRow>
        )}
      </div>
    </Link>
  );
}

export default ProjectCard;
