import {
  HomeIcon,
  NotebookIcon,
  FolderIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import type { NavItem } from "@/types";

/**
 * Navigation Configuration
 * Configure your site navigation here
 */

// Main navigation items (shown in navbar)
export const mainNavItems: NavItem[] = [
  {
    href: "/",
    icon: HomeIcon,
    label: "Home",
  },
  {
    href: "/about",
    icon: UserIcon,
    label: "About",
  },
  {
    href: "/projects",
    icon: FolderIcon,
    label: "Projects",
  },
  {
    href: "/experience",
    icon: BriefcaseIcon,
    label: "Experience",
  },
  {
    href: "/blog",
    icon: NotebookIcon,
    label: "Blog",
  },
];

// Dock navigation items (shown in floating dock)
export const dockNavItems: NavItem[] = [
  {
    href: "/",
    icon: HomeIcon,
    label: "Home",
  },
  {
    href: "/blog",
    icon: NotebookIcon,
    label: "Blog",
  },
];

// Footer navigation items
export const footerNavItems: NavItem[] = [
  {
    href: "/",
    icon: HomeIcon,
    label: "Home",
  },
  {
    href: "/about",
    icon: UserIcon,
    label: "About",
  },
  {
    href: "/projects",
    icon: FolderIcon,
    label: "Projects",
  },
  {
    href: "/experience",
    icon: BriefcaseIcon,
    label: "Experience",
  },
  {
    href: "/education",
    icon: GraduationCapIcon,
    label: "Education",
  },
  {
    href: "/blog",
    icon: NotebookIcon,
    label: "Blog",
  },
  {
    href: "/contact",
    icon: MailIcon,
    label: "Contact",
  },
];

export default mainNavItems;
