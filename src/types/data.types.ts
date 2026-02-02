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
  icon: ComponentType<{ className?: string }>;
  category: SkillCategory;
}

export type SkillCategory =
  | "languages"
  | "frameworks"
  | "web"
  | "databases"
  | "devops"
  | "tools";

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
export interface WorkExperience {
  id: string;
  company: string;
  href: string;
  badges: string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
  technologies?: string[];
  responsibilities?: string[];
}

// ============================================
// Project Types
// ============================================
export interface ProjectLink {
  type: "Website" | "Source" | "Demo" | "Documentation" | "Live";
  href: string;
  icon: ReactNode;
}

export interface Project {
  id: string;
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  image?: string;
  video?: string;
  role?: string;
  featured?: boolean;
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
export interface Activity {
  id: string;
  title: string;
  organization: string;
  role: string;
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
