"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { DiagramViewer } from "./diagram-viewer";
import { ActionLink } from "@/components/ui";
import { themePalette } from "@/config/theme.config";

interface MermaidProps {
  /** Mermaid diagram source (text). */
  chart: string;
  label?: string;
  caption?: string;
  /** Offered in the failure state so the diagram stays reachable. */
  sourceHref?: string;
  className?: string;
}

/**
 * Palette handed to Mermaid so diagrams inherit the site's design tokens.
 * Hex rather than `oklch()` — Mermaid's colour maths cannot parse the latter.
 */
const PALETTE = {
  light: {
    background: themePalette.light.surface,
    primaryColor: themePalette.light.accentSurface,
    primaryTextColor: themePalette.light.text,
    primaryBorderColor: themePalette.light.borderStrong,
    secondaryColor: themePalette.light.surfaceRaised,
    secondaryTextColor: themePalette.light.text,
    secondaryBorderColor: themePalette.light.borderStrong,
    tertiaryColor: themePalette.light.surface,
    tertiaryTextColor: themePalette.light.text,
    tertiaryBorderColor: themePalette.light.border,
    lineColor: themePalette.light.textSubtle,
    textColor: themePalette.light.text,
    mainBkg: themePalette.light.accentSurface,
    nodeBorder: themePalette.light.borderStrong,
    clusterBkg: themePalette.light.background,
    clusterBorder: themePalette.light.border,
    edgeLabelBackground: themePalette.light.surface,
    titleColor: themePalette.light.text,
  },
  dark: {
    background: themePalette.dark.surface,
    primaryColor: themePalette.dark.accentSurface,
    primaryTextColor: themePalette.dark.text,
    primaryBorderColor: themePalette.dark.borderStrong,
    secondaryColor: themePalette.dark.surfaceRaised,
    secondaryTextColor: themePalette.dark.text,
    secondaryBorderColor: themePalette.dark.borderStrong,
    tertiaryColor: themePalette.dark.surface,
    tertiaryTextColor: themePalette.dark.text,
    tertiaryBorderColor: themePalette.dark.border,
    lineColor: themePalette.dark.textSubtle,
    textColor: themePalette.dark.text,
    mainBkg: themePalette.dark.accentSurface,
    nodeBorder: themePalette.dark.borderStrong,
    clusterBkg: themePalette.dark.background,
    clusterBorder: themePalette.dark.border,
    edgeLabelBackground: themePalette.dark.surface,
    titleColor: themePalette.dark.text,
  },
} as const;

/** Frame height, kept identical across loading, error and rendered states. */
const FRAME_HEIGHT = "h-[360px] sm:h-[440px] lg:h-[520px]";

/**
 * Strips the sizing Mermaid bakes in and returns the natural dimensions.
 *
 * Mermaid emits `width="100%"` plus an inline `max-width`. The viewer needs
 * true pixel dimensions to compute a fit-to-width scale, so they are read off
 * the viewBox once here instead of being measured off the DOM later.
 */
function normalizeSvg(raw: string) {
  const viewBox = raw.match(
    /viewBox="\s*[\d.+-]+\s+[\d.+-]+\s+([\d.+-]+)\s+([\d.+-]+)\s*"/
  );
  const width = viewBox ? Number(viewBox[1]) : 0;
  const height = viewBox ? Number(viewBox[2]) : 0;
  if (!width || !height) return { svg: raw, width: 0, height: 0 };

  const svg = raw.replace(/<svg\b[^>]*>/, (openTag) =>
    openTag
      .replace(/\s(?:width|height)="[^"]*"/g, "")
      .replace(/\sstyle="[^"]*"/g, "")
      .replace(
        /^<svg/,
        `<svg width="${width}" height="${height}" style="display:block;max-width:none"`
      )
  );
  return { svg, width, height };
}

/**
 * Theme-aware Mermaid renderer.
 *
 * Mermaid is ~500KB and every case study has a diagram, so the import is
 * deferred until the figure is near the viewport rather than fired on mount.
 * The frame reserves its final height from the first paint, so the deferred
 * render cannot shift the page.
 */
export function Mermaid({
  chart,
  label,
  caption,
  sourceHref,
  className,
}: MermaidProps) {
  const { resolvedTheme } = useTheme();
  const [rendered, setRendered] = useState<{
    svg: string;
    width: number;
    height: number;
  } | null>(null);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);

  const holderRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const baseId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  // Defer the library until the diagram is worth paying for.
  useEffect(() => {
    const node = holderRef.current;
    if (!node) return;

    if (node.getBoundingClientRect().top < window.innerHeight * 2) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = resolvedTheme === "dark";

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui",
          themeVariables: {
            fontSize: "14px",
            ...PALETTE[isDark ? "dark" : "light"],
          },
          flowchart: {
            useMaxWidth: false,
            htmlLabels: false,
            curve: "basis",
            nodeSpacing: 40,
            rankSpacing: 48,
            padding: 12,
          },
          sequence: { useMaxWidth: false },
          gantt: { useMaxWidth: false },
        });

        const renderId = `${baseId}-${Math.random().toString(36).slice(2, 8)}`;
        const { svg } = await mermaid.render(renderId, chart.trim());
        if (!cancelled) {
          setRendered(normalizeSvg(svg));
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [visible, chart, resolvedTheme, baseId]);

  // --- Failure: say what happened and keep the diagram reachable ---
  if (failed) {
    return (
      <div className="flex flex-col gap-3">
        <div
          className={`diagram-matrix flex ${FRAME_HEIGHT} flex-col items-center justify-center gap-3 rounded-lg border border-border p-6 text-center`}
        >
          <p className="max-w-[48ch] text-sm text-muted-foreground">
            This architecture diagram could not be rendered in your browser.
            The description below covers the same flow.
          </p>
          {sourceHref && (
            <ActionLink href={sourceHref}>View source repository</ActionLink>
          )}
        </div>
        {caption && (
          <p className="max-w-[66ch] text-sm leading-relaxed text-muted-foreground">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // --- Loading: same frame, same height, a hint of structure ---
  if (!rendered) {
    return (
      <div ref={holderRef} className="flex flex-col gap-3">
        <div
          role="status"
          aria-label="Loading architecture diagram"
          className={`diagram-matrix relative ${FRAME_HEIGHT} overflow-hidden rounded-lg border border-border`}
        >
          {/* A row of placeholder nodes rather than an empty rectangle, so the
              frame reads as a diagram that has not arrived yet. */}
          <div className="absolute inset-0 flex animate-pulse items-center gap-6 px-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-1 items-center gap-6">
                <div className="h-12 flex-1 rounded-md bg-muted" />
                {i < 3 && <div className="h-px w-6 flex-none bg-muted" />}
              </div>
            ))}
          </div>
        </div>
        {caption && (
          <p className="max-w-[66ch] text-sm leading-relaxed text-muted-foreground">
            {caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <div ref={holderRef}>
      <DiagramViewer
        svg={rendered.svg}
        width={rendered.width}
        height={rendered.height}
        label={label ?? caption ?? "Architecture diagram"}
        caption={caption}
        sourceHref={sourceHref}
        className={className}
      />
    </div>
  );
}

export default Mermaid;
