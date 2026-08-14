import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { enigmatrixResearch } from "@/data";
import { Tag, TagRow } from "@/components/ui";

export function ResearchSection() {
  const moduleOne = enigmatrixResearch.modules[0];

  return (
    <article className="group relative overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong hover:bg-surface-hover focus-within:border-border-strong">
      <div className="research-grid grid gap-0 md:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="flex flex-col justify-between gap-8 border-b border-hairline p-5 md:border-b-0 md:border-r">
          <div className="flex items-start justify-between gap-3">
            <span className="grid size-9 place-items-center rounded-md border border-brand/30 bg-brand-subtle text-brand">
              <FlaskConical aria-hidden className="size-4.5" />
            </span>
            <span className="font-mono text-2xs tabular-nums text-subtle-foreground">
              2026
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-2xs uppercase tracking-[0.14em] text-brand">
              My contribution · M1
            </p>
            <p className="text-sm font-medium leading-snug text-foreground">
              {moduleOne.barrier}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {enigmatrixResearch.type}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4 bg-surface p-5 sm:p-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              <Link
                href="/research"
                className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-brand"
              >
                {enigmatrixResearch.title}
              </Link>
            </h3>
            <p className="text-xs text-muted-foreground">
              {enigmatrixResearch.subtitle}
            </p>
          </div>

          <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
            {enigmatrixResearch.contribution}
          </p>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-4">
            {enigmatrixResearch.metrics.map((metric) => (
              <div key={metric.label} className="bg-surface px-3 py-2.5">
                <p className="font-mono text-base font-medium tabular-nums text-foreground">
                  {metric.value}
                </p>
                <p className="text-2xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>

          <TagRow>
            {enigmatrixResearch.platformStack.slice(0, 5).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
            <Tag variant="ghost">+{enigmatrixResearch.platformStack.length - 5}</Tag>
          </TagRow>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-foreground">
            Explore the research
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ResearchSection;
