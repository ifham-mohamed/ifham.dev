"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes";

/**
 * next-themes declares `ThemeProviderProps extends React.PropsWithChildren`,
 * but that resolves without a `children` key against @types/react 19, so
 * destructuring `children` here was a type error before this fix.
 *
 * Declaring children explicitly is resilient either way: if next-themes
 * repairs its own types the intersection is simply redundant, not wrong.
 */
type ThemeProviderProps = NextThemeProviderProps & {
  children: React.ReactNode;
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default ThemeProvider;
