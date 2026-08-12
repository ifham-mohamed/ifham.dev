import {
  ActionLink,
  FieldLabel,
  LogoTile,
  Panel,
  PanelBody,
  PanelFooter,
  PanelRow,
  StatusDot,
  Tag,
  TagRow,
} from "@/components/ui";
import { education } from "@/data";

export default function EducationSection() {
  return (
    <div className="flex w-full flex-col gap-2">
      {education.map((edu) => {
        const period = `${edu.start} — ${edu.end}`;

        return (
          <Panel key={edu.id} className="flex flex-col gap-4">
            <PanelRow>
              <LogoTile src={edu.logoUrl} alt={edu.school} />

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="truncate text-sm font-medium text-foreground">
                    {edu.school}
                  </span>
                  {edu.end === "Present" && <StatusDot label="Current" />}
                </div>
                <span className="truncate text-xs text-muted-foreground">
                  {edu.degree}
                </span>
              </div>

              <span className="hidden flex-none text-2xs tabular-nums text-muted-foreground sm:inline">
                {period}
              </span>
            </PanelRow>

            <PanelBody>
              <span className="text-2xs tabular-nums text-muted-foreground sm:hidden">
                {period}
              </span>

              {edu.cgpa && (
                <div className="flex items-center gap-2">
                  <FieldLabel>CGPA</FieldLabel>
                  <span className="text-sm tabular-nums text-foreground/80">
                    {edu.cgpa}
                  </span>
                </div>
              )}

              {edu.courses && edu.courses.length > 0 && (
                <div className="flex flex-col gap-2">
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
        );
      })}
    </div>
  );
}
