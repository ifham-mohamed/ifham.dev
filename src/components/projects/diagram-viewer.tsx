"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Maximize2, Scan, Shrink, X, ZoomIn, ZoomOut } from "lucide-react";
import { Divider } from "@/components/ui/rhythm";
import { cn } from "@/lib/utils";

const MIN_SCALE = 0.2;
const MAX_SCALE = 5;
const STEP = 1.25;

/**
 * Floor for the initial fit.
 *
 * Mermaid renders labels at 14px. Below ~0.6 they fall under 9px, which is
 * decoration rather than a diagram. When fit-to-width would go lower than
 * this the viewer keeps the floor, anchors to the left edge and lets the
 * reader pan — the start of a left-to-right flow legible beats the whole
 * thing illegible.
 */
const MIN_READABLE = 0.6;

/** A small diagram may grow to fill the width, but not past this. */
const MAX_INITIAL = 1.4;

const FOCUSABLE = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Point = { x: number; y: number };

/**
 * DiagramViewer — pan/zoom surface for a rendered architecture diagram.
 *
 * The bug this replaces: the initial fit was `min(widthRatio, heightRatio)`,
 * which fits *both* axes. Every diagram in this project is `flowchart LR`, so
 * the width ratio always won and a wide pipeline opened at roughly 25% —
 * most of the frame blank, every label unreadable, in the one section of a
 * case study that is meant to be evidence.
 *
 * It now fits to width, floored at a readable scale, anchored left.
 *
 * Natural dimensions are passed in from the renderer rather than measured off
 * the DOM. Measuring meant reading a `getBoundingClientRect` that already had
 * the current transform applied and dividing it back out, which compounded
 * rounding on every refit.
 */
