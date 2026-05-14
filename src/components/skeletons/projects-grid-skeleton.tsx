import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsGridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <section>
      <div className="flex flex-col gap-2 mb-8">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <Skeleton className="flex-1 h-px rounded-none" />
            <Skeleton rounded="xl" className="h-7 w-28" />
            <Skeleton className="flex-1 h-px rounded-none" />
          </div>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col h-80 border border-border rounded-xl overflow-hidden"
            >
              <Skeleton rounded="sm" className="w-full h-40 rounded-none" />
              <div className="p-4 flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-full mt-1" />
                <Skeleton className="h-3 w-5/6" />
                <div className="flex flex-wrap gap-1 mt-auto">
                  {[50, 70, 60, 80].map((w, j) => (
                    <Skeleton
                      key={j}
                      className="h-4"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsGridSkeleton;
