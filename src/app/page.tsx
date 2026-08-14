import {
  EditorialSection,
  PageContainer,
  RHYTHM,
  Reveal,
  Section,
} from "@/components/ui";
import HeroSection from "@/components/section/hero-section";
import AboutSection from "@/components/section/about-section";
import ContactSection from "@/components/section/contact-section";
import EducationSection from "@/components/section/education-section";
import ActivitiesSection from "@/components/section/hackathons-section";
import OpenSourceSection from "@/components/section/open-source-section";
import ProjectExperienceSection from "@/components/section/project-experience-section";
import SkillsSection from "@/components/section/skills-section";
import WorkSection from "@/components/section/work-section";
import WritingSection from "@/components/section/writing-section";
import ResearchSection from "@/components/section/research-section";
import { projects, workExperience } from "@/data";

/**
 * Homepage.
 *
 * Section order answers a recruiter's questions in the order they ask them:
 * who (hero) → what kind of engineer (about) → where (work) → what was built
 * (projects) → what has been researched → what with (skills) → background
 * (education, community, open source, writing) → how to reach him (contact).
 *
 * Spacing comes from RHYTHM.page rather than a per-page gap value, and every
 * heading goes through <Section>, so no section here sets its own rhythm.
 */
export default function Page() {
  return (
    // Shell, not prose. The header, footer, /projects and every case study
    // already run at 75rem; the homepage sat at 42rem inside them, leaving a
    // 264px dead gutter each side. Widening is safe here because every
    // paragraph in these sections already caps itself in `ch` (68/64/62/56/52),
    // so no reading line stretches - only the grids take up the new room.
    <PageContainer width="shell">
      <main className={RHYTHM.page}>
        <HeroSection />

        <Reveal>
          <AboutSection />
        </Reveal>

        <Reveal>
          <EditorialSection
            id="work"
            index={2}
            eyebrow="Experience"
            title="Where I've worked"
            description={`${workExperience.length} roles`}
          >
            <WorkSection />
          </EditorialSection>
        </Reveal>

        <Reveal>
          {/* No header `action` here: the section now ends with its own
              "View all N projects" control, and two links to the same place
              competing at the top and bottom is noise. */}
          <Section
            id="projects"
            eyebrow="Projects"
            index={3}
            title="Selected work"
            description="Four selected engineering case studies. The full directory has the rest."
            count={projects.length}
          >
            <ProjectExperienceSection limit={4} />
          </Section>
        </Reveal>

        <Reveal>
          <Section
            id="research"
            eyebrow="Research"
            index={4}
            title="Applied research"
            description="Evidence-led work across multilingual NLP, regulatory intelligence, and human-centred delivery."
            action={{ label: "Research dossier", href: "/research" }}
          >
            <ResearchSection />
          </Section>
        </Reveal>

        <Reveal>
          {/* No `count` here. "37 skills" competed with the capabilities for
              attention while being the least meaningful fact in the section —
              and it was inflated anyway, since Next.js is legitimately listed
              under both Frontend and Backend. */}
          <Section
            id="skills"
            eyebrow="Skills"
            index={5}
            title="What I work with"
            description="Weighted toward what I reach for most, not everything I have touched."
          >
            <SkillsSection />
          </Section>
        </Reveal>

        <Reveal>
          {/* No `count` — there is one institution, and rendering "1" beside the
              heading draws the eye to the least useful number on the page. */}
          <Section
            id="education"
            eyebrow="Education"
            index={6}
            title="Where I studied"
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
    </PageContainer>
  );
}
