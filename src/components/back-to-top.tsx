"use client";

import { ArrowUp } from "lucide-react";

/**
 * BackToTop — the footer's return control.
 *
 * Two things it does that a bare `href="#top"` does not:
 *
 *  1. Honours `prefers-reduced-motion` at click time. Smooth scrolling a whole
 *     page is exactly the kind of large-area motion that triggers vestibular
 *     symptoms, and the CSS `scroll-behavior: smooth` on <html> cannot be
 *     overridden per-interaction.
 *  2. Moves focus to the main landmark. Scrolling alone leaves keyboard focus
 *     in the footer, so the next Tab would continue from the bottom of the
 *     page while the viewport shows the top — the classic skip-link bug.
 */
export function BackToTop() {
  const handleClick = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });

    const main = document.getElementById("main");
    if (main) {
      // tabindex="-1" makes a non-interactive element programmatically
      // focusable without adding it to the tab order.
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group/top inline-flex items-center gap-1.5 rounded-md text-2xs text-muted-foreground transition-colors hover:text-brand-hover"
    >
      Back to top
      <ArrowUp
        aria-hidden
        className="size-3 transition-transform duration-200 group-hover/top:-translate-y-0.5"
      />
    </button>
  );
}

export default BackToTop;
