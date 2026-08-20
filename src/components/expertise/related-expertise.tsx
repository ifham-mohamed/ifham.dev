import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ExpertisePage } from "@/data/expertise.data";
import { SectionEyebrow } from "@/components/ui";

export function RelatedExpertise({
  pages,
  title = "Related expertise",
}: {
  pages: readonly ExpertisePage[];
  title?: string;
}) {
  if (pages.length === 0) return null;

  return (
    <section aria-labelledby="related-expertise" className="flex max-w-case-wide flex-col gap-4 border-y border-hairline py-6">
      <div className="flex flex-col gap-1.5">
        <SectionEyebrow>Explore</SectionEyebrow>
        <h2 id="related-expertise" className="text-lg font-semibold text-foreground">
          {title}
        </h2>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/${page.slug}`}
              className="group flex h-full items-start justify-between gap-4 rounded-md border border-border bg-surface p-3 transition-colors hover:border-border-strong hover:bg-surface-hover"
            >
              <span className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">{page.label}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {page.description}
                </span>
              </span>
              <ArrowRight
                aria-hidden
                className="mt-0.5 size-3.5 flex-none text-subtle-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand-hover"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RelatedExpertise;
