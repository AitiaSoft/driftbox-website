'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { trackEvent } from '@/lib/analytics'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-drift-bg/70 backdrop-blur-xl border-b border-drift-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="#6C5CE7"/>
              <path d="M12 14C12 12.8954 12.8954 12 14 12H22C23.1046 12 24 12.8954 24 14V20C24 21.1046 23.1046 22 22 22H16L13 25V22H14C12.8954 22 12 21.1046 12 20V14Z" fill="white" opacity="0.9"/>
              <path d="M16 18C16 16.8954 16.8954 16 18 16H26C27.1046 16 28 16.8954 28 18V24C28 25.1046 27.1046 26 26 26H25V29L22 26H18C16.8954 26 16 25.1046 16 24V18Z" fill="white" opacity="0.6"/>
            </svg>
            <span className="text-xl font-bold tracking-tight text-drift-text">DriftBox</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm text-drift-muted hover:text-drift-text transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm text-drift-muted hover:text-drift-text transition-colors">
              How It Works
            </Link>
            <Link href="/#who-its-for" className="text-sm text-drift-muted hover:text-drift-text transition-colors">
              Who It&apos;s For
            </Link>
            <Link href="/blog" className="text-sm text-drift-muted hover:text-drift-text transition-colors">
              Blog
            </Link>
            <Link href="/#pricing" className="text-sm text-drift-muted hover:text-drift-text transition-colors">
              Pricing
            </Link>
            <ThemeToggle />
            <Link
              href="/#waitlist"
              onClick={() => trackEvent('nav_cta_click', { location: 'desktop' })}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-drift-primary text-white shadow-md shadow-drift-primary/20 hover:bg-drift-primary-hover hover:shadow-drift-primary/30 transition-all"
            >
              Get Early Access
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-drift-text rounded transition-transform"></span>
            <span className="w-6 h-0.5 bg-drift-text rounded transition-transform"></span>
            <span className="w-6 h-0.5 bg-drift-text rounded transition-transform"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 space-y-4">
            <Link href="/#features" className="block text-drift-muted hover:text-drift-text">Features</Link>
            <Link href="/#how-it-works" className="block text-drift-muted hover:text-drift-text">How It Works</Link>
            <Link href="/#who-its-for" className="block text-drift-muted hover:text-drift-text">Who It&apos;s For</Link>
            <Link href="/blog" className="block text-drift-muted hover:text-drift-text">Blog</Link>
            <Link href="/#pricing" className="block text-drift-muted hover:text-drift-text">Pricing</Link>
            <div className="pt-2">
              <ThemeToggle />
            </div>
            <Link href="/#waitlist" onClick={() => trackEvent('nav_cta_click', { location: 'mobile' })} className="block px-5 py-2.5 text-sm font-semibold rounded-xl bg-drift-primary text-white text-center shadow-md shadow-drift-primary/20">
              Get Early Access
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
