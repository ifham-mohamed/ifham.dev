import { Icons } from "@/components/icons";
import type { Project } from "@/types";

/**
 * Projects Data
 * Update this file to add/modify your projects
 */
export const projects: Project[] = [
  {
    id: "rag-release",
    title: "Rag Release – Book Publishing Platform",
    href: "https://github.com/Rag-Release",
    dates: "Sep 2024 — Present",
    active: true,
    featured: true,
    role: "Full-Stack Developer – Web",
    description:
      "Developed a book publishing platform tailored to the Sri Lankan market, streamlining workflows between authors, reviewers, designers, publishers, and readers.",
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
      "Figma",
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
    dates: "Oct 2023 — Jul 2024",
    active: false,
    featured: true,
    role: "Team Lead & Full-Stack Developer",
    description:
      "Led the design and implementation of a Welfare Management System for the University of Visual and Performing Arts Welfare Department, mentored by Loons Lab. Systematized workflows to manage Mahapola scholarships and disciplinary actions, supporting the welfare of over 4,000 students.",
    technologies: [
      "Node.js",
      "Express.js",
      "React.js",
      "Material UI",
      "PostgreSQL",
      "Git",
      "GitLab",
      "Postman",
      "Mockitt",
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
    dates: "Jun 2024 — Sep 2024",
    active: false,
    featured: true,
    role: "Full-Stack Developer",
    description:
      "Developed a centralized student management system to streamline the internship application process for over 450 students. Implemented features for managing user profiles, CV uploads, and application status tracking, reducing manual coordination for staff.",
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
    id: "blogmium",
    title: "Blogmium – Blogging Platform",
    href: "https://github.com/ifhammohamed/Master-Blogmium",
    dates: "Jan 2024 — May 2024",
    active: false,
    featured: false,
    role: "Full-Stack Developer",
    description:
      "Built a user-friendly website for creating, managing, and reading blog posts with a focus on responsiveness and visual appeal. Developed the frontend using React.js and Tailwind CSS, ensuring a smooth experience across devices. Implemented secure authentication with Firebase to protect user data.",
    technologies: [
      "React.js",
      "Tailwind CSS",
      "Firebase",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifhammohamed/Master-Blogmium",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/images/projects/blogmium.png",
  },
  {
    id: "pov-globe",
    title: "POV Globe – 3D Rotating LED Display",
    href: "https://github.com/ifhammohamed/POVGLOBE",
    dates: "Jul 2023 — Jun 2024",
    active: false,
    featured: false,
    role: "Embedded & Web Developer",
    description:
      "Built a POV (Persistence of Vision) globe capable of displaying dynamic 3D text on a rotating LED sphere for marketing and information display. Programmed Arduino and C++ firmware to control LED delay patterns, ensuring clear and stable character rendering.",
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
