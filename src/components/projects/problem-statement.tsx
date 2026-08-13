import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * ProblemStatement — the premise the rest of the case study answers.
 *
 * The copy is the project's own `problem` string, unchanged. Only the frame
 * is new.
 *
 * Deliberately not styled as an alert. No quotation marks, no icon, no amber
 * or red fill: a neutral tint carries the surface and a single brand hairline
 * on the leading edge marks it as a pull-out. A warning-coloured panel would
 * read as "something went wrong" rather than "this is what the work had to
 * solve".
 *
 * The type is one step up from body copy. These statements run to five or six
 * clauses of constraints and are the densest prose on the page, so they get
 * the extra size and a wider leading rather than being set at the same scale
 * as everything around them.
 *
 * ── Two things the brief allowed that the data does not support ──
 *
 * NO CONTEXTUAL EYEBROW. Allowed "if project data supports it". No field on
 * `Project` classifies a problem as business, operational or technical, and
 * adding one would mean classifying fifteen statements by hand — authoring
 * metadata rather than surfacing it. The `Problem` heading already names the
 * block.
 *
 * NO AUTOMATIC EMPHASIS. Allowed "if the statement clearly contains multiple
 * competing constraints". The emphasis helper used by Role & context matches
 * terms from `signals` and `technologies`, which are tool and system names —
 * it cannot detect a constraint. Measured across all fifteen problems it
 * marked something in six, and what it marked was mostly wrong: "React" in a
 * sentence about spreadsheets losing audit trails, "Docker" in a sentence
 * about deployment cost. Emphasis that lands on the least important word in
 * the sentence is worse than none, so the paragraph is set plain. Marking the
 * real constraints would need them recorded as data first.
 */
export function ProblemStatement({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  if (!project.problem) return null;

  return (
    <div
      className={cn(
        "rounded-r-md border-l-2 border-brand/80 bg-muted/40 py-5 pl-6 pr-6",
        className
      )}
    >
      <p className="max-w-[62ch] text-base leading-[1.8] text-foreground/75">
        {project.problem}
      </p>
    </div>
  );
}

export default ProblemStatement;
