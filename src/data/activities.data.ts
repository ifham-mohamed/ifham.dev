import type { Activity } from "@/types";

/**
 * Activities & Volunteer Data
 * Update this file to add/modify your activities and volunteer work
 */
export const activities: Activity[] = [
  {
    id: "sef-global",
    title: "Open Source Contributor",
    organization: "SEF Global",
    role: "Front-end & Back-end Contributor",
    href: "https://sefglobal.org",
    logoUrl: "/images/activities/sef.png",
    start: "2022",
    end: "Present",
    description:
      "Contributing to open source projects, working on both frontend and backend development.",
  },
  {
    id: "hacktoberfest",
    title: "Hacktoberfest Participant",
    organization: "Hacktoberfest",
    role: "Participant",
    href: "https://hacktoberfest.com",
    logoUrl: "/images/activities/hacktoberfest.png",
    start: "Fall 2022",
    end: "2024",
    description:
      "Active participant in Hacktoberfest 2022, 2023, and 2024, contributing to various open source projects.",
  },
  {
    id: "mlsa",
    title: "Microsoft Learn Student Ambassador",
    organization: "Microsoft",
    role: "Student Ambassador",
    href: "https://studentambassadors.microsoft.com",
    logoUrl: "/images/activities/microsoft.png",
    start: "2023",
    end: "2024",
    description:
      "Represented Microsoft in university, promoting learning resources and organizing tech events.",
  },
  {
    id: "fit-career-fair",
    title: "FIT Career Fair",
    organization: "Faculty of Information Technology",
    role: "Company Coordinator",
    start: "2024",
    end: "2024",
    description:
      "Coordinated with companies for the annual career fair, facilitating connections between students and employers.",
  },
  {
    id: "ieee",
    title: "IEEE Student Branch",
    organization: "University of Moratuwa",
    role: "Member/Coordinator",
    href: "https://ieee.org",
    logoUrl: "/images/activities/ieee.png",
    start: "2022",
    end: "2023",
    description:
      "Active member and coordinator of IEEE Student Branch, organizing technical workshops and events.",
  },
];

/**
 * Get all activities
 */
export const getAllActivities = (): Activity[] => {
  return activities;
};

/**
 * Get activities by organization
 */
export const getActivitiesByOrganization = (org: string): Activity[] => {
  return activities.filter((a) =>
    a.organization.toLowerCase().includes(org.toLowerCase())
  );
};

/**
 * Get current/ongoing activities
 */
export const getCurrentActivities = (): Activity[] => {
  return activities.filter(
    (a) => a.end === "Present" || a.end === new Date().getFullYear().toString()
  );
};

export default activities;
