import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading, PageContainer } from "@/components/ui";
import { allPosts } from "../../../.content-collections/generated";
import { mediumPosts, personalInfo } from "@/data";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
  alternates: { canonical: `${personalInfo.url}/blog` },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
};

/**
 * Reading time comes from the content-collections transform. Read through a
 * cast because the generated types only gain the field once the collection
 * rebuilds, and a clean checkout should still compile before that happens.
 */
function minutesOf(post: unknown): number | undefined {
  const value = (post as { readingMinutes?: number }).readingMinutes;
  return typeof value === "number" && value > 0 ? value : undefined;
}

function slugOf(post: { _meta: { path: string } }): string {
  return post._meta.path.replace(/\.mdx$/, "");
}

/**
 * FeaturedNote — the most recent internal note, given room to argue for itself.
 *
 * There is no `featured` flag in the frontmatter schema and none of the seven
 * posts declares one, so "latest" is the selection rule. Adding a flag would
 * mean maintaining a second piece of metadata that says what the date already
 * says.
 *
 * No artwork. Every post carries an `image`, but all seven are Unsplash stock —
 * a laptop, a desk, a keyboard. The brief allows a wide feature only where
 * genuine article artwork exists, so this one is built from type and rules
 * instead of a decorative photograph that tells a reader nothing.
 *
 * The right-hand column holds the note's index rather than being left empty for
 * symmetry: it is the only place on the page that shows where this piece sits
 * in the sequence.
 */
