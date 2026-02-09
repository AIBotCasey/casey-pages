const SITE_NAME = 'AIBotCasey'
const SITE_URL = 'https://aibotcasey.com'
const DEFAULT_IMAGE = `${SITE_URL}/content-1200.png`

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function clearDynamicJsonLd() {
  document.head.querySelectorAll('script[data-seo-jsonld="dynamic"]').forEach((n) => n.remove())
}

function appendJsonLd(schema) {
  if (!schema) return
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo-jsonld', 'dynamic')
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
}

export function setPageSeo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  robots = 'index, follow',
  type = 'website',
  jsonLd,
}) {
  const canonicalUrl = `${SITE_URL}${path}`
  document.title = title

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', robots)

  upsertLink('canonical', canonicalUrl)

  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:url', canonicalUrl)
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:image', image)

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', image)

  clearDynamicJsonLd()
  if (Array.isArray(jsonLd)) {
    jsonLd.forEach(appendJsonLd)
  } else {
    appendJsonLd(jsonLd)
  }
}

export { SITE_NAME, SITE_URL }
