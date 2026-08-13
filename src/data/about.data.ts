/**
 * About copy.
 *
 * `personalInfo.summary` opened with the same sentence used as
 * `personalInfo.description` in the hero, so the About section's first line
 * repeated the hero word for word. This rewrites that one dense block as three
 * shorter paragraphs that say how the work is approached rather than restating
 * the headline.
 *
 * PROVENANCE — every factual claim below traces to existing data. Nothing here
 * asserts a metric, employer or technology that is not already in the repo:
 *
 *   scalable e-commerce / supply chain / SaaS ... personal.data.ts summary
 *   production-ready systems ..................... personal.data.ts summary
 *   PostgreSQL database design ................... personal.data.ts summary
 *   CI/CD pipeline automation .................... personal.data.ts summary
 *   React / Next.js .............................. personal.data.ts summary
 *   80,000+ users ................................ experience.data.ts (APP360)
 *   40–65% performance improvement ............... personal.data.ts summary
 *   reusable UI component library ................ experience.data.ts (APP360)
 *   RBAC with middleware guards .................. experience.data.ts (APP360)
 *   55+ builds with documented release notes ..... experience.data.ts (APP360)
 *
 * Sentences that are not claims — how problems get approached, what is worth
 * caring about — are voice, not evidence. Keep it that way: if you add a
 * number here, add the row above it too.
 *
 * `**bold**` marks the engineering concepts that carry the paragraph. They are
 * rendered as raised contrast rather than badges, so the emphasis reads as
 * typography instead of decoration.
 */
export const aboutParagraphs: string[] = [
  `I work mostly on systems that other people's work depends on once they ship — **scalable e-commerce platforms**, **supply chain systems** and **SaaS applications**. The recurring problem across all of them is the same one: take something that behaves for a handful of users and make it hold up as **production-ready** software.`,

  `In practice that means **full-stack ownership** rather than a narrow slice — **PostgreSQL database design** and the query paths that hang off it, React and Next.js at the front, and **CI/CD pipeline automation** so that releasing is uneventful. On the platform I worked on at APP360 that reached 80,000+ users, with **performance optimisation** measured at 40–65%.`,

  `I pay attention to the parts that are easy to skip: reusable component libraries, access control that is actually enforced by middleware rather than by convention, and documented releases. Most of what I have shipped went out as 55+ incremental builds with release notes, not as one large launch.`,
];

/**
 * Focus areas.
 *
 * Four, each grounded in shipped work rather than aspiration. `evidence` is
 * not rendered — it exists so the next person to edit this list has to justify
 * an addition.
 */
export interface FocusArea {
  label: string;
  evidence: string;
}

export const focusAreas: FocusArea[] = [
  {
    label: "Product engineering",
    evidence:
      "Inventory management, cashier operations, caregiver scheduling and attendance tracking shipped at APP360",
  },
  {
    label: "Platform architecture",
    evidence:
      "Architected production-ready systems; secure document upload via GCS signed URLs; JWT auth with RBAC",
  },
  {
    label: "Performance",
    evidence:
      "40–65% measured optimisation; Next.js App Router migration for routing and SSR performance",
  },
  {
    label: "Developer experience",
    evidence:
      "Reusable UI component library, CI/CD automation, 55+ documented incremental builds, mentoring",
  },
];

export default aboutParagraphs;
