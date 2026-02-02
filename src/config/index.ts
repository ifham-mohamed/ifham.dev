// Site Configuration
export {
  siteConfig,
  type SiteConfig,
  default as SiteConfigDefault,
} from "./site.config";

// Navigation Configuration
export {
  mainNavItems,
  dockNavItems,
  footerNavItems,
  default as NavigationConfig,
} from "./navigation.config";

// SEO Configuration
export {
  defaultMetadata,
  generatePageMetadata,
  generateBlogMetadata,
  default as SEOConfig,
} from "./seo.config";
