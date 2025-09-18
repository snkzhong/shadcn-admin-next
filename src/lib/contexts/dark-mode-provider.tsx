"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface DarkModeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const prefix = process.env.NEXT_PUBLIC_LOCAL_VAR_PREFIX;
  const saveKey = prefix + "dark-mode";

  useEffect(() => {
    // Load dark mode settings from localStorage
    const savedMode = localStorage.getItem(saveKey);
    if (savedMode !== null) {
      setIsDarkMode(savedMode === "true")
    } else {
      // Check system preferences
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem(saveKey, newMode.toString())
  }

  const value: DarkModeContextType = {
    isDarkMode,
    toggleDarkMode,
  }

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider")
  }
  return context
}
