import { projects, personalInfo } from "@/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";
import { Mermaid } from "@/components/projects/mermaid";
import {
  ActionLink,
  BackLink,
  Divider,
  MetaDate,
  MetaItem,
  MetadataRow,
  PrevNext,
  RHYTHM,
  SectionEyebrow,
  StatusBadge,
  Tag,
  TagRow,
  PageContainer,
} from "@/components/ui";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return undefined;

  const fullUrl = `${personalInfo.url}/projects/${slug}`;
  const ogImage = project.image
    ? `${personalInfo.url}${project.image}`
    : undefined;
  const description = project.oneLiner ?? project.description;

  return {
    title: project.title,
    description,
    keywords: [
      ...(project.technologies ?? []),
      ...(project.conceptsLearned ?? []),
    ],
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: fullUrl,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: { canonical: fullUrl },
  };
}

/**
 * Block — one titled section of the case study.
 *
 * The previous version declared a local component *also* called
 * SectionHeading, which shadowed the site-wide one inside this file, and gave
 * each of the ten blocks a different lucide icon. Ten icons down one narrow
 * column reads as decoration, not structure — the heading alone does the job.
 */
function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={RHYTHM.block}>
      {/* The label alone left ten sections looking like ten loose paragraphs.
          A hairline running to the right margin gives the article visible
          joints without adding heading weight. */}
      <div className="flex items-center gap-3">
        <SectionEyebrow as="h2" className="flex-none">
          {title}
        </SectionEyebrow>
        <Divider inline />
      </div>
      {children}
    </section>
  );
}

/** Bulleted list shared by Highlights / Best practices / Outcomes. */
function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-border"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.id === slug);
  const project = projects[index];

  if (!project) notFound();

  const previousProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.oneLiner ?? project.description,
    url: `${personalInfo.url}/projects/${slug}`,
    ...(project.image && { image: `${personalInfo.url}${project.image}` }),
    author: { "@type": "Person", name: personalInfo.name },
    keywords: [
      ...(project.technologies ?? []),
      ...(project.conceptsLearned ?? []),
    ].join(", "),
  }).replace(/</g, "\\u003c");

  const hasFlow =
    project.flow &&
    (project.flow.diagram || (project.flow.steps?.length ?? 0) > 0);
  const hasLinks = (project.links?.length ?? 0) > 0 || Boolean(project.href);

  return (
    <PageContainer width="prose">
      <article className={RHYTHM.page}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <div className="flex flex-col gap-4">
          <BackLink href="/projects">All projects</BackLink>

          <header className="flex flex-col gap-3">
            <MetadataRow>
              <MetaDate>{project.dates}</MetaDate>
              {project.role && <MetaItem>{project.role}</MetaItem>}
              {project.active && <StatusBadge label="Active" />}
              {project.featured && <Tag variant="brand">Featured</Tag>}
            </MetadataRow>

            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {project.title}
            </h1>

            {project.oneLiner && (
              <p className="text-base leading-relaxed text-muted-foreground">
                {project.oneLiner}
              </p>
            )}
          </header>
        </div>

        {(project.image || project.video) && (
          <figure className="overflow-hidden rounded-lg border border-border bg-muted/40">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="max-h-[380px] w-full object-cover"
              />
            ) : (
              <Image
                src={project.image!}
                alt=""
                width={1200}
                height={630}
                className="max-h-[380px] w-full object-cover"
                priority
              />
            )}
          </figure>
        )}

        <div className="prose prose-sm max-w-none font-sans text-muted-foreground dark:prose-invert">
          <Markdown>{project.overview ?? project.description}</Markdown>
        </div>

        {project.context && (
          <Block title="Role & context">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.context}
            </p>
          </Block>
        )}

        {project.problem && (
          <Block title="Problem">
            {/* The problem statement is the densest paragraph on the page — six
                or seven clauses of constraints. It gets a wider leading and a
                slightly larger size than body copy so it stays readable, and the
                brand rule marks it as the premise the rest of the page answers. */}
            <div className="rounded-r-lg border-l-2 border-brand bg-muted/45 py-4 pl-5 pr-5">
              <div className="prose prose-sm max-w-none font-sans text-foreground/75 dark:prose-invert [&_p+p]:mt-3 [&_p]:my-0 [&_p]:text-[0.9375rem] [&_p]:leading-[1.75]">
                <Markdown>{project.problem}</Markdown>
              </div>
            </div>
          </Block>
        )}

        {hasFlow && (
          <Block title="Approach & architecture">
            {project.flow?.diagram && (
              <Mermaid
                chart={project.flow.diagram}
                caption={project.flow.caption}
                label={
                  project.flow.caption ??
                  `Architecture diagram for ${project.title}`
                }
              />
            )}

            {project.flow?.steps && project.flow.steps.length > 0 && (
              <ol className="mt-2 flex flex-col gap-3">
                {project.flow.steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-px grid size-5 flex-none place-items-center rounded-full border border-border bg-surface text-2xs tabular-nums text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="min-w-0">{step}</span>
                  </li>
                ))}
              </ol>
            )}
          </Block>
        )}

        {project.responsibilities && project.responsibilities.length > 0 && (
          <Block title="Highlights">
            <BulletList items={project.responsibilities} />
          </Block>
        )}

        {project.bestPractices && project.bestPractices.length > 0 && (
          <Block title="Practices followed">
            <BulletList items={project.bestPractices} />
          </Block>
        )}

        {project.challenges && project.challenges.length > 0 && (
          <Block title="Challenges & resolutions">
            <ul className="flex flex-col gap-2">
              {project.challenges.map((c) => (
                <li
                  key={c.challenge}
                  className="flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-4"
                >
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {c.challenge}
                  </p>
                  <p className="flex gap-2.5 border-t border-hairline pt-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="flex-none text-2xs font-medium uppercase tracking-[0.12em] text-brand">
                      Fix
                    </span>
                    <span>{c.resolution}</span>
                  </p>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {project.outcomes && project.outcomes.length > 0 && (
          <Block title="Outcomes">
            <BulletList items={project.outcomes} />
          </Block>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <Block title="Tech stack">
            <TagRow>
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </TagRow>
          </Block>
        )}

        {project.conceptsLearned && project.conceptsLearned.length > 0 && (
          <Block title="Concepts & skills">
            <TagRow>
              {project.conceptsLearned.map((concept) => (
                <Tag key={concept} variant="outline">
                  {concept}
                </Tag>
              ))}
            </TagRow>
          </Block>
        )}

        {hasLinks && (
          <Block title="Links">
            <div className="flex flex-wrap items-center gap-2">
              {project.href && (
                <ActionLink href={project.href} variant="primary">
                  Visit project
                </ActionLink>
              )}
              {project.links?.map((link) => (
                <ActionLink key={link.href} href={link.href}>
                  {link.type}
                </ActionLink>
              ))}
            </div>
          </Block>
        )}

        <PrevNext
          label="Project pagination"
          previous={
            previousProject
              ? {
                  href: `/projects/${previousProject.id}`,
                  title: previousProject.title,
                }
              : null
          }
          next={
            nextProject
              ? { href: `/projects/${nextProject.id}`, title: nextProject.title }
              : null
          }
        />
      </article>
    </PageContainer>
  );
}
