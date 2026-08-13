"use client";

import * as React from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CopyLink — one utility, sitting quietly beside the article metadata.
 *
 * ── Why not share buttons ──
 *
 * A row of network icons is a media-platform pattern: it presumes an audience
 * that shares, and it dates the page to whichever networks mattered when it was
 * built. A copied URL works everywhere, forever, and is what an engineer
 * actually does with an article link.
 *
 * `navigator.share` is offered when the platform provides it — effectively
 * mobile — because it opens the OS sheet the reader already knows. It is
 * strictly additive: copy stays present and is the reliable path.
 *
 * ── Feedback ──
 *
 * The label swaps to "Copied" and a polite live region announces it. No toast:
 * a global overlay for a two-word confirmation interrupts reading to report
 * something the reader just did on purpose.
 *
 * ── Weight ──
 *
 * Metadata typography, muted, no border, no fill. It sits under the title and
 * must not compete with it.
 */

const RESET_MS = 2000;

export function CopyLink({ className }: { className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const [canShare, setCanShare] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Feature-detected after mount: `navigator` does not exist on the server, and
  // branching during render would be a hydration mismatch.
  React.useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const flash = () => {
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), RESET_MS);
  };

  // Read at click time, not render: it is the canonical URL of whatever page
  // this is mounted on, so the component needs no props and cannot fall out of
  // step with the route.
  const currentUrl = () =>
    typeof window === "undefined" ? "" : window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      flash();
    } catch {
      // Clipboard can reject on insecure origins or a denied permission.
      // Failing silently is better than an error dialog for a convenience.
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({ url: currentUrl(), title: document.title });
    } catch {
      // Includes the user dismissing the sheet, which is not an error.
    }
  };

  const base =
    "inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:text-foreground";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button type="button" onClick={handleCopy} className={base}>
        {copied ? (
          <Check aria-hidden className="size-3.5" />
        ) : (
          <Link2 aria-hidden className="size-3.5" />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>

      {canShare && (
        <button
          type="button"
          onClick={handleShare}
          className={base}
          aria-label="Share this article"
        >
          <Share2 aria-hidden className="size-3.5" />
          Share
        </button>
      )}

      {/* Announced politely rather than shown as an overlay. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}

export default CopyLink;
