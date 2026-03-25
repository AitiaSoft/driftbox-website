# DriftBox Demand Validation Engine — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the DriftBox marketing site into a demand validation engine that tests purchase intent via transparent CTA click tracking, identifies which audience segments respond, and measures everything with GA4 custom events and UTM attribution.

**Architecture:** Next.js 14 App Router site with Tailwind CSS. New analytics utilities (`lib/analytics.ts`, `lib/utm.ts`) power GA4 custom events across all components. A `/reserve/[tier]` dynamic route provides transparent "coming soon" interstitial pages that capture tier preference + email. Pricing updated to $0/$29/$79 with CTA buttons routing to reserve pages instead of anchor links. New homepage sections (WhoItsFor, SocialProof, BlogPreview) test persona resonance and build trust. Marketing docs saved to `docs/marketing/`.

**Tech Stack:** Next.js 14.1, React 18, TypeScript, Tailwind CSS, GA4 (G-N93PWS5W77), Supabase REST API

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `lib/analytics.ts` | Centralized GA4 event tracking utility |
| `lib/utm.ts` | UTM parameter capture from URL, sessionStorage persistence |
| `types/gtag.d.ts` | TypeScript declaration for `window.gtag` |
| `components/SectionTracker.tsx` | IntersectionObserver wrapper firing `section_view` events |
| `components/WhoItsFor.tsx` | Persona cards with click tracking |
| `components/SocialProof.tsx` | Trust signals + platform badges |
| `components/BlogPreview.tsx` | Latest blog posts on homepage |
| `app/reserve/[tier]/page.tsx` | Reserve page (server component wrapper) |
| `components/ReserveForm.tsx` | Client form component for reserve page |
| `app/sitemap.ts` | Dynamic sitemap auto-including blog posts |
| `docs/marketing/marketing-playbook.md` | Strategy reference document |
| `docs/marketing/email-nurture-sequence.md` | Full copy for 7 nurture emails |
| `docs/marketing/marketing-ops-guide.md` | Setup guides + automation tools |

### Modified Files
| File | Changes |
|------|---------|
| `app/page.tsx` | Add new sections, wrap in SectionTracker |
| `app/layout.tsx` | Update metadata, keywords, JSON-LD sameAs |
| `app/api/waitlist/route.ts` | Accept tier, UTM params, source; upsert on duplicate |
| `components/Hero.tsx` | New headline, CTA, trust bullets, UTM + analytics |
| `components/Pricing.tsx` | New tiers ($0/$29/$79), Link to reserve pages |
| `components/ProblemStats.tsx` | Section header + reframed stats |
| `components/Features.tsx` | Outcome-focused descriptions |
| `components/HowItWorks.tsx` | Simplified step titles |
| `components/FinalCTA.tsx` | New headline, trust signals, UTM + analytics |
| `components/Navigation.tsx` | "Get Early Access" CTA, "Who It's For" link |
| `components/Footer.tsx` | Add "Who It's For" link |

---

### Task 1: GA4 Analytics Utilities

**Files:**
- Create: `types/gtag.d.ts`
- Create: `lib/analytics.ts`

- [ ] **Step 1: Create gtag type declaration**

Create `types/gtag.d.ts`:
```typescript
interface GtagEventParams {
  event_category?: string
  event_label?: string
  value?: number
  section_name?: string
  depth_percent?: number
  tier_name?: string
  tier_price?: string
  persona_type?: string
  source?: string
  tier?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  cta_text?: string
  location?: string
  post_slug?: string
  [key: string]: string | number | undefined
}

interface Window {
  gtag: (
    command: 'event' | 'config' | 'js',
    targetOrEvent: string | Date,
    params?: GtagEventParams | Record<string, string>
  ) => void
  dataLayer: Array<unknown>
}
```

- [ ] **Step 2: Create analytics utility**

Create `lib/analytics.ts`:
```typescript
export function trackEvent(
  action: string,
  params: Record<string, string | number | undefined> = {}
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params)
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to gtag types

- [ ] **Step 4: Commit**

```bash
git add types/gtag.d.ts lib/analytics.ts
git commit -m "feat: add GA4 analytics utility and gtag type declarations"
```

---

### Task 2: UTM Parameter Capture

**Files:**
- Create: `lib/utm.ts`

- [ ] **Step 1: Create UTM utility**

Create `lib/utm.ts`:
```typescript
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>

