'use client';

import { useEffect, useState } from 'react';
import type { SVGProps } from 'react';
import { Cursor } from '@/components/core/cursor';

const MouseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={31}
      fill="none"
      {...props}
    >
      <g clipPath="url(#cursor-clip)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          stroke="#ffffff"
          strokeLinecap="square"
          strokeWidth={2}
          d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="cursor-clip">
          <path fill="currentColor" d="M0 0h26v31H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export function Cursor2() {
  const [enabled, setEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.matchMedia !== 'function') return;

    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setEnabled(!coarsePointerQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    update();
    coarsePointerQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);

    return () => {
      coarsePointerQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
      <Cursor
        variants={{
          initial: reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: reducedMotion ? { scale: 1, opacity: 0 } : { scale: 0.3, opacity: 0 },
        }}
        transition={{
          ease: 'easeInOut',
          duration: reducedMotion ? 0 : 0.15,
        }}
      >
        <div className="flex items-center gap-2 translate-x-3 -translate-y-3">
          <MouseIcon className="h-6 w-6 text-emerald-500 drop-shadow-md" />
          <div className="rounded-[6px] bg-emerald-500/90 px-2 py-0.5 text-xs font-medium text-white shadow-lg dark:bg-emerald-400 dark:text-emerald-950">
            The city below
          </div>
        </div>
      </Cursor>
    </div>
  );
}
