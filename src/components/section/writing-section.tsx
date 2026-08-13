import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui";
import { allPosts } from "../../../.content-collections/generated";
import { mediumPosts } from "@/data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * WritingSection — an engineering notebook, not a blog card grid.
 *
 * Two problems with the previous version:
 *
 *  1. It listed Medium posts only, so seven internal blog posts never appeared
 *     on the homepage at all — the most recent piece shown could be a year
 *     older than something already published on this site.
 *  2. Each entry was a single line of text, which made writing look like a
 *     link dump rather than something worth reading.
 *
 * Both sources are merged and sorted by date here, so "latest" means latest.
 *
 * No cover images. Every MDX post does carry an `image`, but all seven are
 * generic Unsplash stock — a laptop, a desk, a keyboard. Stock photography is
 * not the article's own imagery, and leading with it would produce exactly the
 * generic card grid this section is meant to avoid.
 */

interface WritingEntry {
  title: string;
  href: string;
  publishedAt: string;
  summary?: string;
  /** Where it lives. Drives the external-link affordance. */
  source: "Notes" | "Medium";
  external: boolean;
}

function getRecentWriting(limit: number): WritingEntry[] {
  const internal: WritingEntry[] = allPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post._meta.path.replace(/\.mdx$/, "")}`,
    publishedAt: post.publishedAt,
    summary: post.summary,
    source: "Notes",
    external: false,
  }));

  const external: WritingEntry[] = mediumPosts.map((post) => ({
    title: post.title,
    href: post.url,
    publishedAt: post.publishedAt,
    summary: post.excerpt,
    source: "Medium",
    external: true,
  }));

  return [...internal, ...external]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
}

const TOTAL = allPosts.length + mediumPosts.length;

export default function WritingSection() {
  const entries = getRecentWriting(3);

  return (
    <Section
      id="writing"
      eyebrow="Writing"
      index={8}
      title="Notes"
      description="Engineering notes, architecture decisions, and things learned while building systems."
      count={TOTAL}
    >
      <div className="flex flex-col gap-5">
        <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
          {entries.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                target={entry.external ? "_blank" : undefined}
                rel={entry.external ? "noopener noreferrer" : undefined}
                className="group/post flex flex-col gap-1.5 py-5 transition-colors"
              >
                {/* Source + date. Secondary at every breakpoint: mono, small,
                    muted — it wraps before the title ever does. */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-2xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 uppercase tracking-[0.12em]">
                    {entry.source}
                    {/* Only external sources get the indicator. */}
                    {entry.external && (
                      <ArrowUpRight aria-hidden className="size-3 opacity-70" />
                    )}
                  </span>
                  <span aria-hidden className="h-3 w-px bg-hairline" />
                  <time dateTime={entry.publishedAt} className="tabular-nums">
                    {formatDate(entry.publishedAt)}
                  </time>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h3
                    className={cn(
                      "min-w-0 text-base font-medium leading-snug tracking-tight text-foreground sm:text-lg",
                      "transition-transform duration-200 group-hover/post:translate-x-0.5"
                    )}
                  >
                    {entry.title}
                  </h3>
                  <ArrowRight
                    aria-hidden
                    className="mt-1 size-4 flex-none text-muted-foreground/50 transition-all duration-200 group-hover/post:translate-x-0.5 group-hover/post:text-foreground"
                  />
                </div>

                {entry.summary && (
                  <p className="max-w-[64ch] text-sm leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/blog"
          className="group/all inline-flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all writing
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 group-hover/all:translate-x-0.5"
          />
        </Link>
      </div>
    </Section>
  );
}
