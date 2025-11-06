"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { themes, type ThemeKey, type Theme, defaultTheme } from "~/lib/themes"

interface ThemeContextType {
  currentTheme: ThemeKey
  theme: Theme
  setTheme: (theme: ThemeKey) => void
  availableThemes: typeof themes
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(defaultTheme)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("website-navigator-theme") as ThemeKey
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const setTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme)
    localStorage.setItem("website-navigator-theme", theme)
  }

  const value: ThemeContextType = {
    currentTheme,
    theme: themes[currentTheme],
    setTheme,
    availableThemes: themes,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
