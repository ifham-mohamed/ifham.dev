"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 480;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        setVisible(window.scrollY > SHOW_AFTER_PX);
        rafRef.current = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-30 inline-flex size-9 sm:size-10 items-center justify-center rounded-full",
        "border border-border bg-card/90 backdrop-blur-md shadow-md cursor-pointer",
        "text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      )}
    >
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}

export default ScrollToTop;
