import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Skeleton({
  className,
  rounded = "md",
  ...props
}: SkeletonProps) {
  const radiusClass =
    rounded === "full"
      ? "rounded-full"
      : rounded === "sm"
        ? "rounded-sm"
        : rounded === "lg"
          ? "rounded-lg"
          : rounded === "xl"
            ? "rounded-xl"
            : "rounded-md";

  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden bg-muted/70",
        radiusClass,
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
        style={{
          animation: "skeleton-shimmer 1.4s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export default Skeleton;
