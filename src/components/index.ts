// Common Components
export * from "./common";

// UI Components (Shadcn)
export * from "./ui";

// Magic UI Components
export * from "./magicui";

// Icons
export * from "./icons";

// Providers
export * from "./providers";

// MDX Components
export * from "./mdx";

// Feature Sections
export * from "./home";
export * from "./skills";
export * from "./experience";
export * from "./education";
export * from "./projects";
export * from "./activities";
export * from "./contact";
export * from "./blog";

// Re-export legacy components for backward compatibility
export { default as Navbar } from "./common/navbar";
export { ModeToggle } from "./common/theme-toggle";
export { ThemeProvider } from "./providers/theme-provider";
