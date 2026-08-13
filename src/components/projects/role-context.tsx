import * as React from "react";
import { ANCHOR_OFFSET, SectionEyebrow, StatusBadge } from "@/components/ui";
import { emphasise } from "@/lib/emphasise";
import type { Project } from "@/types";

/**
 * RoleContext — who did what, made scannable.
 *
 * Two parts on desktop: a narrow metadata column answering "what was your
 * role" without reading, and the existing narrative beside it. No card — the
 * grid and the whitespace do the work, because a bordered box here would make
 * a paragraph look like a callout.
 *
 * The factual content is untouched. `role` is split for display only, and the
 * narrative is the project's own `context` string with emphasis applied at
 * render time — no words added, removed or reordered.
 */

/** Team composition reads as "Team"; anything else is the engagement. */
const TEAM_PATTERN = /\b(solo|team|group|pair)\b/i;

/**
 * Splits "Lead Developer (Small Team)" and "Front-End Developer — Group
 * Project" into a role and its qualifier. Both separators appear in the data.
 */
function splitRole(role: string) {
  const match = role.match(/^(.*?)\s*(?:\(([^)]*)\)|—\s*(.+))\s*$/);
  if (!match) return { role: role.trim(), qualifier: null, label: null };

  const head = match[1].trim();
  const qualifier = (match[2] ?? match[3] ?? "").trim();
  if (!head || !qualifier) return { role: role.trim(), qualifier: null, label: null };

  return {
    role: head,
    qualifier,
    label: TEAM_PATTERN.test(qualifier) ? "Team" : "Setting",
  };
}

/** One row of the metadata column. */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 min-[46rem]:flex-col min-[46rem]:gap-0.5">
      <dt className="w-20 flex-none font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground/65 min-[46rem]:w-auto">
        {label}
      </dt>
      <dd className="min-w-0 text-sm text-foreground/85">{children}</dd>
    </div>
  );
}

export function RoleContext({
  project,
  id,
}: {
  project: Project;
  /** Anchor target for the case-study table of contents. */
  id?: string;
}) {
  const parsed = project.role ? splitRole(project.role) : null;
  const hasMeta = Boolean(parsed || project.dates || project.active);

  if (!hasMeta && !project.context) return null;

  const terms = [
    ...(project.signals ?? []),
    ...(project.technologies ?? []),
  ] as string[];

  return (
    <section
      id={id}
      className={`flex max-w-[52rem] flex-col gap-4${id ? ` ${ANCHOR_OFFSET}` : ""}`}
    >
      <SectionEyebrow as="h2">Role &amp; context</SectionEyebrow>

      <div className="grid gap-6 min-[46rem]:grid-cols-[10rem_minmax(0,1fr)] min-[46rem]:gap-10">
        {/* ---------------- Metadata ---------------- */}
        {hasMeta && (
          <dl className="flex flex-col gap-3">
            {parsed && <Field label="Role">{parsed.role}</Field>}
            {parsed?.qualifier && parsed.label && (
              <Field label={parsed.label}>{parsed.qualifier}</Field>
            )}
            {project.dates && <Field label="Period">{project.dates}</Field>}
            {project.active && (
              <Field label="Status">
                <StatusBadge label="Active" className="text-sm" />
              </Field>
            )}
          </dl>
        )}

        {/* ---------------- Narrative ---------------- */}
        {project.context && (
          // ~66 characters at this size — inside the 60–70 target.
          <p className="max-w-[66ch] text-sm leading-[1.75] text-muted-foreground">
            {emphasise(project.context, terms)}
          </p>
        )}
      </div>
    </section>
  );
}

export default RoleContext;
