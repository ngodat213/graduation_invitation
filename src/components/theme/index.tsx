'use client'

import { type ReactNode, createContext, useContext } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme?: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light' })

export function ThemeProvider({
  children,
  theme = 'light',
}: {
  children: ReactNode
  theme?: Theme
}) {
  return (
    <ThemeContext.Provider value={{ theme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
