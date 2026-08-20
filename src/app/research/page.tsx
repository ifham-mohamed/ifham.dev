import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FlaskConical,
} from "lucide-react";
import {
  PageContainer,
  Reveal,
  RHYTHM,
  SectionEyebrow,
  SectionHeading,
  Tag,
  TagRow,
} from "@/components/ui";
import { ResearchMetricGrid } from "@/components/research/research-metric-grid";
import { ResearchSystemMap } from "@/components/research/research-system-map";
import { enigmatrixResearch, personalInfo } from "@/data";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, personId } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Applied Software Engineering Research",
  description:
    "Applied research by Ifham Mohamed on regulatory intelligence, multilingual document processing, machine learning, and evidence-grounded SME guidance.",
  openGraph: {
    title: "Applied Software Engineering Research",
    description:
      "Enigmatrix: connected research into regulatory information barriers affecting Sri Lankan SMEs.",
    url: `${personalInfo.url}/research`,
    images: [
      {
        url: `${personalInfo.url}/research/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Applied research by Ifham Mohamed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Applied Software Engineering Research",
    description:
      "Applied research in regulatory intelligence and multilingual machine learning.",
    images: [`${personalInfo.url}/research/opengraph-image`],
  },
  alternates: { canonical: `${personalInfo.url}/research` },
};

export default function ResearchPage() {
  const researchJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${personalInfo.url}/research#collection`,
        url: `${personalInfo.url}/research`,
        name: "Applied Software Engineering Research",
        description:
          "Applied research in regulatory intelligence and multilingual document processing.",
        author: { "@id": personId },
      },
      breadcrumbJsonLd([
        { name: "Home", url: personalInfo.url },
        { name: "Research", url: `${personalInfo.url}/research` },
      ]),
    ],
  };

  return (
    <PageContainer width="shell">
      <JsonLd data={researchJsonLd} />
      <main className={RHYTHM.article}>
        <header className="research-grid overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.65fr)]">
            <div className="flex flex-col gap-6 p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <SectionEyebrow>Research</SectionEyebrow>
                <span aria-hidden className="h-3 w-px bg-hairline" />
                <span className="font-mono text-2xs text-muted-foreground">
                  {enigmatrixResearch.period} · {enigmatrixResearch.institution}
                </span>
              </div>

              <div className="flex max-w-3xl flex-col gap-4">
                <h1 className="max-w-[20ch] text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl">
                  Researching the path from official rule to informed action.
                </h1>
                <p className="max-w-[66ch] text-base leading-relaxed text-muted-foreground">
                  {enigmatrixResearch.overview}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-subtle px-3 py-1.5 font-mono text-2xs text-foreground/80">
                  <span className="size-1.5 rounded-full bg-brand" />
                  {enigmatrixResearch.status}
                </span>
                <span className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-2xs text-muted-foreground">
                  {enigmatrixResearch.type}
                </span>
              </div>
            </div>

            <aside className="flex flex-col justify-between gap-8 border-t border-hairline bg-surface-raised p-5 sm:p-8 lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-10 place-items-center rounded-md border border-brand/30 bg-brand-subtle text-brand">
                  <FlaskConical aria-hidden className="size-5" />
                </span>
                <span className="font-mono text-3xl font-medium tabular-nums text-subtle-foreground/30">
                  01
                </span>
              </div>

              <blockquote className="flex flex-col gap-3">
                <p className="font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground">
                  Overarching question
                </p>
                <p className="text-sm leading-relaxed text-foreground/85">
                  {enigmatrixResearch.question}
                </p>
              </blockquote>
            </aside>
          </div>
        </header>

        <Reveal>
          <ResearchMetricGrid items={enigmatrixResearch.metrics} />
        </Reveal>

        <Reveal>
          <section className={RHYTHM.section}>
            <SectionHeading
              eyebrow="System view"
              title="One research chain, four information barriers"
              description="The programme is structured around evidence contracts between modules—not four disconnected applications."
            />
            <ResearchSystemMap />
          </section>
        </Reveal>

        <Reveal>
          <section className={RHYTHM.section}>
            <SectionHeading
              eyebrow="Research modules"
              title="The complete Enigmatrix programme"
              description="Each module owns a distinct barrier, dataset and evaluation question. Module 1 is my individual contribution."
              count={enigmatrixResearch.modules.length}
            />

            <div className="grid gap-4 lg:grid-cols-2">
              {enigmatrixResearch.modules.map((module) => (
                <article
                  key={module.id}
                  className={cn(
                    "group relative flex min-h-72 flex-col gap-5 rounded-lg border bg-surface p-5 transition-colors sm:p-6",
                    module.featured
                      ? "border-brand/40 hover:border-brand-hover"
                      : "border-border"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-9 place-items-center rounded-md border font-mono text-2xs font-medium",
                          module.featured
                            ? "border-brand/30 bg-brand-subtle text-brand"
                            : "border-border bg-surface-raised text-muted-foreground"
                        )}
                      >
                        {module.id}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-semibold text-foreground">
                          {module.barrier}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {module.title}
                        </p>
                      </div>
                    </div>
                    {module.featured && (
                      <Tag variant="brand">My contribution</Tag>
                    )}
                  </div>

                  <p className="text-sm leading-relaxed text-foreground/80">
                    {module.question}
                  </p>

                  <div className="border-t border-hairline pt-4">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {module.contribution}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
                    <div className="flex flex-col gap-1 font-mono text-2xs text-muted-foreground">
                      <span>{module.owner}</span>
                      <span className="inline-flex items-center gap-1.5 text-subtle-foreground">
                        <CheckCircle2 aria-hidden className="size-3 text-brand" />
                        {module.status}
                      </span>
                    </div>

                    {module.href && (
                      <Link
                        href={module.href}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-brand"
                      >
                        Read the full dossier
                        <ArrowRight
                          aria-hidden
                          className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-md border border-border bg-surface-raised text-muted-foreground">
                  <Database aria-hidden className="size-4" />
                </span>
                <div>
                  <SectionEyebrow>Methods</SectionEyebrow>
                  <h2 className="mt-1 text-lg font-semibold text-foreground">
                    Evidence before novelty
                  </h2>
                </div>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {enigmatrixResearch.methods.map((method) => (
                  <li
                    key={method}
                    className="flex items-start gap-2.5 rounded-md border border-hairline bg-surface px-3 py-2.5 text-xs leading-relaxed text-foreground/80"
                  >
                    <span className="mt-[0.45em] size-1 flex-none rounded-full bg-brand" />
                    {method}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-5 sm:p-6">
              <div>
                <SectionEyebrow>Platform</SectionEyebrow>
                <h2 className="mt-2 text-lg font-semibold text-foreground">
                  Research-to-runtime stack
                </h2>
                <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                  Deterministic services carry high-liability work; model and
                  GPU branches remain isolated behind explicit evidence gates.
                </p>
              </div>
              <TagRow className="gap-1.5">
                {enigmatrixResearch.platformStack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </TagRow>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="research-grid overflow-hidden rounded-xl border border-brand/30 bg-brand-subtle p-5 sm:p-8">
            <div className="flex max-w-3xl flex-col gap-5">
              <div>
                <SectionEyebrow className="text-brand">Deep dive</SectionEyebrow>
                <h2 className="mt-2 max-w-[28ch] text-2xl font-semibold tracking-tight text-foreground">
                  Module 1: from difficult gazette PDFs to traceable SME alerts
                </h2>
              </div>
              <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                Read the full research and implementation record: questions,
                dataset lineage, multilingual extraction, model selection,
                experimental RA-HMT architecture, grounded summaries,
                deployment boundaries, negative results, and open field gates.
              </p>
              <Link
                href="/research/enigmatrix-module-1"
                className="group inline-flex w-fit items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
              >
                Open the Module 1 dossier
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
    </PageContainer>
  );
}
