import { personalInfo } from "@/data";

/**
 * Site Configuration
 * Central place for all site-wide configuration
 */
export const siteConfig = {
  name: personalInfo.name,
  title: `${personalInfo.name} - Software Engineer | Full Stack Developer`,
  description: `${personalInfo.name} is a Software Engineer from Sri Lanka specializing in full-stack development, React, Next.js, TypeScript, and scalable web applications. View portfolio, projects, and blog.`,
  url: personalInfo.url,
  ogImage: `${personalInfo.url}/og.png`,
  author: {
    name: personalInfo.name,
    email: personalInfo.email,
    url: personalInfo.url,
  },
  keywords: [
    // Primary keywords (your name variations)
    "Ifham Mohamed",
    "Ifham",
    "ifham-mohamed",
    "ifham.dev",

    // Professional title keywords
    "Software Engineer",
    "Full Stack Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer Sri Lanka",
    "Full Stack Developer Colombo",

    // Technical skills keywords
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "PostgreSQL",
    "AWS Developer",

    // Domain expertise
    "E-Commerce Developer",
    "Supply Chain Systems",
    "SaaS Applications",

    // Education/Location
    "University of Moratuwa",
    "Sri Lanka Developer",
    "Colombo Software Engineer",

    // Portfolio related
    "Developer Portfolio",
    "Tech Blog",
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
