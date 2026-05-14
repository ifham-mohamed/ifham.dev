import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionHeading } from "@/components/ui/section-heading";
import { personalInfo } from "@/data";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import EducationSection from "@/components/section/education-section";
import HackathonsSection from "@/components/section/hackathons-section";
import OpenSourceSection from "@/components/section/open-source-section";
import ProjectExperienceSection from "@/components/section/project-experience-section";
import SkillsSection from "@/components/section/skills-section";
import WorkSection from "@/components/section/work-section";
import WritingSection from "@/components/section/writing-section";
import { MapPin } from "lucide-react";

const BLUR_FADE_DELAY = 0.015;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-3 flex flex-col order-2 md:order-1">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                  Hi, I&apos;m{" "}
                  <span className="name-accent">
                    {personalInfo.name.split(" ")[0]}
                  </span>{" "}
                  <span className="inline-block animate-wave" aria-hidden>
                    👋
                  </span>
                </h1>
              </BlurFade>
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={personalInfo.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2} className="mt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                    <span className="relative inline-flex size-1.5">
                      <span className="absolute inset-0 size-1.5 rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                      <span className="relative size-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Available for projects
                  </span>
                  <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-border bg-background text-[11px] font-medium text-foreground/80">
                    <MapPin className="size-3" aria-hidden />
                    {personalInfo.location}
                  </span>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={personalInfo.name} src={personalInfo.avatarUrl} />
                <AvatarFallback>{personalInfo.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <SectionHeading
              eyebrow="ABOUT"
              title="A few words about me"
              anchor="about"
            />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{personalInfo.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <SectionHeading
              eyebrow="WORK"
              title="Where I've worked"
              anchor="work"
            />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      <section id="project-experience">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <SectionHeading
              eyebrow="PROJECTS"
              title="Selected work"
              description="Click any project for the full case study."
              anchor="project-experience"
            />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <ProjectExperienceSection />
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <SectionHeading
              eyebrow="EDUCATION"
              title="Where I studied"
              anchor="education"
            />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <EducationSection />
          </BlurFade>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <SectionHeading
              eyebrow="SKILLS"
              title="What I work with"
              anchor="skills"
            />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <SkillsSection />
          </BlurFade>
        </div>
      </section>

      <section id="activities">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <HackathonsSection />
        </BlurFade>
      </section>

      <section id="open-source">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <OpenSourceSection />
        </BlurFade>
      </section>

      <section id="writing">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <WritingSection />
        </BlurFade>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
