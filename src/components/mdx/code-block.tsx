"use client";

import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type CodeBlockProps = ComponentProps<"pre">;

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = className.match(/language-([a-z0-9-]+)/i);
  return match ? match[1] : "plaintext";
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState("");
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const childProps = isValidElement<{
    className?: string;
    "data-title"?: string;
  }>(children)
    ? children.props
    : undefined;
  const className = childProps?.className ?? "";
  const title = childProps?.["data-title"] ?? null;

  // Keep the readable, server-rendered code in place and pay for Shiki only
  // shortly before the block can enter the viewport.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldHighlight(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldHighlight(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldHighlight) return;

    const pre = preRef.current;
    const codeEl = pre?.querySelector("code");
    if (!pre || !codeEl) return;

    const codeText = codeEl.textContent || "";
    const lang = extractLanguage(codeEl.className);
    let cancelled = false;

    async function highlight() {
      try {
        const { codeToHtml } = await import("shiki/bundle/web");
        const highlighted = await codeToHtml(codeText, {
          lang: lang as any,
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          defaultColor: false,
        });
        const parser = new DOMParser();
        const doc = parser.parseFromString(highlighted, "text/html");
        if (!cancelled) setHtml(doc.querySelector("code")?.innerHTML ?? "");
      } catch (error) {
        console.error("Failed to highlight code:", error);
        if (!cancelled) setHtml("");
      }
    }

    void highlight();
    return () => {
      cancelled = true;
    };
  }, [children, shouldHighlight]);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  const handleCopy = async () => {
    const code = preRef.current?.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  // Derived from the class the highlighter recorded, not from a second
  // parse of the children.
  const language = extractLanguage(className);
  const label = title ?? (language !== "plaintext" ? language : undefined);

  return (
    <div
      ref={containerRef}
      className="group relative my-6 overflow-hidden rounded-lg border border-border bg-surface"
    >
      {/* Header strip. Carries the file title when the fence declares one,
          otherwise the language — `extractLanguage` was already parsing it and
          nothing was showing it. */}
      {label && (
        <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface-raised px-3 py-2">
          <span className="font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground">
            {label}
          </span>
        </div>
      )}

      {/* The control sits outside <pre>, which is the scroll container. Inside
          it, a long line could carry the button off-screen. It is also visible
          on keyboard focus, not hover alone — it used to be opacity-0 on
          desktop until the pointer arrived, which left it unreachable-looking
          for anyone tabbing through. */}
      <Button
        onClick={handleCopy}
        variant="outline"
        size="icon"
        aria-label={copied ? "Code copied" : "Copy code to clipboard"}
        className={cn(
          "absolute right-2 z-10 size-8 cursor-pointer rounded-md border border-border-strong bg-surface shadow-none",
          "opacity-100 transition-opacity lg:opacity-0",
          "lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 focus-visible:opacity-100",
          label ? "top-11" : "top-2"
        )}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>

      {/* Politely announced, so the result is not conveyed by an icon swap
          alone. A toast would interrupt reading for a two-word confirmation. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>

      <pre
        ref={preRef}
        {...props}
        // Horizontal scrolling at every width. Code is never reflowed and never
        // shrunk to fit — a wrapped identifier is harder to read than a scroll.
        className={cn("m-0! overflow-x-auto p-0! leading-[1.65]", props.className)}
      >
        {html ? (
          <code
            className={`shiki ${className} block p-4 text-[0.9em]`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <code className="block p-4 text-[0.9em]">{children}</code>
        )}
      </pre>
    </div>
  );
}
