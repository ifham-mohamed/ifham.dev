import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import {
  AvailabilityStatus,
  CONTAINER,
  SectionEyebrow,
  SocialLink,
} from "@/components/ui";
import { sectionAnchors } from "@/config/navigation.config";
import { getAllSocialLinks, personalInfo } from "@/data";

/**
 * SiteFooter — a closing section, not a sitemap.
 *
 * A 12-column grid: identity across 5, then two navigation groups across 3 and
 * 4. Deliberately not an agency footer — no newsletter, no duplicated
 * marketing links, nothing that is not already a real destination on this
 * site.
 *
 * Navigation reads `sectionAnchors` from the shared config rather than keeping
 * a second copy, so the footer cannot drift out of step with the page, and the
 * socials come from `getAllSocialLinks()` for the same reason.
 *
 * The availability line is the same component used in the hero and contact
 * section — by the time you reach the bottom you have seen the same statement
 * three times, which is the intent.
 */
export function SiteFooter() {
  const socials = getAllSocialLinks();
  const year = new Date().getFullYear();

  return (
    // A hairline, not a slab. A dark rectangle here would fight the near-white
    // page in light mode and flatten the surface hierarchy in dark mode.
    <footer className="mt-12 border-t border-hairline sm:mt-14">
      <div className={`mx-auto px-4 py-12 sm:px-6 ${CONTAINER.chrome}`}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-12 sm:gap-8">
          {/* ---------------- Identity ---------------- */}
          <div className="flex flex-col gap-4 sm:col-span-5">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid size-8 flex-none place-items-center rounded-md border border-border bg-surface-raised font-mono text-2xs font-medium tracking-tight text-muted-foreground"
              >
                {personalInfo.initials}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {personalInfo.name}
                </span>
                <span className="font-mono text-2xs text-muted-foreground">
                  {personalInfo.title} · {personalInfo.location}
                </span>
              </div>
            </div>

            <p className="max-w-[38ch] text-xs leading-relaxed text-muted-foreground">
              Building reliable full-stack products and production systems.
            </p>

            <AvailabilityStatus location={personalInfo.location} />
          </div>

          {/* ---------------- Explore ---------------- */}
          <nav
            aria-label="Sections"
            className="flex flex-col gap-3 sm:col-span-3"
          >
            <SectionEyebrow>
              Explore
            </SectionEyebrow>
            <ul className="flex flex-col gap-2">
              {sectionAnchors.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-brand-hover"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------------- Elsewhere ---------------- */}
          <nav
            aria-label="Elsewhere"
            className="flex flex-col gap-3 sm:col-span-4"
          >
            <SectionEyebrow>
              Elsewhere
            </SectionEyebrow>
            <ul className="flex flex-col gap-2">
              {socials.map((social) => (
                <li key={social.name}>
                  <SocialLink social={social} inline />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ---------------- Bottom row ---------------- */}
        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-5 font-mono text-2xs text-subtle-foreground min-[30rem]:flex-row min-[30rem]:items-center min-[30rem]:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p>
              © {year} {personalInfo.name}
            </p>
            <span aria-hidden className="text-border-strong">
              ·
            </span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand-hover"
            >
              Privacy &amp; analytics
            </Link>
          </div>
          <p className="min-[30rem]:order-2">
            Built with Next.js &amp; Tailwind CSS
          </p>
          <div className="min-[30rem]:order-3">
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
