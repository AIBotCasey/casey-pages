export function isMoneySubdomain() {
  if (typeof window === 'undefined') return false

  const host = window.location.hostname.toLowerCase()
  const params = new URLSearchParams(window.location.search)

  if (params.get('site') === 'money') return true
  return host === 'money.aibotcasey.com'
}
