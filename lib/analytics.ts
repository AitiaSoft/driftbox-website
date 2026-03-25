export function trackEvent(
  action: string,
  params: Record<string, string | number | undefined> = {}
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params)
  }
}