export function captureUtmParams(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const hasUtm = UTM_KEYS.some((key) => params.has(key))
  if (!hasUtm) return
  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) {
      sessionStorage.setItem(key, value)
    }
  })
}

export function getUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {}
  const result: UtmParams = {}
  UTM_KEYS.forEach((key) => {
    const value = sessionStorage.getItem(key)
    if (value) {
      result[key] = value
    }
  })
  return result
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/utm.ts
git commit -m "feat: add UTM parameter capture and persistence utility"
```

---

### Task 3: SectionTracker Component

**Files:**
- Create: `components/SectionTracker.tsx`

- [ ] **Step 1: Create SectionTracker**

Create `components/SectionTracker.tsx`:
```tsx
'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

interface SectionTrackerProps {
  sectionName: string
  children: ReactNode
}

export default function SectionTracker({ sectionName, children }: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const tracked = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || tracked.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true
          trackEvent('section_view', { section_name: sectionName })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionName])

  return <div ref={ref}>{children}</div>
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SectionTracker.tsx
git commit -m "feat: add SectionTracker component for GA4 section visibility events"
```

---

### Task 4: Update Waitlist API to Accept Tier + UTM

**Files:**
- Modify: `app/api/waitlist/route.ts`

- [ ] **Step 1: Update the API route**

In `app/api/waitlist/route.ts`, replace the request body parsing and Supabase insert to accept new fields. The key changes:

1. Destructure new fields from request body:
```typescript
const { email, tier, source: signupSource, utm_source, utm_medium, utm_campaign, utm_content, referrer } = await request.json()
```

2. Build the insert payload dynamically (only include non-null fields):
```typescript
const insertPayload: Record<string, string> = {
  email: email.toLowerCase().trim(),
  source: signupSource || 'website',
}
if (tier) insertPayload.tier = tier
if (utm_source) insertPayload.utm_source = utm_source
if (utm_medium) insertPayload.utm_medium = utm_medium
if (utm_campaign) insertPayload.utm_campaign = utm_campaign
if (utm_content) insertPayload.utm_content = utm_content
if (referrer) insertPayload.referrer = referrer
```

3. Change the Supabase insert to use upsert with `on_conflict=email` and `Prefer: return=representation,resolution=merge-duplicates`:
```typescript
const response = await fetch(`${supabaseUrl}/rest/v1/waitlist?on_conflict=email`, {
  method: 'POST',
  headers: {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation,resolution=merge-duplicates'
  },
  body: JSON.stringify(insertPayload)
})
```

4. Update the Telegram notification to include tier:
```typescript
text: `🎉 New DriftBox waitlist signup!\n\nEmail: ${cleanEmail}${tier ? `\nTier: ${tier}` : ''}${utm_source ? `\nSource: ${utm_source}` : ''}\nTotal signups: ${totalCount}`
```

5. Update the email notification subject and body to include tier info:
```typescript
subject: `🎉 New DriftBox ${tier ? tier.charAt(0).toUpperCase() + tier.slice(1) + ' Tier' : 'Waitlist'} Signup`
```
And add tier to the HTML body:
```html
${tier ? `<p><strong>Tier:</strong> ${tier}</p>` : ''}
${utm_source ? `<p><strong>UTM Source:</strong> ${utm_source}</p>` : ''}
```

6. Remove the duplicate email 409 check since upsert handles it. Keep the PostgreSQL error check for other errors.

- [ ] **Step 2: Verify build**

Run: `npx next build 2>&1 | tail -10`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add app/api/waitlist/route.ts
git commit -m "feat: extend waitlist API to accept tier, UTM params, and source"
```

---

### Task 5: Reserve Page (Purchase Intent Flow)

**Files:**
- Create: `components/ReserveForm.tsx`
- Create: `app/reserve/[tier]/page.tsx`

- [ ] **Step 1: Create the tier data config**

At the top of `app/reserve/[tier]/page.tsx`, define tier metadata:
```typescript
const TIERS: Record<string, { name: string; price: string; period: string; features: string[] }> = {
  free: {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['1 email + 1 WhatsApp account', '5 AI summaries per week', '30-day conversation history'],
  },
  team: {
    name: 'Team',
    price: '$29',
    period: '/mo per user',
    features: ['Unlimited accounts & channels', '100 AI summaries per week', 'Commitment tracking & custom alerts'],
  },
  business: {
    name: 'Business',
    price: '$79',
    period: '/mo per user',
    features: ['Everything in Team + unlimited summaries', 'GDPR compliance & audit logs', 'SSO & dedicated support'],
  },
}
```

