import { Skeleton } from "@/components/ui/skeleton";

export function BlogListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <section>
      <div className="flex flex-col gap-2 mb-8">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex flex-col gap-5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-start gap-x-2">
            <Skeleton className="h-4 w-6 flex-none mt-1" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton
                className="h-5"
                style={{ width: `${60 + ((i * 13) % 35)}%` }}
              />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogListSkeleton;
