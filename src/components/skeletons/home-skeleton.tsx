import { Skeleton } from "@/components/ui/skeleton";

export function HomeSkeleton() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section>
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-3 flex flex-col order-2 md:order-1 flex-1">
              <Skeleton className="h-10 md:h-12 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-2/3" />
            </div>
            <Skeleton
              rounded="full"
              className="size-24 md:size-32 order-1 md:order-2 flex-none"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex min-h-0 flex-col gap-y-4">
          <Skeleton className="h-6 w-24" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </section>

      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <Skeleton className="h-6 w-40" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-x-3">
              <Skeleton rounded="full" className="size-8 md:size-10 flex-none" />
              <div className="flex-1 flex flex-col gap-1.5">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="h-3 w-20 flex-none" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <Skeleton className="h-6 w-28" />
          <div className="flex flex-col gap-8">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-x-3">
                <Skeleton rounded="full" className="size-8 md:size-10 flex-none" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-3 w-24 flex-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex min-h-0 flex-col gap-y-4">
          <Skeleton className="h-6 w-20" />
          <div className="flex flex-wrap gap-2">
            {[16, 20, 14, 24, 18, 16, 22, 14, 18, 20].map((w, i) => (
              <Skeleton
                key={i}
                rounded="xl"
                className="h-8"
                style={{ width: `${w * 4}px` }}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex min-h-0 flex-col gap-y-8">
          <div className="flex flex-col gap-y-3 items-center">
            <Skeleton rounded="xl" className="h-7 w-28" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex flex-col h-80 border border-border rounded-xl overflow-hidden"
              >
                <Skeleton rounded="sm" className="w-full h-40 rounded-none" />
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-full mt-1" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomeSkeleton;
