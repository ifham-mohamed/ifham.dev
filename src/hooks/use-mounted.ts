"use client";

import { useState, useEffect } from "react";

/**
 * Hook to check if component is mounted (useful for hydration)
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default useMounted;
