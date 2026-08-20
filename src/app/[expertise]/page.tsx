import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { allPosts } from "../../../.content-collections/generated";
import { JsonLd } from "@/components/seo/json-ld";
import { ProjectCard } from "@/components/projects/project-card";
import {
  BackLink,
  PageContainer,
  RHYTHM,
  SectionEyebrow,
  SectionHeading,
} from "@/components/ui";
import {
  expertisePages,
  getExpertiseBySlug,
} from "@/data/expertise.data";
import { personalInfo, projects } from "@/data";
import { breadcrumbJsonLd, personId } from "@/lib/seo";
import { slugOfPost } from "@/lib/writing";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return expertisePages.map((page) => ({ expertise: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ expertise: string }>;
}): Promise<Metadata> {
  const { expertise } = await params;
  const page = getExpertiseBySlug(expertise);
  if (!page) return {};

  const canonical = `${personalInfo.url}/${page.slug}`;
  const image = `${canonical}/opengraph-image`;

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      type: "website",
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
      images: [image],
    },
  };
}

export default async function ExpertisePageRoute({
  params,
}: {
  params: Promise<{ expertise: string }>;
}) {
  const { expertise } = await params;
  const page = getExpertiseBySlug(expertise);
  if (!page) notFound();

  const canonical = `${personalInfo.url}/${page.slug}`;
  const featuredProjects = page.projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const articles = page.articleSlugs
    .map((slug) => allPosts.find((post) => slugOfPost(post) === slug))
    .filter((post): post is (typeof allPosts)[number] => Boolean(post));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
      breadcrumbJsonLd([
        { name: "Home", url: personalInfo.url },
        { name: page.label, url: canonical },
      ]),
    ],
  };

  return (
    <PageContainer width="shell">
      <article className={RHYTHM.article}>
        <JsonLd data={jsonLd} />

        <header className="flex max-w-case-wide flex-col gap-5 border-b border-hairline pb-8 sm:pb-10">
          <BackLink href="/">Ifham Mohamed</BackLink>
          <div className="flex flex-col gap-3">
            <SectionEyebrow>{page.label}</SectionEyebrow>
            <h1 className="max-w-[24ch] text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              {page.title}
            </h1>
            <p className="max-w-[68ch] text-base leading-relaxed text-muted-foreground">
              {page.intro}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="#proof"
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-xs font-medium text-background"
            >
              View project evidence
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-md border border-border-strong bg-surface px-3.5 py-2 text-xs font-medium text-foreground"
            >
              Discuss a project
            </Link>
          </div>
        </header>

        <section className="flex max-w-case-wide flex-col gap-6">
          <SectionHeading
            eyebrow="Approach"
            title="What the work covers"
            description="Capabilities applied together, with the exact trade-offs documented in each case study."
          />
          <div className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
            {page.capabilities.map((capability) => (
              <div key={capability.title} className="flex flex-col gap-2 bg-surface p-5">
                <h2 className="text-base font-medium text-foreground">
                  {capability.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="proof" className="flex max-w-case-wide scroll-mt-20 flex-col gap-6">
          <SectionHeading
            eyebrow="Proof of work"
            title="Relevant case studies"
            description="Real systems, responsibilities, architectural decisions, constraints, and outcomes."
            count={featuredProjects.length}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                index={index + 1}
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
              />
            ))}
          </div>
        </section>

        {articles.length > 0 && (
          <section className="flex max-w-case-wide flex-col gap-6">
            <SectionHeading
              eyebrow="Technical writing"
              title="Related engineering notes"
              description="The principles and implementation patterns behind the project work."
              count={articles.length}
            />
            <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
              {articles.map((post) => {
                const slug = slugOfPost(post);
                return (
                  <li key={slug}>
                    <Link
                      href={`/blog/${slug}`}
                      className="group flex items-start justify-between gap-5 py-5"
                    >
                      <span className="flex flex-col gap-1.5">
                        <span className="text-base font-medium text-foreground transition-colors group-hover:text-brand-hover">
                          {post.title}
                        </span>
                        <span className="max-w-[66ch] text-sm leading-relaxed text-muted-foreground">
                          {post.summary}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="mt-1 size-4 flex-none text-subtle-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand-hover"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className="flex max-w-case-wide flex-col gap-6">
          <SectionHeading eyebrow="Questions" title="Common questions" />
          <dl className="grid gap-3 sm:grid-cols-2">
            {page.questions.map((item) => (
              <div key={item.question} className="rounded-lg border border-border bg-surface p-5">
                <dt className="text-sm font-medium text-foreground">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </PageContainer>
  );
}
