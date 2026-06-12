"use client";
import { useState } from "react";
import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { personalInfo, socialLinks } from "@/data";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const twitterUrl = socialLinks["X"]?.url;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently fail
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        eyebrow="CONTACT"
        title="Let's connect"
        description="Want to chat? Drop an email or send a DM on X — I respond whenever I can."
        anchor="contact"
      />

      <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 h-1/2 overflow-hidden"
        >
          <FlickeringGrid
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-5 p-5 sm:p-8 md:p-10 text-center">
          <div className="flex min-w-0 max-w-full">
            <div className="inline-flex min-w-0 max-w-full items-center gap-2 min-h-7 px-2.5 py-1 rounded-md border border-border bg-background/80 backdrop-blur text-xs font-medium text-foreground/80">
              <Mail className="size-3.5 shrink-0" aria-hidden />
              <span className="tabular-nums truncate min-w-0">{personalInfo.email}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Email copied" : "Copy email to clipboard"}
              className={cn(
                "btn-sheen group/cta inline-flex items-center gap-1.5 h-9 px-4 rounded-md",
                "bg-foreground text-background text-sm font-medium",
                "shadow-sm hover:shadow-md transition-all duration-200",
                "hover:gap-2 cursor-pointer w-full sm:w-auto justify-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              {copied ? (
                <>
                  <Check className="size-3.5" aria-hidden />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-3.5" aria-hidden />
                  Copy email
                </>
              )}
            </button>

            {twitterUrl && (
              <Link
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group/cta inline-flex items-center gap-1.5 h-9 px-3.5 rounded-md",
                  "border border-border bg-background text-sm text-foreground/80",
                  "hover:text-foreground hover:bg-muted/60 transition-colors",
                  "w-full sm:w-auto justify-center",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                DM on X
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
