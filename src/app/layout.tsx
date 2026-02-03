import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { personalInfo } from "@/data";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DotPattern } from "@/components/ui/dot-pattern";
// import { Cursor2 } from "@/components/core/cursor-2";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
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
    image: "https://ifham.dev/images/profile/me.png",
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
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {/* <Cursor2 /> */}
          <TooltipProvider delayDuration={0}>
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(226,232,240,0.16),transparent_65%)] transition-colors duration-700" />
              <DotPattern
                glow
                width={22}
                height={22}
                cr={1.4}
                className={cn(
                  "text-foreground/25 dark:text-foreground/35 opacity-90 transition-colors duration-500"
                )}
                style={{
                  maskImage:
                    "radial-gradient(720px circle at 50% 20%, white, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(720px circle at 50% 20%, white, transparent 75%)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
