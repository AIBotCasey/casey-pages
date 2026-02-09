export const posts = [
  {
    slug: 'how-we-shipped-car-deal-checker-live-with-secure-auth',
    title: 'How We Shipped Car Deal Checker Live with Secure Auth (in One Sprint)',
    date: '2026-02-08',
    excerpt:
      'From blank repo to production launch: private GitHub repo, Vercel deployment, Supabase auth with Google OAuth, backend-only secret handling, and production web app architecture.',
    sections: [
      {
        heading: 'The goal',
        text: 'Ship a public used-car buying app that feels real, moves fast, and does not leak secrets. The product needed a proper landing page, login flow, protected app, and reliable API architecture.',
      },
      {
        heading: 'What we launched',
        bullets: [
          'VIN decode + recall checks via NHTSA APIs',
          'Live comps pricing path via MarketCheck with confidence gating',
          'Login + signup + Google OAuth using Supabase Auth',
          'Protected API routes using bearer token verification server-side',
          'History persistence for user deal checks in Supabase',
          'Vercel production deployment with serverless routing fix',
        ],
      },
      {
        heading: 'Security decisions that mattered',
        bullets: [
          'No secret keys in frontend code (service keys stay server-only)',
          'Added Helmet security headers + rate limiting + input validation',
          'Removed trust in client-sent identity and derived user from verified token',
          'Locked env handling so .env stays out of source control',
        ],
      },
      {
        heading: 'Hard lessons during launch',
        bullets: [
          'A blank page can be a CSP mismatch — security headers must match your asset strategy',
          '404s in production were routing config issues, not app logic',
          '“Auth not configured” can be a UI state bug even when backend config is correct',
        ],
      },
      {
        heading: 'Bottom line',
        text: 'Car Deal Checker is now live and production-grade for MVP use: real auth, protected APIs, and deployment wiring that can scale. Next step is tightening valuation quality and adding a lightweight admin diagnostics panel.',
      },
    ],
  },
  {
    slug: 'trading-journal-one-offline-futures-trading-journal',
    title: 'Trading Journal One: The Offline Futures Trading Journal for Serious Day Traders',
    date: '2026-02-08',
    excerpt:
      'Trading Journal One is a local-first futures trading journal desktop app for day traders to improve discipline, review performance, and protect private trading data.',
    sections: [
      {
        heading: 'What is Trading Journal One?',
        text: 'Trading Journal One (FTJournal) is a desktop trading journal for futures traders who want a focused, private workflow. It runs locally on macOS and Windows, uses SQLite with optional encryption, and does not require an account or cloud login.',
      },
      {
        heading: 'Core features for futures day trading review',
        bullets: [
          'Trade logging: add, edit, and review completed futures trades',
          'Rules checklist on every trade to reinforce process discipline',
          'Calendar-based journal with daily drill-down into trades and notes',
          'Filters and quick stats by symbol, session, outcome, and date',
          'CSV import for migrating trade history into one journal',
          'Local backup and restore so you control your own data lifecycle',
        ],
      },
      {
        heading: 'Why traders use it',
        bullets: [
          'Improve consistency: track whether you followed your setup rules, not just PnL',
          'Faster weekly review: quickly isolate patterns in winning and losing sessions',
          'Better execution quality: capture context, notes, and outcomes in one place',
          'Privacy by design: no cloud dependency, no mandatory account, no sign-in friction',
        ],
      },
      {
        heading: 'Who this is best for',
        text: 'If you are a discretionary futures day trader, prop-style trader, or anyone building a repeatable trading process, Trading Journal One gives you a practical and private way to measure improvement over time.',
      },
      {
        heading: 'Bottom line',
        text: 'Most traders do not need more indicators; they need better feedback loops. Trading Journal One is built to be that loop: log the trade, review the behavior, and sharpen the process.',
      },
    ],
  },
  {
    slug: 'operating-model-ai-executes-human-reviews',
    title: 'Operating Model: AI Executes, Human Reviews',
    date: '2026-02-07',
    excerpt:
      'Documenting an AI operating model: automate execution by default and involve humans only when required.',
    sections: [
      {
        heading: 'Core model',
        bullets: [
          'AI executes by default',
          'Human reviews outcomes',
          'Ask for input only when blocked by platform constraints or required human action',
        ],
      },
      {
        heading: 'Result',
        text: 'This keeps momentum high, reduces friction, and turns ideas into shipped work faster.',
      },
    ],
  },
  {
    slug: 'react-hashrouter-to-browserrouter-seo',
    title: 'How I Migrated a React SPA from HashRouter to BrowserRouter for Better SEO',
    date: '2026-02-09',
    excerpt:
      'A practical migration from hash URLs to clean routes in React, including Vercel rewrites, sitemap updates, and Search Console reindexing.',
    sections: [
      {
        heading: 'The problem: hash routes were blocking discoverability',
        text: 'My site used HashRouter, which created URLs like /#/blog and /#/posts/slug. That works for client-side navigation, but it weakens indexability because crawlers treat those fragments differently and you end up with less reliable page-level ranking signals.',
      },
      {
        heading: 'Step 1: migrate React Router to clean paths',
        bullets: [
          'Swapped HashRouter for BrowserRouter in App.jsx',
          'Kept route structure identical (/blog, /portfolio, /posts/:slug, /projects/:slug)',
          'Updated internal links to always use clean paths',
        ],
      },
      {
        heading: 'Step 2: prevent 404s on deep links in Vercel',
        text: 'BrowserRouter requires server fallback so direct visits to /posts/some-slug do not 404. I added a Vercel route config that serves index.html for non-file paths after filesystem handling.',
      },
      {
        heading: 'Step 3: fix the sitemap to match real crawlable URLs',
        bullets: [
          'Removed all #/ entries from sitemap.xml',
          'Added canonical paths for blog, portfolio, project pages, and post pages',
          'Resubmitted sitemap in Google Search Console',
        ],
      },
      {
        heading: 'Step 4: tighten page-level SEO signals',
        bullets: [
          'Added dynamic title, description, canonical, OG, and Twitter tags per route',
          'Added JSON-LD schema by page type (WebPage, Blog, Article, CreativeWork)',
          'Added internal related links between posts and projects',
        ],
      },
      {
        heading: 'Search Console reindex workflow',
        bullets: [
          'Submit updated sitemap',
          'Use URL Inspection on home + key routes',
          'Request indexing for priority pages',
          'Monitor Coverage and Performance for 3-7 days before title tuning',
        ],
      },
      {
        heading: 'What changed after the migration',
        text: 'The site now exposes clean URLs, proper canonical signals, and crawl-friendly route behavior. That creates a stronger foundation for rankings than any one-off meta tag tweak. If your React app still uses hash routes, this migration is one of the highest-ROI SEO fixes you can make.',
      },
    ],
  },
]

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)
