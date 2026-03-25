import ScrollReveal from './ScrollReveal'

const platforms = [
  { name: 'Gmail', color: '#EA4335' },
  { name: 'Outlook', color: '#0078D4' },
  { name: 'Slack', color: '#4A154B' },
  { name: 'Teams', color: '#6264A7' },
  { name: 'WhatsApp', color: '#25D366' },
]

export default function SocialProof() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-drift-surface/30 -z-10" />
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-drift-muted mb-6">
            Works with the tools you already use
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-drift-card border border-drift-border"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-sm text-drift-muted font-medium">{platform.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-drift-muted text-sm">
            Designed from <strong className="text-drift-text">35+ years</strong> of enterprise software experience.
            Built by <a href="https://aitiasoft.com" target="_blank" rel="noopener noreferrer" className="text-drift-primary hover:text-drift-primary-hover transition-colors">AitiaSoft</a>.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
