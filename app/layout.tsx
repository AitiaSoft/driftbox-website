import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DriftBox — Never Let a Conversation Drift Away',
  description: 'DriftBox captures every conversation across email, Slack, Teams, and WhatsApp — then surfaces what matters. AI-powered communication intelligence for busy professionals.',
  keywords: ['communication', 'AI', 'productivity', 'email', 'slack', 'teams', 'whatsapp'],
  authors: [{ name: 'AitiaSoft' }],
  openGraph: {
    title: 'DriftBox — Never Let a Conversation Drift Away',
    description: 'DriftBox captures every conversation across email, Slack, Teams, and WhatsApp — then surfaces what matters.',
    url: 'https://driftbox.ai',
    siteName: 'DriftBox',
    images: [
      {
        url: 'https://driftbox.ai/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DriftBox - AI-Powered Communication Intelligence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DriftBox — Never Let a Conversation Drift Away',
    description: 'DriftBox captures every conversation across email, Slack, Teams, and WhatsApp — then surfaces what matters.',
    images: ['https://driftbox.ai/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DriftBox',
  description: 'AI-powered communication intelligence platform',
  url: 'https://driftbox.ai',
  logo: 'https://driftbox.ai/favicon.svg',
  foundingDate: '2026',
  founders: [
    {
      '@type': 'Organization',
      name: 'AitiaSoft',
    },
  ],
  sameAs: [],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <GoogleAnalytics />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
