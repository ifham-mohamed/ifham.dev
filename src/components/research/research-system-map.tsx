import {
  BookOpenCheck,
  FileSearch2,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { enigmatrixResearch } from "@/data";
import { cn } from "@/lib/utils";

const moduleIcons = {
  M1: FileSearch2,
  M2: BookOpenCheck,
  M3: Gauge,
  M4: ShieldCheck,
} as const;

/**
 * A compact system picture for the research index. It is intentionally not a
 * product mock-up: the visual explains the cross-module evidence contract.
 */
export function ResearchSystemMap() {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5">
        <figcaption className="font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground">
          Shared research architecture
        </figcaption>
        <span className="inline-flex items-center gap-2 font-mono text-2xs text-subtle-foreground">
          <span className="size-1.5 rounded-full bg-brand" />
          Evidence flows left to right
        </span>
      </div>

      <div className="diagram-matrix relative p-4 sm:p-6 lg:p-8">
        <div className="relative z-10 flex flex-col gap-5">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 font-mono text-2xs text-foreground/80">
            <span className="size-1.5 rounded-full bg-brand" />
            Official regulatory sources
          </div>

          <div aria-hidden className="mx-auto h-5 w-px bg-brand/45" />

          <div className="grid gap-3 lg:grid-cols-4">
            {enigmatrixResearch.modules.map((module) => {
              const Icon = moduleIcons[module.id];
              return (
                <div
                  key={module.id}
                  className={cn(
                    "relative flex min-h-44 flex-col gap-4 rounded-lg border bg-surface p-4",
                    module.featured
                      ? "border-brand/45 shadow-[inset_0_1px_0_var(--brand-muted)]"
                      : "border-border"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-md border",
                        module.featured
                          ? "border-brand/30 bg-brand-subtle text-brand"
                          : "border-border bg-surface-raised text-muted-foreground"
                      )}
                    >
                      <Icon aria-hidden className="size-4" />
                    </span>
                    <span className="font-mono text-2xs tabular-nums text-subtle-foreground">
                      {module.id}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-semibold leading-snug text-foreground">
                      {module.barrier}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {module.title}
                    </p>
                  </div>

                  <p className="mt-auto font-mono text-2xs text-subtle-foreground">
                    {module.featured ? "My research module" : module.status}
                  </p>
                </div>
              );
            })}
          </div>

          <div aria-hidden className="mx-auto h-5 w-px bg-brand/45" />

          <div className="mx-auto flex w-full max-w-2xl items-center justify-center rounded-md border border-brand/25 bg-brand-subtle px-4 py-3 text-center text-xs font-medium text-foreground/85">
            Versioned evidence → understandable guidance → preventive action
          </div>
        </div>
      </div>
    </figure>
  );
}

export default ResearchSystemMap;
