"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const RESET_DELAY = 2200;

/** A compact clipboard control with visible and screen-reader feedback. */
export function CopyValueButton({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), RESET_DELAY);
    } catch {
      // The linked value remains available when clipboard permission is denied.
    }
  };

  return (
    <span className="relative inline-flex flex-none">
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-border-strong bg-surface text-muted-foreground",
          "transition-colors hover:bg-brand-subtle hover:text-brand-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          className
        )}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        title={copied ? "Copied" : `Copy ${label}`}
      >
        {copied ? (
          <Check aria-hidden className="size-3.5" />
        ) : (
          <Copy aria-hidden className="size-3.5" />
        )}
      </button>

      <span
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute -top-8 right-0 z-20 rounded-md border border-border bg-surface-raised px-2 py-1",
          "whitespace-nowrap font-mono text-2xs text-foreground shadow-sm transition-[opacity,transform] duration-150",
          copied
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0"
        )}
      >
        {copied ? "Copied" : ""}
      </span>
    </span>
  );
}

export default CopyValueButton;
