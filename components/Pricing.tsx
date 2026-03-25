'use client'

import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { trackEvent } from '@/lib/analytics'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      slug: 'free',
      price: '$0',
      period: '/month',
      description: 'See what you\'ve been missing',
      features: [
        '1 email + 1 WhatsApp (manual export)',
        '5 AI summaries per week',
        'Basic search',
        'Per-person timelines',
        '30-day history',
        'Community support',
      ],
      cta: 'Start Free',
      highlighted: false,
    },
    {
      name: 'Team',
      slug: 'team',
      price: '$29',
      period: '/mo per user',
      description: 'For teams that can\'t afford to miss anything',
      features: [
        'Unlimited emails, Teams & WhatsApp',
        '100 AI summaries per week',
        'AI search + commitment tracking',
        'Per-person timelines',
        'Custom alerts & reminders',
        '6-month history',
        'Email support',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Business',
      slug: 'business',
      price: '$79',
      period: '/mo per user',
      description: 'For organizations that run on communication',
      features: [
        'Everything in Team, unlimited',
        'Unlimited AI summaries + priority processing',
        'Export, reporting & audit logs',
        'GDPR compliance & security controls',
        'SSO & advanced integrations',
        '2-year history',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-28 bg-drift-surface/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-drift-text">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-drift-muted max-w-2xl mx-auto mb-3">
              Choose the plan that fits your needs.
            </p>
            <p className="text-sm text-drift-muted/70">
              All plans include a 14-day free trial. Launching Q2 2026.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 120}>
              <div
                className={`relative rounded-xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-drift-card border-2 border-drift-primary/40 shadow-xl shadow-drift-primary/10 scale-[1.03] md:scale-105'
                    : 'bg-drift-card border border-drift-border hover:border-drift-border-hover'
                }`}
              >
                {plan.highlighted && (
                  <>
                    <div className="absolute -inset-px rounded-xl bg-drift-primary/10 -z-10 blur-xl" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-drift-primary text-white px-5 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-drift-primary/25">
                      Most Popular
                    </div>
                  </>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-drift-text">{plan.name}</h3>
                  <p className="text-drift-muted text-sm mb-5">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-drift-text">{plan.price}</span>
                    <span className="text-drift-muted ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-drift-primary' : 'text-drift-primary/70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-drift-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/reserve/${plan.slug}`}
                  onClick={() => trackEvent('pricing_tier_click', { tier_name: plan.slug, tier_price: plan.price })}
                  className={`block w-full py-3.5 px-6 rounded-xl text-center font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-drift-primary text-white shadow-lg shadow-drift-primary/25 hover:bg-drift-primary-hover hover:shadow-drift-primary/40'
                      : 'bg-drift-hover text-drift-text hover:bg-drift-border'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
