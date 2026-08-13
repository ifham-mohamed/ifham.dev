import type { Project } from "@/types";

/**
 * QA Automation.  ***INCOMPLETE STUB***
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
 *   1. Fill in `docs/projects/qa-automation.md` first — the doc is the source,
 *      the data file is the condensed version of it.
 *   2. Transfer the content here, leaving out anything still marked to confirm.
 *   3. Add `qaAutomation` to the array in `projects.data.tsx`, positioned by
 *      start date — between `attendify` (Jan 2026) and `totalSupply`
 *      (Nov 2025).
 *
 * Worth noting when you write it: DynaPOS already documents ~210 Cucumber /
 * Playwright scenarios and Unifixz documents a 4-workflow CI/CD pipeline. If
 * this project overlaps either, the case study should say what is distinct
 * about it rather than restating testing practice a reader has already seen.
 */
export const qaAutomation: Project = {
  id: "qa-automation",
  title: "QA Automation", // TODO: confirm the full name
  href: "",
  dates: "Dec 2025 - Feb 2026",
  active: false,

  // TODO: one sentence on what it does. Drives the CV line and the card.
  description: "",

  // TODO: the real stack. Not a guess from the title.
  technologies: [],

  links: [],
};

export default qaAutomation;
