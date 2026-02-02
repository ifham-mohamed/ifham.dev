import { personalInfo } from "@/data";

/**
 * Site Configuration
 * Central place for all site-wide configuration
 */
export const siteConfig = {
  name: personalInfo.name,
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: personalInfo.description,
  url: personalInfo.url,
  ogImage: `${personalInfo.url}/og.png`,
  author: {
    name: personalInfo.name,
    email: personalInfo.email,
    url: personalInfo.url,
  },
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
    personalInfo.name,
  ],
  links: {
    github: "https://github.com/ifham-mohamed",
    linkedin: "https://linkedin.com/in/ifham-mohamed",
    twitter: "https://twitter.com/ifham_mohamed",
  },
  creator: personalInfo.name,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export type SiteConfig = typeof siteConfig;

export default siteConfig;
