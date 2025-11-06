"use client"

import { Sun, Moon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { useDarkMode } from "~/lib/contexts/dark-mode-provider"

interface DarkModeSwitcherProps {
  dict?: Record<string, unknown>
}

export default function DarkModeSwitcher({ dict }: DarkModeSwitcherProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleDarkMode}
      className="rounded-full gap-2 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
      title={isDarkMode ? "switch to light mode" : "switch to dark mode"}
    >
      {isDarkMode ? (
        <>
          <Moon className="h-4 w-4" />
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
        </>
      )}
    </Button>
  )
}
