import ScrollReveal from './ScrollReveal'

const platforms = [
  {
    name: 'Gmail',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M22 6.25V17.75C22 18.44 21.44 19 20.75 19H18V9.29L12 13.5L6 9.29V19H3.25C2.56 19 2 18.44 2 17.75V6.25C2 4.87 3.62 4.07 4.75 4.92L6 5.88L12 10.12L18 5.88L19.25 4.92C20.38 4.07 22 4.87 22 6.25Z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'Outlook',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 5.5V18.5L12 22L22 18.5V5.5L12 2Z" fill="#0078D4"/>
        <ellipse cx="8.5" cy="12" rx="3" ry="4" fill="white"/>
        <path d="M14 8V16L22 14V6L14 8Z" fill="#0078D4" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: 'Slack',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/>
        <path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
        <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
        <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
      </svg>
    ),
  },
  {
    name: 'Teams',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M20.625 7.5H16.5V12.75C16.5 14.407 15.157 15.75 13.5 15.75H9V16.875C9 18.325 10.175 19.5 11.625 19.5H17.25L20.25 22.5V19.5H20.625C22.075 19.5 23.25 18.325 23.25 16.875V10.125C23.25 8.675 22.075 7.5 20.625 7.5Z" fill="#6264A7"/>
        <circle cx="19.5" cy="4.5" r="2.25" fill="#6264A7"/>
        <path d="M13.5 3H5.25C3.6 3 2.25 4.35 2.25 6V12.75C2.25 14.4 3.6 15.75 5.25 15.75H7.5L11.25 19.5V15.75H13.5C15.15 15.75 16.5 14.4 16.5 12.75V6C16.5 4.35 15.15 3 13.5 3Z" fill="#6264A7"/>
        <path d="M6.75 8.25H12V9.375H10.125V13.5H8.625V9.375H6.75V8.25Z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" fill="#25D366"/>
        <path d="M17.6 14.82C17.36 14.7 16.04 14.05 15.82 13.97C15.6 13.89 15.44 13.85 15.27 14.09C15.1 14.33 14.59 14.93 14.45 15.1C14.31 15.27 14.17 15.29 13.93 15.17C12.55 14.48 11.65 13.95 10.74 12.37C10.5 11.95 10.98 11.98 11.43 11.08C11.51 10.91 11.47 10.77 11.41 10.65C11.35 10.53 10.85 9.21 10.65 8.73C10.46 8.26 10.26 8.33 10.11 8.32C9.97 8.31 9.81 8.31 9.64 8.31C9.47 8.31 9.2 8.37 8.98 8.61C8.76 8.85 8.07 9.5 8.07 10.82C8.07 12.14 9 13.42 9.14 13.59C9.28 13.76 10.84 16.18 13.22 17.34C14.97 18.12 15.62 18.18 16.45 18.06C16.95 17.99 18.02 17.37 18.22 16.68C18.42 15.99 18.42 15.41 18.36 15.31C18.3 15.21 18.14 15.15 17.9 15.03L17.6 14.82Z" fill="white"/>
      </svg>
    ),
  },
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
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-drift-card border border-drift-border"
              >
                {platform.logo}
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
