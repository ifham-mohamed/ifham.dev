import { Icons } from "@/components/icons";
import type { SocialLink, SocialLinks } from "@/types";

/**
 * Social Links Configuration
 * Update this file to change your social media links
 */
export const socialLinks: SocialLinks = {
  GitHub: {
    name: "GitHub",
    url: "https://github.com/ifham-mohamed",
    icon: Icons.github,
    navbar: true,
  },
  LinkedIn: {
    name: "LinkedIn",
    url: "https://linkedin.com/in/ifham-mohamed",
    icon: Icons.linkedin,
    navbar: true,
  },
  X: {
    name: "X",
    url: "https://twitter.com/ifham_mohamed",
    icon: Icons.x,
    navbar: true,
  },
  Email: {
    name: "Send Email",
    url: "mailto:ifham.info@gmail.com",
    icon: Icons.email,
    navbar: false,
  },
};

/**
 * Get social links that should appear in navbar
 */
export const getNavbarSocialLinks = (): SocialLink[] => {
  return Object.values(socialLinks).filter((link) => link.navbar);
};

/**
 * Get all social links
 */
export const getAllSocialLinks = (): SocialLink[] => {
  return Object.values(socialLinks);
};

export default socialLinks;
