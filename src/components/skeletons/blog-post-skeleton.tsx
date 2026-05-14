import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostSkeleton() {
  return (
    <section>
      <Skeleton className="h-7 w-28 mb-6" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 md:h-12 w-5/6" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="my-6">
        <Skeleton className="h-px w-full rounded-none" />
      </div>
      <div className="flex flex-col gap-3">
        {[100, 96, 88, 92, 80, 95, 70, 84, 90].map((w, i) => (
          <Skeleton key={i} className="h-4" style={{ width: `${w}%` }} />
        ))}
        <div className="h-6" />
        <Skeleton className="h-6 w-1/3 mt-2" />
        {[94, 88, 82].map((w, i) => (
          <Skeleton key={`p2-${i}`} className="h-4" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-4">
        <Skeleton className="h-16 flex-1 rounded-lg" />
        <Skeleton className="h-16 flex-1 rounded-lg" />
      </div>
    </section>
  );
}

export default BlogPostSkeleton;
