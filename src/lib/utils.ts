/**
 * Convenience barrel.
 *
 * `cn` and `formatDate` used to be defined here *and* in `./cn` and
 * `./format-date`. Two copies of a date formatter is how a site ends up
 * rendering "December 12, 2024" in one place and "12/12/2024" in another: the
 * copies were identical today, but nothing kept them that way, and
 * `lib/index.ts` re-exported both — the explicit export from `./format-date`
 * silently shadowing the one reached through `export * from "./utils"`.
 *
 * Re-exporting means every import path now resolves to the same binding, so
 * dates are consistent site-wide by construction rather than by coincidence.
 */
export { cn } from "./cn";
export {
  formatDate,
  formatDateRange,
  formatRelativeDate,
} from "./format-date";
