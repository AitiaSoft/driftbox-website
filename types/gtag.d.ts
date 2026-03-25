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
