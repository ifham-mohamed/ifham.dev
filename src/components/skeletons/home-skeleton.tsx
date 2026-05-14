import { Skeleton } from "@/components/ui/skeleton";

function SectionHeadingSkeleton({ eyebrowW = 80, titleW = 200 }: { eyebrowW?: number; titleW?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-3" style={{ width: `${eyebrowW}px` }} />
      <Skeleton className="h-6" style={{ width: `${titleW}px` }} />
    </div>
  );
}

function AccordionRowSkeleton({ titleWidth }: { titleWidth: string }) {
  return (
    <div className="flex items-center gap-x-3 border border-border rounded-xl p-3 md:p-4">
      <Skeleton rounded="lg" className="size-10 md:size-11 flex-none" />
      <div className="flex-1 flex flex-col gap-1.5">
        <Skeleton className="h-4" style={{ width: titleWidth }} />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-3 w-24 flex-none hidden sm:block" />
      <Skeleton rounded="full" className="size-7 flex-none" />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      {/* Hero */}
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

      {/* About */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-4">
          <SectionHeadingSkeleton eyebrowW={60} titleW={220} />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </section>

      {/* Work */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeadingSkeleton eyebrowW={55} titleW={200} />
          <div className="flex flex-col gap-3">
            {["40%", "55%", "45%"].map((w, i) => (
              <AccordionRowSkeleton key={i} titleWidth={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Project Experience */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeadingSkeleton eyebrowW={80} titleW={180} />
          <div className="flex flex-col gap-3">
            {["55%", "60%", "45%", "70%", "50%", "65%"].map((w, i) => (
              <AccordionRowSkeleton key={i} titleWidth={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeadingSkeleton eyebrowW={75} titleW={190} />
          <div className="flex flex-col gap-3">
            <div className="border border-border rounded-xl p-3 md:p-4 flex flex-col gap-4">
              <div className="flex items-center gap-x-3 justify-between">
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
                  <Skeleton
                    rounded="lg"
                    className="size-10 md:size-11 flex-none"
                  />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
                <Skeleton className="h-3 w-28 flex-none hidden sm:block" />
              </div>
              <div className="pl-13 md:pl-14 flex flex-col gap-3">
                <Skeleton className="h-3 w-24" />
                <div className="flex flex-wrap gap-1.5">
                  {[120, 150, 100, 140, 130].map((w, i) => (
                    <Skeleton
                      key={i}
                      className="h-6"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeadingSkeleton eyebrowW={60} titleW={170} />
          <div className="grid gap-3">
            {[5, 7, 6, 8, 9, 4, 4, 5].map((badges, ri) => (
              <div
                key={ri}
                className="border border-border rounded-xl p-3 md:p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-x-3 justify-between">
                  <div className="flex items-center gap-x-2.5 flex-1 min-w-0">
                    <Skeleton rounded="md" className="size-7 flex-none" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-5 w-8 flex-none" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: badges }).map((_, bi) => (
                    <Skeleton
                      key={bi}
                      className="h-6"
                      style={{ width: `${60 + ((bi * 19) % 70)}px` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeadingSkeleton eyebrowW={95} titleW={220} />
          <div className="flex flex-col gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-border rounded-xl p-3 md:p-4 flex items-start gap-x-3"
              >
                <Skeleton
                  rounded="lg"
                  className="size-10 md:size-11 flex-none"
                />
                <div className="flex-1 flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-2/5" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-3 w-24 flex-none hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeadingSkeleton eyebrowW={95} titleW={200} />
          <div className="border border-border rounded-xl p-3 md:p-4 flex flex-col gap-4">
            <div className="flex items-center gap-x-3">
              <Skeleton rounded="lg" className="size-10 md:size-11 flex-none" />
              <div className="flex-1 flex flex-col gap-1.5">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-2/5" />
              </div>
            </div>
            <div className="pl-13 md:pl-14 flex flex-col gap-2">
              <Skeleton className="h-3 w-24" />
              <div className="flex flex-wrap gap-1.5">
                {[110, 130, 90, 70, 60].map((w, i) => (
                  <Skeleton key={i} className="h-7" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
            <Skeleton className="h-8 w-40 rounded-md" />
          </div>
        </div>
      </section>

      {/* Writing */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeadingSkeleton eyebrowW={70} titleW={170} />
          <div className="flex flex-col gap-3">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex items-start gap-x-3 border border-border rounded-xl p-3 md:p-4"
              >
                <Skeleton className="h-6 w-16 flex-none mt-0.5" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton
                    className="h-5"
                    style={{ width: `${65 + i * 10}%` }}
                  />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton rounded="full" className="size-7 flex-none" />
              </div>
            ))}
          </div>
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
      </section>
    </main>
  );
}

export default HomeSkeleton;
