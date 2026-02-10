'use client'

import { FormEvent, useState } from 'react'
import ScrollReveal from './ScrollReveal'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    // FormSubmit.co will handle the actual submission
  }

  return (
    <section id="waitlist" className="py-28 relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 dark:from-indigo-950/40 via-purple-50/50 dark:via-purple-950/20 to-slate-50 dark:to-slate-950 -z-10" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/8 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/8 rounded-full blur-[100px] -z-10" />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 dark:via-indigo-500/30 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Ready to Stop <span className="gradient-text">Losing Conversations?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-xl text-slate-600 dark:text-gray-300 mb-12">
              Join the waitlist and get early access when we launch.
              <span className="block mt-2 text-indigo-600 dark:text-indigo-400 font-semibold">Free during beta. No credit card required.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/rvaldez@aitiasoft.com"
              method="POST"
              className="max-w-md mx-auto"
            >
              <input type="hidden" name="_subject" value="DriftBox Waitlist Signup - Footer" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://driftbox.ai/#waitlist" />
              <input
                type="text"
                name="_honey"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-black/20">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none rounded-xl"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Get Early Access'}
                </button>
              </div>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="mt-8 text-sm text-slate-500 dark:text-gray-400">
              Be among the first to experience DriftBox.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
