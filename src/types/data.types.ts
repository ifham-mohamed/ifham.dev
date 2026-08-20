import { LucideIcon } from "lucide-react";
import { ComponentType, ReactNode } from "react";

// ============================================
// Personal Information Types
// ============================================
export interface PersonalInfo {
  name: string;
  initials: string;
  title: string;
  url: string;
  location: string;
  locationLink: string;
  phone: string;
  email: string;
  description: string;
  summary: string;
  avatarUrl: string;
}

// ============================================
// Skills Types
// ============================================
export interface Skill {
  name: string;
  icon?: ComponentType<{ className?: string }>;
  category: SkillCategory;
}

export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "databases"
  | "cloud"
  | "architecture"
  | "integrations"
  | "domain";

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

// ============================================
// Social Links Types
// ============================================
export interface SocialLink {
  name: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
  navbar: boolean;
}

export interface SocialLinks {
  [key: string]: SocialLink;
}

// ============================================
// Experience Types
// ============================================

/**
 * A metric the data explicitly attributes to ONE role.
 *
 * Only add an entry here when the number appears inside that role's own
 * `description` or `responsibilities`. Career-level figures that live in
 * `personalInfo.summary` belong to the hero's evidence strip, not to a role —
 * attributing them to whichever job looks most plausible would be inventing
 * ownership the data does not establish.
 */
export interface RoleMetric {
  /** The figure, rendered in mono tabular numerals. */
  value: string;
  /** What it counts, in a few words. */
  label: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  href: string;
  /** Employment type — "Internship", "Volunteer", etc. */
  badges: string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
  technologies?: string[];
  /** The full list. Consumed by the CV and long-form surfaces. */
  responsibilities?: string[];
  /**
   * The 2–4 bullets shown on the site, as a verbatim subset of
   * `responsibilities` — selected, never reworded, so the displayed claim is
   * always identical to the recorded one.
   */
  highlights?: readonly string[];
  /** Metrics this role owns. See RoleMetric. */
  metrics?: readonly RoleMetric[];
}

// ============================================
// Project Types
// ============================================
export interface ProjectLink {
  type:
    | "Website"
    | "Source"
    | "Demo"
    | "Documentation"
    | "Live"
    | "Report"
    | "Case Study"
    | "Testing Guide";
  href: string;
  icon: ReactNode;
}

/**
 * A single architecture / data-flow diagram for a project.
 * `diagram` holds Mermaid source (text, version-controlled).
 * `steps` is an optional numbered fallback/supplement to the diagram.
 */
export interface ProjectFlow {
  diagram?: string;
  caption?: string;
  steps?: readonly string[];
}

/** A real blocker and how it was resolved. */
export interface ProjectChallenge {
  challenge: string;
  resolution: string;
}

/**
 * Canonical project schema (single source of truth).
 *
 * The CV consumes the SHORT slice (oneLiner + headline outcome + conceptsLearned),
 * the website renders the FULL slice (every field below). Describe each project
 * once, here, and both surfaces stay in sync.
 */
/**
 * Which technical motif stands in for a screenshot on the homepage card.
 *
 * These are abstract diagrams built from what the project actually is — a
 * tenant topology, a deploy pipeline, a device matrix, an entity schema — not
 * mock application UI. Faking a screenshot would misrepresent the work; a
 * gradient would say nothing. Pick the one that matches the system, and if
 * `image` is set the real screenshot wins over the motif.
 */
/** One headline figure in the case-study evidence strip. */
export interface ProjectEvidenceItem {
  /** "18", "~210", "Production". Rendered in mono at 24–32px. */
  value: string;
  /** Two or three words naming what the figure counts. */
  label: string;
  /** Optional muted line giving the figure its context. */
  detail?: string;
}

export type ProjectVisual =
  | "topology" // many tenants / roles around a shared core
  | "pipeline" // staged build and deploy flow
  | "devices" // one codebase across several viewports
  | "schema" // related tables and records
  | "signal"; // hardware / IoT output

export interface Project {
  // --- identity / listing ---
  id: string;
  title: string;
  href: string;
  dates: string;
  active: boolean;
  featured?: boolean;
  image?: string;
  video?: string;
  /** Motif used on the homepage card when no screenshot exists. */
  visual?: ProjectVisual;
  links: ProjectLink[];

