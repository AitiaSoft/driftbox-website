'use client'

import { useState } from 'react'
import ScrollReveal from './ScrollReveal'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData()
    formData.append('email', email)
    formData.append('_subject', 'DriftBox Waitlist Signup')
    formData.append('_captcha', 'false')

    try {
      const response = await fetch('https://formsubmit.co/rvaldez@aitiasoft.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden">
      {/* Atmospheric gradient orbs */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-500/8 dark:bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/8 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-[5%] right-[10%] w-[350px] h-[350px] bg-indigo-400/5 dark:bg-indigo-400/6 rounded-full blur-[100px] -z-10 animate-glow-pulse" />

      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 mb-10 rounded-full bg-indigo-600/8 dark:bg-indigo-600/10 border border-indigo-500/15 dark:border-indigo-500/20 text-sm text-indigo-600 dark:text-indigo-400 shimmer-badge">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-slow"></span>
            Coming Soon — Join the Waitlist
          </div>
        </ScrollReveal>

        {/* Hero Title */}
        <ScrollReveal delay={100}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-slate-900 dark:text-white">
            Your conversations are everywhere.<br />
            <span className="gradient-text">Your insights shouldn't be.</span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            DriftBox captures every conversation across email, Slack, Teams, and WhatsApp —
            then surfaces what matters. Stop losing decisions in message threads.
            Start knowing everything, effortlessly.
          </p>
        </ScrollReveal>

        {/* CTA Form */}
        <ScrollReveal delay={300}>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div className="flex gap-3 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-black/20">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`px-7 py-3.5 rounded-xl font-semibold transition-all ${
                  status === 'success'
                    ? 'bg-emerald-600 text-white'
                    : status === 'error'
                    ? 'bg-red-600 text-white'
                    : 'gradient-bg text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5'
                }`}
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Done!' : status === 'error' ? 'Error' : 'Get Early Access'}
              </button>
            </div>
          </form>
          <p className="text-sm text-slate-500 dark:text-slate-500">Free during beta. No credit card required.</p>
        </ScrollReveal>

        {/* App Preview */}
        <ScrollReveal delay={400}>
          <div className="mt-20 max-w-5xl mx-auto relative">
            {/* Glow effect under the mockup */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[80px] -z-10" />

            <div className="bg-slate-950 rounded-2xl border border-slate-800/80 shadow-2xl shadow-black/30 overflow-hidden glow-indigo">
              {/* Browser Chrome */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-900/80 border-b border-slate-800/80">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-slate-500 font-body">DriftBox Dashboard</span>
              </div>

              {/* App Content */}
              <div className="flex">
                {/* Sidebar */}
                <div className="w-48 p-4 border-r border-slate-800/80 hidden md:block">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600/10 text-slate-100 text-sm">
                      <span>📧</span>
                      <span>Email</span>
                      <span className="ml-auto text-xs bg-indigo-600 px-1.5 py-0.5 rounded-full">3</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 text-sm hover:bg-slate-800/60 transition-colors">
                      <span>💬</span>
                      <span>Slack</span>
                      <span className="ml-auto text-xs bg-slate-700 px-1.5 py-0.5 rounded-full">7</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 text-sm hover:bg-slate-800/60 transition-colors">
                      <span>🟣</span>
                      <span>Teams</span>
                      <span className="ml-auto text-xs bg-slate-700 px-1.5 py-0.5 rounded-full">2</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 text-sm hover:bg-slate-800/60 transition-colors">
                      <span>🟢</span>
                      <span>WhatsApp</span>
                      <span className="ml-auto text-xs bg-slate-700 px-1.5 py-0.5 rounded-full">5</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 space-y-3">
                  <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/50 transition-colors">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 font-semibold">🔥 Action Required</span>
                    <h4 className="text-sm font-semibold mt-2 mb-1 text-slate-100">Q1 Budget Approval</h4>
                    <p className="text-xs text-slate-400 mb-2">Sarah mentioned in Slack that the CFO needs your sign-off by Friday. Related email from finance@company.com sent 2h ago.</p>
                    <div className="flex gap-2 text-xs text-slate-500">
                      <span>📧 Email</span>
                      <span>💬 Slack #finance</span>
                    </div>
                  </div>

                  <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/50 transition-colors">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 font-semibold">✅ Decision Made</span>
                    <h4 className="text-sm font-semibold mt-2 mb-1 text-slate-100">New Vendor Selection</h4>
                    <p className="text-xs text-slate-400 mb-2">Team agreed on Vendor B in yesterday's Teams call. Contract details shared via WhatsApp by Mike.</p>
                    <div className="flex gap-2 text-xs text-slate-500">
                      <span>🟣 Teams Call</span>
                      <span>🟢 WhatsApp</span>
                    </div>
                  </div>

                  <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/50 transition-colors">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 font-semibold">⏰ Follow Up</span>
                    <h4 className="text-sm font-semibold mt-2 mb-1 text-slate-100">Client Proposal Response</h4>
                    <p className="text-xs text-slate-400 mb-2">Acme Corp hasn't replied in 3 days. Last touchpoint was your email on Monday. Consider a follow-up.</p>
                    <div className="flex gap-2 text-xs text-slate-500">
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
