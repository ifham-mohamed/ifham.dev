// Site Configuration
export {
  siteConfig,
  type SiteConfig,
  default as SiteConfigDefault,
} from "./site.config";

// Navigation Configuration
export {
  mainNavItems,
  sectionAnchors,
  default as NavigationConfig,
} from "./navigation.config";

// SEO Configuration
export {
  defaultMetadata,
  generatePageMetadata,
  generateBlogMetadata,
  default as SEOConfig,
} from "./seo.config";

// Semantic colours for renderers that cannot consume CSS custom properties.
export {
  themePalette,
  type ThemePalette,
  default as ThemePaletteDefault,
} from "./theme.config";
