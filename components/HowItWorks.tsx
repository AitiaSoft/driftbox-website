import ScrollReveal from './ScrollReveal'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Connect Your Channels',
      description: 'Link your email, Slack, Teams, and WhatsApp in seconds. DriftBox works with your existing tools — no change in workflow required.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'AI Captures Everything',
      description: 'Our AI reads every message, understands context, and identifies what\'s important — decisions, action items, commitments, and insights.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Get Instant Insights',
      description: 'Ask questions in plain English. "What did Sarah decide about the Q2 budget?" DriftBox knows — and gives you the answer with source links.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="py-28 bg-drift-surface/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-drift-text">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-drift-muted max-w-2xl mx-auto">
              Three simple steps to never lose track of a conversation again
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-drift-primary/20 to-transparent" />
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-drift-primary/10 to-transparent blur-sm" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="relative bg-drift-card backdrop-blur-sm border border-drift-border rounded-xl p-8 hover:border-drift-primary/30 transition-all duration-300 h-full">
                  <div className="absolute -top-5 -left-3 w-12 h-12 bg-drift-primary rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-drift-primary/25">
                    {step.number}
                  </div>
                  <div className="text-drift-primary mb-5 mt-2">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-drift-text">{step.title}</h3>
                  <p className="text-drift-muted leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
