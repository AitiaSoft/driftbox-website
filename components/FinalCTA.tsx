'use client'

import { FormEvent, useState } from 'react'
import ScrollReveal from './ScrollReveal'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        const errorData = await response.json()
        console.error('Waitlist signup error:', errorData)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Network error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="waitlist" className="py-28 relative overflow-hidden">
      {/* Atmospheric background — kept for CTA impact */}
      <div className="absolute inset-0 bg-drift-surface/50 -z-10" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-drift-primary/5 dark:bg-drift-primary/8 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-drift-secondary/5 dark:bg-drift-secondary/8 rounded-full blur-[100px] -z-10" />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-drift-primary/20 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-drift-text">
              Ready to Stop <span className="gradient-text">Losing Conversations?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-xl text-drift-muted mb-12">
              Join the waitlist and get early access when we launch.
              <span className="block mt-2 text-drift-primary font-semibold">Free during beta. No credit card required.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-xl bg-drift-card border border-drift-border shadow-lg shadow-drift-border/30">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-4 bg-transparent text-drift-text placeholder-drift-muted/60 focus:outline-none rounded-xl"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                    status === 'success'
                      ? 'bg-drift-success text-white'
                      : status === 'error'
                      ? 'bg-drift-danger text-white'
                      : 'bg-drift-primary text-white shadow-drift-primary/25 hover:bg-drift-primary-hover hover:shadow-drift-primary/40'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {status === 'loading' ? 'Joining...' : status === 'success' ? 'Done!' : status === 'error' ? 'Error' : 'Get Early Access'}
                </button>
              </div>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="mt-8 text-sm text-drift-muted">
              Be among the first to experience DriftBox.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
