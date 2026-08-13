import Link from "next/link";
import { sectionAnchors } from "@/config/navigation.config";
import { personalInfo, getAllSocialLinks } from "@/data";
import { Divider, SectionEyebrow, SocialLink } from "@/components/ui";

/**
 * SiteFooter — the page previously ended abruptly after the contact section
 * with no footer at all. This closes the page and gives the secondary links
 * somewhere to live that isn't the nav.
 */
export function SiteFooter() {
  const socials = getAllSocialLinks();
  const year = new Date().getFullYear();

  return (
    // mt-16 rather than mt-24: the contact section now closes on its own
    // bordered surface, so it no longer needs a wide gap to separate it from
    // the footer — the surface change already does that, and the extra space
    // just left the page trailing off.
    <footer className="mt-16 border-t border-hairline">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">{personalInfo.name}</p>
            <p className="max-w-[34ch] font-mono text-2xs text-muted-foreground">
              {personalInfo.title} · {personalInfo.location}
            </p>
          </div>

          <nav aria-label="Footer" className="flex gap-10">
            <div className="flex flex-col gap-2">
              <SectionEyebrow>Explore</SectionEyebrow>
              {sectionAnchors.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <SectionEyebrow>Elsewhere</SectionEyebrow>
              {socials.map((social) => (
                <SocialLink key={social.name} social={social} inline />
              ))}
            </div>
          </nav>
        </div>

        <Divider className="mt-10" />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 font-mono text-2xs text-muted-foreground/70">
          <p>
            © {year} {personalInfo.name}
          </p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
