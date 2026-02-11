import ScrollReveal from './ScrollReveal'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'For individuals getting started',
      features: [
        '1 email + 1 WhatsApp (manual export)',
        '5 AI summaries per week',
        'Basic search',
        'Per-person timelines',
        '30-day history',
        'Community support',
      ],
      cta: 'Join Waitlist',
      highlighted: false,
    },
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      description: 'For professionals juggling multiple channels',
      features: [
        '3 emails + 1 Teams + 1 WhatsApp Business',
        '50 AI summaries per week',
        'AI search + commitment tracking',
        'Per-person timelines',
        'Custom alerts & reminders',
        '6-month history',
        'Email support',
      ],
      cta: 'Join Waitlist',
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '$49',
      period: '/month',
      description: 'For power users and teams who need it all',
      features: [
        'Unlimited emails, Teams & WhatsApp',
        'Unlimited AI summaries + priority processing',
        'AI search + commitment tracking',
        'Export, reporting & audit logs',
        'GDPR compliance & security controls',
        '2-year history',
        'Priority support',
      ],
      cta: 'Join Waitlist',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-28 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/4 dark:bg-indigo-500/6 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Simple, <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Free during beta.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 120}>
              <div
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-white dark:bg-slate-900 border-2 border-indigo-500/40 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-500/5 scale-[1.03] md:scale-105'
                    : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {plan.highlighted && (
                  <>
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-indigo-500/20 to-purple-500/20 -z-10 blur-xl" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-indigo-500/25">
                      Most Popular
                    </div>
                  </>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm mb-5">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-slate-500 dark:text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-indigo-500' : 'text-indigo-500/70 dark:text-indigo-400/70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#waitlist"
                  className={`block w-full py-3.5 px-6 rounded-xl text-center font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
