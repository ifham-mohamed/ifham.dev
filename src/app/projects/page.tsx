import { ProjectCard } from "@/components/projects/project-card";
import {
  PageContainer,
  Reveal,
  SectionEyebrow,
} from "@/components/ui";
import { projects, personalInfo } from "@/data";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Projects",
  description: `A collection of projects by ${personalInfo.name} — e-commerce platforms, supply chain systems, SaaS apps, and more.`,
  openGraph: {
    title: "Projects",
    description: `A collection of projects by ${personalInfo.name}.`,
    url: `${personalInfo.url}/projects`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects",
    description: `A collection of projects by ${personalInfo.name}.`,
  },
  alternates: { canonical: `${personalInfo.url}/projects` },
};

export default function ProjectsPage() {
  return (
    // Extra top space on desktop only: 3.5rem from the layout plus 1.5rem here
    // puts the header ~80px below the nav, which reads as an index opening
    // rather than content that starts immediately under the chrome.
    <PageContainer width="wide" className="sm:pt-6">
      <main className="flex flex-col gap-10 sm:gap-12">
        <header className="flex flex-col gap-3">
          {/* Count sits above the title, not inside it. Inline it competed
              with the heading and made "Everything I've built 15" wrap
              awkwardly on small screens. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <SectionEyebrow>Projects</SectionEyebrow>
            <span aria-hidden className="h-3 w-px bg-hairline" />
            <span className="font-mono text-2xs tabular-nums text-muted-foreground">
              {projects.length} projects
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Everything I&apos;ve built
          </h1>

          {/* The container is wide but the sentence is not — measure stays
              readable regardless of how far the grid stretches. */}
          <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground">
            E-commerce platforms, supply chain systems, POS software, SaaS apps
            and experiments.
          </p>
        </header>

        <Reveal>
          {/* Three columns once there is room. At 72rem a two-up grid would
              give each card ~34rem, far wider than its content needs. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                href={`/projects/${project.id}`}
                title={project.title}
                description={project.oneLiner ?? project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                visual={project.visual}
              />
            ))}
          </div>
        </Reveal>
      </main>
    </PageContainer>
  );
}
