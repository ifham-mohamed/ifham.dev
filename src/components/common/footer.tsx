import Link from "next/link";
import { personalInfo } from "@/data";
import { footerNavItems } from "@/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-lg font-semibold">
              {personalInfo.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {personalInfo.title}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4">
            {footerNavItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
