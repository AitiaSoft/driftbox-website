'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from './ScrollReveal'
import { trackEvent } from '@/lib/analytics'
import { captureUtmParams, getUtmParams } from '@/lib/utm'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    captureUtmParams()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    trackEvent('hero_cta_click', { cta_text: 'Get Early Access' })

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'hero', ...getUtmParams() })
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        trackEvent('waitlist_signup', { source: 'hero', ...getUtmParams() })
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        const errorData = await response.json()
        console.error('Waitlist signup error:', errorData)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Network error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden">
      {/* Atmospheric gradient orbs */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-drift-primary/8 dark:bg-drift-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-drift-secondary/5 dark:bg-drift-secondary/8 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-[5%] right-[10%] w-[350px] h-[350px] bg-drift-accent/5 dark:bg-drift-accent/6 rounded-full blur-[100px] -z-10 animate-glow-pulse" />

      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 mb-10 rounded-full bg-drift-primary/8 dark:bg-drift-primary/10 border border-drift-primary/15 dark:border-drift-primary/20 text-sm text-drift-primary shimmer-badge">
            <span className="w-2 h-2 bg-drift-success rounded-full animate-pulse-slow"></span>
            Early Access — Limited Spots
          </div>
        </ScrollReveal>

        {/* Hero Title */}
        <ScrollReveal delay={100}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-drift-text">
            Your team made 47 decisions last week.<br />
            <span className="gradient-text">How many did you actually capture?</span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-drift-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Teams lose decisions, deadlines, and follow-ups across email, Slack, Teams, and WhatsApp every day.
            DriftBox uses AI to make sure nothing important drifts away.
          </p>
        </ScrollReveal>

        {/* CTA Form */}
        <ScrollReveal delay={300}>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div className="flex gap-3 p-1.5 rounded-xl bg-drift-card border border-drift-border shadow-lg shadow-drift-border/30">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-transparent text-drift-text placeholder:text-drift-muted/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`px-7 py-3.5 rounded-xl font-semibold transition-all ${
                  status === 'success'
                    ? 'bg-drift-success text-white'
                    : status === 'error'
                    ? 'bg-drift-danger text-white'
                    : 'bg-drift-primary text-white shadow-lg shadow-drift-primary/25 hover:bg-drift-primary-hover hover:shadow-drift-primary/40'
                }`}
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'You\'re In!' : status === 'error' ? 'Error' : 'Get Early Access'}
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center gap-2 mb-6 mt-4">
            <div className="flex items-center gap-2 text-sm text-drift-muted">
              <svg className="w-4 h-4 text-drift-success flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              Free during early access. No credit card ever.
            </div>
            <div className="flex items-center gap-2 text-sm text-drift-muted">
              <svg className="w-4 h-4 text-drift-success flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              Direct access to the founder
            </div>
            <div className="flex items-center gap-2 text-sm text-drift-muted">
              <svg className="w-4 h-4 text-drift-success flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              Shape the product with your feedback
            </div>
          </div>
          <p className="text-sm text-drift-muted/70">Built for teams juggling 3+ communication tools.</p>
        </ScrollReveal>

        {/* App Preview */}
        <ScrollReveal delay={400}>
          <div className="mt-20 max-w-5xl mx-auto relative">
            {/* Glow effect under the mockup */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-drift-primary/10 dark:bg-drift-primary/15 rounded-full blur-[80px] -z-10" />

            <div className="bg-drift-bg rounded-xl border border-drift-border shadow-2xl shadow-black/20 dark:shadow-black/30 overflow-hidden glow-primary">
              {/* Browser Chrome */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-drift-surface border-b border-drift-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-drift-muted">app.driftbox.ai</span>
              </div>

              {/* App Content */}
              <div className="flex">
                {/* Sidebar */}
                <div className="w-52 py-4 border-r border-drift-border hidden md:flex flex-col bg-drift-surface">
                  <div className="px-5 mb-5">
                    <div className="flex items-center gap-2">
                      <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="10" fill="#6C5CE7"/>
                        <path d="M12 14C12 12.8954 12.8954 12 14 12H22C23.1046 12 24 12.8954 24 14V20C24 21.1046 23.1046 22 22 22H16L13 25V22H14C12.8954 22 12 21.1046 12 20V14Z" fill="white" opacity="0.9"/>
                        <path d="M16 18C16 16.8954 16.8954 16 18 16H26C27.1046 16 28 16.8954 28 18V24C28 25.1046 27.1046 26 26 26H25V29L22 26H18C16.8954 26 16 25.1046 16 24V18Z" fill="white" opacity="0.6"/>
                      </svg>
                      <div>
                        <span className="text-sm font-bold text-drift-text">DriftBox</span>
                        <span className="block text-[10px] text-drift-muted leading-tight">Communication Intelligence</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 space-y-4 flex-1">
                    <div>
                      <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-drift-muted/60">Overview</span>
                      <div className="mt-1.5 space-y-0.5">
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-drift-primary/10 text-drift-primary text-sm font-medium">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                          Dashboard
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-drift-muted text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          Search
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-drift-muted/60">Intelligence</span>
                      <div className="mt-1.5 space-y-0.5">
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-drift-muted text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                          Summaries
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-drift-muted text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                          Tasks
                          <span className="ml-auto text-[10px] bg-drift-warning/15 text-drift-warning px-1.5 py-0.5 rounded-full font-medium">3</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-drift-muted/60">People</span>
                      <div className="mt-1.5 space-y-0.5">
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-drift-muted text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                          Contacts
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-drift-muted/60">Data Sources</span>
                      <div className="mt-1.5 space-y-0.5">
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-drift-muted text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                          Accounts
                          <span className="ml-auto text-[10px] bg-drift-success/15 text-drift-success px-1.5 py-0.5 rounded-full font-medium">4</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 pt-3 mt-auto border-t border-drift-border">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-drift-muted text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                      AI Chat
                    </div>
                  </div>
                </div>

                {/* Main area */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-drift-border">
                    <span className="text-sm font-semibold text-drift-text">Dashboard</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-drift-success">
                        <span className="w-1.5 h-1.5 bg-drift-success rounded-full animate-pulse-slow"></span>
                        Synced
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-drift-card border border-drift-border rounded-lg text-xs text-drift-muted">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Search...
                        <kbd className="ml-1 px-1 py-0.5 bg-drift-hover rounded text-[10px] text-drift-muted font-mono">&#8984;K</kbd>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-3">
                    <div className="bg-drift-card border border-drift-border rounded-xl p-4 hover:border-drift-primary/30 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-lg bg-drift-danger/15 text-drift-danger font-medium">Action Required</span>
                        <span className="ml-auto text-[10px] text-drift-muted">2h ago</span>
                      </div>
                      <h4 className="text-sm font-semibold mb-1 text-drift-text">Q1 Budget Approval</h4>
                      <p className="text-xs text-drift-muted mb-2.5 leading-relaxed">Sarah mentioned in Slack that the CFO needs your sign-off by Friday. Related email from finance@company.com.</p>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#EA4335]/15 text-[#EA4335] font-medium">Gmail</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#6264A7]/15 text-[#6264A7] font-medium">Slack</span>
                      </div>
                    </div>
                    <div className="bg-drift-card border border-drift-border rounded-xl p-4 hover:border-drift-primary/30 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-lg bg-drift-success/15 text-drift-success font-medium">Decision Made</span>
                        <span className="ml-auto text-[10px] text-drift-muted">Yesterday</span>
                      </div>
                      <h4 className="text-sm font-semibold mb-1 text-drift-text">New Vendor Selection</h4>
                      <p className="text-xs text-drift-muted mb-2.5 leading-relaxed">Team agreed on Vendor B in yesterday&apos;s Teams call. Contract details shared via WhatsApp by Mike.</p>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#6264A7]/15 text-[#6264A7] font-medium">Teams</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#25D366]/15 text-[#25D366] font-medium">WhatsApp</span>
                      </div>
                    </div>
                    <div className="bg-drift-card border border-drift-border rounded-xl p-4 hover:border-drift-primary/30 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-lg bg-drift-warning/15 text-drift-warning font-medium">Follow Up</span>
                        <span className="ml-auto text-[10px] text-drift-muted">3 days</span>
                      </div>
                      <h4 className="text-sm font-semibold mb-1 text-drift-text">Client Proposal Response</h4>
                      <p className="text-xs text-drift-muted mb-2.5 leading-relaxed">Acme Corp hasn&apos;t replied in 3 days. Last touchpoint was your email on Monday. Consider a follow-up.</p>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#EA4335]/15 text-[#EA4335] font-medium">Gmail</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
