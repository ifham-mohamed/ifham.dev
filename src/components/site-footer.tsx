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
    <footer className="mt-24 border-t border-hairline">
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
