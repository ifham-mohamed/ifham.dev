"use client";

import { Badge } from "@/components/ui/badge";
import { getSkillsByCategory, skills } from "@/data";
import BlurFade from "../magicui/blur-fade";

interface SkillsSectionProps {
  delay?: number;
}

const BLUR_FADE_DELAY = 0.04;

export function SkillsSection({
  delay = BLUR_FADE_DELAY * 9,
}: SkillsSectionProps) {
  const allSkills = skills;

  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={delay}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-1">
          {allSkills.map((skill, id) => (
            <BlurFade key={skill.name} delay={delay + id * 0.05}>
              <Badge key={skill.name}>{skill.name}</Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsByCategory({
  delay = BLUR_FADE_DELAY * 9,
}: SkillsSectionProps) {
  const groupedSkills = getSkillsByCategory();

  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={delay}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>
        {groupedSkills.map((group, categoryIndex) => (
          <div key={group.category} className="space-y-2">
            <BlurFade delay={delay + categoryIndex * 0.1}>
              <h3 className="text-sm font-medium text-muted-foreground capitalize">
                {group.label}
              </h3>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {group.skills.map((skill, skillIndex) => (
                <BlurFade
                  key={skill.name}
                  delay={delay + categoryIndex * 0.1 + skillIndex * 0.05}
                >
                  <Badge variant="secondary">{skill.name}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
