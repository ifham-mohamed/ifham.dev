import {
  ActionLink,
  FieldLabel,
  Panel,
  PanelBody,
  PanelFooter,
  RHYTHM,
  StatusBadge,
  Tag,
  TagRow,
  TimelineItem,
} from "@/components/ui";
import { education } from "@/data";

export default function EducationSection() {
  return (
    <div className="flex w-full flex-col gap-2">
      {education.map((edu) => (
        <Panel key={edu.id} className={RHYTHM.block}>
          <TimelineItem
            logoUrl={edu.logoUrl}
            title={edu.school}
            subtitle={edu.degree}
            date={`${edu.start} — ${edu.end}`}
            badges={edu.end === "Present" && <StatusBadge label="Current" />}
          />

          <PanelBody>
            {edu.cgpa && (
              <div className="flex items-center gap-2">
                <FieldLabel>CGPA</FieldLabel>
                <span className="font-mono text-sm tabular-nums text-foreground/80">
                  {edu.cgpa}
                </span>
              </div>
            )}

            {edu.courses && edu.courses.length > 0 && (
              <div className={RHYTHM.group}>
                <FieldLabel>Coursework</FieldLabel>
                <TagRow>
                  {edu.courses.map((course) => (
                    <Tag key={course}>{course}</Tag>
                  ))}
                </TagRow>
              </div>
            )}

            {edu.href && (
              <PanelFooter>
                <ActionLink href={edu.href}>Visit institution</ActionLink>
              </PanelFooter>
            )}
          </PanelBody>
        </Panel>
      ))}
    </div>
  );
}
