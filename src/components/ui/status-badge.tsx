import { cn } from "@/lib/utils";

type StatusTone = "live" | "neutral" | "accent";

const TONE: Record<StatusTone, string> = {
  /** Currently true: a role you hold, a project still running. */
  live: "bg-emerald-500 dark:bg-emerald-400",
  /** Finished, archived, shipped. */
  neutral: "bg-muted-foreground/50",
  /** Editorially singled out — "Featured". */
  accent: "bg-brand",
};

/**
 * StatusBadge — "Present" / "Active" / "Ongoing" / "Available for work".
 *
 * There were four separate pulsing-dot implementations on the homepage, all
 * animating simultaneously. This is the one, and it does not pulse: a pulsing
 * dot reads as an alert demanding action, while these are just facts about a
 * timeline. The dot is decorative, so the label carries the meaning for screen
 * readers rather than the colour.
 */
export function StatusBadge({
  label,
  tone = "live",
  className,
}: {
  label: string;
  tone?: StatusTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap",
        "font-mono text-2xs font-medium text-muted-foreground",
        className
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 flex-none rounded-full", TONE[tone])}
      />
      {label}
    </span>
  );
}

export default StatusBadge;
