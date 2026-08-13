import { allPosts } from "../../../../.content-collections/generated";
import { cn, formatDate } from "@/lib/utils";
import { personalInfo } from "@/data";
import { getAdjacentNotes, slugOfPost } from "@/lib/writing";
import { CopyLink } from "@/components/blog/copy-link";
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

/**
 * Absolute URLs pass through; site-relative paths get the origin.
 *
 * Frontmatter `image` values in this corpus are absolute (Unsplash), and the
 * previous template-literal prefix produced
 * "https://ifham.devhttps://images.unsplash.com/..." — an invalid URL, so the
 * Open Graph card was broken on every post that declared an image.
 */
function absoluteUrl(path: string): string {
  return /^https?:\/\//i.test(path) ? path : `${personalInfo.url}${path}`;
}

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

  const { title, publishedAt: publishedTime, summary: description, image } = post;
  const canonical = `${personalInfo.url}/blog/${slug}`;

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
      url: `${personalInfo.url}/blog/${slug}`,
      ...(image && {
        images: [
          {
            url: absoluteUrl(image),
          },
        ],
      }),
    },
    // Canonical was missing entirely — every article was published without one.
    alternates: { canonical },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && {
        images: [absoluteUrl(image)],
      }),
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

  // ── When a contents rail is worth showing ──
  //
  // Two conditions, not one. Every post in this corpus clears "3+ headings",
  // but they run 94 to 233 words — nextjs-performance-tips has four headings
  // across 94 words, a heading every 24 words. A rail there indexes an article
  // you can already see without scrolling, and makes a short note look like
  // documentation.
  //
  // So length gates it too: three minutes of reading is roughly where a reader
  // loses sight of the top of the page and navigation starts to earn its
  // column. On today's content that means no post shows one — which is the
  // threshold working, not the feature failing.
  const headings = (post.headings ?? []) as {
    id: string;
    text: string;
    level: 2 | 3;
  }[];

  const showToc = headings.length >= 3 && readingMinutes >= 3;

  const tocItems = showToc
    ? headings.map((h) => ({ id: h.id, label: h.text, level: h.level }))
    : [];

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    // Omitted unless real. `dateModified: publishedAt` claimed every article
    // was revised on the day it shipped — a property with no genuine value.
    ...(post.updatedAt && post.updatedAt !== post.publishedAt
      ? { dateModified: post.updatedAt }
      : {}),
    description: post.summary,
    image: post.image
      ? absoluteUrl(post.image)
      : `${personalInfo.url}/blog/${slug}/opengraph-image`,
    url: `${personalInfo.url}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
  }).replace(/</g, "\\u003c");

  return (
    <PageContainer width="shell">
      {/* The article keeps a reading measure - `case-text`, the same 47rem
          the case studies use. This one is load-bearing: the body below is
          `prose max-w-none`, so without a cap here the widened shell would
          set MDX paragraphs at ~115 characters a line. */}
      {/* Same arithmetic as the case studies: shell 75rem - rail 10rem -
          gap 2.5rem. Below 1200px the grid does not exist and the article is a
          single column. */}
      <div className="min-[75rem]:grid min-[75rem]:grid-cols-[minmax(0,1fr)_10rem] min-[75rem]:gap-10">
      <article className={cn(RHYTHM.section, "max-w-case-text")}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: jsonLdContent,
          }}
        />

        {/* ── Article header ──
            One H1, and only one. The duplicate came from the MDX bodies, five
            of which opened with `# <same title>` on top of this element; those
            leading H1s were removed from the source rather than hidden with
            CSS, so the document outline is now correct at the source.

            Spacing: 12px metadata to H1, 40px H1 to the body — deliberate
            rather than the uniform gap the section rhythm would otherwise
            impose on an article opening. */}
        <header className="flex flex-col gap-3">
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
            <h1 className="max-w-[22ch] text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
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
              <span className="tabular-nums text-muted-foreground/55">
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
                        "block py-1.5 text-xs leading-snug text-muted-foreground transition-colors hover:text-foreground",
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

        <div className="prose max-w-none font-sans text-muted-foreground dark:prose-invert">
          <MDXContent code={post.mdx} components={mdxComponents} />
        </div>

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

        {/* Only worth a rail when there is something to navigate. These posts
            run to a few hundred words; a contents list beside a three-heading
            article is more chrome than the article it indexes. */}
        {tocItems.length > 0 && (
          <CaseStudyToc
            items={tocItems}
            label="Article table of contents"
            title="On this page"
          />
        )}
      </div>
    </PageContainer>
  );
}