- [ ] **Step 2: Create ReserveForm client component**

Create `components/ReserveForm.tsx`:
```tsx
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const utmParams = getUtmParams()

    trackEvent('waitlist_attempt', { source: 'reserve', tier: tierSlug })

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tier: tierSlug,
          source: 'reserve',
          ...utmParams,
          referrer: document.referrer || undefined,
        }),
      })

      if (response.ok || response.status === 409) {
        setStatus('success')
        setEmail('')
        trackEvent('waitlist_signup', {
          source: 'reserve',
          tier: tierSlug,
          ...utmParams,
        })
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-drift-success/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-drift-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-drift-text">You&apos;re on the list!</h3>
        <p className="text-drift-muted mb-6">
          We&apos;ve reserved your spot on the <strong>{tierName}</strong> plan. We&apos;ll email you when it&apos;s ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://x.com/rvaldezv" target="_blank" rel="noopener noreferrer" className="text-sm text-drift-primary hover:text-drift-primary-hover transition-colors">
            Follow us on X for updates
          </a>
          <span className="hidden sm:inline text-drift-muted">&middot;</span>
          <a href="/blog" className="text-sm text-drift-primary hover:text-drift-primary-hover transition-colors">
            Read our blog
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-3 p-1.5 rounded-xl bg-drift-card border border-drift-border shadow-lg shadow-drift-border/30">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3.5 rounded-xl bg-transparent text-drift-text placeholder:text-drift-muted/60 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-7 py-3.5 rounded-xl font-semibold transition-all ${
            status === 'error'
              ? 'bg-drift-danger text-white'
              : 'bg-drift-primary text-white shadow-lg shadow-drift-primary/25 hover:bg-drift-primary-hover hover:shadow-drift-primary/40'
          } disabled:opacity-50`}
        >
          {status === 'loading' ? 'Reserving...' : status === 'error' ? 'Error' : 'Reserve My Spot'}
        </button>
      </div>
      <p className="text-sm text-drift-muted mt-3 text-center">
        No payment required. We&apos;ll notify you when {tierName} is ready.
      </p>
    </form>
  )
}
```

- [ ] **Step 3: Create the reserve page**

Create `app/reserve/[tier]/page.tsx`:
```tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ReserveForm from '@/components/ReserveForm'

const TIERS: Record<string, { name: string; price: string; period: string; features: string[] }> = {
  free: {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['1 email + 1 WhatsApp account', '5 AI summaries per week', '30-day conversation history'],
  },
  team: {
    name: 'Team',
    price: '$29',
    period: '/mo per user',
    features: ['Unlimited accounts & channels', '100 AI summaries per week', 'Commitment tracking & custom alerts'],
  },
  business: {
    name: 'Business',
    price: '$79',
    period: '/mo per user',
    features: ['Everything in Team + unlimited summaries', 'GDPR compliance & audit logs', 'SSO & dedicated support'],
  },
}

interface ReservePageProps {
  params: { tier: string }
}

export async function generateStaticParams() {
  return Object.keys(TIERS).map((tier) => ({ tier }))
}

export async function generateMetadata({ params }: ReservePageProps): Promise<Metadata> {
  const tier = TIERS[params.tier]
  if (!tier) return { title: 'Plan Not Found — DriftBox' }
  return {
    title: `Reserve ${tier.name} Plan — DriftBox`,
    description: `Reserve your spot on the DriftBox ${tier.name} plan. ${tier.price}${tier.period}. Launching Q2 2026.`,
  }
}

