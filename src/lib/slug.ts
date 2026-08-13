/**
 * Heading slugs, in one place.
 *
 * Two things need to agree on what a heading's id is: the content pipeline,
 * which extracts the table of contents at build time, and the MDX renderer,
 * which puts the id on the rendered <h2>. If they disagree by so much as a
 * hyphen, every link in the contents list is a dead anchor — and nothing would
 * fail loudly, the page would just refuse to scroll.
 *
 * So both import this. `rehype-slug` would have done the job, but it is a
 * dependency for eleven lines and it would still leave the contents extraction
 * to solve separately.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Strip inline markdown that survives into heading text: `code`, **bold**,
    // [links](url). The visible words are what should form the slug.
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Flattens React children down to the text a slug can be built from. */
export function textFromChildren(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromChildren).join("");
  if (typeof node === "object" && "props" in (node as Record<string, unknown>)) {
    const props = (node as { props?: { children?: unknown } }).props;
    return textFromChildren(props?.children);
  }
  return "";
}

export default slugify;
