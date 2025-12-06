'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export function NightToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // don't render toggle dome on server to avoid hydration mismatch
  if (!mounted) return null

  const current = resolvedTheme ?? theme

  const toggle = () => {
    // preserve the current theme as the "light" theme to restore later
    try {
      if (current !== 'dark') {
        localStorage.setItem('olshani:light-theme', (current ?? 'light'))
        setTheme('dark')
      } else {
        const saved = localStorage.getItem('olshani:light-theme') || 'light'
        setTheme(saved)
      }
    } catch {
      // ignore storage errors
      setTheme(current === 'dark' ? 'light' : 'dark')
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle night mode"
      onClick={toggle}
      className="inline-flex items-center justify-center p-2 rounded-md hover:bg-muted/60 transition"
    >
      {current === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}