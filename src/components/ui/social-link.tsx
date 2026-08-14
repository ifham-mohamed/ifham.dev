import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SocialLink as SocialLinkData } from "@/types";

/**
 * SocialLink — one outbound profile link.
 *
 * The footer rendered these as bare `<a>` elements while the contact section
 * used the CTA component, so the same GitHub link had two different hover
 * treatments depending on where you met it.
 *
 * `target="_blank"` is applied only to http(s). It was previously set on every
 * link including `mailto:`, which asks the browser to open a new tab for a
 * handler that does not render one — some browsers leave a blank tab behind.
 *
 * Text-plus-icon, never an unexplained icon circle: the label is what makes
 * the destination obvious and gives the link a usable hit area.
 */
export function SocialLink({
  social,
  inline = false,
  className,
}: {
  social: SocialLinkData;
  /** Quiet list form used in the footer. */
  inline?: boolean;
  className?: string;
}) {
  const Icon = social.icon;
  const isHttp = /^https?:/i.test(social.url);

  return (
    <a
      href={social.url}
      target={isHttp ? "_blank" : undefined}
      rel={isHttp ? "noopener noreferrer" : undefined}
      className={cn(
        "group/social inline-flex items-center transition-colors",
        inline
          ? "gap-1.5 text-xs text-muted-foreground hover:text-brand-hover"
          : cn(
              "h-8 gap-2 rounded-md border border-border-strong bg-surface px-3",
              "text-xs font-medium text-foreground/80",
              "hover:bg-surface-raised hover:text-brand-hover"
            ),
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "shrink-0 opacity-60 transition-opacity group-hover/social:opacity-100",
            inline ? "size-3" : "size-3.5"
          )}
        />
      )}
      {social.name}
      <ArrowUpRight
        aria-hidden
        className={cn(
          "size-3 shrink-0 text-subtle-foreground transition-transform duration-200",
          "group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5"
        )}
      />
      {isHttp && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

export default SocialLink;
