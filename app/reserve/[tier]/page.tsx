import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ReserveForm from '@/components/ReserveForm'

const TIERS: Record<
  string,
  { name: string; price: string; period: string; features: string[] }
> = {
  free: {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: [
      '1 email + 1 WhatsApp account',
      '5 AI summaries per week',
      '30-day conversation history',
    ],
  },
  team: {
    name: 'Team',
    price: '$29',
    period: '/mo per user',
    features: [
      'Unlimited accounts & channels',
      '100 AI summaries per week',
      'Commitment tracking & custom alerts',
    ],
  },
  business: {
    name: 'Business',
    price: '$79',
    period: '/mo per user',
    features: [
      'Everything in Team + unlimited summaries',
      'GDPR compliance & audit logs',
      'SSO & dedicated support',
    ],
  },
}

export function generateStaticParams() {
  return [{ tier: 'free' }, { tier: 'team' }, { tier: 'business' }]
}

interface ReservePageProps {
  params: { tier: string }
}

export function generateMetadata({ params }: ReservePageProps): Metadata {
  const tier = TIERS[params.tier]
  if (!tier) return {}

  return {
    title: `Reserve DriftBox ${tier.name} – ${tier.price}${tier.period}`,
    description: `Reserve your spot on the DriftBox ${tier.name} plan at ${tier.price}${tier.period}. No payment required.`,
  }
}

export default function ReservePage({ params }: ReservePageProps) {
  const tier = TIERS[params.tier]
  if (!tier) notFound()

  return (
    <main className="min-h-screen bg-drift-bg">
      <div className="max-w-xl mx-auto px-6 pt-32 pb-20">
        {/* Tier badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-drift-primary/10 text-drift-primary border border-drift-primary/20">
            {tier.name}
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-drift-text mb-4">
          Great choice.
        </h1>
        <p className="text-center text-drift-muted text-lg mb-10">
          DriftBox is launching Q2 2026. Reserve your spot on the{' '}
          <span className="text-drift-text font-medium">{tier.name}</span> plan.
        </p>

        {/* Pricing card */}
        <div className="rounded-xl bg-drift-card border border-drift-border p-6 mb-8">
          <div className="flex items-baseline mb-5">
            <span className="text-4xl font-bold text-drift-text">
              {tier.price}
            </span>
            <span className="text-drift-muted ml-2">{tier.period}</span>
          </div>
          <ul className="space-y-3">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-drift-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-drift-muted">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reserve form */}
        <ReserveForm tierSlug={params.tier} tierName={tier.name} />

        {/* Back link */}
        <div className="text-center mt-10">
          <Link
            href="/#pricing"
            className="text-sm text-drift-muted hover:text-drift-text transition-colors"
          >
            &larr; Not sure yet? See all plans
          </Link>
        </div>
      </div>
    </main>
  )
}
