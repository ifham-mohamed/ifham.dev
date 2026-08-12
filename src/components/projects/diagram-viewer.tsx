"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
// `Minimize` and `Minimize2` are deliberately avoided: those two files are
// corrupt in the local pnpm store (unreadable at the filesystem level), which
// panics Turbopack at compile time. `Shrink` is the same affordance and reads
// fine. See the note in README about repairing the store.
import { Maximize2, Scan, Shrink, X, ZoomIn, ZoomOut } from "lucide-react";
import { Divider } from "@/components/ui/rhythm";
import { cn } from "@/lib/utils";

const MIN_SCALE = 0.25;
const MAX_SCALE = 5;
const STEP = 1.25;

type Point = { x: number; y: number };

/**
 * DiagramViewer — pan/zoom surface for an already-rendered SVG.
 *
 * The previous diagram container applied `[&_svg]:max-w-full`, which forced a
 * wide left-to-right flowchart down to the column width. At ~660px that made
 * an eleven-node pipeline about six pixels tall per node — present on the page
 * but not actually readable, with the rest of the box left as empty space.
 *
 * Here the SVG keeps its natural size and the viewport moves over it instead.
 *
 * Interaction model, chosen so nothing fights the page:
 *  - Plain wheel / one-finger swipe over the diagram still scrolls the page.
 *    Hijacking scroll to zoom is the single most complained-about pattern in
 *    embedded maps and diagrams.
 *  - Ctrl/⌘ + wheel zooms at the pointer (matches every map and design tool).
 *  - Drag pans. Pinch with two fingers zooms.
 *  - Toolbar buttons and keyboard work without any pointer at all.
 */
