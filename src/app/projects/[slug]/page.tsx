import { projects, personalInfo } from "@/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

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

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: fullUrl,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: {
      canonical: fullUrl,
    },
  };
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
    description: project.description,
    url: `${personalInfo.url}/projects/${slug}`,
    ...(project.image && {
      image: `${personalInfo.url}${project.image}`,
    }),
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
    keywords: project.technologies?.join(", "),
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
        <h1 className="title font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
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
      </div>

      {(project.image || project.video) && (
        <div className="my-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-1 ring-border/40">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-h-[420px] object-cover"
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={630}
              className="w-full max-h-[420px] object-cover"
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

      <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
        <Markdown>{project.overview ?? project.description}</Markdown>
      </article>

      {project.responsibilities && project.responsibilities.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
            Highlights
          </h2>
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

      {project.technologies && project.technologies.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
            Tech Stack
          </h2>
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

      {(project.links?.length ?? 0) > 0 || project.href ? (
        <div className="mt-8 flex flex-col gap-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
            Links
          </h2>
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
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
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
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
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
