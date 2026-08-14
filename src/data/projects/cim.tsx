import type { Project } from "@/types";

/**
 * CIM — Cloud Infrastructure Management.  ***INCOMPLETE STUB***
 *
 * Scaffolded from the project list, which supplies the dates and nothing else.
 * Every content field below is empty on purpose: there is no doc, no repo
 * reference and no prior data for this project anywhere in the codebase, and
 * writing a case study from a title alone would be inventing work.
 *
 * ── Deliberately NOT exported into `projects.data.tsx` ──
 *
 * Adding it to that array is the last step, not the first. Until then the
 * route does not generate, nothing appears in the directory, and no half-built
 * entry can reach the site by accident.
 *
 * To finish it:
 *   1. Fill in `docs/projects/cim.md` first — the doc is the source, the data
 *      file is the condensed version of it. Every other project works this way.
 *   2. Transfer the content here, leaving out anything still marked to confirm.
 *   3. Add `cim` to the array in `projects.data.tsx`, positioned by start date
 *      — between `unifixz` (Apr 2026) and `promptCopilot` (Feb 2026).
 */
export const cim: Project = {
  id: "cim",
  title: "CIM - Cloud Infrastructure Management", // TODO: confirm the full name
  href: "",
  dates: "Mar 2026 - Apr 2026",
  projectType: "Group Project",
  role: "Team Member / Deployment (Group)",
  active: false,

  // TODO: one sentence on what it does. Drives the CV line and the card.
  description: "",

  // TODO: the real stack. Not a guess from the title.
  technologies: [],

  links: [],
};

export default cim;
