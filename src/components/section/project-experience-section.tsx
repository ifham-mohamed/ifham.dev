"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { projects } from "@/data";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function ProjectThumb({ src, alt }: { src?: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        aria-hidden
        className="size-10 md:size-11 rounded-lg border border-border bg-linear-to-br from-muted to-muted/50 ring-1 ring-border/40 shadow-sm flex-none flex items-center justify-center"
      >
        <span className="text-sm font-semibold text-muted-foreground">
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={44}
      height={44}
      className="size-10 md:size-11 rounded-lg border border-border ring-1 ring-border/40 shadow-sm overflow-hidden object-cover flex-none bg-background"
      onError={() => setImageError(true)}
    />
  );
}

function shortTitle(title: string): string {
  const dashIdx = title.indexOf(" - ");
  return dashIdx > 0 ? title.slice(0, dashIdx) : title;
}

function projectSubtitle(title: string, role?: string): string | undefined {
  const dashIdx = title.indexOf(" - ");
  const tail = dashIdx > 0 ? title.slice(dashIdx + 3) : undefined;
  return tail ?? role;
}

export default function ProjectExperienceSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-3">
      {projects.map((project) => {
        const subtitle = projectSubtitle(project.title, project.role);

        return (
          <AccordionItem
            key={project.id}
            value={project.id}
            className={cn(
              "w-full border border-border rounded-xl bg-card/50 backdrop-blur-sm",
              "transition-all duration-200",
              "hover:border-foreground/20 hover:bg-card/80 hover:shadow-sm",
              "data-[state=open]:bg-card data-[state=open]:border-foreground/15 data-[state=open]:shadow-sm"
            )}
          >
            <AccordionTrigger className="hover:no-underline p-3 md:p-4 cursor-pointer rounded-xl group [&>svg]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <div className="flex items-center gap-x-3 justify-between w-full text-left">
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
                  <ProjectThumb src={project.image} alt={project.title} />
                  <div className="flex-1 min-w-0 gap-1 flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold leading-tight truncate">
                        {shortTitle(project.title)}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 h-5 px-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 text-[10px] font-medium text-amber-700 dark:text-amber-400">
                          <Sparkles className="size-3" aria-hidden />
                          Featured
                        </span>
                      )}
                      {project.active && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                          <span className="relative inline-flex size-1.5">
                            <span className="absolute inset-0 size-1.5 rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                            <span className="relative size-1.5 rounded-full bg-emerald-500" />
                          </span>
                          Active
                        </span>
                      )}
                    </div>
                    {subtitle && (
                      <div className="font-sans text-xs sm:text-sm text-muted-foreground truncate">
                        {subtitle}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-none">
                  <span className="hidden sm:inline-flex text-xs tabular-nums text-muted-foreground">
                    {project.dates}
                  </span>
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted/60 border border-border/60 transition-transform duration-300 group-data-[state=open]:rotate-180 group-hover:bg-muted">
                    <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden />
                  </span>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-3 md:px-4 pb-4 pt-0 text-sm text-muted-foreground">
              <div className="flex flex-col gap-4 pl-13 md:pl-14">
                <span className="block sm:hidden text-xs tabular-nums text-muted-foreground/80">
                  {project.dates}
                </span>

                <p className="leading-relaxed text-foreground/85">
                  {project.description}
                </p>

                {project.responsibilities && project.responsibilities.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                      Highlights
                    </h4>
                    <ul className="flex flex-col gap-1.5">
                      {project.responsibilities.map((item, i) => (
                        <li
                          key={i}
                          className="relative pl-4 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-2.5 before:size-1 before:rounded-full before:bg-foreground/40"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center h-6 px-2 rounded-md border border-border bg-background text-[11px] font-medium text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 border-t border-border/60 mt-1 -mx-3 md:-mx-4 px-3 md:px-4 pt-3">
                  <Link
                    href={`/projects/${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "btn-sheen group/cta inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md",
                      "bg-foreground text-background text-xs font-medium",
                      "shadow-sm hover:shadow-md transition-all duration-200",
                      "hover:gap-2",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    )}
                  >
                    Full View
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                  {project.links?.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border bg-background text-xs text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
                    >
                      {link.icon}
                      {link.type}
                    </Link>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
