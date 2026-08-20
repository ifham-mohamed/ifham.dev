// Personal Information
export { personalInfo, default as PersonalData } from "./personal.data";

// Headline metrics (surfaced in the hero)
export { metrics, default as MetricsData } from "./metrics.data";
export type { Metric } from "./metrics.data";

// About copy and focus areas
export { aboutParagraphs, focusAreas } from "./about.data";
export type { FocusArea } from "./about.data";

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
  getCoreSkillNames,
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
  getPublicRepos,
  default as ProjectsData,
} from "./projects.data";
export type { PublicRepo } from "./projects.data";

// Search-focused expertise pages and their project/article relationships
export {
  expertisePages,
  getExpertiseBySlug,
  getExpertiseForProject,
  getExpertiseForArticle,
  default as ExpertiseData,
} from "./expertise.data";
export type {
  ExpertiseCapability,
  ExpertisePage,
  ExpertiseQuestion,
} from "./expertise.data";

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

// External writing (Medium)
export {
  mediumPosts,
  getRecentMediumPosts,
  default as MediumPostsData,
} from "./medium-posts.data";
export type { MediumPost } from "./medium-posts.data";

// Research programme and detailed Module 1 dossier
export {
  enigmatrixResearch,
  moduleOneResearch,
  researchDiagrams,
  default as ResearchData,
} from "./research.data";
export type {
  ResearchDiagramKind,
  ResearchMetric,
  ResearchModule,
  ResearchStatus,
} from "./research.data";
