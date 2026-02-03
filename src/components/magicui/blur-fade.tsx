"use client";

import { AnimatePresence, motion, useInView, Variants } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.3,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "0px", // Disabled blur for performance - causes non-composited animations
}: BlurFadeProps) => {
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const inViewResult = useInView(ref, {
    once: true,
    ...(inViewMargin ? { margin: inViewMargin as any } : {}),
  });
  const isInView = !inView || inViewResult;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Performance-optimized variants using only transform and opacity (GPU-composited)
  const defaultVariants: Variants = {
    hidden: {
      y: yOffset,
      opacity: 0,
      // Using transform3d triggers GPU acceleration
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const combinedVariants = variant || defaultVariants;

  // Show content immediately if not mounted (SSR/static) - improves LCP
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: Math.min(delay, 0.2), // Cap delay to improve LCP
          duration,
          ease: "easeOut",
        }}
        className={className}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlurFade;
