import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDetailSkeleton() {
  return (
    <section>
      <Skeleton className="h-7 w-32 mb-6" />

      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 md:h-12 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="my-6">
        <Skeleton className="w-full h-[280px] md:h-[360px] rounded-xl" />
      </div>

      <div className="my-6">
        <Skeleton className="h-px w-full rounded-none" />
      </div>

      <div className="flex flex-col gap-3">
        {[100, 96, 88, 92, 80, 70].map((w, i) => (
          <Skeleton key={i} className="h-4" style={{ width: `${w}%` }} />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Skeleton className="h-5 w-28" />
        <div className="flex flex-col gap-2 pl-5">
          {[88, 92, 80, 84].map((w, i) => (
            <Skeleton key={`b-${i}`} className="h-3.5" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Skeleton className="h-5 w-24" />
        <div className="flex flex-wrap gap-1.5">
          {[80, 60, 70, 100, 50, 90, 60].map((w, i) => (
            <Skeleton key={i} className="h-7" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Skeleton className="h-5 w-16" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-32 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>

      <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-4">
        <Skeleton className="h-16 flex-1 rounded-lg" />
        <Skeleton className="h-16 flex-1 rounded-lg" />
      </div>
    </section>
  );
}

export default ProjectDetailSkeleton;
