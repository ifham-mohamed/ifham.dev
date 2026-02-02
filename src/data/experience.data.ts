import type { WorkExperience } from "@/types";

/**
 * Work Experience Data
 * Update this file to add/modify your work experience
 */
export const workExperience: WorkExperience[] = [
  {
    id: "docq",
    company: "DOC-Q",
    href: "https://docq.com",
    badges: [],
    location: "Remote",
    title: "Software Developer – Web",
    logoUrl: "/images/companies/docq.png",
    start: "March 2024",
    end: "June 2024",
    description:
      "Online doctor bookings and consultation service provider. Implemented a location-based feature to search for doctors, improving service discoverability and overall user experience. Collaborated within a cross-functional team, participating in weekly sync-ups to enhance workflow and team coordination.",
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
