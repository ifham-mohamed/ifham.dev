import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { defaultMetadata } from "@/config";
import { themePalette } from "@/config/theme.config";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: themePalette.light.background,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: themePalette.dark.background,
    },
  ],
};

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

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geist.variable,
          geistMono.variable
        )}
      >
        {/* disableTransitionOnChange: next-themes suppresses transitions for
            one frame while the class flips, so elements swap their tokens
            instantly underneath the view-transition snapshot instead of
            each running its own colour tween. The reveal is the motion. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-border-strong focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>

          <SiteHeader />

          <main
            id="main"
            // Width now belongs to each page via <PageContainer>, so a grid route
            // can be wider than a reading route.
            className="pt-10 sm:pt-14"
          >
            {children}
          </main>

          {/* The floating scroll-to-top button was removed when the footer
              gained a "Back to top" control — two of them is redundant, and
              a fixed circle overlapping the content is the kind of generic
              chrome the rest of this design has been shedding. */}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
