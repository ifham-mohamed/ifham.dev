import { Icons } from "@/components/icons";
import type { Project } from "@/types";

/**
 * Projects Data
 * Update this file to add/modify your projects
 */
export const projects: Project[] = [
  {
    id: "total-supply",
    title: "Total Supply - Enterprise Supply Chain Platform",
    href: "https://total-supply.vercel.app",
    dates: "Jan 2026 - Present",
    active: true,
    featured: true,
    role: "Full-Stack Developer - Personal & Freelance",
    description:
      "Architected multi-role platform with 80+ REST API endpoints with e-commerce and service workflows. Built RBAC system dashboards, middleware enforcement, and admin approval of unauthorized access. Designed PostgreSQL schema with Prisma ORM relations, reducing query time from 250ms to 87ms. Integrated Google Cloud Storage with signed URLs and image optimization, reducing costs by 40%.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Google Cloud Storage",
      "Tailwind CSS",
      "RBAC",
    ],
    links: [
      {
        type: "Website",
        href: "https://total-supply.vercel.app",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/images/projects/total-supply.png",
  },
  {
    id: "samwoostore",
    title: "Samwoostore - E-Commerce Platform",
    href: "https://samwoohub.lk",
    dates: "Oct 2025 - Dec 2025",
    active: true,
    featured: true,
    role: "Full-Stack Developer - Freelance",
    description:
      "Built production B2B/B2C platform with 60+ REST API using feature-based modular architecture. Implemented dual authentication (credentials + Google OAuth) with JWT sessions and RBAC. Engineered CI/CD pipeline Docker multi-stage builds, GitHub Actions, Nginx achieving zero-downtime deployments. Optimized performance with Redux Toolkit, and React Query caching achieving 40% faster loads.",
    technologies: [
      "Next.js",
      "React",
      "Redux Toolkit",
      "React Query",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Nginx",
      "Google OAuth",
      "JWT",
    ],
    links: [
      {
        type: "Website",
        href: "https://samwoohub.lk",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/images/projects/samwoostore.png",
  },
  {
    id: "prompt-copilot",
    title: "Prompt Copilot - AI Prompt Management Ecosystem",
    href: "https://github.com/prompt-copilot",
    dates: "Dec 2025 - Jan 2026",
    active: true,
    featured: true,
    role: "Full-Stack Developer - Personal Project",
    description:
      "Built prompt management platform organization across 5+ platforms, REST API with 15+ endpoints featuring dual authentication with Chrome extension and VS Code extension with sidebar webview.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Chrome Extension",
      "VS Code Extension",
      "REST API",
      "Authentication",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/prompt-copilot",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/images/projects/prompt-copilot.png",
  },
  {
    id: "rag-release",
    title: "Rag Release - Book Publishing Platform",
    href: "https://github.com/Rag-Release",
    dates: "Sep 2024 - Jul 2025",
    active: false,
    featured: true,
    role: "Full-Stack Developer - Web",
    description:
      "Developed book publishing platform streamlining workflows for authors, reviewers, designers, publishers, and readers using serverless AWS infrastructure (API Gateway, Lambda, RDS).",
    technologies: [
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Shadcn UI",
      "Node.js",
      "Express.js",
      "AWS Lambda",
      "API Gateway",
      "RDS",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rag-Release",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/images/projects/rag-release.png",
  },
  {
    id: "welfare-system",
    title: "Student Welfare Management System",
    href: "https://ems.vpa.ac.lk",
    dates: "Oct 2023 - Jul 2024",
    active: false,
    featured: true,
    role: "Team Lead & Full-Stack Developer",
    description:
      "Led design and implementation of Welfare Management System supporting 4,000+ students, workflows for Mahapola scholarship processing and disciplinary action tracking under mentorship of Loons Lab.",
    technologies: [
      "Node.js",
      "Express.js",
      "React.js",
      "Material UI",
      "PostgreSQL",
      "Git",
      "GitLab",
    ],
    links: [
      {
        type: "Website",
        href: "https://ems.vpa.ac.lk",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/images/projects/welfare-system.png",
  },
  {
    id: "internify",
    title: "Intern Tracking System",
    href: "https://internify.fit",
    dates: "Jun 2024 - Sep 2024",
    active: false,
    featured: false,
    role: "Full-Stack Developer",
    description:
      "Developed centralized internship application management system serving 450+ students.",
    technologies: ["Node.js", "TypeScript", "React.js", "PostgreSQL"],
    links: [
      {
        type: "Website",
        href: "https://internify.fit",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/images/projects/internify.png",
  },
  {
    id: "pov-globe",
    title: "POV Globe - 3D Rotating LED Display",
    href: "https://github.com/ifhammohamed/POVGLOBE",
    dates: "Jul 2023 - Jun 2024",
    active: false,
    featured: false,
    role: "Embedded & Web Developer",
    description:
      "Engineered POV globe displaying dynamic 3D text on rotating LED sphere.",
    technologies: [
      "Arduino",
      "C++",
      "ESP32",
      "Hall Effect Sensors",
      "WS2812 LED",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifhammohamed/POVGLOBE",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/images/projects/pov-globe.png",
  },
];

/**
 * Get featured projects (for homepage)
 */
export const getFeaturedProjects = (count: number = 4): Project[] => {
  return projects.filter((p) => p.featured).slice(0, count);
};

/**
 * Get all projects
 */
export const getAllProjects = (): Project[] => {
  return projects;
};

/**
 * Get project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

/**
 * Get active projects
 */
export const getActiveProjects = (): Project[] => {
  return projects.filter((p) => p.active);
};

export default projects;
