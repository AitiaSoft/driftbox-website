'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

interface SectionTrackerProps {
  sectionName: string
  children: ReactNode
}

export default function SectionTracker({ sectionName, children }: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const tracked = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || tracked.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true
          trackEvent('section_view', { section_name: sectionName })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionName])

  return <div ref={ref}>{children}</div>
}
