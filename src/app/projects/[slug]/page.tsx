import { projects, personalInfo } from "@/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { Mermaid } from "@/components/projects/mermaid";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Target,
  Workflow,
  ShieldCheck,
  Wrench,
  TrendingUp,
  GraduationCap,
  ListChecks,
} from "lucide-react";
import type { ComponentType } from "react";

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

  if (!project) {
    return undefined;
  }

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
    alternates: {
      canonical: fullUrl,
    },
  };
}

/** Small uppercase section heading used across the case study. */
function SectionHeading({
  icon: Icon,
  children,
}: {
  icon?: ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
      {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
      {children}
    </h2>
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

  if (!project) {
    notFound();
  }

  const previousProject = index > 0 ? projects[index - 1] : null;
  const nextProject =
    index < projects.length - 1 ? projects[index + 1] : null;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.oneLiner ?? project.description,
    url: `${personalInfo.url}/projects/${slug}`,
    ...(project.image && {
      image: `${personalInfo.url}${project.image}`,
    }),
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
    keywords: [
      ...(project.technologies ?? []),
      ...(project.conceptsLearned ?? []),
    ].join(", "),
  }).replace(/</g, "\\u003c");

  return (
    <section id="project-detail">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="flex justify-start gap-4 items-center">
        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group"
          aria-label="Back to Projects"
        >
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* ---------- Header ---------- */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {project.featured && (
            <span className="inline-flex items-center gap-1 h-6 px-2 rounded-md border border-amber-500/30 bg-amber-500/10 text-[11px] font-medium text-amber-700 dark:text-amber-400">
              <Sparkles className="size-3" aria-hidden />
              Featured
            </span>
          )}
          {project.active && (
            <span className="inline-flex items-center gap-1.5 h-6 px-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              <span className="relative inline-flex size-1.5">
                <span className="absolute inset-0 size-1.5 rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                <span className="relative size-1.5 rounded-full bg-emerald-500" />
              </span>
              Active
            </span>
          )}
        </div>
        <h1 className="title font-semibold text-2xl sm:text-3xl md:text-4xl tracking-tighter leading-tight">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <time className="tabular-nums">{project.dates}</time>
          {project.role && (
            <>
              <span aria-hidden>·</span>
              <span>{project.role}</span>
            </>
          )}
        </div>
        {project.oneLiner && (
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90 text-pretty">
            {project.oneLiner}
          </p>
        )}
      </div>

      {/* ---------- Hero media ---------- */}
      {(project.image || project.video) && (
        <div className="my-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-1 ring-border/40">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-h-[220px] sm:max-h-80 md:max-h-[420px] object-cover"
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={630}
              className="w-full max-h-[220px] sm:max-h-80 md:max-h-[420px] object-cover"
              priority
            />
          ) : null}
        </div>
      )}

      <div className="my-6 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>

      {/* ---------- Overview ---------- */}
      <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
        <Markdown>{project.overview ?? project.description}</Markdown>
      </article>

      {/* ---------- Context ---------- */}
      {project.context && (
        <div className="mt-8 flex flex-col gap-3">
          <SectionHeading icon={ListChecks}>Role &amp; Context</SectionHeading>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.context}
          </p>
        </div>
      )}

      {/* ---------- Problem ---------- */}
      {project.problem && (
        <div className="mt-8 flex flex-col gap-3">
          <SectionHeading icon={Target}>Problem</SectionHeading>
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
            <Markdown>{project.problem}</Markdown>
          </div>
        </div>
      )}

      {/* ---------- Approach & Flow ---------- */}
      {project.flow &&
        (project.flow.diagram ||
          (project.flow.steps && project.flow.steps.length > 0)) && (
          <div className="mt-8 flex flex-col gap-3">
            <SectionHeading icon={Workflow}>
              Approach &amp; Architecture
            </SectionHeading>
            {project.flow.diagram && (
              <figure className="flex flex-col gap-2">
                <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
                  <Mermaid chart={project.flow.diagram} />
                </div>
                {project.flow.caption && (
                  <figcaption className="text-center text-xs text-muted-foreground">
                    {project.flow.caption}
                  </figcaption>
                )}
              </figure>
            )}
            {project.flow.steps && project.flow.steps.length > 0 && (
              <ol className="mt-1 flex flex-col gap-2 text-sm text-muted-foreground">
                {project.flow.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-background text-[11px] font-medium tabular-nums text-foreground/70">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

      {/* ---------- Highlights (responsibilities) ---------- */}
      {project.responsibilities && project.responsibilities.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          <SectionHeading icon={ListChecks}>Highlights</SectionHeading>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {project.responsibilities.map((item, i) => (
              <li
                key={i}
                className="relative pl-4 leading-relaxed before:content-[''] before:absolute before:left-0 before:top-2.5 before:size-1 before:rounded-full before:bg-foreground/40"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- Best practices ---------- */}
      {project.bestPractices && project.bestPractices.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          <SectionHeading icon={ShieldCheck}>
            Best Practices Followed
          </SectionHeading>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {project.bestPractices.map((item, i) => (
              <li key={i} className="flex gap-2 leading-relaxed">
                <ShieldCheck
                  className="mt-0.5 size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- Challenges -> Resolution ---------- */}
      {project.challenges && project.challenges.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          <SectionHeading icon={Wrench}>Challenges &amp; Resolution</SectionHeading>
          <ul className="flex flex-col gap-3">
            {project.challenges.map((c, i) => (
              <li
                key={i}
                className="rounded-lg border border-border bg-card/50 p-4"
              >
                <p className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-px inline-flex shrink-0 items-center rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
                    Challenge
                  </span>
                  <span>{c.challenge}</span>
                </p>
                <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-px inline-flex shrink-0 items-center rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    Fix
                  </span>
                  <span>{c.resolution}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- Outcomes ---------- */}
      {project.outcomes && project.outcomes.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          <SectionHeading icon={TrendingUp}>Outcomes</SectionHeading>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {project.outcomes.map((item, i) => (
              <li key={i} className="flex gap-2 leading-relaxed">
                <TrendingUp
                  className="mt-0.5 size-3.5 shrink-0 text-foreground/50"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- Tech stack ---------- */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          <SectionHeading>Tech Stack</SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center h-7 px-2.5 rounded-md border border-border bg-background text-xs font-medium text-foreground/85"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ---------- Concepts & skills learnt ---------- */}
      {project.conceptsLearned && project.conceptsLearned.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          <SectionHeading icon={GraduationCap}>
            Concepts &amp; Skills Learnt
          </SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {project.conceptsLearned.map((concept) => (
              <span
                key={concept}
                className="inline-flex items-center h-7 px-2.5 rounded-full border border-foreground/15 bg-foreground/[0.03] text-xs font-medium text-foreground/80"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ---------- Links ---------- */}
      {(project.links?.length ?? 0) > 0 || project.href ? (
        <div className="mt-8 flex flex-col gap-3">
          <SectionHeading>Links</SectionHeading>
          <div className="flex flex-wrap items-center gap-2">
            {project.href && (
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sheen group/cta inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-foreground text-background text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <ExternalLink className="size-3.5" aria-hidden />
                Visit Project
              </Link>
            )}
            {project.links?.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-md border border-border bg-background text-sm text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {link.icon}
                {link.type}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {/* ---------- Prev / Next ---------- */}
      <nav className="mt-12 pt-8 max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {previousProject ? (
            <Link
              href={`/projects/${previousProject.id}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors wrap-break-word min-w-0">
                {previousProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors wrap-break-word min-w-0">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
        </div>
      </nav>
    </section>
  );
}
