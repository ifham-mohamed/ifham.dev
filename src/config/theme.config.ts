/**
 * Semantic colour contract for non-CSS renderers.
 *
 * The matching CSS custom properties live in app/globals.css. Mermaid,
 * favicons and Open Graph images cannot resolve those browser variables, so
 * they consume this typed mirror rather than inventing one-off colours.
 */
export const themePalette = {
  light: {
    background: "#F7F8FA",
    surface: "#FFFFFF",
    surfaceRaised: "#F1F3F5",
    text: "#111318",
    textSecondary: "#5F6672",
    textSubtle: "#7B8290",
    border: "#E1E5EA",
    borderStrong: "#C9CED6",
    accent: "#3F5BD8",
    accentHover: "#304BC4",
    accentSurface: "#EDF1FF",
    success: "#16794A",
    warning: "#A15C00",
    error: "#C5393F",
  },
  dark: {
    background: "#0B0D10",
    surface: "#111419",
    surfaceRaised: "#171B21",
    text: "#F4F6F8",
    textSecondary: "#A1A8B3",
    textSubtle: "#7E8794",
    border: "#252A31",
    borderStrong: "#363C45",
    accent: "#8AA4FF",
    accentHover: "#A2B6FF",
    accentSurface: "#18213B",
    success: "#54D391",
    warning: "#F1B557",
    error: "#FF858A",
  },
} as const;

export type ThemePalette = typeof themePalette;

export default themePalette;
