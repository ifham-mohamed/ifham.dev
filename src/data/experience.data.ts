import type { WorkExperience } from "@/types";

/**
 * Work Experience Data
 * Update this file to add/modify your work experience
 */
export const workExperience: WorkExperience[] = [
  {
    id: "app360",
    company: "APP360 (Pvt) Limited",
    href: "https://app360.lk",
    badges: ["Internship"],
    location: "Colombo, Sri Lanka",
    title: "Software Engineer - Intern",
    logoUrl: "/images/companies/app360.png",
    start: "February 2025",
    end: "August 2025",
    description:
      "Built production features for platform serving 80,000+ users, including inventory management, cashier operations, caregiver scheduling, and attendance tracking.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "JWT",
      "GCS",
      "Prisma",
    ],
    responsibilities: [
      "Built production features for platform serving 80,000+ users, including inventory management, cashier operations, caregiver scheduling, and attendance tracking",
      "Migrated application to Next.js App Router, improving routing and server-side rendering for performance",
      "Developed secure auth system using JWT, and RBAC with middleware guards and session monitoring",
      "Created reusable UI component library including several features",
      "Architected secure document upload system using GCS with signed URLs for time-limited access control",
      "Mentored a junior intern on repository hygiene, version control workflows, and UI/UX quality standards",
      "Delivered 55+ incremental builds with documented release notes and participated in client-facing UAT demonstrations",
    ],
  },
  {
    id: "docq",
    company: "DOC-Q - Online Doctor Bookings",
    href: "https://docq.com",
    badges: ["Volunteer"],
    location: "Remote",
    title: "Software Developer - Web",
    logoUrl: "/images/companies/docq.png",
    start: "March 2024",
    end: "June 2024",
    description:
      "Online doctor bookings and consultation service provider. Implemented a location-based feature to search for doctors, improving service discoverability and overall user experience.",
    technologies: [
      "Node.js",
      "Express.js",
      "Firebase",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    responsibilities: [
      "Implemented a location-based feature to search for doctors, improving service discoverability and overall user experience",
      "Collaborated within a cross-functional team, participating in weekly sync-ups to enhance workflow and team coordination",
      "Utilized Node.js, Express.js, Firebase, HTML, CSS, and JavaScript to deliver features aligned with the company's product goals",
    ],
  },
];

/**
 * Get featured work experience (for homepage preview)
 */
export const getFeaturedExperience = (count: number = 3): WorkExperience[] => {
  return workExperience.slice(0, count);
};

/**
 * Get all work experience
 */
export const getAllExperience = (): WorkExperience[] => {
  return workExperience;
};

export default workExperience;