export default function ReservePage({ params }: ReservePageProps) {
  const tier = TIERS[params.tier]
  if (!tier) notFound()

  return (
    <div className="min-h-screen bg-drift-bg pt-32 pb-20 px-6">
      <div className="max-w-xl mx-auto text-center">
        {/* Tier badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-drift-primary/10 border border-drift-primary/20 text-sm text-drift-primary font-medium">
          {tier.name} Plan
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-drift-text">
          Great choice.
        </h1>
        <p className="text-xl text-drift-muted mb-10">
          DriftBox is launching Q2 2026. Reserve your spot on the <strong className="text-drift-text">{tier.name}</strong> plan.
        </p>

        {/* Price reminder */}
        <div className="bg-drift-card border border-drift-border rounded-xl p-6 mb-10">
          <div className="flex items-baseline justify-center gap-1 mb-4">
            <span className="text-4xl font-bold text-drift-text">{tier.price}</span>
            <span className="text-drift-muted">{tier.period}</span>
          </div>
          <ul className="space-y-2">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-center justify-center gap-2 text-sm text-drift-muted">
                <svg className="w-4 h-4 text-drift-success flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <ReserveForm tierSlug={params.tier} tierName={tier.name} />

        {/* Back link */}
        <p className="mt-8 text-sm text-drift-muted">
          Not sure yet?{' '}
          <Link href="/#pricing" className="text-drift-primary hover:text-drift-primary-hover transition-colors">
            See all plans
          </Link>
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Verify build**

Run: `npx next build 2>&1 | tail -15`
Expected: Build succeeds, `/reserve/[tier]` pages generated

- [ ] **Step 5: Commit**

```bash
git add components/ReserveForm.tsx app/reserve/
git commit -m "feat: add reserve pages for transparent purchase intent tracking"
```

---

### Task 6: Update Pricing Component

**Files:**
- Modify: `components/Pricing.tsx`

- [ ] **Step 1: Rewrite Pricing.tsx**

Replace the entire content of `components/Pricing.tsx` with updated tiers ($0/$29/$79), Link imports, and CTA tracking. Key changes:
- Import `Link` from `next/link`
- Add `'use client'` directive and import `trackEvent` from `@/lib/analytics`
- Update plan data: Free ($0), Team ($29/mo per user, highlighted), Business ($79/mo per user)
- Change all CTAs from `<a href="#waitlist">` to `<Link href="/reserve/{tierSlug}">` with onClick firing `pricing_tier_click` event
- Update feature descriptions to be outcome-focused
- Add "Launching Q2 2026" badge under section header
- Rename "Starter" to "Team", "Pro" to "Business"

The CTA onClick handler:
```typescript
onClick={() => trackEvent('pricing_tier_click', { tier_name: plan.slug, tier_price: plan.price })}
```

Each plan gets a `slug` field (`'free'`, `'team'`, `'business'`) for the Link href.

- [ ] **Step 2: Verify build**

Run: `npx next build 2>&1 | tail -10`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/Pricing.tsx
git commit -m "feat: update pricing to $0/$29/$79 with reserve page CTAs and click tracking"
```

---

### Task 7: Messaging Overhaul — Hero

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Update Hero.tsx**

Key changes to `components/Hero.tsx`:
- Import `trackEvent` from `@/lib/analytics` and `captureUtmParams`, `getUtmParams` from `@/lib/utm`
- Add `useEffect` to call `captureUtmParams()` on mount
- **Badge:** Change "Just Launched" to "Early Access — Limited Spots"
- **Headline:** Change to `Your team made 47 decisions last week.` / `How many did you actually capture?`
- **Subheadline:** Change to "Teams lose decisions, deadlines, and follow-ups across email, Slack, Teams, and WhatsApp every day. DriftBox uses AI to make sure nothing important drifts away."
- **CTA button text:** "Join the Waitlist — It's Free" → "Get Early Access"
- **Trust bullets:** Update to:
  1. "Free during early access. No credit card ever."
  2. "Direct access to the founder"
  3. "Shape the product with your feedback"
- **Below bullets text:** "Built for teams who value their time." → "Built for teams juggling 3+ communication tools."
- **Form submission:** Include UTM params in the POST body:
```typescript
body: JSON.stringify({ email, source: 'hero', ...getUtmParams() })
```
- **CTA click tracking:** Fire `hero_cta_click` event on form submit:
```typescript
trackEvent('hero_cta_click', { cta_text: 'Get Early Access' })
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: update Hero with pain-driven headline, UTM tracking, and analytics"
```

---

### Task 8: Messaging Overhaul — ProblemStats, Features, HowItWorks

**Files:**
- Modify: `components/ProblemStats.tsx`
- Modify: `components/Features.tsx`
- Modify: `components/HowItWorks.tsx`

- [ ] **Step 1: Update ProblemStats.tsx**

Add a section header above the stats grid:
```tsx
<ScrollReveal>
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-drift-text">
      The Communication <span className="gradient-text">Drift Problem</span>
    </h2>
    <p className="text-lg text-drift-muted max-w-xl mx-auto">
      Your tools aren&apos;t broken. They&apos;re just not connected.
    </p>
  </div>
</ScrollReveal>
```

Update the stats array:
```typescript
const stats = [
  { number: '76%', label: 'of professionals miss important messages buried across apps daily' },
  { number: '2.5h', label: 'per person per day spent reconstructing decisions from scattered threads' },
  { number: '5+', label: 'communication tools the average team juggles daily' },
  { number: '$12K', label: 'lost per employee annually to communication drift' },
]
```

Add `id="problem"` to the section element.

- [ ] **Step 2: Update Features.tsx**

Update the section header:
```tsx
<h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-drift-text">
  What changes when <span className="gradient-text">nothing drifts away</span>
</h2>
<p className="text-lg text-drift-muted max-w-xl mx-auto">DriftBox doesn&apos;t just aggregate messages. It understands them.</p>
```

Update each feature description to be outcome-focused:
- **Unified Inbox:** `"Never again say 'I think that was in Slack... or was it email?' Every conversation, every platform, one search away."`
- **AI Summaries:** `"Walk into any meeting fully briefed. Daily digests tell you what happened, what was decided, and what needs your attention."`
- **Action Detection:** `"Your teammate said 'I'll send the proposal by Friday.' DriftBox remembers so you don't have to chase. Zero follow-ups fall through the cracks."`
- **Smart Search:** `"Ask 'What did the client say about the Q2 timeline?' and get the answer in seconds — across email, Slack, and Teams simultaneously."`
- **Smart Alerts:** `"Stop drowning in notifications. Get alerted only when a decision needs you, a deadline approaches, or a commitment is at risk."`
- **Enterprise Security:** `"Your conversations stay yours. End-to-end encryption, SOC 2 compliance, and full GDPR controls — because trust isn't optional."`

- [ ] **Step 3: Update HowItWorks.tsx**

Update step titles and descriptions:
- Step 1: title `"Connect in 60 Seconds"`, description `"Link your email, Slack, Teams, and WhatsApp — no workflow changes required. DriftBox works alongside your existing tools."`
- Step 2: title `"AI Understands Context"`, description `"Our AI doesn't just read messages — it understands decisions, commitments, and follow-ups across every conversation and platform."`
- Step 3: title `"Ask. Get Answers. Act."`, description `"'What did Sarah decide about the Q2 budget?' DriftBox knows — and gives you the answer with source links, instantly."`

- [ ] **Step 4: Commit**

```bash
git add components/ProblemStats.tsx components/Features.tsx components/HowItWorks.tsx
git commit -m "feat: update ProblemStats, Features, HowItWorks with outcome-focused messaging"
```

---

### Task 9: Messaging Overhaul — FinalCTA

**Files:**
- Modify: `components/FinalCTA.tsx`

- [ ] **Step 1: Update FinalCTA.tsx**

Key changes:
- Import `trackEvent` from `@/lib/analytics` and `captureUtmParams`, `getUtmParams` from `@/lib/utm`
- Add `useEffect` calling `captureUtmParams()`
- **Headline:** `"Ready to Stop Losing Conversations?"` → `"Every day you wait, another decision drifts away."`
- **Subtitle:** `"Join the waitlist and get early access when we launch."` → `"Be among the first to experience AI-powered communication intelligence."`
- **Trust bullets:** Update to:
  1. "Free during early access. No credit card ever."
  2. "Direct access to the founder"
  3. "We'll never share your email"
- **Below bullets text:** `"Be among the first..."` → `"No credit card required. Cancel anytime."`
- **CTA button text:** `"Join the Waitlist — It's Free"` → `"Get Early Access"`
- **Form submission:** Include UTM params and source:
```typescript
body: JSON.stringify({ email, source: 'final-cta', ...getUtmParams() })
```

- [ ] **Step 2: Commit**

```bash
git add components/FinalCTA.tsx
git commit -m "feat: update FinalCTA with urgency messaging, UTM tracking, and analytics"
```

---

### Task 10: Update Navigation and Footer

**Files:**
- Modify: `components/Navigation.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Update Navigation.tsx**

Key changes:
- Import `trackEvent` from `@/lib/analytics`
- Add "Who It's For" link to desktop nav (between "How It Works" and "Blog"):
```tsx
<Link href="/#who-its-for" className="text-sm text-drift-muted hover:text-drift-text transition-colors">
  Who It&apos;s For
</Link>
```
- Change desktop CTA from "Join Waitlist" → "Get Early Access" and href from `/#waitlist` to `/#waitlist`
- Add onClick to CTA: `onClick={() => trackEvent('nav_cta_click', { location: 'desktop' })}`
- Add "Who It's For" to mobile menu
- Change mobile CTA text similarly, with `onClick` using `location: 'mobile'`

- [ ] **Step 2: Update Footer.tsx**

Add "Who It's For" link under the Product section in the footer:
```tsx
<Link href="/#who-its-for" className="block text-sm text-drift-muted hover:text-drift-text transition-colors">Who It&apos;s For</Link>
```

- [ ] **Step 3: Commit**

```bash
git add components/Navigation.tsx components/Footer.tsx
git commit -m "feat: update nav with 'Get Early Access' CTA, 'Who It's For' link, click tracking"
```

---

### Task 11: New Section — WhoItsFor

**Files:**
- Create: `components/WhoItsFor.tsx`

- [ ] **Step 1: Create WhoItsFor component**

Create `components/WhoItsFor.tsx`:
```tsx
'use client'

import ScrollReveal from './ScrollReveal'
import { trackEvent } from '@/lib/analytics'

const personas = [
  {
    title: 'Team Leads & Managers',
    pain: 'You spend more time chasing updates than making decisions.',
    outcome: 'DriftBox gives you a single view of every conversation across your team — so you lead instead of manage threads.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Founders & Executives',
    pain: "You're cc'd on everything but briefed on nothing.",
    outcome: 'DriftBox gives you AI-powered summaries of what actually matters — across every channel, every day.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: 'Operations & Client Success',
    pain: 'You juggle 50 client conversations across 5 tools.',
    outcome: 'DriftBox tracks every commitment, deadline, and follow-up — so nothing slips and no client feels forgotten.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
]

export default function WhoItsFor() {
  const handlePersonaClick = (personaTitle: string) => {
    trackEvent('persona_click', { persona_type: personaTitle })
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="who-its-for" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-drift-text">
              Built for people who <span className="gradient-text">can&apos;t afford to miss</span>
            </h2>
            <p className="text-lg text-drift-muted max-w-xl mx-auto">
              Does this sound like you?
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {personas.map((persona, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-drift-card border border-drift-border rounded-xl p-8 hover:border-drift-primary/30 transition-all duration-300 h-full flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-drift-primary/10 text-drift-primary mb-5">
                  {persona.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-drift-text">{persona.title}</h3>
                <p className="text-sm text-drift-muted mb-3 italic">&ldquo;{persona.pain}&rdquo;</p>
                <p className="text-sm text-drift-muted leading-relaxed flex-1">{persona.outcome}</p>
                <button
                  onClick={() => handlePersonaClick(persona.title)}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-drift-hover text-drift-text hover:bg-drift-border transition-colors"
                >
                  This is me
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/WhoItsFor.tsx
git commit -m "feat: add WhoItsFor persona section with GA4 persona click tracking"
```

---

### Task 12: New Section — SocialProof

**Files:**
- Create: `components/SocialProof.tsx`

- [ ] **Step 1: Create SocialProof component**

Create `components/SocialProof.tsx`:
```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/SocialProof.tsx
git commit -m "feat: add SocialProof section with platform badges and trust signals"
```

---

### Task 13: New Section — BlogPreview

**Files:**
- Create: `components/BlogPreview.tsx`

- [ ] **Step 1: Create BlogPreview component**

Create `components/BlogPreview.tsx`:
```tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'

function getLatestPosts(count: number) {
  const postsDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(postsDir)) return []

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))

  const posts = files
    .map((fileName) => {
      const filePath = path.join(postsDir, fileName)
      const { data } = matter(fs.readFileSync(filePath, 'utf8'))
      return {
        slug: fileName.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        date: data.date || '',
        excerpt: data.excerpt || '',
      }
    })
    .filter((post) => post.title !== 'Coming Soon' && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)

  return posts
}

export default function BlogPreview() {
  const posts = getLatestPosts(3)
  if (posts.length === 0) return null

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-drift-text">
              From the <span className="gradient-text">DriftBox Blog</span>
            </h2>
            <p className="text-lg text-drift-muted max-w-xl mx-auto">
              Insights on communication, productivity, and building in public.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-drift-card border border-drift-border rounded-xl p-6 hover:border-drift-primary/30 hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <time className="text-xs text-drift-primary font-semibold">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <h3 className="text-lg font-bold mt-2 mb-3 text-drift-text leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-drift-muted leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-4 text-sm text-drift-primary font-medium">
                  Read more &rarr;
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="text-drift-primary hover:text-drift-primary-hover font-medium transition-colors"
            >
              View all posts &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/BlogPreview.tsx
git commit -m "feat: add BlogPreview section showing latest posts on homepage"
```

---

### Task 14: Update Homepage Composition

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update page.tsx with new sections and SectionTracker**

Replace `app/page.tsx`:
```tsx
import Hero from '@/components/Hero'
import ProblemStats from '@/components/ProblemStats'
import WhoItsFor from '@/components/WhoItsFor'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import SocialProof from '@/components/SocialProof'
import Pricing from '@/components/Pricing'
import BlogPreview from '@/components/BlogPreview'
import FinalCTA from '@/components/FinalCTA'
import SectionTracker from '@/components/SectionTracker'

export default function Home() {
  return (
    <>
      <SectionTracker sectionName="hero">
        <Hero />
      </SectionTracker>
      <SectionTracker sectionName="problem-stats">
        <ProblemStats />
      </SectionTracker>
      <SectionTracker sectionName="who-its-for">
        <WhoItsFor />
      </SectionTracker>
      <SectionTracker sectionName="features">
        <Features />
      </SectionTracker>
      <SectionTracker sectionName="how-it-works">
        <HowItWorks />
      </SectionTracker>
      <SectionTracker sectionName="social-proof">
        <SocialProof />
      </SectionTracker>
      <SectionTracker sectionName="pricing">
        <Pricing />
      </SectionTracker>
      <SectionTracker sectionName="blog-preview">
        <BlogPreview />
      </SectionTracker>
      <SectionTracker sectionName="final-cta">
        <FinalCTA />
      </SectionTracker>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: update homepage with new sections and section visibility tracking"
```

---

### Task 15: Technical SEO — Sitemap + Layout Metadata

**Files:**
- Create: `app/sitemap.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create dynamic sitemap**

Create `app/sitemap.ts`:
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://driftbox.ai'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/reserve/free`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/reserve/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/reserve/business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const postsDir = path.join(process.cwd(), 'content/blog')
  let blogPages: MetadataRoute.Sitemap = []

  if (fs.existsSync(postsDir)) {
    blogPages = fs
      .readdirSync(postsDir)
      .filter((f) => f.endsWith('.md'))
      .map((fileName) => {
        const filePath = path.join(postsDir, fileName)
        const { data } = matter(fs.readFileSync(filePath, 'utf8'))
        const slug = fileName.replace(/\.md$/, '')
        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: data.date ? new Date(data.date) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }
      })
  }

  return [...staticPages, ...blogPages]
}
```

- [ ] **Step 2: Update layout.tsx metadata and JSON-LD**

In `app/layout.tsx`:
- Expand keywords array:
```typescript
keywords: ['communication', 'AI', 'productivity', 'email', 'slack', 'teams', 'whatsapp', 'communication intelligence', 'unified inbox', 'team communication', 'AI summaries', 'action tracking', 'decision tracking'],
```
- Update JSON-LD `sameAs`:
```typescript
sameAs: ['https://x.com/rvaldezv'],
```

- [ ] **Step 3: Delete the old static sitemap**

Run: `rm /Users/robertovaldez/Source/driftbox-website/public/sitemap.xml`

The dynamic `app/sitemap.ts` replaces it.

- [ ] **Step 4: Verify build**

Run: `npx next build 2>&1 | tail -15`
Expected: Build succeeds, sitemap.xml generated dynamically

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts app/layout.tsx
git rm public/sitemap.xml
git commit -m "feat: add dynamic sitemap, expand SEO keywords, update JSON-LD sameAs"
```

