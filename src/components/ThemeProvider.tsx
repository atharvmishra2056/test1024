import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * Provides the theme context to the application from next-themes.
 * This component wraps the entire app and allows for theme switching (light/dark).
 * @param {ThemeProviderProps} props - The props for the theme provider.
 * @returns {React.ReactElement} The theme provider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
