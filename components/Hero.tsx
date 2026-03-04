'use client'

import { useState } from 'react'
import ScrollReveal from './ScrollReveal'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
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
      {/* Atmospheric gradient orbs — kept for hero marketing impact */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-drift-primary/8 dark:bg-drift-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-drift-secondary/5 dark:bg-drift-secondary/8 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-[5%] right-[10%] w-[350px] h-[350px] bg-drift-accent/5 dark:bg-drift-accent/6 rounded-full blur-[100px] -z-10 animate-glow-pulse" />

      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 mb-10 rounded-full bg-drift-primary/8 dark:bg-drift-primary/10 border border-drift-primary/15 dark:border-drift-primary/20 text-sm text-drift-primary shimmer-badge">
            <span className="w-2 h-2 bg-drift-success rounded-full animate-pulse-slow"></span>
            Coming Soon — Join the Waitlist
          </div>
        </ScrollReveal>

        {/* Hero Title */}
        <ScrollReveal delay={100}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-drift-text">
            Your conversations are everywhere.<br />
            <span className="gradient-text">Your insights shouldn't be.</span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-drift-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            DriftBox captures every conversation across email, Slack, Teams, and WhatsApp —
            then surfaces what matters. Stop losing decisions in message threads.
            Start knowing everything, effortlessly.
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
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Done!' : status === 'error' ? 'Error' : 'Get Early Access'}
              </button>
            </div>
          </form>
          <p className="text-sm text-drift-muted">Free during beta. No credit card required.</p>
        </ScrollReveal>

        {/* App Preview */}
        <ScrollReveal delay={400}>
          <div className="mt-20 max-w-5xl mx-auto relative">
            {/* Glow effect under the mockup */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-drift-primary/10 dark:bg-drift-primary/15 rounded-full blur-[80px] -z-10" />

            <div className="bg-[#0A0A0F] rounded-xl border border-[#2A2A3A] shadow-2xl shadow-black/30 overflow-hidden glow-primary">
              {/* Browser Chrome */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-[#12121A] border-b border-[#2A2A3A]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-[#8888A0]">DriftBox Dashboard</span>
              </div>

              {/* App Content */}
              <div className="flex">
                {/* Sidebar */}
                <div className="w-48 p-4 border-r border-[#2A2A3A] hidden md:block">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-drift-primary/10 text-[#E8E8ED] text-sm">
                      <span>📧</span>
                      <span>Email</span>
                      <span className="ml-auto text-xs bg-drift-primary px-1.5 py-0.5 rounded-full">3</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8888A0] text-sm hover:bg-[#22222F] transition-colors">
                      <span>💬</span>
                      <span>Slack</span>
                      <span className="ml-auto text-xs bg-[#2A2A3A] px-1.5 py-0.5 rounded-full">7</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8888A0] text-sm hover:bg-[#22222F] transition-colors">
                      <span>🟣</span>
                      <span>Teams</span>
                      <span className="ml-auto text-xs bg-[#2A2A3A] px-1.5 py-0.5 rounded-full">2</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8888A0] text-sm hover:bg-[#22222F] transition-colors">
                      <span>🟢</span>
                      <span>WhatsApp</span>
                      <span className="ml-auto text-xs bg-[#2A2A3A] px-1.5 py-0.5 rounded-full">5</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 space-y-3">
                  <div className="bg-[#1A1A25]/50 border border-[#2A2A3A] rounded-xl p-4 hover:bg-[#1A1A25] transition-colors">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 font-semibold">🔥 Action Required</span>
                    <h4 className="text-sm font-semibold mt-2 mb-1 text-[#E8E8ED]">Q1 Budget Approval</h4>
                    <p className="text-xs text-[#8888A0] mb-2">Sarah mentioned in Slack that the CFO needs your sign-off by Friday. Related email from finance@company.com sent 2h ago.</p>
                    <div className="flex gap-2 text-xs text-[#8888A0]/60">
                      <span>📧 Email</span>
                      <span>💬 Slack #finance</span>
                    </div>
                  </div>

                  <div className="bg-[#1A1A25]/50 border border-[#2A2A3A] rounded-xl p-4 hover:bg-[#1A1A25] transition-colors">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 font-semibold">✅ Decision Made</span>
                    <h4 className="text-sm font-semibold mt-2 mb-1 text-[#E8E8ED]">New Vendor Selection</h4>
                    <p className="text-xs text-[#8888A0] mb-2">Team agreed on Vendor B in yesterday's Teams call. Contract details shared via WhatsApp by Mike.</p>
                    <div className="flex gap-2 text-xs text-[#8888A0]/60">
                      <span>🟣 Teams Call</span>
                      <span>🟢 WhatsApp</span>
                    </div>
                  </div>

                  <div className="bg-[#1A1A25]/50 border border-[#2A2A3A] rounded-xl p-4 hover:bg-[#1A1A25] transition-colors">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 font-semibold">⏰ Follow Up</span>
                    <h4 className="text-sm font-semibold mt-2 mb-1 text-[#E8E8ED]">Client Proposal Response</h4>
                    <p className="text-xs text-[#8888A0] mb-2">Acme Corp hasn't replied in 3 days. Last touchpoint was your email on Monday. Consider a follow-up.</p>
                    <div className="flex gap-2 text-xs text-[#8888A0]/60">
                      <span>📧 Email</span>
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
