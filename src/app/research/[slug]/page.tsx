import { allResearch } from "../../../../.content-collections/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { CaseStudyToc } from "@/components/projects/case-study-toc";
import { ResearchMetricGrid } from "@/components/research/research-metric-grid";
import {
  BackLink,
  MetaDate,
  MetaItem,
  MetadataRow,
  PageContainer,
  RHYTHM,
  Tag,
} from "@/components/ui";
import { mdxComponents } from "@/mdx-components";
import { moduleOneResearch, personalInfo } from "@/data";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, personId } from "@/lib/seo";

export const dynamic = "force-static";

export function generateStaticParams() {
  return allResearch.map((document) => ({ slug: document.researchId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const document = allResearch.find((item) => item.researchId === slug);
  if (!document) return undefined;

  const canonical = `${personalInfo.url}/research/${slug}`;
  const socialImage = `${personalInfo.url}/opengraph-image`;
  return {
    title: document.title,
    description: document.summary,
    keywords: [
      "regulatory intelligence",
      "Sri Lankan SMEs",
      "multilingual NLP",
      "PDF extraction",
      "machine learning research",
      "LinearSVC",
      "grounded summarization",
    ],
    openGraph: {
      title: document.title,
      description: document.summary,
      type: "article",
      publishedTime: document.publishedAt,
      ...(document.updatedAt && { modifiedTime: document.updatedAt }),
      url: canonical,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: document.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: document.title,
      description: document.summary,
      images: [socialImage],
    },
    alternates: { canonical },
  };
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = allResearch.find((item) => item.researchId === slug);
  if (!document || slug !== moduleOneResearch.id) notFound();

  const headings = (document.headings ?? []) as {
    id: string;
    text: string;
    level: 2 | 3;
  }[];
  const tocItems = headings.map((heading) => ({
    id: heading.id,
    label: heading.text,
    level: heading.level,
  }));

  const canonical = `${personalInfo.url}/research/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ScholarlyArticle",
        "@id": `${canonical}#article`,
        headline: document.title,
        description: document.summary,
        datePublished: document.publishedAt,
        ...(document.updatedAt && { dateModified: document.updatedAt }),
        url: canonical,
        mainEntityOfPage: { "@id": canonical },
        author: {
          "@id": personId,
          affiliation: {
            "@type": "EducationalOrganization",
            name: moduleOneResearch.institution,
          },
        },
        about: [
          "Regulatory intelligence",
          "Sri Lankan SMEs",
          "Multilingual document processing",
          "Machine learning",
        ],
      },
      breadcrumbJsonLd([
        { name: "Home", url: personalInfo.url },
        { name: "Research", url: `${personalInfo.url}/research` },
        { name: document.title, url: canonical },
      ]),
    ],
  };

  return (
    <PageContainer width="shell">
      <article className={RHYTHM.article}>
        <JsonLd data={jsonLd} />

        <header className="research-grid overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="flex flex-col gap-6 p-5 sm:p-8 lg:p-10">
              <BackLink href="/research">All research</BackLink>

              <MetadataRow>
                <MetaItem>{document.eyebrow}</MetaItem>
                <MetaDate dateTime={document.updatedAt ?? document.publishedAt}>
                  Updated {formatDate(document.updatedAt ?? document.publishedAt)}
                </MetaDate>
                <MetaItem>{document.readingMinutes} min dossier</MetaItem>
              </MetadataRow>

              <div className="flex max-w-4xl flex-col gap-4">
                <h1 className="max-w-[22ch] text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl">
                  {document.title}
                </h1>
                <p className="max-w-[68ch] text-base leading-relaxed text-muted-foreground">
                  {document.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Tag variant="brand">{document.status}</Tag>
                <Tag>{moduleOneResearch.role}</Tag>
                <Tag>{moduleOneResearch.period}</Tag>
              </div>
            </div>

            <aside className="flex flex-col justify-between gap-8 border-t border-hairline bg-surface-raised p-5 sm:p-8 lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-2xs uppercase tracking-[0.14em] text-brand">
                  Principal question
                </span>
                <span className="font-mono text-3xl font-medium tabular-nums text-subtle-foreground/30">
                  M1
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {moduleOneResearch.question}
              </p>
              <div className="border-t border-hairline pt-4 font-mono text-2xs leading-relaxed text-muted-foreground">
                {moduleOneResearch.institution}
                <br />
                {moduleOneResearch.status}
              </div>
            </aside>
          </div>
        </header>

        <ResearchMetricGrid items={moduleOneResearch.metrics} />

        <div className="min-[75rem]:grid min-[75rem]:grid-cols-[minmax(0,1fr)_10rem] min-[75rem]:gap-10">
          <div className="research-prose prose max-w-none font-sans text-muted-foreground dark:prose-invert">
            <MDXContent code={document.mdx} components={mdxComponents} />
          </div>

          <CaseStudyToc
            items={tocItems}
            label="Research dossier sections"
            title="In this dossier"
          />
        </div>

        <footer className="flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground">
              Research integrity
            </span>
            <p className="max-w-[62ch] text-xs leading-relaxed text-muted-foreground">
              Metrics are presented with their dataset, split and open gates.
              System capability is not presented as completed field impact.
            </p>
          </div>
          <BackLink href="/research">Research index</BackLink>
        </footer>
      </article>
    </PageContainer>
  );
}
