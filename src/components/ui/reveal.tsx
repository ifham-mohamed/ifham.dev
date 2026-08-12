"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal — one subtle fade-up, fired once when a section scrolls into view.
 *
 * Replaces BlurFade, which was used 37 times on the homepage alone. Two
 * problems with that: it defaulted to `inView: false`, so every instance
 * animated on load regardless of viewport position, and it rendered
 * un-animated markup until `isMounted` flipped, which produced a visible
 * flash on hydration.
 *
 * This uses IntersectionObserver plus a CSS transition — no animation library
 * on this path, no hydration flash, and the global
 * `prefers-reduced-motion` rule in globals.css neutralises it automatically.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Milliseconds. Use sparingly — stagger reads as lag past ~120ms. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Already in view on load (above the fold): show immediately, no observer.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-out-quint motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Reveal;
