"use client";

import Markdown from "react-markdown";
import { personalInfo } from "@/data";
import BlurFade from "../magicui/blur-fade";

interface AboutSectionProps {
  delay?: number;
}

const BLUR_FADE_DELAY = 0.04;

export function AboutSection({
  delay = BLUR_FADE_DELAY * 3,
}: AboutSectionProps) {
  return (
    <section id="about">
      <BlurFade delay={delay}>
        <h2 className="text-xl font-bold">About</h2>
      </BlurFade>
      <BlurFade delay={delay + 0.04}>
        <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
          <Markdown>{personalInfo.summary}</Markdown>
        </div>
      </BlurFade>
    </section>
  );
}

export default AboutSection;
