import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Callout — an aside inside an article, not a status banner.
 *
 * ── Why only three types ──
 *
 * Note, Tip and Important. Success / Danger / Warning are deliberately absent:
 * nothing in this corpus is a failure state, and a set of six types invites
 * picking one by colour rather than by meaning. These three cover the cases
 * this kind of writing actually has — an implementation note, a shortcut worth
 * knowing, a constraint you cannot ignore.
 *
 * ── Why it survives without CSS ──
 *
 * The type is a real `<p>` label inside a `<figure>`, not a coloured border and
 * an icon. Strip the stylesheet and it still reads "Note — <the note>", which
 * is what an aside has to do in a reader view, in an RSS feed, or to a screen
 * reader that ignores decoration.
 *
 * ── Restraint ──
 *
 * A left rule and a recessed surface. No icon, no filled header bar, no shadow.
 * The accent is used once, on the label of `important`, and nowhere else — if
 * three of these appear on one page they should still read as prose with an
 * aside in it, not as a dashboard.
 */

type CalloutType = "note" | "tip" | "important";

const LABEL: Record<CalloutType, string> = {
  note: "Note",
  tip: "Tip",
  important: "Important",
};

/**
 * Only the label changes weight between types. The surface and border stay
 * identical so a page of callouts does not turn into a colour-coded index.
 * Contrast is carried by tokens, so both themes follow automatically.
 */
const LABEL_TONE: Record<CalloutType, string> = {
  note: "text-muted-foreground",
  tip: "text-muted-foreground",
  important: "text-brand",
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  /** Overrides the default label where a specific one reads better. */
  title?: string;
  children: ReactNode;
}) {
  const label = title ?? LABEL[type];

  return (
    <figure
      className={cn(
        // `not-prose` keeps the typography plugin from re-styling the label and
        // re-introducing its own margins inside the box.
        "not-prose my-7 flex flex-col gap-1.5",
        "border-l-2 border-hairline bg-surface-raised py-4 pl-4 pr-4 sm:pl-5",
        type === "important" && "border-brand bg-brand-subtle"
      )}
    >
      <figcaption
        className={cn(
          "font-mono text-2xs uppercase tracking-[0.14em]",
          LABEL_TONE[type]
        )}
      >
        {label}
      </figcaption>

      {/* Ordinary body typography — a callout is prose with a margin note, not
          a different voice. */}
      <div className="text-[0.95em] leading-relaxed text-foreground/80 [&>*+*]:mt-2 [&>p]:m-0">
        {children}
      </div>
    </figure>
  );
}

export default Callout;
