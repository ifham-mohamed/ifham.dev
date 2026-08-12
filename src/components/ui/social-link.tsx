import * as React from "react";
import { cn } from "@/lib/utils";
import type { SocialLink as SocialLinkData } from "@/types";

/**
 * SocialLink — one outbound profile link.
 *
 * The footer rendered these as bare `<a>` elements while the contact section
 * used the CTA component, so the same GitHub link had two different hover
 * treatments depending on where you met it.
 *
 * `inline` is the quiet footer-list form; the default is the standalone form
 * used in contact, which shows the platform icon.
 */
export function SocialLink({
  social,
  inline = false,
  className,
}: {
  social: SocialLinkData;
  inline?: boolean;
  className?: string;
}) {
  const Icon = social.icon;

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group/social inline-flex items-center transition-colors",
        inline
          ? "gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          : cn(
              "h-8 gap-2 rounded-md border border-border bg-background px-3",
              "text-xs font-medium text-foreground/80",
              "hover:bg-muted/60 hover:text-foreground"
            ),
        className
      )}
    >
      {!inline && Icon && <Icon className="size-3.5 opacity-70" />}
      {social.name}
    </a>
  );
}

export default SocialLink;