export function DiagramViewer({
  svg,
  width,
  height,
  label,
  caption,
  sourceHref,
  className,
}: {
  /** Rendered SVG markup. Must come from trusted, in-repo source. */
  svg: string;
  /** Natural size from the SVG viewBox. */
  width: number;
  height: number;
  label: string;
  caption?: string;
  /** Shown in the failure state so the diagram is still reachable. */
  sourceHref?: string;
  className?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const [dragging, setDragging] = useState(false);

  const helpId = `diagram-help-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const pointers = useRef(new Map<number, Point>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const panStart = useRef<{ pointer: Point; offset: Point } | null>(null);

  /**
   * Fit to width, not to the box.
   *
   * Anchored left with a small inset so the first node is flush with the
   * reading edge, and vertically centred when the diagram is shorter than the
   * frame.
   */
  const fitToWidth = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || !width || !height) return;

    const pad = 24;
    const usable = viewport.clientWidth - pad * 2;
    const next = Math.min(
      MAX_INITIAL,
      Math.max(MIN_READABLE, usable / width)
    );

    const scaledHeight = height * next;
    setScale(next);
    setOffset({
      x: pad,
      y:
        scaledHeight < viewport.clientHeight
          ? (viewport.clientHeight - scaledHeight) / 2
          : pad,
    });
  }, [width, height]);

  useEffect(() => {
    if (!svg) return;
    const frame = requestAnimationFrame(fitToWidth);
    return () => cancelAnimationFrame(frame);
  }, [svg, fullscreen, fitToWidth]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return;

    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitToWidth);
    });
    observer.observe(viewport);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [fitToWidth]);

  const zoomAt = useCallback((factor: number, origin?: Point) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const pivot = origin ?? {
      x: viewport.clientWidth / 2,
      y: viewport.clientHeight / 2,
    };

    setScale((prev) => {
      const next = Math.max(MIN_SCALE, Math.min(prev * factor, MAX_SCALE));
      const ratio = next / prev;
      setOffset((o) => ({
        x: pivot.x - (pivot.x - o.x) * ratio,
        y: pivot.y - (pivot.y - o.y) * ratio,
      }));
      return next;
    });
  }, []);

  const toViewport = (e: { clientX: number; clientY: number }): Point => {
    const rect = viewportRef.current?.getBoundingClientRect();
    return { x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) };
  };

  // Ctrl/⌘ + wheel zooms; a bare wheel still scrolls the page. Registered
  // manually because React's onWheel is passive and cannot preventDefault.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      zoomAt(e.deltaY < 0 ? STEP : 1 / STEP, toViewport(e));
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      setDragging(true);
      panStart.current = { pointer: { x: e.clientX, y: e.clientY }, offset };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { dist: distance(a, b), scale };
      panStart.current = null;
      setDragging(false);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const ratio = distance(a, b) / pinchStart.current.dist;
      const target = Math.max(
        MIN_SCALE,
        Math.min(pinchStart.current.scale * ratio, MAX_SCALE)
      );
      const midpoint = toViewport({
        clientX: (a.x + b.x) / 2,
        clientY: (a.y + b.y) / 2,
      });
      zoomAt(target / scale, midpoint);
      return;
    }

    if (panStart.current) {
      const { pointer, offset: start } = panStart.current;
      setOffset({
        x: start.x + (e.clientX - pointer.x),
        y: start.y + (e.clientY - pointer.y),
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) {
      setDragging(false);
      panStart.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const nudge = 40;
    const actions: Record<string, () => void> = {
      "+": () => zoomAt(STEP),
      "=": () => zoomAt(STEP),
      "-": () => zoomAt(1 / STEP),
      _: () => zoomAt(1 / STEP),
      "0": fitToWidth,
      ArrowUp: () => setOffset((o) => ({ ...o, y: o.y + nudge })),
      ArrowDown: () => setOffset((o) => ({ ...o, y: o.y - nudge })),
      ArrowLeft: () => setOffset((o) => ({ ...o, x: o.x + nudge })),
      ArrowRight: () => setOffset((o) => ({ ...o, x: o.x - nudge })),
    };
    const action = actions[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  };

  /**
   * Fullscreen: Escape closes, Tab cycles inside the panel, focus returns to
   * whatever opened it, and the page behind stops scrolling.
   */
  useEffect(() => {
    if (!fullscreen) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setFullscreen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [fullscreen]);

  const percent = Math.round(scale * 100);
  const button =
    "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 sm:size-8";

  const frame = (
    <div
      ref={panelRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card",
        // Fixed viewport height: the frame never changes size, so the diagram
        // rendering cannot shift the page.
        fullscreen ? "h-full" : "h-[360px] sm:h-[440px] lg:h-[520px]"
      )}
    >
      <div
        ref={viewportRef}
        tabIndex={0}
        role="img"
        aria-label={label}
        aria-describedby={helpId}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={cn(
          "size-full touch-none select-none outline-none",
          "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset",
          dragging ? "cursor-grabbing" : "cursor-grab"
        )}
      >
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "0 0",
          }}
          className="w-fit will-change-transform"
          // Diagram source is authored in-repo and rendered by Mermaid.
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      <div className="absolute right-2 top-2 flex items-center gap-0.5 rounded-lg border border-border bg-background/90 p-1 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => zoomAt(1 / STEP)}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
          title="Zoom out"
          className={button}
        >
          <ZoomOut aria-hidden className="size-4" />
        </button>

        <span
          aria-live="polite"
          aria-atomic="true"
          className="min-w-11 text-center font-mono text-2xs tabular-nums text-muted-foreground"
        >
          {percent}%
        </span>

        <button
          type="button"
          onClick={() => zoomAt(STEP)}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
          title="Zoom in"
          className={button}
        >
          <ZoomIn aria-hidden className="size-4" />
        </button>

        <Divider orientation="vertical" className="mx-0.5 h-5" />

        <button
          type="button"
          onClick={fitToWidth}
          aria-label="Fit diagram to width"
          title="Fit to width"
          className={button}
        >
          <Scan aria-hidden className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => setFullscreen((v) => !v)}
          aria-label={fullscreen ? "Exit full screen" : "View full screen"}
          title={fullscreen ? "Exit full screen" : "Full screen"}
          aria-pressed={fullscreen}
          className={button}
        >
          {fullscreen ? (
            <Shrink aria-hidden className="size-4" />
          ) : (
            <Maximize2 aria-hidden className="size-4" />
          )}
        </button>

        {fullscreen && (
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            aria-label="Close full screen"
            title="Close"
            className={button}
          >
            <X aria-hidden className="size-4" />
          </button>
        )}
      </div>
    </div>
  );

  // One instance only. Rendering the frame twice would attach two elements to
  // the same refs and the pan/zoom maths would follow whichever mounted last,
  // so fullscreen relocates this figure rather than duplicating it.
  return (
    <figure
      {...(fullscreen
        ? { role: "dialog", "aria-modal": true, "aria-label": `${label} — full screen` }
        : {})}
      className={cn(
        "m-0 flex flex-col gap-3",
        fullscreen && "fixed inset-0 z-50 bg-background p-3 sm:p-6",
        className
      )}
    >
      {frame}

      <figcaption className="flex flex-col gap-1.5">
        {caption && (
          <>
            <span className="font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground/70">
              Architecture flow
            </span>
            <span className="max-w-[66ch] text-sm leading-relaxed text-muted-foreground">
              {caption}
            </span>
          </>
        )}
        {/* Interaction hints are the least important line here. */}
        <span id={helpId} className="text-2xs text-muted-foreground/55">
          <span className="hidden sm:inline">
            Drag to pan · ⌘/Ctrl + scroll to zoom · +, −, 0 and arrow keys when
            focused
          </span>
          <span className="sm:hidden">
            Drag to pan · pinch to zoom · full screen for a closer look
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default DiagramViewer;
