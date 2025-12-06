'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // client-only theme handling. disable color-scheme injection and do not set defaultTheme
  return (
    <NextThemesProvider
      attribute="class"
      enableSystem={true}
      enableColorScheme={false}
      storageKey="olshani:theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