---

### Task 16: Marketing Documents — Playbook

**Files:**
- Create: `docs/marketing/marketing-playbook.md`

- [ ] **Step 1: Create marketing playbook**

Write the complete marketing playbook to `docs/marketing/marketing-playbook.md`. This document should contain:
- Content calendar with specific dates starting from the current week
- 4 content pillars with examples
- 15 blog post titles with target keywords
- Social media post templates (5 templates for LinkedIn/X)
- Community engagement playbook (Reddit, LinkedIn, X, HN)
- UTM link convention with examples
- Paid ad copy variants (3 for Google Search, 2 for Reddit)
- Lead magnet descriptions
- Decision points at weeks 4, 8, 12

Content sourced from the strategy plan at `docs/superpowers/plans/2026-03-25-demand-validation-engine.md` Part 2 sections.

- [ ] **Step 2: Commit**

```bash
git add docs/marketing/marketing-playbook.md
git commit -m "docs: add marketing playbook with content calendar, ad copy, and social templates"
```

---

### Task 17: Marketing Documents — Email Nurture Sequence

**Files:**
- Create: `docs/marketing/email-nurture-sequence.md`

- [ ] **Step 1: Create email sequence document**

Write the full copy for all 7 emails to `docs/marketing/email-nurture-sequence.md`. Each email should include:
- Subject line
- Send timing (day offset from signup)
- Full email body (plain text, conversational, from Roberto)
- CTA / desired action
- Notes for setup

