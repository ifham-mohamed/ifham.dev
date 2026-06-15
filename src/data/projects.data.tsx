import type { Project } from "@/types";
import { totalSupply } from "./projects/total-supply";
import { pharmaconnect } from "./projects/pharmaconnect";
import { unifixz } from "./projects/unifixz";
import { dynapos } from "./projects/dynapos";
import { xPos } from "./projects/x-pos";
import { attendify } from "./projects/attendify";
import { samwoostore } from "./projects/samwoostore";
import { promptCopilot } from "./projects/prompt-copilot";
import { ragRelease } from "./projects/rag-release";
import { welfareSystem } from "./projects/welfare-system";
import { internify } from "./projects/internify";
import { povGlobe } from "./projects/pov-globe";
import { schoolManagement } from "./projects/school-management";
import { masterBlogmium } from "./projects/master-blogmium";
import { masterTodo } from "./projects/master-todo";

/**
 * Projects Data — aggregator. Each project lives in src/data/projects/<id>.tsx
 * (one file per project so no single file hits the editor write-cap).
 * The CV reads the short slice; /projects/[slug] renders the full case study.
 */
export const projects: Project[] = [
  totalSupply,
  pharmaconnect,
  unifixz,
  dynapos,
  xPos,
  attendify,
  samwoostore,
  promptCopilot,
  ragRelease,
  welfareSystem,
  internify,
  povGlobe,
  schoolManagement,
  masterBlogmium,
  masterTodo,
];

export const getFeaturedProjects = (count: number = 4): Project[] =>
  projects.filter((p) => p.featured).slice(0, count);

export const getAllProjects = (): Project[] => projects;

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);

export const getActiveProjects = (): Project[] => projects.filter((p) => p.active);

export default projects;
