'use client'

import { useState } from 'react'

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
    <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-sm text-indigo-400">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></span>
          Coming Soon — Join the Waitlist
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-slate-900 dark:text-white">
          Your conversations are everywhere.<br />
          <span className="gradient-text">Your insights shouldn't be.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          DriftBox captures every conversation across email, Slack, Teams, and WhatsApp — 
          then surfaces what matters. Stop losing decisions in message threads. 
          Start knowing everything, effortlessly.
        </p>

        {/* CTA Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`px-7 py-3.5 rounded-xl font-semibold transition-all shadow-lg ${
                status === 'success' 
                  ? 'bg-green-600 text-white' 
                  : status === 'error'
                  ? 'bg-red-600 text-white'
                  : 'gradient-bg text-white hover:shadow-indigo-500/50 hover:-translate-y-0.5'
              }`}
            >
              {status === 'loading' ? 'Joining...' : status === 'success' ? '✓ Done!' : status === 'error' ? 'Error' : 'Get Early Access'}
            </button>
          </div>
        </form>
        <p className="text-sm text-slate-500 dark:text-slate-500">Free during beta. No credit card required.</p>

        {/* App Preview */}
        <div className="mt-16 max-w-5xl mx-auto perspective-1000">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden transform hover:rotate-x-0 transition-transform">
            {/* Browser Chrome */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-800/50 border-b border-slate-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-slate-500">DriftBox Dashboard</span>
            </div>

            {/* App Content */}
            <div className="flex">
              {/* Sidebar */}
              <div className="w-48 p-4 border-r border-slate-800 hidden md:block">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600/10 text-slate-100 text-sm">
                    <span>📧</span>
                    <span>Email</span>
                    <span className="ml-auto text-xs bg-indigo-600 px-1.5 py-0.5 rounded-full">3</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 text-sm hover:bg-slate-800">
                    <span>💬</span>
                    <span>Slack</span>
                    <span className="ml-auto text-xs bg-slate-700 px-1.5 py-0.5 rounded-full">7</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 text-sm hover:bg-slate-800">
                    <span>🟣</span>
                    <span>Teams</span>
                    <span className="ml-auto text-xs bg-slate-700 px-1.5 py-0.5 rounded-full">2</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 text-sm hover:bg-slate-800">
                    <span>🟢</span>
                    <span>WhatsApp</span>
                    <span className="ml-auto text-xs bg-slate-700 px-1.5 py-0.5 rounded-full">5</span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 space-y-3">
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 hover:bg-slate-800/50 transition-colors">
                  <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400 font-semibold">🔥 Action Required</span>
                  <h4 className="text-sm font-semibold mt-2 mb-1">Q1 Budget Approval</h4>
                  <p className="text-xs text-slate-400 mb-2">Sarah mentioned in Slack that the CFO needs your sign-off by Friday. Related email from finance@company.com sent 2h ago.</p>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span>📧 Email</span>
                    <span>💬 Slack #finance</span>
                  </div>
                </div>

                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 hover:bg-slate-800/50 transition-colors">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 font-semibold">✅ Decision Made</span>
                  <h4 className="text-sm font-semibold mt-2 mb-1">New Vendor Selection</h4>
                  <p className="text-xs text-slate-400 mb-2">Team agreed on Vendor B in yesterday's Teams call. Contract details shared via WhatsApp by Mike.</p>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span>🟣 Teams Call</span>
                    <span>🟢 WhatsApp</span>
                  </div>
                </div>

                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 hover:bg-slate-800/50 transition-colors">
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 font-semibold">⏰ Follow Up</span>
                  <h4 className="text-sm font-semibold mt-2 mb-1">Client Proposal Response</h4>
                  <p className="text-xs text-slate-400 mb-2">Acme Corp hasn't replied in 3 days. Last touchpoint was your email on Monday. Consider a follow-up.</p>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span>📧 Email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
