'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'
import { captureUtmParams, getUtmParams } from '@/lib/utm'

interface ReserveFormProps {
  tierSlug: string
  tierName: string
}

export default function ReserveForm({ tierSlug, tierName }: ReserveFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    captureUtmParams()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    trackEvent('waitlist_attempt', { source: 'reserve', tier: tierSlug })

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tier: tierSlug,
          source: 'reserve',
          ...getUtmParams(),
          referrer: document.referrer || undefined,
        }),
      })

      if (response.ok || response.status === 409) {
        setStatus('success')
        setEmail('')
        trackEvent('waitlist_signup', {
          source: 'reserve',
          tier: tierSlug,
          ...getUtmParams(),
        })
      } else {
        const errorData = await response.json()
        console.error('Reserve signup error:', errorData)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Network error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-drift-success/10 mb-4">
          <svg
            className="w-8 h-8 text-drift-success"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-drift-text mb-2">
          You&apos;re on the list!
        </h3>
        <p className="text-drift-muted mb-6">
          We&apos;ll notify you when {tierName} is ready.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://x.com/driftbox"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-drift-primary hover:text-drift-primary-hover transition-colors"
          >
            Follow us on X
          </a>
          <span className="text-drift-border">|</span>
          <a
            href="/blog"
            className="text-sm text-drift-primary hover:text-drift-primary-hover transition-colors"
          >
            Read our blog
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={status === 'loading' || status === 'error'}
          className={`px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-300 ${
            status === 'error'
              ? 'bg-drift-danger text-white'
              : 'bg-drift-primary text-white shadow-drift-primary/25 hover:bg-drift-primary-hover hover:shadow-drift-primary/40'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {status === 'loading'
            ? 'Reserving...'
            : status === 'error'
              ? 'Error'
              : 'Reserve My Spot'}
        </button>
      </div>
      <p className="text-sm text-drift-muted text-center">
        No payment required. We&apos;ll notify you when {tierName} is ready.
      </p>
    </form>
  )
}
