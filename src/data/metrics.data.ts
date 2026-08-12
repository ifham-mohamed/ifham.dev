/**
 * Headline metrics.
 *
 * These numbers already existed in the codebase, but were buried inside the
 * About paragraph and a mid-list responsibility bullet — the two places a
 * recruiter scanning for fifteen seconds will never read.
 *
 * `context` is the visible one-liner that makes each number evidence of
 * specific shipped work rather than a generic statistic: a bare "80K+" is a
 * marketing figure, "80K+ on a production platform at APP360" is a claim
 * someone can check.
 *
 * Every value here is traceable to `experience.data.ts` or `personal.data.ts`.
 * Keep it that way: if a number changes there, change it here.
 */

export interface Metric {
  /** The number itself. Rendered in mono tabular figures. */
  value: string;
  /** What it counts. Two or three words. */
  label: string;
  /** One line naming the work it came from. */
  context: string;
  /** Longer form, exposed to screen readers and as a title attribute. */
  detail: string;
}

export const metrics: Metric[] = [
  {
    value: "80K+",
    label: "Users served",
    context: "Production platform at APP360",
    detail:
      "Production platform features serving 80,000+ users at APP360 (Pvt) Limited",
  },
  {
    value: "40–65%",
    label: "Performance gains",
    context: "Measured on shipped optimisation work",
    detail:
      "Measured performance improvements across shipped optimisation work",
  },
  {
    value: "15",
    label: "Projects shipped",
    context: "E-commerce, supply chain, POS, SaaS",
    detail:
      "E-commerce platforms, supply chain systems, POS and SaaS applications",
  },
];

export default metrics;