Emails:
1. Day 0: Welcome + research question ("What's your biggest communication headache?")
2. Day 3: The $12K problem + calculator link
3. Day 7: Communication audit template (pure value)
4. Day 14: Research insights from user conversations
5. Day 21: Product walkthrough with mockup description
6. Day 30: 3-question survey (team size, willingness to pay, top feature)
7. Day 45: Beta access priority offer

- [ ] **Step 2: Commit**

```bash
git add docs/marketing/email-nurture-sequence.md
git commit -m "docs: add 7-email nurture sequence with full copy for waitlist subscribers"
```

---

### Task 18: Marketing Documents — Ops Guide

**Files:**
- Create: `docs/marketing/marketing-ops-guide.md`

- [ ] **Step 1: Create marketing ops guide**

Write the complete ops guide to `docs/marketing/marketing-ops-guide.md`. Include:

**Step-by-step setup guides:**
- Google Ads account creation, campaign structure, keyword setup, budget caps, conversion tracking
- Reddit Ads account, targeting by subreddit, promoted post format, budget
- Google Search Console domain verification, sitemap submission, monitoring
- Email service comparison (Resend vs Mailchimp) with recommended setup for drip sequence

**Automation tools with costs:**
- Content publishing: Buffer, Typefully, LinkedIn native scheduler
- Automation: Zapier, Make (Integromat) for Supabase → email triggers
- Content creation: Claude, Canva
- Analytics: GA4, GSC, Google Ads dashboard, Supabase dashboard

