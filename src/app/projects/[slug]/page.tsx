import { projects, personalInfo } from "@/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";
import { Mermaid } from "@/components/projects/mermaid";
import {
  ActionLink,
  ANCHOR_OFFSET,
  Divider,
  PageContainer,
  PrevNext,
  RHYTHM,
  SectionEyebrow,
  Tag,
  TagRow,
} from "@/components/ui";
import { CaseStudyHero } from "@/components/projects/case-study-hero";
import { ProjectEvidence } from "@/components/projects/project-evidence";
import { RoleContext } from "@/components/projects/role-context";
import { ProblemStatement } from "@/components/projects/problem-statement";
import { PracticesList } from "@/components/projects/practices-list";
import { OutcomesGrid } from "@/components/projects/outcomes-grid";
import { ConceptsList } from "@/components/projects/concepts-list";
import { CaseStudyToc } from "@/components/projects/case-study-toc";
import { RelatedExpertise } from "@/components/expertise/related-expertise";
import { JsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";
import { getExpertiseForProject } from "@/data/expertise.data";
import { breadcrumbJsonLd, personId } from "@/lib/seo";

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
  const ogImage = `${fullUrl}/opengraph-image`;
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [ogImage],
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
  id,
  title,
  wide = false,
  children,
}: {
  /** Anchor target for the table of contents. */
  id?: string;
  title: string;
  /** Lets visual evidence exceed the reading measure. */
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    // Two of the three case-study measures. Prose holds `case-text` (47rem,
    // ~72ch) no matter how wide the shell gets; evidence — diagrams, the
    // outcomes grid — takes `case-wide` (62.5rem), which is exactly the
    // article column at full shell width.
    //
    // `wide` used to be `max-w-full`, which meant "however wide the parent
    // happens to be". That is how the layout ended up with no deliberate
    // measure at all: the same block was 1152px on one breakpoint and 912px on
    // another. It is now a stated width.
    //
    // RHYTHM.section (24px), not RHYTHM.block (16px): a section heading needs
    // more air beneath it than a sub-heading does.
    //
    // The id lives on the <section>, not the heading, and carries
    // ANCHOR_OFFSET with it — the element that owns the id has to be the one
    // with the scroll margin, or the sticky header lands on top of the title.
    <section
      id={id}
      className={cn(
        RHYTHM.section,
        id && ANCHOR_OFFSET,
        wide ? "max-w-case-wide" : "max-w-case-text"
      )}
    >
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
  const relatedExpertise = getExpertiseForProject(project.id);

  const canonical = `${personalInfo.url}/projects/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${canonical}#case-study`,
        name: project.title,
        description: project.oneLiner ?? project.description,
        url: canonical,
        mainEntityOfPage: { "@id": canonical },
        ...(project.image && { image: `${personalInfo.url}${project.image}` }),
        creator: { "@id": personId },
        author: { "@id": personId },
        keywords: [
          ...(project.technologies ?? []),
          ...(project.conceptsLearned ?? []),
        ].join(", "),
      },
      breadcrumbJsonLd([
        { name: "Home", url: personalInfo.url },
        { name: "Projects", url: `${personalInfo.url}/projects` },
        { name: project.title, url: canonical },
      ]),
    ],
  };

  const hasFlow = Boolean(
    project.flow &&
      (project.flow.diagram || (project.flow.steps?.length ?? 0) > 0)
  );
  const hasLinks = (project.links?.length ?? 0) > 0 || Boolean(project.href);

  // Render conditions, named once. The table of contents below is built from
  // these exact booleans rather than a second hand-written list, so a section
  // cannot appear in the rail without appearing on the page.
  const hasRole = Boolean(
    project.role || project.dates || project.active || project.context
  );
  const hasProblem = Boolean(project.problem);

  // Resolved once, not re-derived at each use. An earlier version kept only
  // the booleans and passed `project.bestPractices` straight to the component,
  // which does not type-check: a `boolean` carries no narrowing back to the
  // optional field it came from, so the value stayed `readonly string[] |
  // undefined`. Defaulting here fixes the types and removes the `?? []` that
  // would otherwise be repeated at every call site.
  const practices = project.bestPractices ?? [];
  const challenges = project.challenges ?? [];
  const outcomes = project.outcomes ?? [];
  const concepts = project.conceptsLearned ?? [];

  const hasPractices = practices.length > 0;
  const hasChallenges = challenges.length > 0;
  const hasOutcomes = outcomes.length > 0;
  const hasTech = project.technologies.length > 0;
  const hasConcepts = concepts.length > 0;

  // Labels are shorter than the headings they point at ("Architecture" for
  // "Approach & architecture") so each entry holds one line in a 12rem rail.
  // Links is deliberately absent — it is a row of buttons, not a section to
  // read, and a TOC that lands you on a button is a dead end.
  const tocItems = (
    [
      [true, "overview", "Overview"],
      [hasRole, "role-context", "Role & context"],
      [hasProblem, "problem", "Problem"],
      [hasFlow, "architecture", "Architecture"],
      [hasPractices, "practices", "Practices"],
      [hasChallenges, "challenges", "Challenges"],
      [hasOutcomes, "outcomes", "Outcomes"],
      [hasTech, "tech-stack", "Tech stack"],
      [hasConcepts, "concepts", "Concepts & skills"],
    ] as const
  )
    .filter(([shown]) => shown)
    .map(([, id, label]) => ({ id, label }));

  return (
    // The shell: 75rem. Everything inside picks one of three measures rather
    // than inheriting this one — see `--container-case-*` in globals.css.
    <PageContainer width="shell">
      <article className={RHYTHM.article}>
        <JsonLd data={jsonLd} />

        {/* ---------------- Masthead: full shell width ----------------
            Hero, evidence strip and lead image are one logical unit, so they
            are grouped at 32px rather than inheriting the 96px section gap.
            This is the "accidental 100px gap inside one section" case: the
            evidence strip restates the hero's numbers and has to sit with it.

            The masthead is outside the rail grid below, which is what lets it
            use the whole 75rem shell — and it also stops the table of contents
            from sitting alongside the title, where it had nothing to mark. */}
        <div className="flex flex-col gap-8">
          <CaseStudyHero project={project} />

          {/* Renders nothing when the project has no figures in its outcomes. */}
          <ProjectEvidence items={project.evidence} />

          {(project.image || project.video) && (
            <figure className="diagram-matrix max-w-case-wide overflow-hidden rounded-lg border border-border">
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
        </div>

        {/* ---------------- Body + rail ----------------
            The arithmetic from globals.css, made real:

                shell 75rem − rail 10rem − gap 2.5rem = 62.5rem article column

            so at full width the article column is exactly `case-wide` and the
            contents rail occupies the shell remainder with nothing left over.
            Below 1200px the grid does not exist — one column, normal gutters,
            and each section falls back to its own max-width. */}
        <div className="min-[75rem]:grid min-[75rem]:grid-cols-[minmax(0,1fr)_10rem] min-[75rem]:gap-10">
          <div className={RHYTHM.article}>
        {/* Overview is now a titled section rather than a second unheaded
            paragraph directly under the hero summary. */}
        <Block id="overview" title="Overview">
          <div className="prose prose-sm max-w-none font-sans text-muted-foreground dark:prose-invert">
            <Markdown>{project.overview ?? project.description}</Markdown>
          </div>
        </Block>

        {/* Owns its own heading and grid — it is a two-column block, not a
            titled paragraph like the rest of the case study. */}
        {hasRole && <RoleContext project={project} id="role-context" />}

        {hasProblem && (
          <Block id="problem" title="Problem">
            <ProblemStatement project={project} />
          </Block>
        )}

        {hasFlow && (
          <Block id="architecture" title="Approach & architecture" wide>
            {project.flow?.diagram && (
              <Mermaid
                chart={project.flow.diagram}
                caption={project.flow.caption}
                sourceHref={
                  project.links?.find((l) => l.type === "Source")?.href
                }
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

        {hasPractices && (
          <Block id="practices" title="Practices followed">
            <PracticesList items={practices} />
          </Block>
        )}

        {hasChallenges && (
          <Block id="challenges" title="Challenges & resolutions">
            <ul className="flex flex-col gap-2">
              {challenges.map((c) => (
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

        {hasOutcomes && (
          <Block id="outcomes" title="Outcomes" wide>
            <OutcomesGrid items={outcomes} />
          </Block>
        )}

        {hasTech && (
          // FLAT, DELIBERATELY. Grouping into Frontend / Backend / Data /
          // Testing / Infrastructure was measured against the one classified
          // vocabulary that already exists — the `category` field on
          // `skills.data.ts`. It covers 85 of the 185 technologies used across
          // the fifteen projects: 46%. POV Globe matches 0 of 10, School
          // Management 1 of 10. Grouping would file over half the stack under
          // "Other", and hand-mapping the 79 unmatched names (Expo, GHCR,
          // NativeWind, PayHere, FastLED…) is the fragile hardcoding that has
          // to be maintained on every future project. A complete flat list
          // beats a half-sorted one.
          <Block id="tech-stack" title="Tech stack">
            <TagRow className="gap-1.5">
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </TagRow>
          </Block>
        )}

        {/* No <Block> wrapper — ConceptsList owns its own heading, because the
            heading *is* the disclosure control. A separate <h2> above a
            "Concepts & skills" summary would say it twice. */}
        {hasConcepts && (
          <ConceptsList items={concepts} id="concepts" />
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
          </div>

          {/* After the article in the DOM: the content is the point, and the
              headings are already the structure for assistive tech. The
              landmark label makes it reachable directly. */}
          <CaseStudyToc items={tocItems} />
        </div>

        <RelatedExpertise pages={relatedExpertise} title="Expertise demonstrated here" />

        {/* The third line is `dates`, not a category. There is no category
            field on Project, and the nearest candidate — `signals[0]` — holds
            values like "RBAC" and "Persistence of vision", which are features
            of a project rather than a class of project. Labelling those as a
            category would be inventing a taxonomy the data does not have. */}
        <PrevNext
          label="Project pagination"
          index={{ href: "/projects", label: "All projects" }}
          previous={
            previousProject
              ? {
                  href: `/projects/${previousProject.id}`,
                  title: previousProject.title,
                  meta: previousProject.dates,
                }
              : null
          }
          next={
            nextProject
              ? {
                  href: `/projects/${nextProject.id}`,
                  title: nextProject.title,
                  meta: nextProject.dates,
                }
              : null
          }
        />
      </article>
    </PageContainer>
  );
}
