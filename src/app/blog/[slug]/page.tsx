import { allPosts } from "../../../../.content-collections/generated";
import { cn, formatDate } from "@/lib/utils";
import { personalInfo } from "@/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import {
  BackLink,
  MetaDate,
  MetaItem,
  MetadataRow,
  PrevNext,
  RHYTHM,
  PageContainer,
} from "@/components/ui";

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
            url: `${personalInfo.url}${image}`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && {
        images: [`${personalInfo.url}${image}`],
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

  const wordCount = post.mdx ? post.mdx.split(/\s+/).filter(Boolean).length : 0;
  const readingMinutes = wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 220)) : 0;

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.summary,
    image: post.image
      ? `${personalInfo.url}${post.image}`
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
    </PageContainer>
  );
}
