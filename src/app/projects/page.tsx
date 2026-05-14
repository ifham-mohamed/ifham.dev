import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
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
  alternates: {
    canonical: `${personalInfo.url}/projects`,
  },
};

const BLUR_FADE_DELAY = 0.015;

export default function ProjectsPage() {
  return (
    <section id="projects">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-8">
          <SectionHeading
            eyebrow="PROJECTS"
            title={`A collection of my work · ${projects.length} total`}
            description="E-commerce platforms, supply chain systems, SaaS apps, and experiments I've built."
            anchor="projects"
            as="h1"
          />
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <div className="flex items-center w-full">
              <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
              <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                <span className="text-background text-sm font-medium">
                  My Projects
                </span>
              </div>
              <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
            </div>
            <div className="flex flex-col gap-y-3 items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
                Check out my latest work
              </h2>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                I&apos;ve worked on a variety of projects, from simple websites
                to complex web applications. Click any card to visit the live
                project, or open the full case study from the homepage.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
            {projects.map((project, id) => (
              <BlurFade
                key={project.id}
                delay={BLUR_FADE_DELAY * 3 + id * 0.015}
                className="h-full"
              >
                <ProjectCard
                  href={`/projects/${project.id}`}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
