"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

interface MermaidProps {
  /** Mermaid diagram source (text). */
  chart: string;
  className?: string;
}

/**
 * Theme-aware Mermaid renderer.
 *
 * - Lazy-imports `mermaid` so the (heavy) library only loads on project
 *   pages that actually contain a diagram.
 * - Re-renders on light/dark theme changes.
 * - Falls back to the raw diagram source if rendering fails, so a bad
 *   diagram never blanks the page.
 */
export function Mermaid({ chart, className }: MermaidProps) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const rawId = useId();
  const baseId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
          fontFamily: "inherit",
          themeVariables: { fontSize: "13px" },
        });
        // Unique id per render avoids "element already exists" on theme switch.
        const renderId = `${baseId}-${Math.random().toString(36).slice(2, 8)}`;
        const { svg: rendered } = await mermaid.render(renderId, chart.trim());
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Diagram failed to render"
          );
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, baseId]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
        <code>{chart.trim()}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="flex min-h-40 w-full animate-pulse items-center justify-center rounded-lg border border-border bg-muted/30 text-xs text-muted-foreground">
        Loading diagram…
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mermaid-diagram flex w-full justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full",
        className
      )}
      // Mermaid output is generated from trusted, in-repo diagram source.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default Mermaid;
