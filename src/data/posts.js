export const posts = [
  {
    slug: 'react-router-vercel-404-fix',
    title: 'React Router + Vercel 404 Fix: Make Direct URL Visits Work in Production',
    date: '2026-02-09',
    excerpt:
      'Fix BrowserRouter 404 errors on Vercel with a safe SPA rewrite and a quick verification checklist for deep links and page refreshes.',
    sections: [
      {
        heading: 'Why this error happens',
        text: 'React Router handles routing in the browser, but Vercel handles requests on the server edge first. When someone opens /posts/my-article directly, Vercel looks for a matching file path. If no rewrite fallback exists, it returns a 404 before React ever gets a chance to render the route.',
      },
      {
        heading: 'The fix in plain English',
        text: 'Keep BrowserRouter for clean URLs, and tell Vercel to serve index.html for non-file routes. That way React can resolve the route client-side while real static assets still load normally.',
      },
      {
        heading: 'Code example: vercel.json rewrite for SPA routes',
        text: 'This rewrite catches app routes but avoids touching asset files like CSS, JS, or images.',
        code: `{
  "rewrites": [
    {
      "source": "/((?!.*\..*).*)",
      "destination": "/index.html"
    }
  ]
}`,
      },
      {
        heading: 'Code example: BrowserRouter route map',
        text: 'Make sure every deep link path exists in your client router. Rewrites only route traffic into the app—they do not create missing routes.',
        code: `import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/posts/:slug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  )
}`,
      },
      {
        heading: 'How to verify the fix after deploy',
        bullets: [
          'Open a deep URL directly in a fresh tab (not via in-app navigation)',
          'Refresh that deep URL and confirm it still loads',
          'Open DevTools Network and ensure JS/CSS assets return 200 responses',
          'Check sitemap URLs match real clean paths (no hash fragments)',
        ],
      },
      {
        heading: 'Common mistakes that cause repeat 404s',
        bullets: [
          'Using redirects instead of rewrites for SPA fallback behavior',
          'Applying a rewrite pattern that accidentally captures static asset files',
          'Forgetting to redeploy after editing vercel.json',
          'Mixing HashRouter links with BrowserRouter routes',
        ],
      },
      {
        heading: 'Related reading',
        bullets: [
          'How I Migrated a React SPA from HashRouter to BrowserRouter for Better SEO',
          'Practical SEO for React + Vite: Canonical URLs, Meta Tags, and JSON-LD That Actually Work',
          'MVP Website SEO Checklist: What to Do in Week 1 So Your Site Can Actually Be Discovered',
        ],
      },
    ],
  },
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
        heading: 'Start with clean route structure in React Router',
        bullets: [
          'Swapped HashRouter for BrowserRouter in App.jsx',
          'Kept route structure identical (/blog, /portfolio, /posts/:slug, /projects/:slug)',
          'Updated internal links to always use clean paths',
        ],
      },
      {
        heading: 'Add Vercel fallback behavior for deep links',
        text: 'BrowserRouter requires server fallback so direct visits to /posts/some-slug do not 404. I added a Vercel route config that serves index.html for non-file paths after filesystem handling.',
      },
      {
        heading: 'Publish a sitemap with only real crawlable URLs',
        bullets: [
          'Removed all #/ entries from sitemap.xml',
          'Added canonical paths for blog, portfolio, project pages, and post pages',
          'Resubmitted sitemap in Google Search Console',
        ],
      },
      {
        heading: 'Strengthen on-page signals so each route can rank',
        bullets: [
          'Added dynamic title, description, canonical, OG, and Twitter tags per route',
          'Added JSON-LD schema by page type (WebPage, Blog, Article, CreativeWork)',
          'Added internal related links between posts and projects',
        ],
      },
      {
        heading: 'How to verify indexing after the fix',
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
  {
    slug: 'seo-react-vite-canonical-meta-jsonld',
    title: 'Practical SEO for React + Vite: Canonical URLs, Meta Tags, and JSON-LD That Actually Work',
    date: '2026-02-09',
    excerpt:
      'A practical SEO setup for React + Vite apps: dynamic meta tags, canonical URLs, Open Graph, Twitter cards, and structured data by page type.',
    sections: [
      {
        heading: 'Why React SPAs miss rankings even when content is solid',
        text: 'Most React apps ship with one static index.html title and description. That means every route competes with weak or duplicate metadata, which makes it harder for search engines to understand page intent and rank individual URLs.',
      },
      {
        heading: 'The baseline SEO stack that made the biggest difference',
        text: 'I kept this intentionally simple: unique titles and descriptions per route, canonical URLs on every page, Open Graph/Twitter tags for better share previews, and clear robots directives for valid vs not-found states.',
      },
      {
        heading: 'Build a small dynamic SEO helper once',
        text: 'Instead of hardcoding tags in every component, I used a reusable setPageSeo helper to upsert meta tags, canonical links, and JSON-LD from each page component. This keeps SEO maintainable as routes scale.',
      },
      {
        heading: 'Use structured data by page type (not one-size-fits-all)',
        bullets: [
          'Home: WebPage schema',
          'Blog listing: Blog schema',
          'Post pages: Article schema with datePublished/dateModified',
          'Project pages: CreativeWork schema',
        ],
      },
      {
        heading: 'Canonical and route hygiene matter more than people think',
        text: 'Once routes are clean, canonical tags should match the exact preferred URL (no hash fragments, no duplicate variants). Combined with a clean sitemap, this gives crawlers one clear version of every page to index.',
      },
      {
        heading: 'Internal links complete the SEO loop',
        bullets: [
          'Link related posts from each post page',
          'Link projects from posts and posts from projects',
          'Use descriptive anchor text tied to your page topic',
        ],
      },
      {
        heading: 'The practical result',
        text: 'This setup does not guarantee instant rankings, but it fixes the technical bottlenecks that stop React SPAs from being discovered. Once this foundation is in place, content quality and consistent publishing become the main growth levers.',
      },
    ],
  },
  {
    slug: 'mvp-website-seo-checklist-week-one',
    title: 'MVP Website SEO Checklist: What to Do in Week 1 So Your Site Can Actually Be Discovered',
    date: '2026-02-09',
    excerpt:
      'A week-one SEO checklist for new websites: indexability, metadata, schema, internal links, Search Console workflows, and performance tracking.',
    sections: [
      {
        heading: 'Day 1: make sure search engines can actually crawl your pages',
        text: 'Start with basics that are easy to miss: allow crawling in robots.txt, publish a clean sitemap, and confirm direct route access works in production. Then submit the sitemap in Search Console so Google discovers URLs faster.',
      },
      {
        heading: 'Day 2: add page-level metadata and canonical tags',
        bullets: [
          'Unique title tag per page',
          'Unique meta description per page',
          'Canonical URL on every route',
          'Open Graph + Twitter tags for better sharing CTR',
        ],
      },
      {
        heading: 'Day 3: add structured data that matches page intent',
        bullets: [
          'WebPage schema for homepage',
          'Blog schema for blog index',
          'Article schema for post pages',
          'CreativeWork/Product schema for project pages',
        ],
      },
      {
        heading: 'Day 4: strengthen internal linking',
        text: 'Search engines discover and prioritize pages through internal links. Add related posts, related projects, and hub links so authority flows through the site instead of pooling on the homepage only.',
      },
      {
        heading: 'Day 5: start a weekly measurement loop',
        text: 'Use Search Console like a feedback system, not a dashboard you check once. Track indexing coverage, impressions, and CTR weekly, then tune titles and descriptions based on real query data. Keep publishing at least one relevant post per week so momentum compounds.',
      },
      {
        heading: 'Common MVP SEO mistakes to avoid',
        bullets: [
          'Using hash routes in production URLs',
          'Keeping one generic title for all pages',
          'Publishing posts without internal links',
          'Waiting for rankings without publishing new content',
        ],
      },
      {
        heading: 'Bottom line',
        text: 'Week-one SEO is not about hacks. It is about making your site technically readable, topically clear, and continuously updated. Once those three are in place, discoverability compounds over time.',
      },
    ],
  },
]

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)

export const sortPostsByNewest = (list) =>
  [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
