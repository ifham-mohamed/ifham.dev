import { ReactLight } from "@/components/icons/tech-icons/react";
import { NextjsIconDark } from "@/components/icons/tech-icons/nextjs";
import { Typescript } from "@/components/icons/tech-icons/typescript";
import { Nodejs } from "@/components/icons/tech-icons/nodejs";
import { Python } from "@/components/icons/tech-icons/python";
import { Postgresql } from "@/components/icons/tech-icons/postgresql";
import { Docker } from "@/components/icons/tech-icons/docker";
import { Java } from "@/components/icons/tech-icons/java";
import type { Skill, SkillGroup, SkillCategory } from "@/types";

/**
 * Skills — mirrors the categories on the CV ("TECHNICAL SKILLS" table).
 * Icons are attached only where a real tech icon exists in
 * `src/components/icons/tech-icons/`. Other skills render as text-only badges.
 */
export const skills: Skill[] = [
  // Programming Languages
  { name: "JavaScript", category: "languages" },
  { name: "TypeScript", icon: Typescript, category: "languages" },
  { name: "Python", icon: Python, category: "languages" },
  { name: "Java", icon: Java, category: "languages" },

  // Frontend
  { name: "Next.js", icon: NextjsIconDark, category: "frontend" },
  { name: "React", icon: ReactLight, category: "frontend" },
  { name: "Redux Toolkit", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "shadcn/ui", category: "frontend" },

  // Backend Development
  { name: "Node.js", icon: Nodejs, category: "backend" },
  { name: "Next.js", icon: NextjsIconDark, category: "backend" },
  { name: "NextAuth.js", category: "backend" },
  { name: "JWT", category: "backend" },
  { name: "RESTful APIs", category: "backend" },

  // Databases
  { name: "PostgreSQL", icon: Postgresql, category: "databases" },
  { name: "MongoDB", category: "databases" },
  { name: "MySQL", category: "databases" },
  { name: "Firebase", category: "databases" },
  { name: "Prisma", category: "databases" },
  { name: "Sequelize", category: "databases" },

  // Cloud & Infrastructure
  { name: "GCS", category: "cloud" },
  { name: "AWS Lambda", category: "cloud" },
  { name: "AWS RDS", category: "cloud" },
  { name: "AWS S3", category: "cloud" },
  { name: "Docker", icon: Docker, category: "cloud" },
  { name: "GitHub Actions", category: "cloud" },
  { name: "Nginx", category: "cloud" },

  // Architecture Patterns
  { name: "Feature-Based Architecture", category: "architecture" },
  { name: "Microservices", category: "architecture" },
  { name: "RBAC", category: "architecture" },

  // External Integrations
  { name: "Resend", category: "integrations" },
  { name: "WhatsApp API", category: "integrations" },
  { name: "Google OAuth", category: "integrations" },

  // Domain Expertise
  { name: "E-Commerce", category: "domain" },
  { name: "Supply Chain", category: "domain" },
  { name: "POS Systems", category: "domain" },
  { name: "Inventory Management", category: "domain" },
];

// Compact, icon-led list for the hero/intro area
export const featuredSkills: Skill[] = [
  { name: "Next.js", icon: NextjsIconDark, category: "frontend" },
  { name: "React", icon: ReactLight, category: "frontend" },
  { name: "TypeScript", icon: Typescript, category: "languages" },
  { name: "Node.js", icon: Nodejs, category: "backend" },
  { name: "PostgreSQL", icon: Postgresql, category: "databases" },
  { name: "Docker", icon: Docker, category: "cloud" },
  { name: "Python", icon: Python, category: "languages" },
  { name: "Java", icon: Java, category: "languages" },
];

export const skillCategoryLabels: Record<SkillCategory, string> = {
  languages: "Programming Languages",
  frontend: "Frontend",
  backend: "Backend Development",
  databases: "Databases",
  cloud: "Cloud & Infrastructure",
  architecture: "Architecture Patterns",
  integrations: "External Integrations",
  domain: "Domain Expertise",
};

const CATEGORY_ORDER: SkillCategory[] = [
  "languages",
  "frontend",
  "backend",
  "databases",
  "cloud",
  "architecture",
  "integrations",
  "domain",
];

/**
 * Get skills grouped by category (ordered the same way as the CV).
 */
export const getSkillsByCategory = (): SkillGroup[] => {
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: skillCategoryLabels[category],
    skills: skills.filter((skill) => skill.category === category),
  }));
};

export const getSkillNames = (): string[] => skills.map((skill) => skill.name);

export default skills;
