import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal — a content-safe section wrapper.
 *
 * Earlier versions hid every section at opacity: 0 until an
 * IntersectionObserver fired. Initial hash restoration can happen after the
 * observer's first layout pass, leaving /#about or /#contact blank until the
 * user nudges the page. Portfolio content is more important than a small
 * entrance animation, so visibility no longer depends on client JavaScript.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Retained for API compatibility with existing section calls. */
  delay?: number;
}) {
  return (
    <div
      data-reveal=""
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("translate-y-0 opacity-100", className)}
    >
      {children}
    </div>
  );
}

export default Reveal;
