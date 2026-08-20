import { allPosts } from "../../../../.content-collections/generated";
import { cn, formatDate } from "@/lib/utils";
import { personalInfo } from "@/data";
import { getAdjacentNotes, slugOfPost } from "@/lib/writing";
import { CopyLink } from "@/components/blog/copy-link";
import { RelatedExpertise } from "@/components/expertise/related-expertise";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import { CaseStudyToc } from "@/components/projects/case-study-toc";
import {
  BackLink,
  MetaDate,
  MetaItem,
  MetadataRow,
  PrevNext,
  RHYTHM,
  PageContainer,
} from "@/components/ui";
import { getExpertiseForArticle } from "@/data/expertise.data";
import {
  breadcrumbJsonLd,
  personJsonLdReference,
  schemaDate,
} from "@/lib/seo";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allPosts.find(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );

  if (!post) {
    return undefined;
  }

  const { title, publishedAt: publishedTime, summary: description } = post;
  const canonical = `${personalInfo.url}/blog/${slug}`;
  const socialImage = `${canonical}/opengraph-image`;

  // Only when the frontmatter records a genuinely later revision. Every post
  // currently sets updatedAt equal to publishedAt, so this is omitted on all of
  // them rather than announcing a modification that never happened.
  const modifiedTime =
    post.updatedAt && post.updatedAt !== post.publishedAt
      ? post.updatedAt
      : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      ...(modifiedTime && { modifiedTime }),
      url: canonical,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    // Canonical was missing entirely — every article was published without one.
    alternates: { canonical },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  // A direct lookup. Sorting here was only ever needed to walk to the
  // neighbours, which lib/writing.ts now owns.
  const post = allPosts.find((p) => slugOfPost(p) === slug);

  if (!post) {
    notFound();
  }

  // Chronology comes from lib/writing.ts, the same order /blog renders and the
  // homepage teases. Walking a local copy of the array here is how previous
  // and next drift out of step with the index they came from.
  const { previous, next } = getAdjacentNotes(slug);

  // Computed in content-collections.ts from the raw MDX body. It used to be
  // derived here from `post.mdx` — the *compiled* bundle — so it counted
  // imports, JSX runtime calls and function names rather than prose, and
  // every "N min read" on the site was measuring source code.
  const readingMinutes = post.readingMinutes ?? 0;

  // The controller follows real article structure, not estimated reading time.
  // Code blocks and tables add substantial page height while intentionally not
  // counting toward prose reading time, so the old three-minute gate hid the
  // rail from every current article even when navigation was useful.
  const headings = (post.headings ?? []) as {
    id: string;
    text: string;
    level: 2 | 3;
  }[];

  const showToc = headings.length >= 2;
  const relatedExpertise = getExpertiseForArticle(slug);

  const tocItems = showToc
    ? headings.map((h) => ({ id: h.id, label: h.text, level: h.level }))
    : [];

  const canonical = `${personalInfo.url}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: post.title,
        datePublished: schemaDate(post.publishedAt),
        ...(post.updatedAt && post.updatedAt !== post.publishedAt
          ? { dateModified: schemaDate(post.updatedAt) }
          : {}),
        description: post.summary,
        image: `${canonical}/opengraph-image`,
        url: canonical,
        mainEntityOfPage: { "@id": canonical },
        isPartOf: { "@id": `${personalInfo.url}/blog#blog` },
        author: personJsonLdReference(),
        publisher: personJsonLdReference(),
        ...(post.wordCount && { wordCount: post.wordCount }),
      },
      breadcrumbJsonLd([
        { name: "Home", url: personalInfo.url },
        { name: "Blog", url: `${personalInfo.url}/blog` },
        { name: post.title, url: canonical },
      ]),
    ],
  };

  return (
    <PageContainer width="shell">
      <article className={RHYTHM.article}>
        <JsonLd data={jsonLd} />

        {/* ── Article header ──
            One H1, and only one. The duplicate came from the MDX bodies, five
            of which opened with `# <same title>` on top of this element; those
            leading H1s were removed from the source rather than hidden with
            CSS, so the document outline is now correct at the source.

            Spacing: 12px metadata to H1, 40px H1 to the body — deliberate
            rather than the uniform gap the section rhythm would otherwise
            impose on an article opening. */}
        {/* -- Masthead --
            Runs to `case-wide`, like a case-study hero, so an article opens
            with the same architecture as a project rather than starting
            inside the reading column. Only the header widens. */}
        <header className="flex max-w-case-wide flex-col gap-3">
          <BackLink href="/blog">All writing</BackLink>

          <div className="mt-2 flex flex-col gap-3">
            <MetadataRow>
              <MetaDate dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </MetaDate>
              {readingMinutes > 0 && (
                <MetaItem className="tabular-nums">
                  {readingMinutes} min read
                </MetaItem>
              )}
              {/* Only when the frontmatter genuinely records a later revision.
                  Every post currently sets updatedAt === publishedAt, so this
                  renders on none of them rather than printing "Updated" beside
                  an identical date. No author line: this is a personal site. */}
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <MetaItem>Updated {formatDate(post.updatedAt)}</MetaItem>
              )}
            </MetadataRow>

            {/* Beside the metadata, in metadata weight. Deliberately above the
                title in the DOM so it is reachable early by keyboard without
                sitting visually on top of the headline. */}
            <CopyLink className="-ml-2" />

            {/* 40px is the top of the existing type scale. The brief asked for
                44-56px; adding a rung for a single heading would fork a scale
                the whole site shares, and 40/32 already reads as the largest
                thing on the page. */}
            <h1 className="max-w-[26ch] text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>

            {/* The deck, from frontmatter. Present on all seven posts. */}
            {post.summary && (
              <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
            )}
          </div>
        </header>

        {/* Small screens get a disclosure instead of a rail — native <details>,
            so it is keyboard operable and costs no JavaScript. Hidden at the
            width where the rail takes over. */}
        {tocItems.length > 0 && (
          <details className="group min-[75rem]:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 border-y border-hairline py-3 font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground [&::-webkit-details-marker]:hidden">
              <ChevronRight
                aria-hidden
                className="size-3.5 transition-transform duration-200 [[open]_&]:rotate-90"
              />
              On this page
              <span className="tabular-nums text-subtle-foreground">
                {tocItems.length}
              </span>
            </summary>
            <nav aria-label="Article table of contents" className="pt-3">
              <ol className="flex flex-col border-l border-hairline">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        "block py-1.5 text-xs leading-snug text-muted-foreground transition-colors hover:text-brand-hover",
                        item.level === 3 ? "pl-6" : "pl-3"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </details>
        )}

        {/* Body + controller use the same shell arithmetic as project case
            studies: 75rem shell - 10rem rail - 2.5rem gap = 62.5rem body
            column. The prose itself stays at the 47rem reading measure. */}
        <div className="min-[75rem]:grid min-[75rem]:grid-cols-[minmax(0,1fr)_10rem] min-[75rem]:gap-10">
          <div className="prose max-w-case-text font-sans text-muted-foreground dark:prose-invert">
            <MDXContent code={post.mdx} components={mdxComponents} />
          </div>

          {tocItems.length > 0 && (
            <CaseStudyToc
              items={tocItems}
              label="Article table of contents"
              title="On this page"
            />
          )}
        </div>

        <RelatedExpertise pages={relatedExpertise} title="Use this in practice" />

        {/* No metadata restated here: the date and reading time sit at the top
            of this same page, a few hundred pixels up. No claps, shares, view
            counts or "you may also like" — this is a portfolio, and the quiet
            ending is the point. Just the way back and the way onward. */}
        <PrevNext
          label="Post pagination"
          index={{ href: "/blog", label: "All writing" }}
          previous={
            previous
              ? {
                  href: previous.href,
                  title: previous.title,
                  meta: formatDate(previous.publishedAt),
                }
              : null
          }
          next={
            next
              ? {
                  href: next.href,
                  title: next.title,
                  meta: formatDate(next.publishedAt),
                }
              : null
          }
        />
      </article>
    </PageContainer>
  );
}
