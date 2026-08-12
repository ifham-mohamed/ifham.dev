import { Skeleton } from "@/components/ui/skeleton";

/**
 * Route loading skeletons.
 *
 * These were five separate files totalling ~410 lines that mirrored the old
 * layout element-for-element — including the dock clearance, the avatar ring
 * and the eight skill cards. A skeleton that tracks the real layout that
 * closely becomes a second copy of the design to maintain, and it was already
 * out of date. These approximate the shape instead.
 */

function Line({ w = "w-full" }: { w?: string }) {
  return <Skeleton className={`h-3.5 ${w}`} />;
}

function PanelRows({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg border border-border p-4"
        >
          <Skeleton className="size-10 flex-none" />
          <div className="flex flex-1 flex-col gap-2">
            <Line w="w-1/3" />
            <Line w="w-1/2" />
          </div>
          <Skeleton className="hidden h-3 w-24 flex-none sm:block" />
        </div>
      ))}
    </div>
  );
}

function Heading() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-2.5 w-16" />
      <Skeleton className="h-6 w-48" />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-9 w-56" />
            <Line w="w-32" />
          </div>
          <Skeleton className="size-16 flex-none rounded-full sm:size-20" />
        </div>
        <div className="flex flex-col gap-2">
          <Line />
          <Line w="w-4/5" />
        </div>
        <Skeleton className="h-[74px] w-full rounded-lg" />
      </div>

      <div className="flex flex-col gap-6">
        <Heading />
        <PanelRows count={2} />
      </div>

      <div className="flex flex-col gap-6">
        <Heading />
        <PanelRows count={4} />
      </div>
    </div>
  );
}

export function ProjectsGridSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Heading />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-lg border border-border"
          >
            <Skeleton className="aspect-16/9 w-full rounded-none" />
            <div className="flex flex-col gap-2 p-3.5">
              <Line w="w-2/3" />
              <Skeleton className="h-2.5 w-20" />
              <Line />
              <Line w="w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Heading />
      <div className="flex flex-col gap-6 border-y border-hairline py-3.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <Line w="w-2/3" />
            <Skeleton className="h-2.5 w-16 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Line w="w-1/2" />
      </div>
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <Line key={i} w={i % 4 === 3 ? "w-2/3" : "w-full"} />
        ))}
      </div>
    </div>
  );
}

export const BlogPostSkeleton = ArticleSkeleton;
export const ProjectDetailSkeleton = ArticleSkeleton;
