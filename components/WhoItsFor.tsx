'use client'

import ScrollReveal from './ScrollReveal'
import { trackEvent } from '@/lib/analytics'

const personas = [
  {
    title: 'Team Leads & Managers',
    pain: 'You spend more time chasing updates than making decisions.',
    outcome: 'DriftBox gives you a single view of every conversation across your team — so you lead instead of manage threads.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Founders & Executives',
    pain: "You're cc'd on everything but briefed on nothing.",
    outcome: 'DriftBox gives you AI-powered summaries of what actually matters — across every channel, every day.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: 'Operations & Client Success',
    pain: 'You juggle 50 client conversations across 5 tools.',
    outcome: 'DriftBox tracks every commitment, deadline, and follow-up — so nothing slips and no client feels forgotten.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
]

export default function WhoItsFor() {
  const handlePersonaClick = (personaTitle: string) => {
    trackEvent('persona_click', { persona_type: personaTitle })
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="who-its-for" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-drift-text">
              Built for people who <span className="gradient-text">can&apos;t afford to miss</span>
            </h2>
            <p className="text-lg text-drift-muted max-w-xl mx-auto">
              Does this sound like you?
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {personas.map((persona, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-drift-card border border-drift-border rounded-xl p-8 hover:border-drift-primary/30 transition-all duration-300 h-full flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-drift-primary/10 text-drift-primary mb-5">
                  {persona.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-drift-text">{persona.title}</h3>
                <p className="text-sm text-drift-muted mb-3 italic">&ldquo;{persona.pain}&rdquo;</p>
                <p className="text-sm text-drift-muted leading-relaxed flex-1">{persona.outcome}</p>
                <button
                  onClick={() => handlePersonaClick(persona.title)}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-drift-hover text-drift-text hover:bg-drift-border transition-colors"
                >
                  This is me
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
