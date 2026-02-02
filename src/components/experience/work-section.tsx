"use client";

import { ResumeCard } from "@/components/experience/resume-card";
import { experiences } from "@/data";
import BlurFade from "../magicui/blur-fade";

interface WorkSectionProps {
  delay?: number;
}

const BLUR_FADE_DELAY = 0.04;

export function WorkSection({ delay = BLUR_FADE_DELAY * 5 }: WorkSectionProps) {
  return (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={delay}>
          <h2 className="text-xl font-bold">Work Experience</h2>
        </BlurFade>
        {experiences.map((work, id) => (
          <BlurFade key={work.company} delay={delay + id * 0.05}>
            <ResumeCard
              key={work.company}
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.company}
              subtitle={work.title}
              href={work.href}
              badges={work.badges}
              period={`${work.start} - ${work.end ?? "Present"}`}
              description={work.description}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}

export default WorkSection;
