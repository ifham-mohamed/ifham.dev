"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ActionLink,
  FieldLabel,
  LogoTile,
  panelClass,
  PanelBody,
  PanelFooter,
  PanelRow,
  StatusDot,
  Tag,
  TagRow,
} from "@/components/ui";
import { getFeaturedProjects } from "@/data";
import { ChevronDown } from "lucide-react";

/** Splits "Title - Subtitle" into its two halves. */
function splitTitle(title: string, role?: string) {
  const i = title.indexOf(" - ");
  return i > 0
    ? { name: title.slice(0, i), subtitle: title.slice(i + 3) }
    : { name: title, subtitle: role };
}

export default function ProjectExperienceSection({
  limit = 4,
}: {
  limit?: number;
}) {
  const items = getFeaturedProjects(limit);

  return (
    <Accordion type="single" collapsible className="flex w-full flex-col gap-2">
      {items.map((project) => {
        const { name, subtitle } = splitTitle(project.title, project.role);
        const visibleTech = project.technologies?.slice(0, 8) ?? [];
        const overflow = (project.technologies?.length ?? 0) - visibleTech.length;

        return (
          <AccordionItem
            key={project.id}
            value={project.id}
            className={panelClass({ interactive: true, flush: true })}
          >
            <AccordionTrigger className="group cursor-pointer p-4 hover:no-underline [&>svg]:hidden">
              <PanelRow>
                <LogoTile src={project.image} alt={project.title} fit="cover" />

                <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="truncate text-sm font-medium text-foreground">
                      {name}
                    </span>
                    {project.featured && <Tag variant="brand">Featured</Tag>}
                    {project.active && <StatusDot label="Active" />}
                  </div>
                  {subtitle && (
                    <span className="truncate text-xs text-muted-foreground">
                      {subtitle}
                    </span>
                  )}
                </div>

                <div className="flex flex-none items-center gap-3">
                  <span className="hidden text-2xs tabular-nums text-muted-foreground sm:inline">
                    {project.dates}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className="size-4 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180"
                  />
                </div>
              </PanelRow>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-4 pt-0 text-sm">
              <PanelBody>
                <span className="text-2xs tabular-nums text-muted-foreground sm:hidden">
                  {project.dates}
                </span>

                <p className="text-sm leading-relaxed text-foreground/80">
                  {project.oneLiner ?? project.description}
                </p>

                {visibleTech.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <FieldLabel>Tech stack</FieldLabel>
                    <TagRow>
                      {visibleTech.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                      {overflow > 0 && (
                        <Tag variant="ghost">+{overflow} more</Tag>
                      )}
                    </TagRow>
                  </div>
                )}

                <PanelFooter>
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex h-8 items-center rounded-md border border-transparent bg-foreground px-3 text-xs font-medium text-background transition-colors hover:bg-foreground/88"
                  >
                    Read case study
                  </Link>
                  {project.links?.map((link) => (
                    <ActionLink key={link.href} href={link.href}>
                      {link.type}
                    </ActionLink>
                  ))}
                </PanelFooter>
              </PanelBody>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
