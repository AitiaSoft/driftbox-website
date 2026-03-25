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
