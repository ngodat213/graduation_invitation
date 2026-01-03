'use client'

import Lenis from 'lenis'
import { type ReactNode, useEffect, useRef } from 'react'

interface LenisProviderProps {
  children: ReactNode
  options?: {
    lerp?: number
    duration?: number
    smoothWheel?: boolean
  }
}

export function LenisProvider({
  children,
  options = {},
}: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: options.lerp ?? 0.1,
      duration: options.duration ?? 1.2,
      smoothWheel: options.smoothWheel ?? true,
    })

    lenisRef.current = lenis

    // Request Animation Frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [options.lerp, options.duration, options.smoothWheel])

  return <>{children}</>
}
