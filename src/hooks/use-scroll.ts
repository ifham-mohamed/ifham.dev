"use client";

import { useEffect, useState } from "react";

/**
 * Hook to track scroll position and direction
 */
export function useScroll(threshold: number = 10) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > threshold;
      // Scroll events can fire many times per frame. React bails out when the
      // threshold state is unchanged, so the header now renders only when it
      // crosses the boundary instead of for every scroll pixel.
      setIsScrolled((current) => (current === next ? current : next));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled };
}

export default useScroll;
