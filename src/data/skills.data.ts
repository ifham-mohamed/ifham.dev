import { ReactLight } from "@/components/icons/tech-icons/react";
import { NextjsIconDark } from "@/components/icons/tech-icons/nextjs";
import { Typescript } from "@/components/icons/tech-icons/typescript";
import { Nodejs } from "@/components/icons/tech-icons/nodejs";
import { Python } from "@/components/icons/tech-icons/python";
import { Golang } from "@/components/icons/tech-icons/golang";
import { Postgresql } from "@/components/icons/tech-icons/postgresql";
import { Docker } from "@/components/icons/tech-icons/docker";
import { Java } from "@/components/icons/tech-icons/java";
import { Csharp } from "@/components/icons/tech-icons/csharp";
import type { Skill, SkillGroup, SkillCategory } from "@/types";

/**
 * Skills Configuration
 * Update this file to change your skills displayed on the portfolio
 */

// All skills with categories
export const skills: Skill[] = [
  // Programming Languages
  { name: "JavaScript", icon: Typescript, category: "languages" },
  { name: "TypeScript", icon: Typescript, category: "languages" },
  { name: "Python", icon: Python, category: "languages" },
  { name: "Java", icon: Java, category: "languages" },

  // Frontend
  { name: "Next.js", icon: NextjsIconDark, category: "frameworks" },
  { name: "React", icon: ReactLight, category: "frameworks" },
  { name: "Redux Toolkit", icon: ReactLight, category: "frameworks" },
  { name: "Tailwind CSS", icon: ReactLight, category: "web" },
  { name: "shadcn/ui", icon: ReactLight, category: "web" },

  // Backend Development
  { name: "Node.js", icon: Nodejs, category: "frameworks" },
  { name: "NextAuth.js", icon: NextjsIconDark, category: "frameworks" },
  { name: "JWT", icon: Nodejs, category: "frameworks" },
  { name: "RESTful APIs", icon: Nodejs, category: "frameworks" },

  // Databases
  { name: "PostgreSQL", icon: Postgresql, category: "databases" },
  { name: "MongoDB", icon: Postgresql, category: "databases" },
  { name: "MySQL", icon: Postgresql, category: "databases" },
  { name: "Firebase", icon: Docker, category: "databases" },
  { name: "Prisma", icon: Postgresql, category: "databases" },
  { name: "Sequelize", icon: Postgresql, category: "databases" },

  // Cloud & Infrastructure
  { name: "GCS", icon: Docker, category: "devops" },
  { name: "AWS Lambda", icon: Docker, category: "devops" },
  { name: "AWS RDS", icon: Docker, category: "devops" },
  { name: "AWS S3", icon: Docker, category: "devops" },
  { name: "Docker", icon: Docker, category: "devops" },
  { name: "GitHub Actions", icon: Docker, category: "devops" },
  { name: "Nginx", icon: Docker, category: "devops" },

  // Tools
  { name: "Git", icon: Docker, category: "tools" },
  { name: "Resend", icon: Nodejs, category: "tools" },
  { name: "WhatsApp API", icon: Nodejs, category: "tools" },
  { name: "Google OAuth", icon: Nodejs, category: "tools" },
];

// Skills displayed on homepage/hero (simplified list with icons)
export const featuredSkills: Skill[] = [
  { name: "Next.js", icon: NextjsIconDark, category: "frameworks" },
  { name: "React", icon: ReactLight, category: "frameworks" },
  { name: "TypeScript", icon: Typescript, category: "languages" },
  { name: "Node.js", icon: Nodejs, category: "frameworks" },
  { name: "PostgreSQL", icon: Postgresql, category: "databases" },
  { name: "Docker", icon: Docker, category: "devops" },
  { name: "Python", icon: Python, category: "languages" },
  { name: "Java", icon: Java, category: "languages" },
  { name: "Prisma", icon: Postgresql, category: "databases" },
  { name: "AWS", icon: Docker, category: "devops" },
];

// Category labels for display
export const skillCategoryLabels: Record<SkillCategory, string> = {
  languages: "Programming Languages",
  frameworks: "Frontend & Backend",
  web: "Web Technologies",
  databases: "Databases",
  devops: "Cloud & Infrastructure",
  tools: "Tools & Integrations",
};

/**
 * Get skills grouped by category
 */
export const getSkillsByCategory = (): SkillGroup[] => {
  const categories: SkillCategory[] = [
    "languages",
    "frameworks",
    "web",
    "databases",
    "devops",
    "tools",
  ];

  return categories.map((category) => ({
    category,
    label: skillCategoryLabels[category],
    skills: skills.filter((skill) => skill.category === category),
  }));
};

/**
 * Get skills as simple string array (for legacy compatibility)
 */
export const getSkillNames = (): string[] => {
  return skills.map((skill) => skill.name);
};

export default skills;
