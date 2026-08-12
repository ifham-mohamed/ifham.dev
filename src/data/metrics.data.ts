/**
 * Headline metrics.
 *
 * These numbers already existed in the codebase, but were buried inside the
 * About paragraph and a mid-list responsibility bullet — the two places a
 * recruiter scanning for 15 seconds will never read. Surfaced in the hero.
 *
 * Every value here is traceable to `experience.data.ts` or `personal.data.ts`.
 * Keep it that way: if a number changes there, change it here.
 */

export interface Metric {
  /** The number itself. Rendered in tabular figures. */
  value: string;
  /** What it counts. Keep to three words or fewer. */
  label: string;
  /** Longer form, exposed to screen readers and as a title attribute. */
  detail: string;
}

export const metrics: Metric[] = [
  {
    value: "80K+",
    label: "Users served",
    detail:
      "Production platform features serving 80,000+ users at APP360 (Pvt) Limited",
  },
  {
    value: "40–65%",
    label: "Perf. gains",
    detail:
      "Measured performance improvements across shipped optimisation work",
  },
  {
    value: "15",
    label: "Projects shipped",
    detail:
      "E-commerce platforms, supply chain systems, POS and SaaS applications",
  },
];

export default metrics;
