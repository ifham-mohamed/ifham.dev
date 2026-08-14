import * as React from "react";

/**
 * OutcomesGrid — what shipped, in a scannable two-column grid.
 *
 * ── Why this does not split heading from detail ──
 *
 * The brief asked for signal / heading / supporting explanation. I built that
 * twice and tested both against all 58 outcome strings, and both mangled the
 * copy:
 *
 *   - consuming "(" as a clause boundary orphaned the closing bracket —
 *     "Complete 2-layer fabricated PCB" / "top + bottom) plus a full…"
 *   - fixed-width cuts split phrases — "…migrations from v1.0" / "Foundation
 *     to v9.0…" and "…running in CI on an" / "ephemeral Postgres"
 *   - status keywords matched mid-sentence, so a CI/CD pipeline outcome was
 *     labelled "Production" because the word appeared forty words later, and
 *     an RBAC workflow was labelled "Live" because of "live cursors"
 *
 * Unlike `bestPractices`, which follows a "Label: explanation" convention in
 * 72% of cases, outcomes are free-form prose with no shared shape. So only the
 * genuinely safe extraction is performed: a **leading** number, which is the
 * first token of the string and cannot be ambiguous. Everything after it is
 * rendered verbatim. Outcomes that do not open with a figure keep their full
 * text and take a quiet index instead.
 *
 * Nothing is truncated, reordered or reworded anywhere in this component —
 * signal + body always reconstruct the original string exactly.
 *
 * The headline status values ("Production", "Real merchants") already live in
 * the evidence strip near the top of the case study, where they are curated
 * and grounded. Repeating them here would be duplication, not hierarchy.
 */

/**
 * A figure at the very start of the string — the only unambiguous signal.
 *
 * `[\s\S]` rather than `.` with the `s` flag: tsconfig targets ES2017 and
 * dotAll landed in ES2018, so the flag fails the production typecheck. This
 * form is identical in behaviour and needs no target bump.
 */
const LEADING_FIGURE = /^(~?\d[\d,]*(?:\.\d+)?\+?%?)\s+([\s\S]+)$/;

function splitOutcome(text: string) {
  const match = text.match(LEADING_FIGURE);
  if (!match) return { figure: null, body: text };
  return { figure: match[1], body: match[2] };
}

export function OutcomesGrid({ items }: { items: readonly string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <ol
      className={
        // Two columns on large screens. Dividers rather than cards: an outcome
        // is a sentence, and a bordered tile per sentence reads as a KPI board.
        "grid grid-cols-1 gap-x-10 gap-y-px bg-hairline " +
        "min-[52rem]:grid-cols-2"
      }
    >
      {items.map((item, i) => {
        const { figure, body } = splitOutcome(item);

        return (
          <li
            key={item}
            className="flex gap-4 bg-background py-5 min-[52rem]:py-6"
          >
            {/* Either the figure or a quiet index — the column stays aligned
                whichever it is, so the grid reads evenly. */}
            <span className="w-14 flex-none pt-0.5 text-right">
              {figure ? (
                <span className="font-mono text-xl font-medium tabular-nums leading-none tracking-tight text-foreground">
                  {figure}
                </span>
              ) : (
                <span
                  aria-hidden
                  className="font-mono text-2xs tabular-nums text-subtle-foreground"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
            </span>

            {/* The outcome, in full. */}
            <p className="min-w-0 text-sm leading-relaxed text-foreground/80">
              {body}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export default OutcomesGrid;
