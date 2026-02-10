import type { Metadata } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ThemeProvider } from '@/components/ThemeProvider'
import Script from 'next/script'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

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
    creator: '@rvaldezv',
    site: '@rvaldezv',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const activeTheme = theme === 'system' ? systemTheme : theme;
                if (activeTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${dmSans.variable} grain-overlay`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="theme"
        >
          <GoogleAnalytics />
          <Script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
