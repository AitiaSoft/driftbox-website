'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg p-1">
        <div className="w-8 h-8" />
        <div className="w-8 h-8" />
        <div className="w-8 h-8" />
      </div>
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg p-1">
      {/* Light mode button */}
      <button
        onClick={() => setTheme('light')}
        className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
          theme === 'light'
            ? 'bg-indigo-600 text-white'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
        }`}
        aria-label="Light mode"
        title="Light mode"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
        </svg>
      </button>

      {/* Dark mode button */}
      <button
        onClick={() => setTheme('dark')}
        className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
          theme === 'dark'
            ? 'bg-indigo-600 text-white'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
        }`}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      {/* System mode button */}
      <button
        onClick={() => setTheme('system')}
        className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
          theme === 'system'
            ? 'bg-indigo-600 text-white'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
        }`}
        aria-label="System mode"
        title="System mode"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </button>
    </div>
  )
}
