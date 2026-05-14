import { Skeleton } from "@/components/ui/skeleton";

export function BlogListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-x-3 border border-border rounded-xl p-3 md:p-4"
          >
            <Skeleton className="h-6 w-8 flex-none mt-0.5" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton
                className="h-5"
                style={{ width: `${55 + ((i * 13) % 35)}%` }}
              />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton rounded="full" className="size-7 flex-none" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogListSkeleton;
