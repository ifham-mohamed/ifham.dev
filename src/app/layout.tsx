import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { personalInfo } from "@/data";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(personalInfo.url),
  title: {
    default: `${personalInfo.name} - Software Engineer | Full Stack Developer`,
    template: `%s | ${personalInfo.name}`,
  },
  description: `${personalInfo.name} is a Software Engineer from Sri Lanka specializing in full-stack development, React, Next.js, TypeScript, and scalable web applications. View portfolio, projects, and blog.`,
  keywords: [
    "Ifham Mohamed",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Sri Lanka",
    "Portfolio",
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.url }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} - Software Engineer | Full Stack Developer`,
    description: `${personalInfo.name} is a Software Engineer from Sri Lanka specializing in full-stack development, React, Next.js, TypeScript, and scalable web applications.`,
    url: personalInfo.url,
    siteName: personalInfo.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${personalInfo.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - Software Engineer`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} - Software Engineer`,
    description: `Software Engineer specializing in full-stack development, React, Next.js, and TypeScript.`,
    creator: "@ifham_mohamed",
    images: [`${personalInfo.url}/opengraph-image`],
  },
  alternates: {
    canonical: personalInfo.url,
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "6oB8mqUMp4R_35icXJCJ3-kX0W3rB5y6umqUXoKSXLk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ifham Mohamed",
    url: "https://ifham.dev",
    // `image` points at the generated OG card rather than a profile photo that
    // is not in the repo — a 404 in structured data gets flagged by crawlers.
    image: "https://ifham.dev/opengraph-image",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "APP360 (Pvt) Limited",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Moratuwa",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "Sri Lanka",
    },
    email: "ifham.info@gmail.com",
    sameAs: [
      "https://github.com/ifham-mohamed",
      "https://linkedin.com/in/ifham-mohamed",
      "https://twitter.com/ifham_mohamed",
    ],
    knowsAbout: [
      "Software Engineering",
      "Full Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "E-Commerce Development",
      "Supply Chain Systems",
    ],
    description:
      "Software Engineer with proven expertise in full-stack development, specializing in scalable e-commerce platforms, supply chain systems, and SaaS applications.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://ifham.dev" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={200}>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
            >
              Skip to content
            </a>

            <SiteHeader />

            <div
              id="main"
              className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14"
            >
              {children}
            </div>

            {/* The floating scroll-to-top button was removed when the footer
                gained a "Back to top" control — two of them is redundant, and
                a fixed circle overlapping the content is the kind of generic
                chrome the rest of this design has been shedding. */}
            <SiteFooter />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
