import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Item = { href: string; title: string } | null;

/**
 * PrevNext — pagination footer for the blog-post and case-study pages.
 * Both had their own byte-identical copy of this markup.
 */
export function PrevNext({
  previous,
  next,
  label = "Pagination",
}: {
  previous: Item;
  next: Item;
  label?: string;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label={label}
      className="grid grid-cols-1 gap-2 border-t border-hairline pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-foreground/15 hover:bg-surface-hover"
        >
          <span className="inline-flex items-center gap-1 text-2xs text-muted-foreground">
            <ChevronLeft
              aria-hidden
              className="size-3 transition-transform group-hover:-translate-x-0.5"
            />
            Previous
          </span>
          <span className="text-sm font-medium text-foreground/85 transition-colors group-hover:text-foreground">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next && (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 text-right transition-colors hover:border-foreground/15 hover:bg-surface-hover"
        >
          <span className="inline-flex items-center gap-1 text-2xs text-muted-foreground">
            Next
            <ChevronRight
              aria-hidden
              className="size-3 transition-transform group-hover:translate-x-0.5"
            />
          </span>
          <span className="text-sm font-medium text-foreground/85 transition-colors group-hover:text-foreground">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}

/** BackLink — the "← All projects" / "← All posts" affordance. */
export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <ChevronLeft
        aria-hidden
        className="size-3.5 transition-transform group-hover:-translate-x-0.5"
      />
      {children}
    </Link>
  );
}

export default PrevNext;
