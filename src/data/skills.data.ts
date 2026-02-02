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
  // Languages
  { name: "Python", icon: Python, category: "languages" },
  { name: "JavaScript", icon: Typescript, category: "languages" },
  { name: "TypeScript", icon: Typescript, category: "languages" },
  { name: "Java", icon: Java, category: "languages" },
  { name: "C++", icon: Csharp, category: "languages" },
  { name: "PHP", icon: Csharp, category: "languages" },
  { name: "Go", icon: Golang, category: "languages" },

  // Frameworks
  { name: "Node.js", icon: Nodejs, category: "frameworks" },
  { name: "Express.js", icon: Nodejs, category: "frameworks" },
  { name: "Next.js", icon: NextjsIconDark, category: "frameworks" },
  { name: "React.js", icon: ReactLight, category: "frameworks" },

  // Web Technologies
  { name: "Redux", icon: ReactLight, category: "web" },
  { name: "MUI", icon: ReactLight, category: "web" },
  { name: "Tailwind CSS", icon: ReactLight, category: "web" },
  { name: "CSS", icon: ReactLight, category: "web" },
  { name: "HTML", icon: ReactLight, category: "web" },

  // Databases
  { name: "PostgreSQL", icon: Postgresql, category: "databases" },
  { name: "MongoDB", icon: Postgresql, category: "databases" },
  { name: "MySQL", icon: Postgresql, category: "databases" },

  // DevOps & Tools
  { name: "Git", icon: Docker, category: "tools" },
  { name: "Docker", icon: Docker, category: "devops" },
  { name: "Firebase", icon: Docker, category: "devops" },
  { name: "AWS", icon: Docker, category: "devops" },
];

// Skills displayed on homepage/hero (simplified list with icons)
export const featuredSkills: Skill[] = [
  { name: "React", icon: ReactLight, category: "frameworks" },
  { name: "Next.js", icon: NextjsIconDark, category: "frameworks" },
  { name: "TypeScript", icon: Typescript, category: "languages" },
  { name: "Node.js", icon: Nodejs, category: "frameworks" },
  { name: "Python", icon: Python, category: "languages" },
  { name: "Go", icon: Golang, category: "languages" },
  { name: "PostgreSQL", icon: Postgresql, category: "databases" },
  { name: "Docker", icon: Docker, category: "devops" },
  { name: "Java", icon: Java, category: "languages" },
  { name: "C++", icon: Csharp, category: "languages" },
];

// Category labels for display
export const skillCategoryLabels: Record<SkillCategory, string> = {
  languages: "Tools and Languages",
  frameworks: "Frameworks",
  web: "Web Technologies",
  databases: "Databases",
  devops: "DevOps & Cloud",
  tools: "Tools",
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
