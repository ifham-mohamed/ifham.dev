import * as React from "react";

/**
 * Marks known terms inside a plain string, returning React nodes.
 *
 * Used by the case-study Role & context and Problem sections so a paragraph
 * can carry typographic emphasis without the source string needing markdown
 * and without a second copy of the text existing anywhere.
 *
 * The term list is always supplied from the project's own structured fields —
 * `signals`, `technologies` — so a paragraph can never be made to emphasise a
 * claim the data does not already contain. Nothing is added, removed or
 * reordered; only wrapped.
 *
 * Whole-word, case-insensitive, longest-first so "FIFO/WAC inventory" wins
 * over "inventory", and capped so a paragraph stays prose instead of becoming
 * a field of highlights.
 */
export function emphasise(
  text: string,
  terms: readonly string[],
  { max = 5, className = "font-medium text-foreground" } = {}
): React.ReactNode[] {
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const candidates = [...new Set(terms)]
    .filter((t) => t.length > 2)
    .sort((a, b) => b.length - a.length);

  const chosen: string[] = [];
  for (const term of candidates) {
    if (chosen.length >= max) break;
    if (new RegExp(`\\b${escape(term)}\\b`, "i").test(text)) chosen.push(term);
  }

  if (chosen.length === 0) return [text];

  const pattern = new RegExp(`\\b(${chosen.map(escape).join("|")})\\b`, "gi");
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <strong key={`${match.index}-${match[0]}`} className={className}>
        {match[0]}
      </strong>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return parts;
}

export default emphasise;
