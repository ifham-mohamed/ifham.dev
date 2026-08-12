"use client";

import { useState } from "react";
import { ActionButton, ActionLink, SectionHeading } from "@/components/ui";
import { personalInfo, getAllSocialLinks } from "@/data";
import { Check, Copy } from "lucide-react";

/**
 * ContactSection — the previous version rendered a full-bleed animated
 * FlickeringGrid canvas behind two buttons, and one of those buttons pointed
 * at `socialLinks["X"]`, which has been commented out in the data for a while,
 * so it never rendered at all.
 *
 * No canvas, no dead link: the email, a copy control, and the real socials.
 */
export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const socials = getAllSocialLinks().filter((s) => s.name !== "Send Email");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context) — the mailto link still works.
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Open to software engineering roles and freelance work. The fastest way to reach me is email."
        anchor="contact"
      />

      <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5">
        <a
          href={`mailto:${personalInfo.email}`}
          className="link-underline w-fit font-mono text-base text-foreground"
        >
          {personalInfo.email}
        </a>

        <div className="flex flex-wrap items-center gap-2">
          <ActionButton
            variant="primary"
            onClick={handleCopy}
            aria-label={copied ? "Email copied" : "Copy email address"}
          >
            {copied ? (
              <>
                <Check aria-hidden className="size-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy aria-hidden className="size-3.5" />
                Copy address
              </>
            )}
          </ActionButton>

          {socials.map((social) => (
            <ActionLink key={social.name} href={social.url}>
              {social.name}
            </ActionLink>
          ))}
        </div>
      </div>
    </div>
  );
}
