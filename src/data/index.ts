// Personal Information
export { personalInfo, default as PersonalData } from "./personal.data";

// Social Links
export {
  socialLinks,
  getNavbarSocialLinks,
  getAllSocialLinks,
  default as SocialData,
} from "./social.data";

// Skills
export {
  skills,
  featuredSkills,
  skillCategoryLabels,
  getSkillsByCategory,
  getSkillNames,
  default as SkillsData,
} from "./skills.data";

// Work Experience
export {
  workExperience,
  workExperience as experiences,
  getFeaturedExperience,
  getAllExperience,
  default as ExperienceData,
} from "./experience.data";

// Projects
export {
  projects,
  getFeaturedProjects,
  getAllProjects,
  getProjectById,
  getActiveProjects,
  default as ProjectsData,
} from "./projects.data";

// Education
export {
  education,
  getAllEducation,
  getEducationById,
  default as EducationData,
} from "./education.data";

// Activities & Hackathons
export {
  activities,
  activities as hackathons,
  getAllActivities,
  getActivitiesByOrganization,
  getCurrentActivities,
  default as ActivitiesData,
} from "./activities.data";
