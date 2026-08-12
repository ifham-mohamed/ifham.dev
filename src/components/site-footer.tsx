import Link from "next/link";
import { sectionAnchors } from "@/config/navigation.config";
import { personalInfo, getAllSocialLinks } from "@/data";

/**
 * SiteFooter — the site previously ended abruptly after the contact section
 * with no footer at all. This closes the page and gives the secondary links
 * (section anchors, socials, licence) somewhere to live that isn't the nav.
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
            <p className="max-w-[34ch] text-xs text-muted-foreground">
              {personalInfo.title} · {personalInfo.location}
            </p>
          </div>

          <nav aria-label="Footer" className="flex gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-2xs font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
                Explore
              </span>
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
              <span className="text-2xs font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
                Elsewhere
              </span>
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-5">
          <p className="text-2xs text-muted-foreground/70">
            © {year} {personalInfo.name}
          </p>
          <p className="text-2xs text-muted-foreground/70">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
