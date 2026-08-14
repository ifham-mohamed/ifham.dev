import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Divider } from "./rhythm";
import { MetaItem } from "./metadata";
import { StatusBadge } from "./status-badge";

/**
 * AvailabilityStatus — the "open to work" line.
 *
 * Appears at the top of the page and again at the very bottom, which is the
 * point: the same statement bookending the page is what makes the contact
 * section read as a conclusion rather than as one more block.
 *
 * Written out rather than composed from `MetadataRow` because it has to stack
 * on narrow screens — a wrapped MetadataRow would leave the vertical divider
 * orphaned at the start of the second line.
 */
export function AvailabilityStatus({
  label = "Available for work",
  location,
  className,
}: {
  label?: string;
  location: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 font-mono text-2xs text-muted-foreground",
        "sm:flex-row sm:items-center sm:gap-2.5",
        className,
      )}
    >
      {/* The full contact/footer label is wider than a 320–390px content
          column. Let it wrap below `sm`; the short hero label remains one
          line naturally, and the site no longer gains a horizontal scrollbar
          on narrow phones. */}
      <StatusBadge
        label={label}
        className="max-w-full whitespace-normal sm:whitespace-nowrap"
      />
      <Divider orientation="vertical" className="hidden sm:block" />
      <MetaItem icon={<MapPin aria-hidden className="size-3" />}>
        {location}
      </MetaItem>
    </div>
  );
}

export default AvailabilityStatus;
