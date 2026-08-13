"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Icons } from "@/components/icons";
import {
  ActionLink,
  ANCHOR_OFFSET,
  AvailabilityStatus,
  SectionEyebrow,
  SectionIndex,
} from "@/components/ui";
import { personalInfo, socialLinks } from "@/data";

/**
 * ContactSection — the page's closing move.
 *
 * No form. A form is a worse ask than a mailto for this audience: it demands
 * more effort, gives the sender no record of what they sent, and needs a
 * backend this static export does not have. The email address is shown in
 * full so it can be copied, typed or clicked.
 *
 * The availability line is the same component as the hero's, which is the
 * point — the page opens and closes on the same statement, so this reads as a
 * conclusion rather than as one more section.
 *
 * Surface contrast is one step above the other sections (`bg-muted/40` inside
 * a border) so the final block is distinct without a gradient CTA card.
 */
export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const linkedin = socialLinks.LinkedIn;
  const github = socialLinks.GitHub;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard unavailable (insecure context) — the address is visible and
      // the mailto link still works, so there is nothing to recover from.
    }
  };

  return (
    <section id="contact" className={ANCHOR_OFFSET}>
      <div className="flex flex-col gap-7 rounded-lg border border-border bg-muted/40 p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <SectionEyebrow>
            <SectionIndex value={9} />
            Let&apos;s work together
          </SectionEyebrow>

          <h2 className="max-w-[22ch] text-2xl font-semibold leading-tight tracking-tight text-foreground">
            Have a project, role or engineering problem worth discussing?
          </h2>

          <p className="max-w-[56ch] text-base leading-relaxed text-muted-foreground">
            I&apos;m open to software engineering roles, freelance builds and
            conversations about systems that need to hold up in production.
          </p>
        </div>

        <AvailabilityStatus location={personalInfo.location} />

        {/* Three tiers, three weights. All 40px tall, so every one of them is
            a comfortable tap target — no icon-only controls. */}
        <div className="flex flex-col gap-2 min-[26rem]:flex-row min-[26rem]:flex-wrap min-[26rem]:items-center">
          <ActionLink
            href={`mailto:${personalInfo.email}`}
            variant="primary"
            size="md"
            external={false}
            icon={<Mail aria-hidden className="size-4" />}
            className="justify-center min-[26rem]:justify-start"
          >
            Send me an email
          </ActionLink>

          {linkedin && (
            <ActionLink
              href={linkedin.url}
              size="md"
              icon={<Icons.linkedin className="size-4 opacity-70" />}
              className="justify-center min-[26rem]:justify-start"
            >
              LinkedIn
            </ActionLink>
          )}

          {github && (
            <ActionLink
              href={github.url}
              variant="quiet"
              size="md"
              icon={<Icons.github className="size-4 opacity-70" />}
              className="justify-center min-[26rem]:justify-start"
            >
              GitHub
            </ActionLink>
          )}
        </div>

        {/* --- Address + copy --- */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-hairline pt-5">
          <a
            href={`mailto:${personalInfo.email}`}
            className="link-underline font-mono text-sm text-foreground"
          >
            {personalInfo.email}
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Copy email address ${personalInfo.email}`}
          >
            {copied ? (
              <Check aria-hidden className="size-3.5" />
            ) : (
              <Copy aria-hidden className="size-3.5" />
            )}
          </button>

          {/* Confirmation, not a toast: it appears in place, is announced
              politely, and fades on its own. The live region is always in the
              DOM so screen readers register the change rather than a new node
              appearing. */}
          <span
            role="status"
            aria-live="polite"
            className={`font-mono text-2xs text-muted-foreground transition-opacity duration-200 ${
              copied ? "opacity-100" : "opacity-0"
            }`}
          >
            {copied ? "Email copied" : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
