/**
 * Circular theme reveal, built on the View Transitions API.
 *
 * ── What this is not ──
 *
 * It is not a theme system. `next-themes` remains the single source of truth;
 * this module only wraps the moment the theme flips so the browser can tween
 * between the two rendered states. If the API is missing, or the user asked for
 * reduced motion, `apply()` is called directly and the theme still changes.
 * Switching never depends on the animation.
 *
 * ── Why the Web Animations API and not CSS ──
 *
 * The origin and radius are only knowable at click time — the toggle sits at a
 * different point on a 390px phone than on a 1440px desktop. Passing them into
 * a CSS keyframe means writing custom properties onto the document and reading
 * them back out of a pseudo-element, which is two indirections for one number.
 * `element.animate(..., { pseudoElement })` targets
 * `::view-transition-new(root)` directly and takes the values as ordinary JS.
 *
 * Either way the browser runs the animation off the main thread. There is no
 * requestAnimationFrame loop here and no per-frame React state.
 */

/** Only the members used here — avoids clashing with lib.dom's own typings. */
type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};

export type TransitionOrigin = { x: number; y: number };

/** 700ms, the midpoint of the 650–800ms target. */
const REVEAL_MS = 700;

/** Decisive start, graceful settle. No overshoot — this curve never exceeds 1. */
const REVEAL_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * The visual centre of the control that was activated.
 *
 * Measured, never hardcoded: the same toggle sits beside the Résumé button on
 * desktop and next to the menu trigger on mobile. Keyboard activation lands
 * here too, so Enter and Space reveal from the button rather than a corner.
 */
export function getThemeTransitionOrigin(el: Element): TransitionOrigin {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

/**
 * Distance from the origin to the furthest viewport corner.
 *
 * Near an edge — which is where the toggle always is — this is deliberately
 * asymmetric. The circle sweeps further one way than the other, and that is
 * the effect, not a bug to correct by re-centring.
 */
export function getMaxRadius({ x, y }: TransitionOrigin): number {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
}

/**
 * The transition in flight, if any.
 *
 * Module scope because there is only ever one document. A second click skips
 * the first transition rather than racing it: `skipTransition()` jumps to the
 * end state immediately, so two rapid clicks land on the correct final theme
 * instead of leaving two animations fighting over the same snapshot.
 */
let active: ViewTransitionLike | null = null;

export function runThemeTransition(
  origin: TransitionOrigin,
  apply: () => void
): void {
  const start = (
    document as unknown as {
      startViewTransition?: (cb: () => void) => ViewTransitionLike;
    }
  ).startViewTransition;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Progressive enhancement, both ways out. Firefox and older Safari take this
  // path, as does anyone who has asked their OS for less motion — the theme
  // changes instantly and correctly for all of them.
  if (prefersReduced || typeof start !== "function") {
    apply();
    return;
  }

  active?.skipTransition();

  const transition = start.call(document, apply);
  active = transition;

  // `finished` rejects when a transition is skipped, which is a normal outcome
  // here rather than an error. Swallow it, but always release the slot.
  const release = () => {
    if (active === transition) active = null;
  };
  transition.finished.then(release, release);

  transition.ready.then(() => {
    const radius = getMaxRadius(origin);
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${origin.x}px ${origin.y}px)`,
          `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
        ],
      },
      {
        duration: REVEAL_MS,
        easing: REVEAL_EASING,
        // Only the incoming snapshot is clipped. The outgoing one is left
        // untouched underneath, so the old theme is revealed away rather than
        // cross-fading into a muddy midpoint.
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, release);
}
