import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui";
import { getAllWriting, getWritingCounts } from "@/lib/writing";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * WritingSection — a teaser for the notebook, not the notebook.
 *
 * Three entries, merged across both sources and sorted by date, so "latest"
 * means latest rather than latest-on-this-domain. The complete index lives at
 * /blog and this section deliberately shows less per row than that page does:
 * enough to judge whether a piece is worth opening, and nothing more.
 *
 * ── Internal and external are not styled alike ──
 *
 * A Medium piece leaves the site, so it says so twice: an outbound arrow in the
 * metadata line and "External article" as its action. An internal note gets
 * "Read note" and a rightward arrow. Same row anatomy, different destination
 * signal — a reader should know where a click lands before making it.
 *
 * No cover images. Every MDX post carries an `image`, but all seven are generic
 * Unsplash stock — a laptop, a desk, a keyboard. Stock photography is not the
 * article's own imagery, and leading with it would produce exactly the card
 * grid this section exists to avoid.
 */

/**
 * Entries, counts and ordering all come from lib/writing.ts. This section used
 * to build its own `WritingEntry`, merge both sources and sort them — a third
 * copy of logic /blog and /blog/[slug] also had, which is how "latest" could
 * mean one thing here and another there.
 */

/** A thin separator between metadata items — never read aloud. */
function Dot() {
  return (
    <span aria-hidden className="text-border-strong">
      ·
    </span>
  );
}

export default function WritingSection() {
  const entries = getAllWriting().slice(0, 3);
  const { total } = getWritingCounts();

  return (
    <Section
      id="writing"
      eyebrow="Writing"
      index={9}
      title="Notes"
      description="Engineering notes, architecture decisions, and things learned while building systems."
      count={total}
    >
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
          {entries.map((entry) => (
            <li key={entry.key}>
              <Link
                href={entry.href}
                target={entry.external ? "_blank" : undefined}
                rel={entry.external ? "noopener noreferrer" : undefined}
                className="group/post flex flex-col gap-2 py-5"
              >
                {/* Metadata sits above the title at every width, so the phone
                    layout is the layout — nothing reflows from a far-right
                    column into a stacked one. It wraps before the title does. */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-foreground/70">
                    {entry.source}
                    {entry.external && (
                      <ArrowUpRight aria-hidden className="size-3 opacity-70" />
                    )}
                  </span>

                  <Dot />
                  <time dateTime={entry.publishedAt} className="tabular-nums">
                    {formatDate(entry.publishedAt)}
                  </time>

                  {/* Only where a real figure exists. Medium pieces record no
                      reading time, and inventing one would be a fabricated
                      number sitting next to two real ones. */}
                  {entry.readingMinutes && (
                    <>
                      <Dot />
                      <span className="tabular-nums">
                        {entry.readingMinutes} min
                      </span>
                    </>
                  )}
                </div>

                {/* The dominant element. Only the colour changes on hover —
                    the row itself never scales. */}
                <h3 className="max-w-[46ch] text-base font-medium leading-snug tracking-tight text-foreground/90 transition-colors group-hover/post:text-foreground sm:text-lg">
                  {entry.title}
                </h3>

                {entry.description && (
                  <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                )}

                {/* States the destination rather than just pointing at it. */}
                <span
                  className={cn(
                    "mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground",
                    "transition-colors group-hover/post:text-foreground"
                  )}
                >
                  {entry.external ? "External article" : "Read note"}
                  {entry.external ? (
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-200 group-hover/post:translate-x-1 group-hover/post:-translate-y-0.5"
                    />
                  ) : (
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-200 group-hover/post:translate-x-1"
                    />
                  )}
                  {entry.external && (
                    <span className="sr-only"> (opens in a new tab)</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/blog"
          className="group/all inline-flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-brand-hover"
        >
          View all writing
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 group-hover/all:translate-x-1"
          />
        </Link>
      </div>
    </Section>
  );
}
