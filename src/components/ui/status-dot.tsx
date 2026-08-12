import { cn } from "@/lib/utils";

type StatusDotProps = {
  label: string;
  className?: string;
};

/**
 * StatusDot — "Present" / "Active" / "Ongoing" indicator.
 *
 * Previously there were four separate pulsing-dot implementations on the
 * homepage, all animating at once. This is the single one, and it does not
 * pulse — a static dot reads as a status; a pulsing dot reads as an alert.
 */
export function StatusDot({ label, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-2xs font-medium text-muted-foreground",
        className
      )}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
      />
      {label}
    </span>
  );
}

export default StatusDot;
