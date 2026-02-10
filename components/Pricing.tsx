export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      description: 'Perfect for individuals and small teams',
      features: [
        'Up to 2 connected channels',
        '1,000 messages per month',
        'Basic AI search',
        'Email support',
        '7-day history',
      ],
      cta: 'Join Waitlist',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$49',
      period: '/month',
      description: 'For power users and growing teams',
      features: [
        'Unlimited connected channels',
        'Unlimited messages',
        'Advanced AI insights',
        'Priority support',
        'Unlimited history',
        'Custom integrations',
        'Team analytics',
      ],
      cta: 'Join Waitlist',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Professional',
        'Dedicated success manager',
        'Custom AI training',
        'On-premise deployment',
        'SLA guarantees',
        'Advanced security',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Free during beta.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50'
                  : 'bg-gray-800/50 border border-gray-700/50'
              } hover:scale-105 transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50'
                    : 'bg-gray-700/50 text-white hover:bg-gray-700'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
