import ScrollReveal from './ScrollReveal'

export default function ProblemStats() {
  const stats = [
    { number: '76%', label: 'of professionals miss important messages buried across apps daily' },
    { number: '2.5h', label: 'per person per day spent reconstructing decisions from scattered threads' },
    { number: '5+', label: 'communication tools the average team juggles daily' },
    { number: '$12K', label: 'lost per employee annually to communication drift' },
  ]

  return (
    <section id="problem" className="py-20 px-6 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-drift-surface/30 -z-10" />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-drift-text">
              The Communication <span className="gradient-text">Drift Problem</span>
            </h2>
            <p className="text-lg text-drift-muted max-w-xl mx-auto">
              Your tools aren&apos;t broken. They&apos;re just not connected.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="glass-card rounded-xl p-8 hover:scale-[1.02] transition-transform duration-300">
                <div className="text-5xl font-extrabold tracking-tight gradient-text mb-3">
                  {stat.number}
                </div>
                <div className="text-sm text-drift-muted leading-relaxed">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
