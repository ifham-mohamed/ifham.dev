import { allPosts } from "../../.content-collections/generated";
import { mediumPosts } from "@/data";

/**
 * The writing system's single source of truth.
 *
 * Sorting, slug derivation, reading time and the internal/external merge were
 * each implemented three times — on the homepage, on /blog and on
 * /blog/[slug] — with three slightly different shapes. Previous/next therefore
 * walked a different order than the index it came from, and any change to the
 * merge rule had to be made in three places or the pages quietly disagreed.
 *
 * Everything reads from here now.
 *
 * ── Fields deliberately absent ──
 *
 * `tags` / `categories`: no post declares any, and the frontmatter schema has
 * no field for them. Deriving them from titles would be inventing taxonomy.
 *
 * `featured`: nothing sets it. /blog features the newest note, which the
 * publication date already tells us — a flag would be a second piece of
 * metadata restating the first, and a chance for the two to disagree.
 *
 * Neither is stubbed out to satisfy a schema. When real values exist they can
 * be added here in one place.
 */

export interface WritingEntry {
  /** Stable id. The slug for internal notes, the URL for external ones. */
  key: string;
  title: string;
  /** Where to send the reader — a route, or an off-site URL. */
  href: string;
  publishedAt: string;
  /** Only when the frontmatter records a genuinely later revision. */
  updatedAt?: string;
  /** Frontmatter `summary` internally, `excerpt` for Medium. */
  description?: string;
  /** Internal notes only: computed at build time from the real prose. */
  readingMinutes?: number;
  external: boolean;
  source: "Notes" | "Medium";
}

/**
 * `readingMinutes` and `headings` are produced by the transform in
 * content-collections.ts. The generated types only gain them once the
 * collection rebuilds, so a clean checkout would not compile without this.
 */
type GeneratedPost = (typeof allPosts)[number] & {
  readingMinutes?: number;
  updatedAt?: string;
};

export function slugOfPost(post: { _meta: { path: string } }): string {
  return post._meta.path.replace(/\.mdx$/, "");
}

function toEntry(post: GeneratedPost): WritingEntry {
  const minutes = post.readingMinutes;
  const slug = slugOfPost(post);

  return {
    key: slug,
    title: post.title,
    href: `/blog/${slug}`,
    publishedAt: post.publishedAt,
    // Only surfaced when it differs — every post currently sets updatedAt
    // equal to publishedAt, and "Updated" beside an identical date is noise.
    updatedAt:
      post.updatedAt && post.updatedAt !== post.publishedAt
        ? post.updatedAt
        : undefined,
    description: post.summary,
    readingMinutes: typeof minutes === "number" && minutes > 0 ? minutes : undefined,
    external: false,
    source: "Notes",
  };
}

const byNewest = (a: WritingEntry, b: WritingEntry) =>
  +new Date(b.publishedAt) - +new Date(a.publishedAt);

/** Internal notes, newest first. The order everything else derives from. */
export function getNotes(): WritingEntry[] {
  return (allPosts as GeneratedPost[]).map(toEntry).sort(byNewest);
}

/** External writing. No reading time is recorded for these, and none is invented. */
export function getExternalWriting(): WritingEntry[] {
  return mediumPosts
    .map(
      (post): WritingEntry => ({
        key: post.url,
        title: post.title,
        href: post.url,
        publishedAt: post.publishedAt,
        description: post.excerpt,
        external: true,
        source: "Medium",
      })
    )
    .sort(byNewest);
}

/** Both sources interleaved by date — what the homepage teases. */
export function getAllWriting(): WritingEntry[] {
  return [...getNotes(), ...getExternalWriting()].sort(byNewest);
}

/** Counts for section headers. Derived, never written into a component. */
export function getWritingCounts() {
  const notes = allPosts.length;
  const external = mediumPosts.length;
  return { notes, external, total: notes + external };
}

/**
 * Previous / next within the internal notes, walking the same order the index
 * renders. "Previous" is the older note, so the pair reads as a timeline
 * rather than as array positions.
 */
export function getAdjacentNotes(slug: string): {
  previous: WritingEntry | null;
  next: WritingEntry | null;
} {
  const notes = getNotes();
  const i = notes.findIndex((n) => n.key === slug);
  if (i === -1) return { previous: null, next: null };

  return {
    next: i > 0 ? notes[i - 1] : null,
    previous: i < notes.length - 1 ? notes[i + 1] : null,
  };
}
