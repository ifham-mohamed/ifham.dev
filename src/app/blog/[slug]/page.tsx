import { allPosts } from "../../../../.content-collections/generated";
import { cn, formatDate } from "@/lib/utils";
import { personalInfo } from "@/data";
import type { Metadata } from "next";
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

function getSortedPosts() {
  return [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });
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

  let { title, publishedAt: publishedTime, summary: description, image } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${personalInfo.url}/blog/${slug}`,
      ...(image && {
        images: [
          {
            url: absoluteUrl(image),
          },
        ],
      }),
    },
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
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  const getSlug = (post: (typeof sortedPosts)[0]) =>
    post._meta.path.replace(/\.mdx$/, "");

  // Computed in content-collections.ts from the raw MDX body. It used to be
  // derived here from `post.mdx` — the *compiled* bundle — so it counted
  // imports, JSX runtime calls and function names rather than prose, and
  // every "N min read" on the site was measuring source code.
  const readingMinutes = post.readingMinutes ?? 0;

  // h2 only. The corpus holds 27 h2 against 2 h3, so nesting the rail would
  // add a level of indentation that almost nothing uses.
  const tocItems = (post.headings ?? [])
    .filter((h) => h.level === 2)
    .map((h) => ({ id: h.id, label: h.text }));

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
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

        <div className="flex flex-col gap-4">
          <BackLink href="/blog">All posts</BackLink>

          <header className="flex flex-col gap-3">
            <MetadataRow>
              <MetaDate dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </MetaDate>
              {readingMinutes > 0 && (
                <MetaItem className="tabular-nums">
                  {readingMinutes} min read
                </MetaItem>
              )}
            </MetadataRow>

            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {post.title}
            </h1>
          </header>
        </div>

        <div className="prose max-w-none font-sans text-muted-foreground dark:prose-invert">
          <MDXContent code={post.mdx} components={mdxComponents} />
        </div>

        <PrevNext
          label="Post pagination"
          previous={
            previousPost
              ? {
                  href: `/blog/${getSlug(previousPost)}`,
                  title: previousPost.title,
                }
              : null
          }
          next={
            nextPost
              ? { href: `/blog/${getSlug(nextPost)}`, title: nextPost.title }
              : null
          }
        />
      </article>

        {/* Only worth a rail when there is something to navigate. These posts
            run to a few hundred words; a contents list beside a three-heading
            article is more chrome than the article it indexes. */}
        {tocItems.length >= 3 && (
          <CaseStudyToc items={tocItems} label="Article sections" />
        )}
      </div>
    </PageContainer>
  );
}
