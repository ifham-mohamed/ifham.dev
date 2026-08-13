import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading,
  PageContainer,
} from "@/components/ui";
import { allPosts } from "../../../.content-collections/generated";
import { mediumPosts } from "@/data";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
};

/**
 * PostRow — posts are a title and a date. A bordered, blurred card per post
 * meant nine card edges competing with nine titles; a divided list gets out
 * of the way of the words, which is the only thing anyone came here to read.
 */
function PostRow({
  href,
  title,
  date,
  summary,
  external,
  kicker,
}: {
  href: string;
  title: string;
  date: string;
  /** The index is the complete list; it should say more than the teaser did. */
  summary?: string;
  external?: boolean;
  kicker?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex flex-col gap-1 py-4"
      >
        <span className="flex items-baseline justify-between gap-4">
        <span className="flex min-w-0 items-baseline gap-2">
          {kicker && (
            <span className="flex-none text-2xs uppercase tracking-[0.12em] text-muted-foreground/60">
              {kicker}
            </span>
          )}
          <span className="text-sm text-foreground/85 transition-colors group-hover:text-foreground">
            {title}
            {external && (
              <ArrowUpRight
                aria-hidden
                className="ml-1 inline size-3 -translate-y-px opacity-0 transition-opacity group-hover:opacity-60"
              />
            )}
          </span>
        </span>
        <time className="flex-none text-2xs tabular-nums text-muted-foreground">
          {date}
        </time>
        </span>

        {summary && (
          <span className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
            {summary}
          </span>
        )}
      </Link>
    </li>
  );
}

export default function BlogPage() {
  const sortedPosts = [...allPosts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );

  return (
    <PageContainer width="shell">
      {/* Shell for chrome alignment, but the lists stop at `case-wide`.
          A post row is a title on the left and a date on the right - run it
          to a full 75rem and the date drifts so far from the title that the
          pair stops reading as one row. */}
      <main className="flex max-w-case-wide flex-col gap-12">
        <SectionHeading
          as="h1"
          eyebrow="Writing"
          title="Blog"
          description="Notes on software development, architecture, and the things I get wrong first."
          count={sortedPosts.length + mediumPosts.length}
        />

        {sortedPosts.length > 0 && (
          <Reveal>
            <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
              {sortedPosts.map((post) => (
                <PostRow
                  key={post._meta.path}
                  href={`/blog/${post._meta.path.replace(/\.mdx$/, "")}`}
                  title={post.title}
                  date={formatDate(post.publishedAt)}
                  summary={post.summary}
                />
              ))}
            </ul>
          </Reveal>
        )}

        {mediumPosts.length > 0 && (
          <Reveal>
            <section className="flex flex-col gap-6">
              <SectionHeading
                eyebrow="External"
                title="On Medium"
                description="Long-form articles published off-site."
                count={mediumPosts.length}
              />
              <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
                {mediumPosts.map((post) => (
                  <PostRow
                    key={post.url}
                    href={post.url}
                    title={post.title}
                    date={formatDate(post.publishedAt)}
                    summary={post.excerpt}
                    external
                    kicker="Medium"
                  />
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {sortedPosts.length === 0 && mediumPosts.length === 0 && (
          <p className="rounded-lg border border-border bg-surface p-6 text-center text-sm text-muted-foreground">
            No posts yet — check back soon.
          </p>
        )}
      </main>
    </PageContainer>
  );
}
