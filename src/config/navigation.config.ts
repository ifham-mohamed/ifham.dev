import { HomeIcon, FolderIcon, NotebookIcon } from "lucide-react";
import type { NavItem } from "@/types";

/**
 * Navigation configuration.
 *
 * These lists previously contained /about, /experience, /education and
 * /contact — none of which have a route. Every entry below resolves to a real
 * page; on-page anchors live in `sectionAnchors`.
 */
export const mainNavItems: NavItem[] = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/projects", icon: FolderIcon, label: "Projects" },
  { href: "/blog", icon: NotebookIcon, label: "Blog" },
];

/**
 * Homepage section anchors, surfaced in the footer.
 *
 * Single source of truth — the footer reads this array rather than keeping its
 * own copy, so adding a section here is the only edit needed. Every `href`
 * matches an `id` that actually exists on the homepage; "Writing" was missing
 * from this list even though `#writing` has been rendered all along.
 */
export const sectionAnchors = [
  { href: "/#work", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/#writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export default mainNavItems;
