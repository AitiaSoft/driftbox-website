'use client'

import { FormEvent, useState } from 'react'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    // FormSubmit.co will handle the actual submission
  }

  return (
    <section id="waitlist" className="py-24 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Stop <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Losing Conversations?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join the waitlist and get early access when we launch. 
            <span className="block mt-2 text-indigo-400 font-semibold">Free during beta. No credit card required.</span>
          </p>

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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Get Early Access'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-sm text-gray-400">
            Join <span className="text-indigo-400 font-semibold">500+</span> professionals already on the waitlist
          </p>
        </div>
      </div>
    </section>
  )
}
