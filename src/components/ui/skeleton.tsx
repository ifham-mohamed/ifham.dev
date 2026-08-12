import { cn } from "@/lib/utils";

/**
 * Skeleton — a placeholder block.
 *
 * The previous implementation drove a sweeping highlight from a bespoke
 * `skeleton-shimmer` keyframe declared in globals.css. A plain pulse needs no
 * custom keyframe, no absolutely-positioned inner element, and reads as
 * "loading" just as clearly.
 */
export function Skeleton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export default Skeleton;
