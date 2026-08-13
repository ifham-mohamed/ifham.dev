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
 *
 * ── Order: newest start date first ──
 *
 * This array is the display order everywhere — the /projects directory, the
 * homepage selection, and the previous/next pagination at the foot of every
 * case study. Sorting is done here, once, rather than at render time: the
 * `dates` field is a human string ("Sep 2025 - Dec 2025", "Present"), not a
 * parseable date, so a runtime sort would mean writing a month parser and
 * keeping it correct for every format anyone ever types.
 *
 * Keep the comment beside each entry in step when adding a project.
 */
export const projects: Project[] = [
  // TODO(confirm): placed first on the strength of the "Jul 2026" start in the
  // project list. Its own `dates` field still reads "2025" pending the check
  // noted in dynapos.tsx — if the earlier date is right, this moves down to
  // sit beside pharmaconnect.
  dynapos, //           Jul 2026 - Present
  schoolManagement, //  Jun 2026 - Jun 2026
  unifixz, //           Apr 2026 - Jul 2026
  promptCopilot, //     Feb 2026 - Mar 2026
  xPos, //              Feb 2026 - Feb 2026
  attendify, //         Jan 2026 - Mar 2026
  totalSupply, //       Nov 2025 - Jan 2026
  samwoostore, //       Sep 2025 - Dec 2025
  pharmaconnect, //     Jan 2025 - Apr 2025
  ragRelease, //        Oct 2024 - Jan 2025
  internify, //         Jun 2024 - Sep 2024
  masterBlogmium, //    Mar 2024 - May 2024
  masterTodo, //        Dec 2023 - Jan 2024
  welfareSystem, //     Oct 2023 - Jul 2024
  povGlobe, //          Jul 2023 - Jun 2024
];

export const getFeaturedProjects = (count: number = 4): Project[] =>
  projects.filter((p) => p.featured).slice(0, count);

export const getAllProjects = (): Project[] => projects;

/** A public repository already referenced by a project's "Source" link. */
export interface PublicRepo {
  projectId: string;
  /** Project name with any " - Subtitle" removed. */
  projectName: string;
  href: string;
  owner: string;
  name: string;
  /** Owned by the personal account rather than a team/org account. */
  isPersonal: boolean;
  featured: boolean;
}

/** Matches `github.com/owner/repo`, deliberately NOT `github.com/org`. */
const GITHUB_REPO = /^https?:\/\/github\.com\/([^/]+)\/([^/?#]+)/i;

const PERSONAL_ACCOUNT = "ifham-mohamed";

/**
 * Public repositories, derived from the project data that already exists.
 *
 * The alternative was calling the GitHub API for stars and activity, which
 * would mean a rate-limited network request on every render to decorate a
 * section — and a broken or empty module whenever it failed. Everything here
 * is already in the repo and cannot go stale or 403.
 *
 * Two project "Source" links point at organisation profiles rather than
 * repositories (`github.com/Rag-Release`, `github.com/ITS-Development-Team`).
 * The regex requires an owner AND a repo name so those are excluded — counting
 * them as repositories would overstate the number.
 */
export const getPublicRepos = (): PublicRepo[] =>
  projects.flatMap((project) => {
    const source = project.links?.find((link) => link.type === "Source");
    if (!source) return [];

    const match = source.href.match(GITHUB_REPO);
    if (!match) return [];

    const [, owner, name] = match;
    return [
      {
        projectId: project.id,
        projectName: project.title.split(" - ")[0],
        href: source.href,
        owner,
        name,
        isPersonal: owner.toLowerCase() === PERSONAL_ACCOUNT,
        featured: Boolean(project.featured),
      },
    ];
  });

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);

export const getActiveProjects = (): Project[] => projects.filter((p) => p.active);

export default projects;
