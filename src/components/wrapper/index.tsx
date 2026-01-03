'use client'

import { type ReactNode } from 'react'
import { LenisProvider } from '~/components/lenis'
import { ThemeProvider } from '~/components/theme'

interface WrapperProps {
  children: ReactNode
  theme?: 'light' | 'dark'
  onPreloaderComplete?: () => void
}

export function Wrapper({
  children,
  theme = 'light',
  onPreloaderComplete,
}: WrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      <LenisProvider>
        {children}
      </LenisProvider>
    </ThemeProvider>
  )
}