**Recommended minimal stack ($0/month):**
Buffer Free + Resend Free + Zapier Free + Canva Free

**Scaling plan by budget tier ($500+, $1K+, $2K+)**

- [ ] **Step 2: Commit**

```bash
git add docs/marketing/marketing-ops-guide.md
git commit -m "docs: add marketing ops guide with setup instructions and automation tools"
```

---

### Task 19: Verify Full Build and Dev Server

**Files:** None (verification only)

- [ ] **Step 1: Install dependencies if needed**

Run: `npm install`

- [ ] **Step 2: Run full build**

Run: `npx next build 2>&1 | tail -30`
Expected: Build succeeds with all pages generated including `/reserve/[tier]` routes

- [ ] **Step 3: Start dev server and verify**

Run: `npm run dev`
Verify in browser:
- Homepage loads with all new sections in correct order
- "Who It's For" section appears with 3 persona cards
- Pricing shows $0/$29/$79 tiers
- Pricing CTAs link to `/reserve/free`, `/reserve/team`, `/reserve/business`
- Reserve pages load with tier info and form
- Navigation shows "Get Early Access" and "Who It's For"
- Blog preview section shows latest posts
- Social proof section shows platform badges

- [ ] **Step 4: Test reserve flow end-to-end**

1. Navigate to `/reserve/team`
2. Verify tier name, price, and features display correctly
3. Submit email — verify form transitions to success state
4. Check browser console for GA4 events (`waitlist_signup`, `pricing_tier_click`)

- [ ] **Step 5: Fix any issues found**

Address any TypeScript errors, broken links, or styling issues discovered during testing.

- [ ] **Step 6: Final commit if fixes were needed**

```bash
git add -A
git commit -m "fix: address issues found during verification testing"
```
