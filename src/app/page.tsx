import Markdown from "react-markdown";
import { Reveal, SectionHeading } from "@/components/ui";
import HeroSection from "@/components/section/hero-section";
import ContactSection from "@/components/section/contact-section";
import EducationSection from "@/components/section/education-section";
import ActivitiesSection from "@/components/section/hackathons-section";
import OpenSourceSection from "@/components/section/open-source-section";
import ProjectExperienceSection from "@/components/section/project-experience-section";
import SkillsSection from "@/components/section/skills-section";
import WorkSection from "@/components/section/work-section";
import WritingSection from "@/components/section/writing-section";
import { education, personalInfo, projects, skills, workExperience } from "@/data";

/**
 * Section — one spacing and heading rhythm for the whole page.
 *
 * Previously each section rebuilt its own wrapper with a different gap value
 * and its own BlurFade delay, so vertical rhythm drifted as you scrolled.
 */
function Section({
  id,
  eyebrow,
  title,
  description,
  count,
  action,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  count?: number;
  action?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-6">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        anchor={id}
        count={count}
        action={action}
      />
      {children}
    </section>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col gap-16 sm:gap-20">
      <HeroSection />

      <Reveal>
        <Section id="about" eyebrow="About" title="Background">
          <div className="prose prose-sm max-w-none font-sans text-muted-foreground dark:prose-invert">
            <Markdown>{personalInfo.summary}</Markdown>
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section
          id="work"
          eyebrow="Experience"
          title="Where I've worked"
          count={workExperience.length}
        >
          <WorkSection />
        </Section>
      </Reveal>

      <Reveal>
        <Section
          id="projects"
          eyebrow="Projects"
          title="Selected work"
          description="Expand any project for the summary, or open the full case study."
          count={projects.length}
          action={{ label: "View all", href: "/projects" }}
        >
          <ProjectExperienceSection limit={4} />
        </Section>
      </Reveal>

      <Reveal>
        <Section
          id="skills"
          eyebrow="Skills"
          title="What I work with"
          count={skills.length}
        >
          <SkillsSection />
        </Section>
      </Reveal>

      <Reveal>
        <Section
          id="education"
          eyebrow="Education"
          title="Where I studied"
          count={education.length}
        >
          <EducationSection />
        </Section>
      </Reveal>

      <Reveal>
        <ActivitiesSection />
      </Reveal>

      <Reveal>
        <OpenSourceSection />
      </Reveal>

      <Reveal>
        <WritingSection />
      </Reveal>

      <Reveal>
        <ContactSection />
      </Reveal>
    </main>
  );
}
