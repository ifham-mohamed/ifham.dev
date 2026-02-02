"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { personalInfo } from "@/data";
import BlurFadeText from "../magicui/blur-fade-text";
import BlurFade from "../magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

export function HeroSection() {
  const initials = personalInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              yOffset={8}
              text={`Hi, I'm ${personalInfo.name.split(" ")[0]} 👋`}
            />
            <BlurFadeText
              className="max-w-[600px] md:text-xl"
              delay={BLUR_FADE_DELAY}
              text={personalInfo.summary}
            />
          </div>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Avatar className="size-28 border">
              <AvatarImage
                alt={personalInfo.name}
                src={personalInfo.avatarUrl}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