  // --- short slice (CV uses these) ---
  /** One sentence: what it does. Drives the CV project line. */
  oneLiner?: string;
  description: string;

  // --- full slice (website case study) ---
  /** Your responsibility + the team/course/client + scope. */
  /**
   * How the work was engaged: Freelance, Group Project, Pet Project and so on.
   * Distinct from `role` — one says what the project was, the other says what
   * he did in it, and a reader wants both.
   */
  projectType?: string;
  /**
   * "1st year project" and similar, where the work maps to a year of study.
   * Only set on the three that genuinely do.
   */
  academicYear?: string;
  role?: string;
  context?: string;
  /** Longer narrative intro (markdown ok). Falls back to description. */
  overview?: string;
  /** The real-world gap, ideally with a number. */
  problem?: string;
  /** Architecture / pipeline, as a Mermaid diagram and/or steps. */
  flow?: ProjectFlow;
  technologies: string[];
  /** What you did deliberately well (testing, RBAC, reproducibility, ...). */
  bestPractices?: readonly string[];
  /** 1-2 real blockers and how you solved them. */
  challenges?: readonly ProjectChallenge[];
  /** Metrics, results, what shipped. */
  outcomes?: readonly string[];
  /**
   * 3–4 headline figures shown as a strip beneath the case-study hero.
   *
   * Every entry must restate a figure already present in this project's own
   * `outcomes`. They are curated by hand rather than parsed at render time:
   * a regex over the outcome prose yields things like "0 Foundation to v9",
   * "5 GB / 1" and "15 x poll", which would be worse than showing nothing.
   *
   * `value` is a string because not all evidence is numeric — "Production" is
   * a legitimate value when the outcome is that something shipped.
   *
   * OMIT THIS FIELD ENTIRELY when a project's outcomes contain no real
   * figures. The component disappears; it does not fall back to invented
   * numbers or to padding the strip with weak entries.
   */
  evidence?: readonly ProjectEvidenceItem[];
  /** Named, searchable concepts recruiters scan. Rendered as badges. */
  conceptsLearned?: readonly string[];
  /**
   * 2–3 short engineering signals for the homepage card.
   *
   * Compressions of this project's own `conceptsLearned`, not new claims:
   * "Multi-tenant SaaS architecture with row-level tenant isolation" becomes
   * "Multi-tenant SaaS". Three or four words each — the homepage card has room
   * for a label, and the full concept list lives in the case study.
   *
   * Never add a signal that is not already asserted in `conceptsLearned`,
   * `outcomes` or `oneLiner` for the same project.
   */
  signals?: readonly string[];
  /** Kept for back-compat: rendered as "Highlights". */
  responsibilities?: readonly string[];
}

// ============================================
// Education Types
// ============================================
export interface Education {
  id: string;
  school: string;
  href: string;
  degree: string;
  field?: string;
  logoUrl: string;
  start: string;
  end: string;
  cgpa?: string;
  courses?: string[];
  achievements?: string[];
}

// ============================================
// Activity Types
// ============================================

/**
 * The kind of initiative an activity represents.
 *
 * Three buckets, not five: a label per item would classify nothing. Assign
 * from the activity's own `role` and `description` — "Coordinator" and
 * "Ambassador" are what make something Leadership or Community, not a guess
 * about how impressive it sounds.
 */
export type ActivityCategory = "Open source" | "Leadership" | "Community";

export interface Activity {
  id: string;
  title: string;
  organization: string;
  role: string;
  /** Which kind of initiative this is. See ActivityCategory. */
  category?: ActivityCategory;
  href?: string;
  logoUrl?: string;
  start: string;
  end: string;
  description?: string;
}

// ============================================
// Hackathon Types
// ============================================
export interface Hackathon {
  id: string;
  title: string;
  dates: string;
  location: string;
  description: string;
  image: string;
  mlh?: string;
  win?: string;
  links: HackathonLink[];
}

export interface HackathonLink {
  title: string;
  icon: ReactNode;
  href: string;
}

// ============================================
// Navigation Types
// ============================================
export interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  social: SocialLinks;
}
