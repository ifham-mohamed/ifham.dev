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
    default: personalInfo.name,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.description,
  openGraph: {
    title: `${personalInfo.name}`,
    description: personalInfo.description,
    url: personalInfo.url,
    siteName: `${personalInfo.name}`,
    locale: "en_US",
    type: "website",
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
    title: `${personalInfo.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
