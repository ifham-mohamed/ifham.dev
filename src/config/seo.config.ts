import { siteConfig } from "./site.config";
import type { Metadata } from "next";

/**
 * SEO Configuration
 * Default SEO settings for the site
 */

// Default metadata
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ifham_mohamed",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

/**
 * Generate page-specific metadata
 */
export const generatePageMetadata = (
  title: string,
  description?: string,
  image?: string
): Metadata => {
  return {
    title,
    description: description || siteConfig.description,
    openGraph: {
      title,
      description: description || siteConfig.description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      title,
      description: description || siteConfig.description,
      images: image ? [image] : undefined,
    },
  };
};

/**
 * Generate blog post metadata
 */
export const generateBlogMetadata = (
  title: string,
  description: string,
  publishedAt: string,
  image?: string
): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedAt,
      authors: [siteConfig.author.name],
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
};

export default defaultMetadata;
