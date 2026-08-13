import * as React from "react";

/**
 * PracticesList — engineering practices, scannable heading-first.
 *
 * Derived, not authored. Across the fifteen projects, 46 of 60 `bestPractices`
 * bullets are already written as "Short label: the explanation" — so the
 * heading is the text before the colon and the body is everything after. No
 * new copy, no per-project mapping, and it stays correct as practices are
 * added.
 *
 * The 14 bullets with no colon render as a numbered paragraph without a
 * heading. Inventing one would mean truncating mid-phrase: "Drove the UI from
 * component state rather than ad-hoc DOM mutation" has no natural label, and
 * "Drove the UI" is not one.
 *
 * Not cards. A numbered rail plus generous spacing lets a reader run down the
 * headings and stop where it matters, which is the whole point of the section.
 */

/**
 * Inline code identifiers.
 *
 * Tuned against the real strings rather than guessed. An earlier, looser
 * version matched any three-letter acronym and marked API 12 times, JWT 9 and
 * RBAC 5 — prose, not code. Uppercase now only qualifies with an underscore,
 * a call or an assignment, which keeps DECIMAL(12,2) and NEXT_PUBLIC_* while
 * dropping the acronyms. Measured output: 43 distinct identifiers, 44 marks
 * across all fifteen projects.
 */
const CODE = new RegExp(
  [
    "\\b[a-z][a-zA-Z0-9-]*\\.\\$?[a-zA-Z][a-zA-Z0-9.]*(?:\\(\\))?", // prisma.$transaction, package-lock.json
    "\\b[A-Z][A-Z0-9]*_[A-Z0-9_]*\\*?(?:=\\S+)?", // NEXT_PUBLIC_*, GENERATE_SOURCEMAP=false
    "\\b[A-Z][A-Z0-9]{2,}\\([^)]{0,12}\\)", // DECIMAL(12,2)
    "\\b[a-zA-Z][a-zA-Z0-9]*\\(\\)", // sanitize(), can()
    "\\b[a-z]+[A-Z][a-zA-Z0-9]*\\b", // companyId, deletedAt
  ].join("|"),
  "g"
);

/** Wraps identifiers in <code>; everything else passes through untouched. */
function withInlineCode(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  CODE.lastIndex = 0;

  while ((match = CODE.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <code
        key={`${match.index}-${match[0]}`}
        className="rounded border border-border bg-muted/60 px-1 py-px font-mono text-[0.85em] text-foreground/90"
      >
        {match[0]}
      </code>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : [text];
}

/**
 * Splits "Label: explanation" into its two halves.
 *
 * Guards, each one earned from the real strings:
 *   - colon must fall in the first 60 characters
 *   - the heading may not contain a full stop or a URL scheme
 *   - parentheses in the heading must balance
 *
 * That last guard matters. "Pinned base images (node:13.12.0-alpine,
 * nginx:stable-alpine) for deterministic builds" has its first colon inside a
 * version tag, and without the check it split into the heading
 * "Pinned base images (node". Balanced parens reject it and the bullet falls
 * back to a plain paragraph, while "Clean Architecture (ports & adapters):"
 * still splits correctly.
 */
function splitPractice(text: string) {
  const idx = text.indexOf(":");
  if (idx < 0 || idx > 60) return { heading: null, body: text };

  const heading = text.slice(0, idx).trim();
  const body = text.slice(idx + 1).trim();

  const balanced =
    (heading.match(/\(/g)?.length ?? 0) === (heading.match(/\)/g)?.length ?? 0);

  if (
    !heading ||
    !body ||
    !balanced ||
    heading.includes(".") ||
    /https?$/i.test(heading)
  ) {
    return { heading: null, body: text };
  }
  return { heading, body };
}

export function PracticesList({ items }: { items: readonly string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <ol className="flex flex-col gap-7">
      {items.map((item, i) => {
        const { heading, body } = splitPractice(item);

        return (
          <li
            key={item}
            className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 gap-y-1"
          >
            {/* Numbered rail — a quiet index, not an icon. */}
            <span
              aria-hidden
              className="pt-px font-mono text-2xs tabular-nums text-muted-foreground/50"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="flex min-w-0 flex-col gap-1">
              {heading && (
                <h3 className="text-sm font-medium leading-snug text-foreground">
                  {heading}
                </h3>
              )}
              {/* Explanations stay in the body face. Only identifiers are
                  monospaced — a full technical sentence set in mono is harder
                  to read, not more technical. */}
              <p className="max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
                {withInlineCode(body)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default PracticesList;
