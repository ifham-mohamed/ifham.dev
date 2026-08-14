import type { ResearchMetric } from "@/data";
import { cn } from "@/lib/utils";

export function ResearchMetricGrid({
  items,
  className,
}: {
  items: readonly ResearchMetric[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid overflow-hidden rounded-lg border border-border bg-surface sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "flex min-w-0 flex-col gap-1 p-4 sm:p-5",
            index > 0 && "border-t border-hairline sm:border-t-0 sm:border-l",
            index === 2 && "sm:border-l-0 sm:border-t lg:border-l lg:border-t-0"
          )}
        >
          <dd className="font-mono text-2xl font-medium tabular-nums tracking-tight text-foreground">
            {item.value}
          </dd>
          <dt className="text-xs font-medium text-foreground/80">
            {item.label}
          </dt>
          <p className="font-mono text-2xs text-muted-foreground">
            {item.detail}
          </p>
        </div>
      ))}
    </dl>
  );
}

export default ResearchMetricGrid;
