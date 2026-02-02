"use client";

import { ResumeCard } from "@/components/experience/resume-card";
import { education } from "@/data";
import BlurFade from "../magicui/blur-fade";

interface EducationSectionProps {
  delay?: number;
}

const BLUR_FADE_DELAY = 0.04;

export function EducationSection({
  delay = BLUR_FADE_DELAY * 7,
}: EducationSectionProps) {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={delay}>
          <h2 className="text-xl font-bold">Education</h2>
        </BlurFade>
        {education.map((edu, id) => (
          <BlurFade key={edu.school} delay={delay + id * 0.05}>
            <ResumeCard
              key={edu.school}
              href={edu.href}
              logoUrl={edu.logoUrl}
              altText={edu.school}
              title={edu.school}
              subtitle={edu.degree}
              period={`${edu.start} - ${edu.end}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}

export default EducationSection;
