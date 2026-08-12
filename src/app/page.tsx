import Markdown from "react-markdown";
import { RHYTHM, Reveal, Section } from "@/components/ui";
import HeroSection from "@/components/section/hero-section";
import ContactSection from "@/components/section/contact-section";
import EducationSection from "@/components/section/education-section";
import ActivitiesSection from "@/components/section/hackathons-section";
import OpenSourceSection from "@/components/section/open-source-section";
import ProjectExperienceSection from "@/components/section/project-experience-section";
import SkillsSection from "@/components/section/skills-section";
import WorkSection from "@/components/section/work-section";
import WritingSection from "@/components/section/writing-section";
import {
  education,
  personalInfo,
  projects,
  skills,
  workExperience,
} from "@/data";

/**
 * Homepage.
 *
 * Section order answers a recruiter's questions in the order they ask them:
 * who (hero) → what kind of engineer (about) → where (work) → what was built
 * (projects) → what with (skills) → background (education, community, open
 * source, writing) → how to reach him (contact).
 *
 * Spacing comes from RHYTHM.page rather than a per-page gap value, and every
 * heading goes through <Section>, so no section here sets its own rhythm.
 */
export default function Page() {
  return (
    <main className={RHYTHM.page}>
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
