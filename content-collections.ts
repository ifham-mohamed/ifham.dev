import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import remarkGfm from "remark-gfm";
import { slugify } from "./src/lib/slug";

/**
 * Strips MDX down to the prose a reader actually reads.
 *
 * Fenced code, inline code, JSX tags, link URLs, image embeds and heading
 * markers all count toward file size but not toward reading effort, so none of
 * them belong in a word count.
 */
function toPlainText(mdx: string): string {
  return mdx
    .replace(/^---[\s\S]*?^---/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/^[#>\-*+|]+\s*/gm, "")
    .replace(/[*_~]/g, "");
}

/** 220 wpm — the conventional figure for technical prose. */
const WORDS_PER_MINUTE = 220;

/**
 * Headings for the contents rail, extracted at build time.
 *
 * Only h2 and h3: h1 is the article title, which the page renders itself, and
 * h4 never appears in this corpus. Fenced code is removed first so a `#` in a
 * shell snippet is not mistaken for a heading.
 */
function extractHeadings(mdx: string) {
  const body = mdx
    .replace(/^---[\s\S]*?^---/m, "")
    .replace(/```[\s\S]*?```/g, "");

  const headings: { id: string; text: string; level: 2 | 3 }[] = [];
  const seen = new Map<string, number>();

  for (const match of body.matchAll(/^(#{2,3})\s+(.+?)\s*$/gm)) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[`*_~]/g, "").trim();
    let id = slugify(text);
    if (!id) continue;

    // Two headings with the same wording would otherwise produce two elements
    // with the same id, and every link to the second would land on the first.
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

    headings.push({ id, text, level });
  }

  return headings;
}

const posts = defineCollection({
  name: "posts",
  directory: "content",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.string(),
    image: z.string().optional(),
    /**
     * Declared because both keys are already present in every file's
     * frontmatter. `z.object` strips anything it does not know about, so until
     * now they were parsed and silently discarded — metadata that looked live
     * in the source and reached nothing.
     */
    author: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
  transform: async (document, context) => {
    // GFM was a dependency all along and was never handed to the compiler,
    // so `~~strikethrough~~`, tables and task lists all reached the page as
    // literal punctuation. Three files use tables, two use strikethrough and
    // one uses a task list — none of it rendered.
    //
    // No `rehype-raw`: enabling arbitrary HTML in MDX would mean sanitising it,
    // and nothing in this corpus needs it. MDX already permits real components
    // through the explicit `mdxComponents` map, which is the safe path.
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });

    // `document.content` is the raw MDX body. `mdx` is the *compiled* bundle —
    // imports, JSX runtime calls, function names — so counting words in it
    // measured source code rather than prose, and every "N min read" on the
    // site was wrong. Reading time is derived here, once, from the real text.
    const source = document.content ?? "";
    const words = toPlainText(source).split(/\s+/).filter(Boolean).length;

    return {
      ...document,
      mdx,
      wordCount: words,
      readingMinutes: words > 0 ? Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)) : 0,
      headings: extractHeadings(source),
    };
  },
});

export default defineConfig({
  collections: [posts],
});
