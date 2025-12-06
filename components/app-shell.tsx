"use client"

import React from "react"
import { ThemeProvider } from "./theme-provider"
import { Header } from "./header"
import { Footer } from "./footer"

// simple client-only app shell — mounts only in the browser so NextThemes won't affect SSR HTML
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  )
}