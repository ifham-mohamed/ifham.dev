"use client";

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
import { workExperience } from "@/data";
import { ChevronDown, MapPin } from "lucide-react";

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="flex w-full flex-col gap-2">
      {workExperience.map((work) => {
        const isPresent = !work.end || work.end === "Present";
        const period = `${work.start} — ${work.end ?? "Present"}`;

        return (
          <AccordionItem
            key={work.company}
            value={work.company}
            className={panelClass({ interactive: true, flush: true })}
          >
            <AccordionTrigger className="group cursor-pointer p-4 hover:no-underline [&>svg]:hidden">
                <PanelRow>
                  <LogoTile src={work.logoUrl} alt={work.company} />

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="truncate text-sm font-medium text-foreground">
                        {work.company}
                      </span>
                      {isPresent && <StatusDot label="Present" />}
                    </div>
                    <span className="truncate text-xs text-muted-foreground">
                      {work.title}
                    </span>
                  </div>

                  <div className="flex flex-none items-center gap-3">
                    <span className="hidden text-2xs tabular-nums text-muted-foreground sm:inline">
                      {period}
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
                    {period}
                  </span>

                  <p className="text-sm leading-relaxed text-foreground/80">
                    {work.description}
                  </p>

                  {work.responsibilities && work.responsibilities.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <FieldLabel>Highlights</FieldLabel>
                      <ul className="flex flex-col gap-1.5">
                        {work.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-border"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {work.technologies && work.technologies.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <FieldLabel>Tech stack</FieldLabel>
                      <TagRow>
                        {work.technologies.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </TagRow>
                    </div>
                  )}

                  <PanelFooter>
                    {work.href && (
                      <ActionLink href={work.href}>Visit company</ActionLink>
                    )}
                    {work.location && (
                      <span className="inline-flex items-center gap-1.5 text-2xs text-muted-foreground">
                        <MapPin aria-hidden className="size-3" />
                        {work.location}
                      </span>
                    )}
                  </PanelFooter>
                </PanelBody>
              </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
