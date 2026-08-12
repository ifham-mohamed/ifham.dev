import { ProjectCard } from "@/components/projects/project-card";
import { Reveal, SectionHeading } from "@/components/ui";
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
    <main className="flex flex-col gap-8">
      {/* This page previously carried two headers stacked on top of each
          other: the site's eyebrow heading, then a centred gradient-rule pill
          with a 4xl marketing title. One heading now, matching the homepage. */}
      <SectionHeading
        as="h1"
        eyebrow="Projects"
        title="Everything I've built"
        description="E-commerce platforms, supply chain systems, POS software, SaaS apps and experiments."
        count={projects.length}
      />

      <Reveal>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            />
          ))}
        </div>
      </Reveal>
    </main>
  );
}