export function DiagramViewer({
  svg,
  label,
  caption,
  className,
}: {
  /** Rendered SVG markup. Must come from trusted, in-repo source. */
  svg: string;
  /** Describes the diagram for assistive tech. */
  label: string;
  /** Visible caption, rendered as the figure's figcaption. */
  caption?: string;
  className?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // Scoped so a page with two diagrams does not emit duplicate element ids.
  const helpId = `diagram-help-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Live pointers, keyed by pointerId, so pinch and drag share one code path.
  const pointers = useRef(new Map<number, Point>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const panStart = useRef<{ pointer: Point; offset: Point } | null>(null);

  /** Scale that makes the whole diagram visible inside the viewport. */
  const computeFit = useCallback(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current?.firstElementChild as SVGElement | null;
    if (!viewport || !content) return null;

    const natural = content.getBoundingClientRect();
    // Undo the current transform to recover the untransformed size.
    const w = natural.width / scale;
    const h = natural.height / scale;
    if (!w || !h) return null;

    const pad = 24;
    const fit = Math.min(
      (viewport.clientWidth - pad) / w,
      (viewport.clientHeight - pad) / h
    );
    return { fit: Math.max(MIN_SCALE, Math.min(fit, MAX_SCALE)), w, h };
  }, [scale]);

  const fitToView = useCallback(() => {
    const result = computeFit();
    const viewport = viewportRef.current;
    if (!result || !viewport) return;

    const { fit, w, h } = result;
    setScale(fit);
    setOffset({
      x: (viewport.clientWidth - w * fit) / 2,
      y: (viewport.clientHeight - h * fit) / 2,
    });
  }, [computeFit]);

  // Fit once the SVG is in the DOM, and again whenever the viewport resizes
  // (orientation change, fullscreen toggle, responsive breakpoint).
  useEffect(() => {
    if (!svg) return;
    const id = requestAnimationFrame(fitToView);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg, fullscreen]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return;

    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitToView);
    });
    observer.observe(viewport);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Zoom by `factor`, keeping the point `origin` (viewport coords) fixed. */
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
    return {
      x: e.clientX - (rect?.left ?? 0),
      y: e.clientY - (rect?.top ?? 0),
    };
  };

  // --- Wheel -------------------------------------------------------------
  // Registered manually because React's onWheel is passive, and preventing
  // the browser's pinch-zoom on ctrl+wheel requires a non-passive listener.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return; // let the page scroll
      e.preventDefault();
      zoomAt(e.deltaY < 0 ? STEP : 1 / STEP, toViewport(e));
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // --- Pointer: drag to pan, two fingers to pinch -------------------------
  const distance = (a: Point, b: Point) =>
    Math.hypot(a.x - b.x, a.y - b.y);

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
      e.preventDefault();
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

  // --- Keyboard ----------------------------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const nudge = 40;
    const keys: Record<string, () => void> = {
      "+": () => zoomAt(STEP),
      "=": () => zoomAt(STEP),
      "-": () => zoomAt(1 / STEP),
      _: () => zoomAt(1 / STEP),
      "0": fitToView,
      ArrowUp: () => setOffset((o) => ({ ...o, y: o.y + nudge })),
      ArrowDown: () => setOffset((o) => ({ ...o, y: o.y - nudge })),
      ArrowLeft: () => setOffset((o) => ({ ...o, x: o.x + nudge })),
      ArrowRight: () => setOffset((o) => ({ ...o, x: o.x - nudge })),
    };

    const action = keys[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  };

  // Escape closes fullscreen, and the body must not scroll behind it.
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  const percent = Math.round(scale * 100);

  const button =
    "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 sm:size-8";

  return (
    <figure
      className={cn(
        "group/diagram m-0",
        fullscreen
          ? "fixed inset-0 z-50 flex flex-col bg-background p-3 sm:p-6"
          : "relative",
        className
      )}
      aria-label={label}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-border bg-card",
          fullscreen ? "flex-1" : "h-[320px] sm:h-[420px]"
        )}
      >
        <div
          ref={viewportRef}
          tabIndex={0}
          role="img"
          aria-label={label}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          aria-describedby={helpId}
          className={cn(
            "size-full touch-none select-none outline-none",
            "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset",
            dragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          <div
            ref={contentRef}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: "0 0",
            }}
            className="w-fit will-change-transform"
            // Diagram source is authored in-repo and rendered by Mermaid.
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>

        <div
          className={cn(
            "absolute right-2 top-2 flex items-center gap-0.5 rounded-lg border border-border",
            "bg-background/90 p-1 backdrop-blur-sm"
          )}
        >
          <button
            type="button"
            onClick={() => zoomAt(1 / STEP)}
            disabled={scale <= MIN_SCALE}
            aria-label="Zoom out"
            className={button}
          >
            <ZoomOut aria-hidden className="size-4" />
          </button>

          <span
            aria-live="polite"
            aria-atomic="true"
            className="min-w-11 text-center text-2xs tabular-nums text-muted-foreground"
          >
            {percent}%
          </span>

          <button
            type="button"
            onClick={() => zoomAt(STEP)}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
            className={button}
          >
            <ZoomIn aria-hidden className="size-4" />
          </button>

          <Divider orientation="vertical" className="mx-0.5 h-5" />

          <button
            type="button"
            onClick={fitToView}
            aria-label="Fit diagram to view"
            className={button}
          >
            <Scan aria-hidden className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => setFullscreen((v) => !v)}
            aria-label={fullscreen ? "Exit full screen" : "View full screen"}
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
              className={button}
            >
              <X aria-hidden className="size-4" />
            </button>
          )}
        </div>
      </div>

      <figcaption className="mt-3 flex flex-col gap-1.5">
        {caption && (
          <span className="text-2xs leading-relaxed text-muted-foreground">
            {caption}
          </span>
        )}
        <span id={helpId} className="text-2xs text-muted-foreground/65">
          <span className="hidden sm:inline">
            Drag to pan · ⌘/Ctrl + scroll to zoom · or focus the diagram and use
            +, −, 0 and the arrow keys
          </span>
          <span className="sm:hidden">
            Drag to pan · pinch to zoom · tap full screen for a closer look
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default DiagramViewer;
