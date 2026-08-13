"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { playClick } from "@/lib/sound";
import {
  getThemeTransitionOrigin,
  runThemeTransition,
} from "@/lib/theme-transition";

/**
 * ModeToggle — one button, three synchronised responses.
 *
 * Press → the control dips ~4%. Release → the new theme opens out of the
 * button itself. Underneath, the icons counter-rotate into place. One event,
 * not a button animation followed by a separate colour change.
 *
 * ── Why the icons are pure CSS ──
 *
 * They were conditionally rendered, which meant `mounted` had to gate them or
 * the server would emit the wrong one. Both are now always in the DOM, stacked,
 * with the `dark:` variant deciding which is visible. `next-themes` sets the
 * class on <html> in a blocking script before first paint, so the correct icon
 * is right from the very first frame — no flash, no hydration mismatch, and no
 * waiting for an effect to run.
 *
 * `mounted` survives for the accessible label only, which genuinely cannot be
 * known during server rendering.
 */

/** ~260ms, mid-range of the 220–320ms target. Not a spin: 20 degrees. */
const ICON_BASE =
  "absolute inset-0 size-full transition-[opacity,transform] duration-[260ms] ease-out motion-reduce:transition-none";

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    // The DOM class is the ground truth, not React state. If a previous
    // transition was skipped mid-flight, this still reads what is actually on
    // screen, so the theme can never end up inverted from what you see.
    const isDarkNow = document.documentElement.classList.contains("dark");
    const target = isDarkNow ? "light" : "dark";

    // Dark → light = higher tick; light → dark = lower tick.
    playClick({ freq: isDarkNow ? 920 : 780, volume: 0.06, duration: 0.07 });

    // Geometry is read here and only here — never during render, never on the
    // server. Keyboard activation reports the same rect, so Enter reveals from
    // the button exactly as a pointer click does.
    runThemeTransition(getThemeTransitionOrigin(event.currentTarget), () => {
      // ── This has to be synchronous, and `setTheme` alone is not ──
      //
      // The browser takes the "new" snapshot the instant this callback
      // returns. `setTheme` only queues React state; next-themes writes the
      // class from an effect, which runs afterwards. So the callback used to
      // return with the DOM unchanged, both snapshots came out identical, and
      // the reveal expanded a copy of the page over itself — the theme flipped
      // a moment later with no animation attached to it. Nothing looked
      // broken, which is why it read as "the effect just doesn't run here".
      //
      // Writing the class here is not a second source of truth: it is the same
      // remove/add next-themes performs, one tick earlier, and next-themes
      // still owns state, persistence and the system-preference listener. Its
      // effect then re-applies the identical value as a no-op.
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(target);
      root.style.colorScheme = target;

      setTheme(target);
    });
  };

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      // Reads as the action about to happen, and flips with the theme.
      aria-label={mounted ? `Switch to ${nextTheme} mode` : "Toggle theme"}
      onClick={handleToggle}
      className={cn(
        // Tactile, not theatrical: ~4% for 100ms, no ring, no glow. The page
        // reveal is the visual event — this is just acknowledgement.
        "transition-transform duration-100 ease-out active:scale-[0.96]",
        "motion-reduce:transition-none motion-reduce:active:scale-100",
        className
      )}
    >
      <span className="relative block size-full">
        {/* Sun means "switch to light", so it shows while dark is active. */}
        <SunIcon
          aria-hidden
          className={cn(
            ICON_BASE,
            "-rotate-[20deg] scale-75 opacity-0",
            "dark:rotate-0 dark:scale-100 dark:opacity-100"
          )}
        />
        <MoonIcon
          aria-hidden
          className={cn(
            ICON_BASE,
            "rotate-0 scale-100 opacity-100",
            "dark:rotate-[20deg] dark:scale-75 dark:opacity-0"
          )}
        />
      </span>
    </Button>
  );
}

export default ModeToggle;
