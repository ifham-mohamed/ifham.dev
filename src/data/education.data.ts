import type { Education } from "@/types";

/**
 * Education Data
 * Update this file to add/modify your education history
 */
export const education: Education[] = [
  {
    id: "uom",
    school: "University of Moratuwa",
    href: "https://uom.lk",
    degree: "B.Sc. (Hons) in Information Technology and Management",
    field: "Information Technology and Management",
    logoUrl: "/images/education/uom.png",
    start: "June 2022",
    end: "Present",
    cgpa: "3.5/4.0",
    courses: [
      "Enterprise Application Development",
      "Mobile Application Development",
      "AI & Machine Learning",
      "Object Oriented Analysis",
      "Software Engineering Methodologies",
    ],
    achievements: [],
  },
];

/**
 * Get all education entries
 */
export const getAllEducation = (): Education[] => {
  return education;
};

/**
 * Get education by ID
 */
export const getEducationById = (id: string): Education | undefined => {
  return education.find((e) => e.id === id);
};

export default education;
