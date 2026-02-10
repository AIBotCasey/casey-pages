import { posts } from '../src/data/posts.js'

const MIN_WORDS = 900

// Legacy posts are exempt from code/raw-route checks only.
const LEGACY_FORMAT_EXEMPT_SLUGS = new Set([
  'react-router-vercel-404-fix',
  'how-we-shipped-car-deal-checker-live-with-secure-auth',
  'trading-journal-one-offline-futures-trading-journal',
  'operating-model-ai-executes-human-reviews',
  'react-hashrouter-to-browserrouter-seo',
  'seo-react-vite-canonical-meta-jsonld',
  'mvp-website-seo-checklist-week-one',
])

const BANNED_HEADINGS = new Set(['quick demo flow', 'video walkthrough outline'])

function getPostText(post) {
  let text = `${post.title || ''} ${post.excerpt || ''}`
  for (const section of post.sections || []) {
    text += ` ${section.heading || ''} ${section.text || ''}`
    if (Array.isArray(section.bullets)) text += ` ${section.bullets.join(' ')}`
    if (section.code) text += ` ${section.code}`
  }
  return text
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function validatePost(post) {
  const errors = []

  if (!post.slug) errors.push('missing slug')
  if (!post.title) errors.push('missing title')
  if (!post.excerpt) errors.push('missing excerpt')
  if (!Array.isArray(post.sections) || post.sections.length < 5) {
    errors.push('sections must have at least 5 entries')
  }

  const headings = (post.sections || []).map((s) => String(s.heading || '').toLowerCase())
  if (headings.some((h) => BANNED_HEADINGS.has(h))) {
    errors.push('contains banned heading (quick demo flow / video walkthrough outline)')
  }

  const rawRouteLeak = JSON.stringify(post).match(/\/(posts|projects)\//)
  if (!LEGACY_FORMAT_EXEMPT_SLUGS.has(post.slug) && rawRouteLeak) {
    errors.push('contains raw route string in content; use human-readable titles instead')
  }

  const codeSections = (post.sections || []).filter((s) => s.code).length
  if (!LEGACY_FORMAT_EXEMPT_SLUGS.has(post.slug) && codeSections < 2) {
    errors.push('must include at least 2 code sections')
  }

  const wc = wordCount(getPostText(post))
  if (wc < MIN_WORDS) {
    errors.push(`word count ${wc} is below minimum ${MIN_WORDS}`)
  }

  return { wc, errors }
}

let failed = false
for (const post of posts) {
  const { wc, errors } = validatePost(post)
  if (errors.length) {
    failed = true
    console.error(`\n[post:${post.slug}] words=${wc}`)
    for (const e of errors) console.error(`  - ${e}`)
  } else {
    console.log(`[ok] ${post.slug} words=${wc}`)
  }
}

if (failed) {
  console.error('\nPost validation failed.')
  process.exit(1)
}

console.log('\nPost validation passed.')
