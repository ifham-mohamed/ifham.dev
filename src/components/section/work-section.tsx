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
  MetaItem,
  MetadataRow,
  panelClass,
  PanelBody,
  PanelFooter,
  RHYTHM,
  StatusBadge,
  Tag,
  TagRow,
  TimelineItem,
} from "@/components/ui";
import { workExperience } from "@/data";
import { ChevronDown, MapPin } from "lucide-react";

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="flex w-full flex-col gap-2">
      {workExperience.map((work) => {
        const isPresent = !work.end || work.end === "Present";

        return (
          <AccordionItem
            key={work.company}
            value={work.company}
            className={panelClass({ interactive: true, flush: true })}
          >
            <AccordionTrigger className="group cursor-pointer p-4 hover:no-underline [&>svg]:hidden">
              <div className="flex w-full min-w-0 items-center gap-3">
                <TimelineItem
                  className="flex-1"
                  logoUrl={work.logoUrl}
                  title={work.company}
                  subtitle={work.title}
                  date={`${work.start} — ${work.end ?? "Present"}`}
                  badges={isPresent && <StatusBadge label="Present" />}
                />
                <ChevronDown
                  aria-hidden
                  className="size-4 flex-none text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-4 pt-0">
              <PanelBody>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {work.description}
                </p>

                {work.responsibilities && work.responsibilities.length > 0 && (
                  <div className={RHYTHM.group}>
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
                  <div className={RHYTHM.group}>
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
                    <MetadataRow>
                      <MetaItem icon={<MapPin aria-hidden className="size-3" />}>
                        {work.location}
                      </MetaItem>
                    </MetadataRow>
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