function FeaturedNote({
  href,
  title,
  summary,
  date,
  dateTime,
  minutes,
  index,
}: {
  href: string;
  title: string;
  summary?: string;
  date: string;
  dateTime: string;
  minutes?: number;
  index: string;
}) {
  return (
    <Link
      href={href}
      // A rule top and bottom, no card. A rounded box with a shadow here would
      // make the newest note look like an advertisement for itself.
      className="group flex flex-col gap-5 border-y border-hairline py-8 sm:flex-row sm:items-start sm:gap-10 sm:py-10"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground">
          <span className="text-brand">Latest note</span>
          <span aria-hidden className="text-border-strong">
            ·
          </span>
          <time dateTime={dateTime} className="tabular-nums">
            {date}
          </time>
          {minutes && (
            <>
              <span aria-hidden className="text-border-strong">
                ·
              </span>
              <span className="tabular-nums">{minutes} min</span>
            </>
          )}
        </div>

        <h3 className="max-w-[24ch] text-xl font-semibold leading-tight tracking-tight text-foreground transition-colors sm:text-2xl">
          {title}
        </h3>

        {summary && (
          <p className="max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        )}

        <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 transition-colors group-hover:text-brand-hover">
          Read article
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>

      {/* Technical metadata, not decoration. Hidden on phones, where it would
          cost a row to say something the list below already implies. */}
      <div className="hidden flex-none border-l border-hairline pl-8 sm:block">
        <span className="font-mono text-3xl font-medium tabular-nums leading-none text-subtle-foreground/30">
          {index}
        </span>
      </div>
    </Link>
  );
}

/**
 * NoteRow — one line of an engineering journal index.
 *
 * Three columns on desktop: index, then the note itself, then when it was
 * written and how long it takes. The date column is `sm:` only — on a phone it
 * collapses under the description rather than holding an empty gutter open.
 *
 * Excerpts are the frontmatter `summary`, which all seven posts already carry,
 * so nothing is generated from the first paragraph and no second copy of the
 * description is maintained anywhere.
 */
function NoteRow({
  href,
  index,
  title,
  summary,
  date,
  dateTime,
  minutes,
  external,
  kicker,
}: {
  href: string;
  index?: string;
  title: string;
  summary?: string;
  date: string;
  dateTime?: string;
  minutes?: number;
  external?: boolean;
  kicker?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        // One anchor wrapping the whole row: no nested interactive elements, so
        // there is exactly one tab stop and one thing a screen reader announces.
        className="group grid grid-cols-1 gap-x-6 gap-y-2 px-1 py-6 transition-colors hover:bg-surface-raised sm:grid-cols-[2.5rem_minmax(0,1fr)_7rem] sm:py-6"
      >
        <span
          aria-hidden
          className="font-mono text-2xs tabular-nums text-subtle-foreground sm:pt-1"
        >
          {kicker ?? index}
        </span>

        <span className="flex min-w-0 flex-col gap-1.5">
          <span className="flex items-start gap-2">
            <span className="min-w-0 text-base font-medium leading-snug tracking-tight text-foreground/85 transition-colors group-hover:text-brand-hover">
              {title}
            </span>
            {external ? (
              <ArrowUpRight
                aria-hidden
                className="mt-1 size-3.5 flex-none text-subtle-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-hover"
              />
            ) : (
              <ArrowRight
                aria-hidden
                className="mt-1 size-3.5 flex-none text-subtle-foreground/0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand-hover"
              />
            )}
          </span>

          {summary && (
            <span className="max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
              {summary}
            </span>
          )}
        </span>

        <span className="flex items-baseline gap-2 font-mono text-2xs text-muted-foreground sm:flex-col sm:items-end sm:gap-1">
          <time dateTime={dateTime} className="tabular-nums">
            {date}
          </time>
          {minutes && (
            <span className="tabular-nums text-subtle-foreground">
              {minutes} min
            </span>
          )}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </span>
      </Link>
    </li>
  );
}

export default function BlogPage() {
  const sortedPosts = [...allPosts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );

  // Newest first, so note 01 is the newest and the numbers stay stable as a
  // reader scrolls. Derived from the collection — never hardcoded.
  const numbered = sortedPosts.map((post, i) => ({
    post,
    index: String(i + 1).padStart(2, "0"),
  }));

  const [featured, ...rest] = numbered;
  const total = sortedPosts.length + mediumPosts.length;

  return (
    <PageContainer width="shell">
      {/* Intentionally no category rail and no search. The frontmatter schema
          has no tags or categories, and deriving them from titles would be
          inventing taxonomy; seven internal notes do not need a search field
          that costs more interface than it saves. */}
      <main className="flex max-w-case-wide flex-col pt-10 sm:pt-14 lg:pt-20">
        {/* 48px to the first section — enough to separate the intro without
            opening a gap that reads as an empty hero. */}
        <div className="flex flex-col gap-12">
          <SectionHeading
            as="h1"
            eyebrow="Writing"
            title="Blog"
            description="Notes on software development, architecture, and the things I get wrong first."
            count={total}
          />

          {featured && (
            <Reveal>
              <FeaturedNote
                href={`/blog/${slugOf(featured.post)}`}
                title={featured.post.title}
                summary={featured.post.summary}
                date={formatDate(featured.post.publishedAt)}
                dateTime={featured.post.publishedAt}
                minutes={minutesOf(featured.post)}
                index={featured.index}
              />
            </Reveal>
          )}

          {rest.length > 0 && (
            <Reveal>
              <section className="flex flex-col gap-6">
                {/* "More notes", not "All notes": the newest one is the feature
                    directly above, and listing it again a few hundred pixels
                    later would make seven notes look like eight. The count says
                    what is actually in the list. */}
                <SectionHeading
                  eyebrow="Index"
                  title="More notes"
                  count={rest.length}
                />
                <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
                  {rest.map(({ post, index }) => (
                    <NoteRow
                      key={post._meta.path}
                      href={`/blog/${slugOf(post)}`}
                      index={index}
                      title={post.title}
                      summary={post.summary}
                      date={formatDate(post.publishedAt)}
                      dateTime={post.publishedAt}
                      minutes={minutesOf(post)}
                    />
                  ))}
                </ul>
              </section>
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
                    <NoteRow
                      key={post.url}
                      href={post.url}
                      title={post.title}
                      summary={post.excerpt}
                      date={formatDate(post.publishedAt)}
                      dateTime={post.publishedAt}
                      external
                      kicker="MED"
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
        </div>
      </main>
    </PageContainer>
  );
}
