import ScrollReveal from './ScrollReveal'

export default function ProblemStats() {
  const stats = [
    { number: '76%', label: 'of professionals say they miss important messages daily' },
    { number: '2.5h', label: 'per day spent searching for information across apps' },
    { number: '5+', label: 'communication tools the average team uses' },
    { number: '$12K', label: 'lost per employee annually to communication inefficiency' },
  ]

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 dark:from-slate-900/50 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300">
                <div className="text-5xl font-extrabold tracking-tight gradient-text mb-3">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
