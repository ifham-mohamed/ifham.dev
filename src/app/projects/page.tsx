import { ProjectCard } from "@/components/projects/project-card";
import {
  PageContainer,
  Reveal,
  SectionEyebrow,
} from "@/components/ui";
import { projects, personalInfo } from "@/data";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, personId } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Software Engineering Projects & Case Studies",
  description: `A collection of projects by ${personalInfo.name} — e-commerce platforms, supply chain systems, SaaS apps, and more.`,
  openGraph: {
    title: "Software Engineering Projects & Case Studies",
    description: `A collection of projects by ${personalInfo.name}.`,
    url: `${personalInfo.url}/projects`,
    images: [
      {
        url: `${personalInfo.url}/projects/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Software engineering projects by Ifham Mohamed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineering Projects & Case Studies",
    description: `A collection of projects by ${personalInfo.name}.`,
    images: [`${personalInfo.url}/projects/opengraph-image`],
  },
  alternates: { canonical: `${personalInfo.url}/projects` },
};

export default function ProjectsPage() {
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${personalInfo.url}/projects#collection`,
        url: `${personalInfo.url}/projects`,
        name: "Software Engineering Projects & Case Studies",
        description: `A collection of projects by ${personalInfo.name}.`,
        author: { "@id": personId },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            url: `${personalInfo.url}/projects/${project.id}`,
          })),
        },
      },
      breadcrumbJsonLd([
        { name: "Home", url: personalInfo.url },
        { name: "Projects", url: `${personalInfo.url}/projects` },
      ]),
    ],
  };

  return (
    // Extra top space on desktop only: 3.5rem from the layout plus 1.5rem here
    // puts the header ~80px below the nav, which reads as an index opening
    // rather than content that starts immediately under the chrome.
    <PageContainer width="wide" className="sm:pt-6">
      <JsonLd data={projectsJsonLd} />
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
          {/* Two columns, and it stops there. A third column at 72rem would
              give each card ~22rem — too narrow for a description that is
              doing real work, and the row would read as a tile wall rather
              than an index. Two columns at ~34rem each is the editorial
              trade: fewer cards per row, each one legible. */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                index={i + 1}
                href={`/projects/${project.id}`}
                title={project.title}
                description={project.oneLiner ?? project.description}
                dates={project.dates}
                tags={project.technologies}
                signals={project.signals}
                active={project.active}
                featured={project.featured}
                image={project.image}
                video={project.video}
                visual={project.visual}
                headingLevel={2}
              />
            ))}
          </div>
        </Reveal>
      </main>
    </PageContainer>
  );
}
