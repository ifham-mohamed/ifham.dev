"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";
import { DiagramViewer } from "./diagram-viewer";

interface MermaidProps {
  /** Mermaid diagram source (text). */
  chart: string;
  /** Describes the diagram for assistive tech. Falls back to a generic label. */
  label?: string;
  /** Visible caption rendered beneath the diagram. */
  caption?: string;
  className?: string;
}

/**
 * Palette handed to Mermaid so diagrams inherit the site's design tokens.
 *
 * Mermaid's stock themes ship a lavender/purple node fill that has nothing to
 * do with the rest of the page — on a neutral portfolio it reads as a foreign
 * screenshot pasted into the article. These are the same neutrals and the same
 * single amber accent used everywhere else, as hex because Mermaid's colour
 * maths cannot parse `oklch()`.
 */
const PALETTE = {
  light: {
    background: "#ffffff",
    primaryColor: "#f5f4f1",
    primaryTextColor: "#2e2b27",
    primaryBorderColor: "#dcdad5",
    secondaryColor: "#faf9f7",
    secondaryTextColor: "#2e2b27",
    secondaryBorderColor: "#dcdad5",
    tertiaryColor: "#ffffff",
    tertiaryTextColor: "#2e2b27",
    tertiaryBorderColor: "#dcdad5",
    lineColor: "#b0aca5",
    textColor: "#2e2b27",
    mainBkg: "#f5f4f1",
    nodeBorder: "#dcdad5",
    clusterBkg: "#faf9f7",
    clusterBorder: "#e4e2dd",
    edgeLabelBackground: "#ffffff",
    titleColor: "#2e2b27",
  },
  dark: {
    background: "#232120",
    primaryColor: "#302d2a",
    primaryTextColor: "#f0eeea",
    primaryBorderColor: "#454240",
    secondaryColor: "#2a2826",
    secondaryTextColor: "#f0eeea",
    secondaryBorderColor: "#454240",
    tertiaryColor: "#232120",
    tertiaryTextColor: "#f0eeea",
    tertiaryBorderColor: "#454240",
    lineColor: "#6d6963",
    textColor: "#f0eeea",
    mainBkg: "#302d2a",
    nodeBorder: "#454240",
    clusterBkg: "#2a2826",
    clusterBorder: "#3b3835",
    edgeLabelBackground: "#232120",
    titleColor: "#f0eeea",
  },
} as const;

/**
 * Strip the sizing Mermaid bakes into its output.
 *
 * Mermaid emits `width="100%"` plus an inline `max-width`, which is what let
 * the old container squeeze a wide flowchart down to the text column. Giving
 * the SVG its true pixel size from the viewBox lets the viewer scale it
 * deliberately instead.
 */
function normalizeSvg(raw: string): string {
  const viewBox = raw.match(
    /viewBox="\s*[\d.+-]+\s+[\d.+-]+\s+([\d.+-]+)\s+([\d.+-]+)\s*"/
  );
  if (!viewBox) return raw;

  const width = Number(viewBox[1]);
  const height = Number(viewBox[2]);
  if (!width || !height) return raw;

  return raw.replace(/<svg\b[^>]*>/, (openTag) =>
    openTag
      .replace(/\s(?:width|height)="[^"]*"/g, "")
      .replace(/\sstyle="[^"]*"/g, "")
      .replace(
        /^<svg/,
        `<svg width="${width}" height="${height}" style="display:block;max-width:none"`
      )
  );
}

/**
 * Theme-aware Mermaid renderer.
 *
 * Lazy-imports `mermaid` so the (heavy) library only loads on project pages
 * that actually contain a diagram, re-renders on theme change, and falls back
 * to the diagram source if rendering fails so a bad diagram never blanks the
 * page.
 */
export function Mermaid({ chart, label, caption, className }: MermaidProps) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);
  const rawId = useId();
  const baseId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
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
            // Keep the diagram at its natural width — the viewer handles fit.
            useMaxWidth: false,
            // SVG <text> stays crisp under CSS transform; foreignObject HTML
            // labels blur and mis-measure when scaled.
            htmlLabels: false,
            curve: "basis",
            nodeSpacing: 40,
            rankSpacing: 48,
            padding: 12,
          },
          sequence: { useMaxWidth: false },
          gantt: { useMaxWidth: false },
        });

        // A unique id per render avoids "element already exists" on theme swap.
        const renderId = `${baseId}-${Math.random().toString(36).slice(2, 8)}`;
        const { svg: rendered } = await mermaid.render(renderId, chart.trim());

        if (!cancelled) {
          setSvg(normalizeSvg(rendered));
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
  }, [chart, resolvedTheme, baseId]);

  if (failed) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
        <code>{chart.trim()}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div
        role="status"
        className="flex h-[320px] w-full animate-pulse items-center justify-center rounded-lg border border-border bg-muted/30 text-xs text-muted-foreground sm:h-[420px]"
      >
        Loading diagram…
      </div>
    );
  }

  return (
    <DiagramViewer
      svg={svg}
      label={label ?? caption ?? "Architecture diagram"}
      caption={caption}
      className={className}
    />
  );
}

export default Mermaid;
