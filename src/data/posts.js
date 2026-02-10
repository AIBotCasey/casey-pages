export const posts = [
  {
    slug: "react-router-vercel-404-fix",
    title: "React Router + Vercel 404 Fix: Make Direct URL Visits Work in Production",
    date: "2026-02-09",
    excerpt: "Fix BrowserRouter 404 errors on Vercel with a safe SPA rewrite and a quick verification checklist for deep links and page refreshes.",
    sections: [
      {
        heading: "Why this error happens",
        text: "React Router handles routing in the browser, but Vercel handles requests on the server edge first. When someone opens /posts/my-article directly, Vercel looks for a matching file path. If no rewrite fallback exists, it returns a 404 before React ever gets a chance to render the route."
      },
      {
        heading: "The fix in plain English",
        text: "Keep BrowserRouter for clean URLs, and tell Vercel to serve index.html for non-file routes. That way React can resolve the route client-side while real static assets still load normally."
      },
      {
        heading: "Code example: vercel.json rewrite for SPA routes",
        text: "This rewrite catches app routes but avoids touching asset files like CSS, JS, or images.",
        code: "{\n  \rewrites: [\n    {\n      source: \"/((?!.*..*).*)\",\n      destination: \"/index.html\"\n    }\n  ]\n}"
      },
      {
        heading: "Code example: BrowserRouter route map",
        text: "Make sure every deep link path exists in your client router. Rewrites only route traffic into the app—they do not create missing routes.",
        code: "import { BrowserRouter, Routes, Route } from 'react-router-dom'\n\nexport default function App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/\" element={<HomePage />} />\n        <Route path=\"/blog\" element={<BlogPage />} />\n        <Route path=\"/posts/:slug\" element={<PostPage />} />\n      </Routes>\n    </BrowserRouter>\n  )\n}"
      },
      {
        heading: "How to verify the fix after deploy",
        bullets: [
          "Open a deep URL directly in a fresh tab (not via in-app navigation)",
          "Refresh that deep URL and confirm it still loads",
          "Open DevTools Network and ensure JS/CSS assets return 200 responses",
          "Check sitemap URLs match real clean paths (no hash fragments)"
        ]
      },
      {
        heading: "Common mistakes that cause repeat 404s",
        bullets: [
          "Using redirects instead of rewrites for SPA fallback behavior",
          "Applying a rewrite pattern that accidentally captures static asset files",
          "Forgetting to redeploy after editing vercel.json",
          "Mixing HashRouter links with BrowserRouter routes"
        ]
      },
      {
        heading: "When to consider a different approach",
        text: "If your app has mostly static content and strong SEO requirements, consider prerendering or server-side rendering instead of relying purely on SPA rewrites. Rewrites solve the 404 symptom, but they do not improve initial content rendering for every crawl scenario. For many product sites, BrowserRouter + rewrites is the right practical middle ground. But if organic traffic is your primary growth channel, it is worth evaluating whether hybrid rendering gives you better long-term visibility and performance."
      },
      {
        heading: "Production rollout notes that prevent regressions",
        text: "After you fix routing once, lock the behavior in so it does not break on the next deploy. Add a small smoke-test checklist to your release process: open a deep route directly, refresh it, then validate static assets still return JavaScript and CSS (not HTML fallback). Keep that check in CI or a post-deploy routine so future refactors do not silently reintroduce 404 behavior. Also document your rewrite intent in the repo next to vercel.json. Teams often lose context over time, and someone “cleaning up config” can remove the fallback rule because it looks redundant. Finally, keep your sitemap and canonical tags aligned with these clean routes. Routing fixes only create value when discovery signals and URL hygiene follow the same structure."
      },
      {
        heading: "Related reading",
        bullets: [
          "How I Migrated a React SPA from HashRouter to BrowserRouter for Better SEO",
          "Practical SEO for React + Vite: Canonical URLs, Meta Tags, and JSON-LD That Actually Work",
          "MVP Website SEO Checklist: What to Do in Week 1 So Your Site Can Actually Be Discovered"
        ]
      },
      {
        heading: "Full troubleshooting matrix for stubborn production 404s",
        text: "If the rewrite is in place and you still see intermittent 404s, check environment-specific causes in a fixed order. First validate domain-level routing: custom domain aliases can point to an older deployment while preview URLs are correct. Second validate cache behavior at the CDN edge; stale config can make one region behave differently from another. Third confirm your app does not generate malformed links during runtime (for example, missing leading slash or duplicated path segments) because those can bypass your expected route map. Fourth verify that your not-found UI is not being mistaken for a true 404 response: instrument both server status codes and client-side route state so you can tell which layer actually failed. Finally, test in incognito and on mobile networks to avoid local cache artifacts. Most teams solve this faster when they write down each check and expected outcome instead of debugging ad hoc."
      },
      {
        heading: "Production hardening checklist before closing the issue",
        text: "A robust fix is more than “page now loads.” Add one regression test path for every major content route (home, blog index, one post, one project). Include refresh tests, direct-entry tests, and copy-paste URL tests because users arrive through all three. Keep a release note entry describing why rewrites are required, and include a short comment in vercel.json so future contributors do not remove the rule by accident. If your team uses incident tracking, tag this class of issue as routing/infrastructure so future alerts are searchable. Also monitor Search Console coverage in the days after deploy; crawl anomalies can surface route problems that users did not report yet. This turns a one-off patch into a durable operational fix."
      },
      {
        heading: "Reader FAQ and edge cases",
        text: "Teams often ask whether this fix hurts performance or caching. In practice, performance impact is negligible when rewrites are scoped correctly because static assets still resolve directly and only route-like paths fall back to index.html. Another common question is whether this conflicts with API routes: it should not if your rewrite excludes file/API patterns intentionally. For multi-app setups, verify each app has explicit domain and route boundaries to avoid overlapping rules. If your deployment platform changes, replicate the same logical behavior (serve shell for app routes, preserve static/API handling) rather than copying provider-specific syntax blindly. Finally, document this behavior in onboarding docs. Routing failures are expensive precisely because people rediscover them under deadline pressure. A short runbook saves hours later."
      }
    ]
  },
  {
    slug: "how-we-shipped-car-deal-checker-live-with-secure-auth",
    title: "How We Shipped Car Deal Checker Live with Secure Auth (in One Sprint)",
    date: "2026-02-08",
    excerpt: "From blank repo to production launch: private GitHub repo, Vercel deployment, Supabase auth with Google OAuth, backend-only secret handling, and production web app architecture.",
    sections: [
      {
        heading: "The goal",
        text: "Ship a public used-car buying app that feels real, moves fast, and does not leak secrets. The product needed a proper landing page, login flow, protected app, and reliable API architecture."
      },
      {
        heading: "What we launched",
        bullets: [
          "VIN decode + recall checks via NHTSA APIs",
          "Live comps pricing path via MarketCheck with confidence gating",
          "Login + signup + Google OAuth using Supabase Auth",
          "Protected API routes using bearer token verification server-side",
          "History persistence for user deal checks in Supabase",
          "Vercel production deployment with serverless routing fix"
        ]
      },
      {
        heading: "Security decisions that mattered",
        bullets: [
          "No secret keys in frontend code (service keys stay server-only)",
          "Added Helmet security headers + rate limiting + input validation",
          "Removed trust in client-sent identity and derived user from verified token",
          "Locked env handling so .env stays out of source control"
        ]
      },
      {
        heading: "Hard lessons during launch",
        bullets: [
          "A blank page can be a CSP mismatch — security headers must match your asset strategy",
          "404s in production were routing config issues, not app logic",
          "“Auth not configured” can be a UI state bug even when backend config is correct"
        ]
      },
      {
        heading: "What I would do next if shipping v2",
        text: "The next leverage point is trust and transparency. I would add a small “How we calculated this” panel for each valuation result, so users can understand the confidence level and inputs behind recommendations. I would also add lightweight error telemetry and user-facing diagnostics so production incidents are easier to trace without exposing sensitive internals. Finally, I would prioritize a tighter feedback loop between user actions and product improvements by tagging common workflow drop-off points. These upgrades do not sound flashy, but they are usually what separates a demo app from something users return to and recommend."
      },
      {
        heading: "What made this launch stable instead of fragile",
        text: "The main reason this shipped cleanly was discipline around boundaries: secrets stayed server-side, auth was verified on protected routes, and deployment behavior was tested in production-like conditions instead of only local dev. If you want similar outcomes, treat security and deployment wiring as core product work, not “after launch” work. A practical way is to create a short launch gate with non-negotiables: token verification works, sensitive keys never reach client bundles, error states are user-readable, and one-click rollback is possible. This mindset saves enormous time compared with hotfixing security and routing under live pressure. It also gives users confidence because the first version feels trustworthy, not experimental."
      },
      {
        heading: "Architecture decisions that reduced launch risk",
        text: "A key launch lesson is that architecture choices made early determine whether you can ship quickly later. Keeping auth verification server-side removed an entire class of trust bugs where client claims could be spoofed. Isolating secrets in backend-only paths meant frontend iteration could continue without security regressions every time UI code changed. Separating valuation logic from transport logic made debugging far easier: when output looked wrong, we could inspect data quality independently from route handling. This separation also made it simpler to add guardrails like confidence thresholds, because business logic remained centralized. Teams often move faster when they intentionally choose boring, testable patterns over clever shortcuts during MVP phase."
      },
      {
        heading: "Operational playbook for maintaining quality after launch",
        text: "Shipping is day one, not done. Post-launch, the most useful routine is a weekly quality pass: inspect auth logs for unusual failures, sample valuation results for obvious outliers, and review rate-limit hits to catch abuse or configuration drift. Keep a visible backlog of user-friction moments—slow lookups, unclear error messages, and confusing confidence output—then ship one quality improvement every sprint. This creates steady trust growth without large rewrites. Add synthetic checks for critical routes so deploy issues are caught automatically. Over time, users care less about your internal stack and more about reliability: fast responses, clear reasoning, and consistent outcomes. This maintenance rhythm is what preserves product credibility."
      },
      {
        heading: "Reader FAQ and edge cases",
        text: "A frequent question after launch is where to spend effort first: more features or more reliability. For products with real users, reliability usually wins. Add clearer error messages, instrument key flows, and tighten data confidence presentation before expanding surface area. Another question is whether strict backend-only secret handling slows development; usually it speeds teams up long-term because boundaries are clear and audits are simpler. People also ask if MVP security is “too much” this early. In practice, lightweight guardrails are cheaper than emergency cleanup after adoption. The key is proportional controls: protect secrets, verify identity server-side, and log enough context to debug safely. This balance keeps velocity high while avoiding trust-breaking failures."
      },
      {
        heading: "Implementation recap",
        text: "If you are applying this pattern to your own app, treat launch readiness as a checklist with ownership, not a vague milestone. Assign one owner for auth correctness, one for deployment behavior, and one for observability. Run a full user journey from signup to protected actions on production URLs before announcing publicly. Keep a rollback note with the exact steps and who executes them. This reduces decision latency during incidents. Clear ownership and rehearsal are what make launches feel controlled rather than chaotic."
      },
      {
        heading: "Final takeaway",
        text: "This launch pattern is repeatable for other products: secure defaults, explicit ownership, and production-first testing."
      },
      {
        heading: "Bottom line",
        text: "Car Deal Checker is now live and production-grade for MVP use: real auth, protected APIs, and deployment wiring that can scale. Next step is tightening valuation quality and adding a lightweight admin diagnostics panel."
      }
    ]
  },
  {
    slug: "trading-journal-one-offline-futures-trading-journal",
    title: "Trading Journal One: The Offline Futures Trading Journal for Serious Day Traders",
    date: "2026-02-08",
    excerpt: "Trading Journal One is a local-first futures trading journal desktop app for day traders to improve discipline, review performance, and protect private trading data.",
    sections: [
      {
        heading: "What is Trading Journal One?",
        text: "Trading Journal One (FTJournal) is a desktop trading journal for futures traders who want a focused, private workflow. It runs locally on macOS and Windows, uses SQLite with optional encryption, and does not require an account or cloud login."
      },
      {
        heading: "Core features for futures day trading review",
        bullets: [
          "Trade logging: add, edit, and review completed futures trades",
          "Rules checklist on every trade to reinforce process discipline",
          "Calendar-based journal with daily drill-down into trades and notes",
          "Filters and quick stats by symbol, session, outcome, and date",
          "CSV import for migrating trade history into one journal",
          "Local backup and restore so you control your own data lifecycle"
        ]
      },
      {
        heading: "Why traders use it",
        bullets: [
          "Improve consistency: track whether you followed your setup rules, not just PnL",
          "Faster weekly review: quickly isolate patterns in winning and losing sessions",
          "Better execution quality: capture context, notes, and outcomes in one place",
          "Privacy by design: no cloud dependency, no mandatory account, no sign-in friction"
        ]
      },
      {
        heading: "Who this is best for",
        text: "If you are a discretionary futures day trader, prop-style trader, or anyone building a repeatable trading process, Trading Journal One gives you a practical and private way to measure improvement over time."
      },
      {
        heading: "How to get better results from this journal",
        text: "The biggest gains usually come from consistency, not complexity. Pick one review cadence and keep it—daily for active traders or weekly for part-time traders. During review, focus on repeated behavior patterns rather than single outlier trades. A practical method is to score each trade on rule adherence, execution quality, and emotional control, then compare that score against PnL over time. This turns the journal into a coaching tool instead of a storage tool. Over a month, those behavior metrics often reveal bigger performance leaks than your entry strategy does."
      },
      {
        heading: "How readers can apply this immediately",
        text: "If you are evaluating whether a journal will improve your trading, run a two-week trial with a strict review routine. Log every trade with setup, execution quality, and emotional state. At the end of each week, look for recurring behavioral patterns—not just PnL outcomes. You want to find the same mistakes repeating across sessions: early entries, ignored checklist steps, overtrading after losses, or unmanaged risk sizing. Those are the leaks a journal helps close. Keep your process simple enough to sustain daily. Most traders fail not because they lack tools, but because their review system is inconsistent. A local-first journal removes friction and protects privacy, which makes consistency easier."
      },
      {
        heading: "Framework for weekly review that actually changes behavior",
        text: "A useful review is structured and repeatable. Start by grouping trades by setup type, then compare execution quality before comparing profit and loss. This helps you identify whether performance comes from edge or luck. Next, classify losses into avoidable versus acceptable losses; avoidable losses usually map to rule violations, emotional overreaction, or poor sizing discipline. Then review your notes for language patterns—phrases like “felt rushed” or “chased move” often correlate with repeated mistakes. Finish with one behavioral adjustment for next week, not five. Small consistent adjustments outperform aggressive strategy changes because they are easier to execute under pressure. This is where journaling creates compounding value."
      },
      {
        heading: "Practical data fields that improve decision quality",
        text: "Many traders track too little context and then wonder why reviews feel vague. In addition to entry/exit and PnL, log planned setup, invalidation level, expected holding time, and whether the trade matched pre-session intent. Add one emotional field before entry and one after exit; this reveals whether emotional state predicts execution quality. Capture market context too: volatility regime, session timing, and key levels can explain why a setup underperforms in certain conditions. The goal is not more data for its own sake, but better feedback loops. Good journaling turns subjective memory into measurable behavior patterns you can improve deliberately."
      },
      {
        heading: "Reader FAQ and edge cases",
        text: "Readers also ask whether manual journaling is worth the effort versus broker exports alone. Broker exports are useful for raw trade data, but they rarely capture decision context, emotional state, and rule adherence—the exact variables that drive behavior change. Another common concern is “what if I miss entries?” The answer is to optimize for consistency over perfection: log essentials first, enrich during review sessions. Some traders worry that too much analysis causes hesitation. A good framework prevents that by separating trading time from review time; execution stays simple while analysis happens post-session. Finally, privacy matters more than many expect: local-first tools reduce account friction and make honest journaling easier because users feel ownership over their data."
      },
      {
        heading: "Implementation recap",
        text: "For long-term benefit, pair journaling with one monthly retrospective. Compare your best week and worst week and identify the behavior difference, not just market conditions. This helps you design rules that survive different environments. Keep templates simple and repeatable so review does not become a burden. The goal is sustained improvement, not perfect documentation."
      },
      {
        heading: "Final takeaway",
        text: "The real edge is disciplined review behavior sustained over time."
      },
      {
        heading: "Practical adoption note",
        text: "If you want this to become a long-term habit, reduce friction aggressively. Use fixed templates, pre-filled tags, and one review ritual that fits your real schedule. The point is to make reflection unavoidable but lightweight. When journaling becomes easy to maintain, insights accumulate naturally and your execution quality improves with less emotional volatility."
      },
      {
        heading: "Bottom line",
        text: "Most traders do not need more indicators; they need better feedback loops. Trading Journal One is built to be that loop: log the trade, review the behavior, and sharpen the process."
      }
    ]
  },
  {
    slug: "operating-model-ai-executes-human-reviews",
    title: "Operating Model: AI Executes, Human Reviews",
    date: "2026-02-07",
    excerpt: "A practical operating model for teams using AI in production: let the agent execute by default, then keep humans focused on review, risk, and quality.",
    sections: [
      {
        heading: "Why this model works in real teams",
        text: "Most teams get stuck when AI is treated like a suggestion engine instead of an execution engine. The momentum comes from flipping that: let AI do the first pass of real work quickly, and let humans spend their energy on final judgment, prioritization, and risk calls."
      },
      {
        heading: "The core workflow",
        text: "The AI executes by default, humans review outcomes, and user input is requested only when a platform block, policy boundary, or required human action appears. This keeps speed high without ignoring safety or quality control."
      },
      {
        heading: "Where teams usually break this pattern",
        bullets: [
          "Asking for approval before every low-risk step",
          "Letting AI produce output without review checkpoints on high-impact actions",
          "Treating tool access as a substitute for process discipline"
        ]
      },
      {
        heading: "How to apply it this week",
        bullets: [
          "Define which tasks are safe for autonomous execution",
          "Define review checkpoints for risky or external actions",
          "Track outcomes weekly and tighten prompts/processes based on misses"
        ]
      },
      {
        heading: "A practical rollout plan",
        text: "Start small with one workflow your team already runs repeatedly, such as issue triage, status summaries, or deployment checklists. Define what AI can do without approval, what requires human review, and what is blocked by policy. Run the system for two weeks, then audit outcomes with a simple scorecard: speed, quality, and incident rate. If quality drops, tighten prompts and constraints before expanding scope. If quality holds, gradually give the system more execution authority. This staged approach builds trust because people can see the model working in real operations, not just in demos."
      },
      {
        heading: "When this model should be adjusted",
        text: "This model is strongest when task repeatability is high and risk is clearly bounded. If the workflow involves legal exposure, financial execution, or public messaging, tighten review thresholds and add explicit approval checkpoints. The goal is not “AI everywhere,” but the right autonomy level per task. Start with low-risk operational work, measure quality, then expand scope only when outcomes are stable. Teams that skip this staged rollout often create trust problems quickly. Teams that phase autonomy deliberately usually get both speed and reliability. The core principle is simple: automate default execution, keep humans focused where judgment matters, and continuously tune boundaries from real-world results."
      },
      {
        heading: "Governance layer: how to keep speed without losing control",
        text: "Execution-first AI models work best when governance is explicit. Define three action tiers: low-risk autonomous actions, medium-risk actions requiring asynchronous review, and high-risk actions requiring explicit approval. Document examples for each tier so decisions are predictable across teammates. Add simple audit logs for autonomous actions so reviewers can quickly see what happened and why. Use a rollback mindset: any automated step should be reversible where possible. This does not slow teams down; it removes ambiguity and prevents panic when something unexpected occurs. Speed and oversight are not opposites when boundaries are clearly designed."
      },
      {
        heading: "Metrics that show whether the model is working",
        text: "Measure this model with operational metrics, not vibes. Track cycle time reduction, rework rate, and incident frequency per workflow. A healthy rollout shows faster completion with stable or improving quality. If output volume rises but rework rises faster, autonomy is likely too high for current prompt/process quality. Add a weekly review where failures are categorized into prompt gaps, tool limitations, or policy boundary issues. Then address one root cause per cycle. Over several weeks, this creates measurable improvement and stronger trust in the system. Teams succeed when they tune the process continuously rather than debating AI in the abstract."
      },
      {
        heading: "Reader FAQ and edge cases",
        text: "Common pushback is that this model sounds risky for critical operations. The practical answer is to scope autonomy by risk tier, not apply one policy everywhere. Another question is whether teams lose expertise when AI executes more. In healthy systems, the opposite happens: humans spend less time on repetitive mechanics and more time on architecture, review quality, and exception handling. People also ask how to onboard new teammates; provide concrete examples of approved autonomous actions, review-required actions, and blocked actions. Keep those examples updated from real incidents. The model works best when expectations are explicit and learnings are documented quickly. Over time, teams that operationalize this approach tend to ship faster with fewer bottlenecks and clearer accountability."
      },
      {
        heading: "Implementation recap",
        text: "To make adoption smooth, publish a one-page operating guide in plain language and revisit it after each incident review. Teams align faster when they can see concrete examples of acceptable autonomy and review expectations. This reduces debate in the moment and keeps execution velocity consistent across contributors."
      },
      {
        heading: "Final takeaway",
        text: "Keep the model simple: automate routine execution, review high-impact outcomes, and improve boundaries every cycle with evidence."
      },
      {
        heading: "Practical adoption note",
        text: "Adoption gets easier when leaders model the behavior publicly. Share examples where AI handled routine execution and humans focused on critical judgment. Celebrate both speed gains and quality wins, and be transparent about misses plus fixes. This builds confidence that the model is practical, not theoretical, and encourages healthy experimentation without reducing accountability."
      },
      {
        heading: "One-sentence operating rule",
        text: "Automate repeatable execution by default, require human review for high-impact outcomes, and continuously tighten boundaries based on observed quality and risk. Keep the review loop short so learning compounds quickly each week."
      },
      {
        heading: "Bottom line",
        text: "This model reduces handoff friction and ships faster while keeping humans in charge of what matters most: quality, safety, and final accountability."
      }
    ]
  },
  {
    slug: "react-hashrouter-to-browserrouter-seo",
    title: "How I Migrated a React SPA from HashRouter to BrowserRouter for Better SEO",
    date: "2026-02-09",
    excerpt: "A practical migration from hash URLs to clean routes in React, including Vercel rewrites, sitemap updates, and Search Console reindexing.",
    sections: [
      {
        heading: "The problem: hash routes were blocking discoverability",
        text: "My site used HashRouter, which created URLs like /#/blog and /#/posts/slug. That works for client-side navigation, but it weakens indexability because crawlers treat those fragments differently and you end up with less reliable page-level ranking signals."
      },
      {
        heading: "Start with clean route structure in React Router",
        text: "The first move is simple: replace HashRouter with BrowserRouter and keep your route map explicit for pages like /blog, /portfolio, /posts/:slug, and /projects/:slug. Then make sure internal links consistently use clean paths so users and crawlers see one canonical URL shape."
      },
      {
        heading: "Add Vercel fallback behavior for deep links",
        text: "BrowserRouter requires server fallback so direct visits to /posts/some-slug do not 404. I added a Vercel route config that serves index.html for non-file paths after filesystem handling."
      },
      {
        heading: "Publish a sitemap with only real crawlable URLs",
        text: "After the router migration, make the sitemap reflect reality. Remove hash-fragment URLs, include only canonical clean paths, and resubmit the updated sitemap in Search Console so crawl discovery aligns with your production routing."
      },
      {
        heading: "Strengthen on-page signals so each route can rank",
        text: "This is where clean routing turns into real discoverability: assign unique title/description/canonical tags per route, layer in schema by page type, and add internal links between related posts and project pages so topical authority can flow through the site."
      },
      {
        heading: "How to verify indexing after the fix",
        bullets: [
          "Submit updated sitemap",
          "Use URL Inspection on home + key routes",
          "Request indexing for priority pages",
          "Monitor Coverage and Performance for 3-7 days before title tuning"
        ]
      },
      {
        heading: "How to validate this in production without guesswork",
        text: "After deploying, test this as a user would: open deep links directly in fresh tabs, refresh those pages, and verify they still load. Then inspect network requests to confirm static assets return properly and are not accidentally rewritten to HTML. In Search Console, re-submit sitemap and inspect your top routes manually. If Google crawls clean routes and canonical tags align, you will usually see indexing improve over the next crawl cycles. This validation loop matters because router changes can look correct in local dev while still failing in real deployment environments."
      },
      {
        heading: "What changed after the migration",
        text: "The site now exposes clean URLs, proper canonical signals, and crawl-friendly route behavior. That creates a stronger foundation for rankings than any one-off meta tag tweak. If your React app still uses hash routes, this migration is one of the highest-ROI SEO fixes you can make."
      },
      {
        heading: "Migration checklist for teams with existing traffic",
        text: "If your site already has indexed pages, migrate carefully to avoid losing signal. First map old URL patterns to new canonical paths and make sure internal links update consistently. Then deploy rewrites and verify key routes manually before requesting reindexing. Keep metadata stable during the same window so Google sees a clean routing change, not a full-page identity change. After deploy, monitor Search Console coverage and crawl stats for a few days before making additional SEO edits. This staged approach reduces churn and makes troubleshooting clearer if anything drops. Treat routing migration like infrastructure work: controlled, observable, and reversible if needed."
      },
      {
        heading: "Migration plan for live sites with existing backlinks",
        text: "When migrating an already-indexed site, protect link equity carefully. Inventory your highest-traffic pages first and validate their new clean routes before broader rollout. Keep canonical tags stable and aligned with the new path strategy from day one. Update internal navigation, footer links, and any hardcoded references in markdown content so crawlers and users reinforce the same URL shape. If external backlinks still point to old formats, keep graceful handling where possible and monitor crawl reports for unexpected soft-404 behavior. The migration should feel boring to users: everything still works, but URLs are cleaner and more index-friendly."
      },
      {
        heading: "Post-migration monitoring signals that matter most",
        text: "After launch, focus on leading indicators rather than waiting for ranking jumps. Check crawl stats, indexed page counts, and coverage warnings first. Then review query impressions for key routes to confirm Google is attributing traffic to the new canonical URLs. Watch for duplicate title/description alerts that can appear when migration and metadata changes overlap. If you see indexing volatility, avoid large additional edits for a few days; isolate variables so you can diagnose accurately. This monitoring discipline turns migration from a risky one-time event into a controlled SEO improvement project."
      },
      {
        heading: "Reader FAQ and edge cases",
        text: "A common concern is whether this migration should be done all at once or incrementally. If your traffic is meaningful, incremental is safer: migrate core routes, verify indexing behavior, then expand. Another question is whether old hash links need permanent support. In many cases, yes—at least temporarily—through graceful redirects or clear navigation pathways so existing bookmarks do not become dead ends. Teams also ask how long to wait before judging impact; usually a few crawl cycles are needed before conclusions are reliable. Avoid making large simultaneous changes to content, metadata, and routing if you want clear attribution. Treat migration as controlled infrastructure change, measure calmly, and iterate with evidence rather than assumptions."
      },
      {
        heading: "Implementation recap",
        text: "As a final safeguard, add one automated end-to-end check that opens a deep route and asserts successful render after refresh. Automated checks catch routing regressions earlier than manual QA and make your migration benefits durable across future releases."
      },
      {
        heading: "Final takeaway",
        text: "Treat routing changes as infrastructure: plan, validate, monitor, and document."
      }
    ]
  },
  {
    slug: "seo-react-vite-canonical-meta-jsonld",
    title: "Practical SEO for React + Vite: Canonical URLs, Meta Tags, and JSON-LD That Actually Work",
    date: "2026-02-09",
    excerpt: "A practical SEO setup for React + Vite apps: dynamic meta tags, canonical URLs, Open Graph, Twitter cards, and structured data by page type.",
    sections: [
      {
        heading: "Why React SPAs miss rankings even when content is solid",
        text: "Most React apps ship with one static index.html title and description. That means every route competes with weak or duplicate metadata, which makes it harder for search engines to understand page intent and rank individual URLs."
      },
      {
        heading: "The baseline SEO stack that made the biggest difference",
        text: "I kept this intentionally simple: unique titles and descriptions per route, canonical URLs on every page, Open Graph/Twitter tags for better share previews, and clear robots directives for valid vs not-found states."
      },
      {
        heading: "Build a small dynamic SEO helper once",
        text: "Instead of hardcoding tags in every component, I used a reusable setPageSeo helper to upsert meta tags, canonical links, and JSON-LD from each page component. This keeps SEO maintainable as routes scale."
      },
      {
        heading: "Use structured data by page type (not one-size-fits-all)",
        text: "Search engines understand context better when schema matches intent. Use WebPage for the homepage, Blog for the listing page, Article for post pages, and CreativeWork for project pages. This clarity helps Google map your content architecture more reliably."
      },
      {
        heading: "Canonical and route hygiene matter more than people think",
        text: "Once routes are clean, canonical tags should match the exact preferred URL (no hash fragments, no duplicate variants). Combined with a clean sitemap, this gives crawlers one clear version of every page to index."
      },
      {
        heading: "Internal links complete the SEO loop",
        text: "Once technical tags are in place, internal links become the force multiplier. Link related posts to each other, connect posts to relevant projects, and use descriptive anchor text so readers and crawlers can follow your topic graph naturally."
      },
      {
        heading: "Implementation order that minimizes rework",
        text: "If you are applying this to an existing project, sequence matters. Start by fixing routing and canonical behavior first, because everything else depends on stable URLs. Then apply dynamic metadata per page, followed by schema, then internal linking. Doing this out of order can create noisy data and duplicate signals in Search Console, which makes debugging harder. Keep each change small and testable, and log what changed before every deployment. That discipline gives you cleaner cause-and-effect when rankings and indexing behavior shift over time."
      },
      {
        heading: "The practical result",
        text: "This setup does not guarantee instant rankings, but it fixes the technical bottlenecks that stop React SPAs from being discovered. Once this foundation is in place, content quality and consistent publishing become the main growth levers."
      },
      {
        heading: "How to maintain this setup as content grows",
        text: "The biggest failure mode is entropy: new pages get added faster than metadata and schema stay consistent. Prevent that by standardizing page-level SEO fields in your content model (title, description, slug, canonical path intent). Use one helper to apply tags and schema so behavior stays centralized instead of scattered across components. Then add a lightweight content QA pass before publish: check canonical correctness, title uniqueness, and schema type fit. This turns SEO from a one-time project into an operational habit. The teams that win organic long-term are not the ones with perfect initial setup—they are the ones that keep their implementation clean as the site scales."
      },
      {
        heading: "Editorial workflow that keeps metadata quality high",
        text: "As the blog grows, metadata quality often decays unless ownership is clear. A practical approach is to treat title, excerpt, and canonical intent as required fields in the content workflow. Before publishing, run a quick review pass: does this page have a unique angle, does the title match user intent, and does the description promise the core value clearly? This takes minutes but prevents weak SERP snippets that suppress CTR. Keep a simple log of title changes and their performance impact, so your team learns what framing actually drives clicks in your niche. Over time, this creates institutional SEO judgment rather than one-off optimization efforts."
      },
      {
        heading: "Schema implementation pitfalls and how to avoid them",
        text: "Structured data helps only when it is accurate and consistent. Common mistakes include using the wrong schema type for page intent, forgetting to update dateModified on meaningful edits, and publishing conflicting URLs between schema and canonical tags. Another subtle issue is duplicating stale schema in static templates while also injecting dynamic schema at runtime. Keep one clear source of truth and validate output periodically with testing tools. Schema should clarify your content model, not create conflicting signals. When implemented cleanly, it improves crawl interpretation and supports richer understanding of your pages."
      },
      {
        heading: "Reader FAQ and edge cases",
        text: "People frequently ask if this stack is enough without SSR. For many product and portfolio sites, yes—if routing, metadata, schema, and internal linking are consistent and content quality is strong. Another question is how often to update metadata after publish. The best trigger is data: adjust titles/descriptions when impressions rise but CTR underperforms, or when search intent shifts. Teams also wonder whether schema needs to be perfect from day one. Start with correct type mapping and valid structure, then refine as content matures. The practical goal is coherence, not complexity. A stable technical foundation plus continuous editorial improvement outperforms one-time “advanced SEO” efforts in most real projects."
      },
      {
        heading: "Implementation recap",
        text: "A simple monthly SEO maintenance pass keeps this system healthy: validate schema output, spot-check canonical tags, and review low-CTR pages for title improvements. Small recurring maintenance beats occasional large cleanups."
      },
      {
        heading: "Final takeaway",
        text: "Centralized implementation plus recurring maintenance is the winning combination."
      }
    ]
  },
  {
    slug: "mvp-website-seo-checklist-week-one",
    title: "MVP Website SEO Checklist: What to Do in Week 1 So Your Site Can Actually Be Discovered",
    date: "2026-02-09",
    excerpt: "A week-one SEO checklist for new websites: indexability, metadata, schema, internal links, Search Console workflows, and performance tracking.",
    sections: [
      {
        heading: "Day 1: make sure search engines can actually crawl your pages",
        text: "Start with basics that are easy to miss: allow crawling in robots.txt, publish a clean sitemap, and confirm direct route access works in production. Then submit the sitemap in Search Console so Google discovers URLs faster."
      },
      {
        heading: "Day 2: publish clear page-level metadata",
        text: "Give every important page its own title and description, set canonical URLs, and include Open Graph/Twitter tags for stronger social snippets. This reduces ambiguity and improves click-through potential from both search and social surfaces."
      },
      {
        heading: "Day 3: add structured data that matches page intent",
        text: "Use schema to remove guesswork for crawlers: WebPage for home, Blog for your listing page, Article for each post, and CreativeWork or Product for project pages. Think of this as explicit labeling for your content model."
      },
      {
        heading: "Day 4: strengthen internal linking",
        text: "Search engines discover and prioritize pages through internal links. Add related posts, related projects, and hub links so authority flows through the site instead of pooling on the homepage only."
      },
      {
        heading: "Day 5: start a weekly measurement loop",
        text: "Use Search Console like a feedback system, not a dashboard you check once. Track indexing coverage, impressions, and CTR weekly, then tune titles and descriptions based on real query data. Keep publishing at least one relevant post per week so momentum compounds."
      },
      {
        heading: "Common MVP SEO mistakes to avoid",
        bullets: [
          "Using hash routes in production URLs",
          "Keeping one generic title for all pages",
          "Publishing posts without internal links",
          "Waiting for rankings without publishing new content"
        ]
      },
      {
        heading: "How to keep momentum after week one",
        text: "Treat week one as setup, not finish line. In week two and beyond, your priority is consistency: publish one strong article per week, link it into your existing content graph, and review query-level data in Search Console every few days. Identify pages with impressions but low CTR and improve titles/descriptions first before rewriting entire posts. Over time, this repeatable loop outperforms one-time “big SEO pushes.” The sites that grow are usually the ones that keep shipping useful content while continuously tightening technical and editorial quality."
      },
      {
        heading: "What week two and beyond should look like",
        text: "Once week-one foundations are complete, growth depends on consistency and feedback loops. Publish one strong article each week tied to real search intent, connect it to related posts/projects, and review query-level performance in Search Console. Focus first on pages that already receive impressions but low CTR—title and description improvements can unlock gains quickly. Keep technical hygiene steady (sitemap freshness, canonical consistency, crawlability), then let content breadth expand over time. Discoverability compounds when both the technical layer and publishing rhythm remain stable. Think in months, not days, and optimize from observed behavior rather than assumptions."
      },
      {
        heading: "How to prioritize when time is limited",
        text: "If you can only do a few things in week one, prioritize in this order: crawlability, stable routing, unique metadata, and internal linking. Many teams spend too much time on cosmetic tweaks while missing indexability blockers that prevent discovery altogether. Use a simple priority rule: fix what affects all pages before optimizing individual pages. A broken routing/canonical setup can invalidate great content work. Once foundations are stable, choose one high-intent topic and publish a thorough resource article that solves a concrete problem. Depth plus technical hygiene is a stronger growth combo than publishing many thin posts quickly."
      },
      {
        heading: "30-day follow-through plan after initial setup",
        text: "Weeks two through four should be execution, not reinvention. Publish consistently on one topic cluster, interlink each post to related pages, and review Search Console every week for impression and CTR movement. When you find pages with impressions but low clicks, revise titles and descriptions first because that is usually the fastest lift. When you find pages with low impressions, improve topic targeting and internal links. Keep your sitemap updated as new posts go live. By day 30, you should have a clearer signal about which themes attract demand, and that data should drive your next content calendar."
      },
      {
        heading: "Reader FAQ and edge cases",
        text: "Another frequent question is whether this checklist applies to tiny sites with only a few pages. It does—small sites benefit even more because each page carries more weight. Teams also ask when backlinks should become a focus. Start outreach after technical basics and a few high-quality resource posts are live; otherwise, new visitors arrive to weak foundations. There is also concern about moving too slowly by doing setup first. In practice, a few days of technical setup prevents weeks of confusion later. The best approach is parallel momentum: lock fundamentals early, then publish consistently with measurable goals. The combination of clean infrastructure and sustained useful content is what creates durable discoverability over time."
      },
      {
        heading: "Implementation recap",
        text: "If your team is tiny, keep the system lightweight: one publishing cadence, one analytics review day, one optimization focus each week. The consistency of this loop is more valuable than sophisticated tooling during early growth stages."
      },
      {
        heading: "Final takeaway",
        text: "Strong foundations plus consistent publishing is what compounds discoverability."
      },
      {
        heading: "Practical adoption note",
        text: "Remember that discoverability is a systems outcome. Technical setup, publishing cadence, and iteration discipline all matter. If one part is missing, growth stalls. Keep the loop simple, repeatable, and measurable, and your site becomes more useful and more visible over time."
      },
      {
        heading: "Bottom line",
        text: "Week-one SEO is not about hacks. It is about making your site technically readable, topically clear, and continuously updated. Once those three are in place, discoverability compounds over time."
      }
    ]
  },
  {
    slug: "vite-environment-variables-not-working-production",
    title: "Vite Environment Variables Not Working in Production: A Complete Fix Guide",
    date: "2026-02-09",
    excerpt: "If your Vite app works locally but breaks after deploy, this guide shows exactly why environment variables fail in production and how to fix them safely.",
    sections: [
      {
        heading: "What breaks in production (and how it usually looks)",
        text: "You ship a Vite app, local development looks perfect, and then production starts failing in weird ways. API requests point to undefined URLs, feature flags are always false, analytics never initializes, or OAuth callbacks use the wrong domain. In browser logs, you may see values like undefined where you expected import.meta.env.VITE_API_URL. The frustrating part is that nothing obvious changed in your app logic. This usually is not a React bug or a deploy-platform bug by itself. It is a build-time configuration mismatch between how Vite injects variables and how your hosting environment provides them. Once you understand that one sentence deeply, this class of issue becomes straightforward to prevent."
      },
      {
        heading: "Why this issue happens",
        text: "Vite does not read frontend environment variables at runtime from your server process the way many Node backends do. It statically replaces import.meta.env references at build time. That means the values must exist in the environment when npm run build executes. If variables are missing then, the built bundle literally bakes in empty or fallback values. A second common trap is naming: only variables prefixed with VITE_ are exposed to client code. If you define API_URL without the prefix, Vite intentionally hides it. A third trap is assuming .env files are always loaded in production. Many hosts ignore repo .env files for security and expect dashboard-configured environment variables instead. So the app compiles, but with missing inputs."
      },
      {
        heading: "Exact implementation steps to fix it",
        bullets: [
          "Audit every frontend variable reference and ensure it uses import.meta.env.VITE_* naming",
          "Create or update .env.production locally for reproducible production builds",
          "Set the same variables in your hosting provider environment settings (for the correct environment: production/preview)",
          "Trigger a fresh deployment so a new build runs with updated values",
          "Verify bundled output behavior by testing real production URLs, not only local dev"
        ]
      },
      {
        heading: "Code example: correct variable access in Vite",
        text: "Use import.meta.env and defensive checks early in app startup so failures are explicit, not silent.",
        code: "// src/config/env.ts\nconst required = ['VITE_API_URL', 'VITE_APP_ENV'] as const\n\nfor (const key of required) {\n  if (!import.meta.env[key]) {\n    throw new Error(`Missing required env var: ${key}`)\n  }\n}\n\nexport const env = {\n  apiUrl: import.meta.env.VITE_API_URL,\n  appEnv: import.meta.env.VITE_APP_ENV,\n  enableDebugTools: import.meta.env.VITE_ENABLE_DEBUG_TOOLS === 'true',\n}\n"
      },
      {
        heading: "Code example: environment files for local and production",
        text: "Keep local and production values explicit. Never commit secrets that should stay server-side.",
        code: "# .env\nVITE_API_URL=http://localhost:4000\nVITE_APP_ENV=development\nVITE_ENABLE_DEBUG_TOOLS=true\n\n# .env.production\nVITE_API_URL=https://api.yourdomain.com\nVITE_APP_ENV=production\nVITE_ENABLE_DEBUG_TOOLS=false\n"
      },
      {
        heading: "Code example: fail-fast API client setup",
        text: "A small guard in your API client saves hours of silent bad requests.",
        code: "import axios from 'axios'\nimport { env } from './config/env'\n\nexport const api = axios.create({\n  baseURL: env.apiUrl,\n  timeout: 15000,\n})\n\nif (!api.defaults.baseURL) {\n  throw new Error('API baseURL is missing. Check VITE_API_URL in build environment.')\n}\n"
      },
      {
        heading: "Verification checklist (confirm the fix actually worked)",
        bullets: [
          "Run a production build locally (npm run build && npm run preview) and test key flows",
          "Open browser DevTools in production and confirm API requests hit the expected domain",
          "Check your host dashboard to ensure variables are set for the same environment you deployed",
          "Redeploy after any env change; most platforms do not retroactively patch old builds",
          "Confirm no secrets were moved into VITE_* variables unintentionally"
        ]
      },
      {
        heading: "Common mistakes and troubleshooting",
        bullets: [
          "Forgetting the VITE_ prefix and expecting frontend access to plain API_URL",
          "Setting variables in preview but debugging production (or vice versa)",
          "Editing env settings but skipping redeploy, so old bundles remain active",
          "Trying to read process.env in browser code instead of import.meta.env",
          "Putting private keys in VITE_* vars, which exposes them publicly in the client bundle"
        ]
      },
      {
        heading: "Pitfalls when mixing frontend and backend configuration",
        text: "Teams often share one .env template across frontend and backend and then wonder why deployment behavior is inconsistent. The rule of thumb is simple: frontend variables are public configuration, backend variables are secret operational credentials. If a value must remain secret, do not pass it through VITE_ and do not reference it in client code. Instead, keep it server-side and expose only necessary derived behavior through API endpoints. For example, your frontend can know the public API base URL, but it should never know third-party private API keys. This boundary is critical not only for security, but also for debugging clarity. When boundaries are clean, incidents are faster to triage."
      },
      {
        heading: "A deployment workflow that prevents regressions",
        text: "The durable fix is process, not hero debugging. Add an environment validation step to CI before building. Even a lightweight script that checks required VITE_ variables can prevent broken deployments. Keep a short runbook in the repo documenting which variables belong to local, preview, and production. During release, treat env changes like code changes: review, deploy, verify, and record. Also avoid overusing defaults in production code because defaults can hide missing configuration. Explicit failure with a clear error message is healthier than silently pointing traffic to the wrong endpoint. Over time, this turns env handling from fragile setup work into a reliable deployment discipline."
      },
      {
        heading: "When runtime configuration is actually needed",
        text: "Sometimes teams need to switch configuration without rebuilding, especially for white-label apps or multi-tenant deployments. Vite's standard env model is still build-time, so solve this intentionally. A practical pattern is serving a small runtime config JSON from your backend or CDN and loading it before app bootstrap. That lets you keep Vite compile-time values minimal while retaining controlled runtime flexibility. Use this only when you truly need it; many apps add complexity too early. For most products, stable build-time config plus clear environment separation is simpler and safer. Reach for runtime config when business needs demand it, not as a default workaround."
      },
      {
        heading: "Real-world debug flow when production still shows undefined",
        text: "If you applied the standard fixes and production still breaks, debug in a strict order to avoid circular guessing. First, confirm which deployment URL is actually serving traffic (production alias, branch preview, or stale custom domain). Many teams fix env vars in one environment while users are hitting another. Second, inspect the deployed JavaScript bundle behavior indirectly by logging a harmless public config object at app start, then verify values in live DevTools. Third, compare host dashboard variable names character-by-character; one typo or trailing space can invalidate everything silently. Fourth, verify your build command and project root in hosting settings. Monorepos often build from the wrong directory, so the expected .env.production file is never loaded. Fifth, clear CDN cache if your platform can serve old artifacts after rapid redeploys. Finally, run one synthetic smoke test after deploy that checks a known endpoint and fails loudly if the base URL is wrong. This sequence sounds basic, but following it consistently cuts mean-time-to-fix dramatically."
      },
      {
        heading: "Related reading",
        bullets: [
          "React Router + Vercel 404 Fix: Make Direct URL Visits Work in Production",
          "Practical SEO for React + Vite: Canonical URLs, Meta Tags, and JSON-LD That Actually Work",
          "MVP Website SEO Checklist: What to Do in Week 1 So Your Site Can Actually Be Discovered"
        ]
      }
    ]
  },
  {
    slug: "cors-error-fetch-api-fix-express",
    title: "CORS Error on Fetch API? Fix It in Express Without Breaking Security",
    date: "2026-02-10",
    excerpt: "Seeing 'blocked by CORS policy' in your browser console? Here’s the exact Express setup to fix preflight failures, credentials issues, and origin mismatches in production.",
    sections: [
      {
        heading: "What breaks (and how this usually shows up)",
        text: "You ship a frontend and backend on different domains, everything feels fine in Postman, then your browser starts yelling: 'Access to fetch at ... has been blocked by CORS policy.' Sometimes the request never reaches your route handler. Sometimes GET works but POST fails. Sometimes local works and production fails only after you add cookies or auth headers. This is the classic CORS trap: your API is healthy, but the browser rejects the cross-origin response because required headers are missing, too broad, or inconsistent. The key point is that CORS is not an API-server permission system; it is a browser enforcement layer. If you treat it like app auth, you will keep fixing the wrong thing."
      },
      {
        heading: "Why this issue happens",
        text: "CORS fails in Express for a few predictable reasons. First, the API does not return Access-Control-Allow-Origin for the exact requesting origin. Second, requests with custom headers, JSON bodies, or methods like PUT and DELETE trigger a preflight OPTIONS request, and that preflight is not handled correctly. Third, credentials mode is misconfigured: if your frontend sends cookies or Authorization headers with credentials: 'include', you cannot use wildcard '*' for allowed origin. Fourth, middleware order is wrong, so CORS headers are added after route errors or not added to OPTIONS responses at all. Finally, teams often whitelist localhost in development and forget to add production origins, causing a late-stage deploy surprise."
      },
      {
        heading: "Exact implementation/fix steps",
        bullets: [
          "Install and enable the cors middleware before your routes",
          "Use an explicit origin allowlist (dev + production domains)",
          "Handle preflight OPTIONS requests globally",
          "Set credentials correctly on both frontend and backend when using cookies/sessions",
          "Return stable CORS headers on error responses too, so browser diagnostics are clear",
          "Validate behavior with real browser requests, not only curl/Postman"
        ]
      },
      {
        heading: "Code example: secure Express CORS setup with allowlist",
        text: "This pattern is strict enough for production and flexible enough for local development.",
        code: "import express from 'express'\nimport cors from 'cors'\n\nconst app = express()\n\nconst allowedOrigins = [\n  'http://localhost:5173',\n  'https://app.yourdomain.com',\n  'https://www.yourdomain.com',\n]\n\nconst corsOptions = {\n  origin(origin, callback) {\n    // Allow server-to-server requests without an Origin header\n    if (!origin) return callback(null, true)\n\n    if (allowedOrigins.includes(origin)) {\n      return callback(null, true)\n    }\n\n    return callback(new Error(`CORS blocked for origin: ${origin}`))\n  },\n  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],\n  allowedHeaders: ['Content-Type', 'Authorization'],\n  credentials: true,\n  maxAge: 86400,\n}\n\napp.use(cors(corsOptions))\napp.options('*', cors(corsOptions))\napp.use(express.json())\n"
      },
      {
        heading: "Code example: frontend fetch call for cookie/session auth",
        text: "If you rely on cookies, both sides must opt in. Missing one flag causes silent auth failures that look like CORS issues.",
        code: "const response = await fetch('https://api.yourdomain.com/v1/profile', {\n  method: 'GET',\n  credentials: 'include',\n  headers: {\n    'Content-Type': 'application/json',\n  },\n})\n\nif (!response.ok) {\n  throw new Error(`Request failed: ${response.status}`)\n}\n\nconst data = await response.json()\n"
      },
      {
        heading: "Code example: environment-based origin config",
        text: "Hardcoding origins directly in middleware is how regressions happen. Keep origin lists in environment variables so deploy config is explicit.",
        code: "// .env\nCORS_ORIGINS=http://localhost:5173,https://app.yourdomain.com\n\n// config/cors.js\nexport const allowedOrigins = (process.env.CORS_ORIGINS || '')\n  .split(',')\n  .map((v) => v.trim())\n  .filter(Boolean)\n"
      },
      {
        heading: "Verification checklist (how to confirm the fix works)",
        bullets: [
          "Open DevTools Network, trigger the failing request, and confirm OPTIONS preflight returns 200/204",
          "Confirm Access-Control-Allow-Origin matches your exact frontend origin (not '*' when using credentials)",
          "Confirm Access-Control-Allow-Credentials is true when cookies are required",
          "Repeat tests on localhost and production domains",
          "Verify one error path (401/403/500) still includes CORS headers so frontend receives readable errors",
          "Run one end-to-end login or protected endpoint flow in a fresh browser session"
        ]
      },
      {
        heading: "Troubleshooting and common mistakes",
        bullets: [
          "Using origin: '*' while also sending credentials: 'include'",
          "Forgetting to allow OPTIONS, so preflight fails before your actual route runs",
          "Adding CORS middleware after route definitions or error middleware",
          "Allowing only one domain and forgetting www/non-www variants",
          "Trusting Postman results; CORS is enforced by browsers, not Postman",
          "Returning redirect responses from API auth routes that strip or bypass expected CORS headers"
        ]
      },
      {
        heading: "Pitfalls with proxies, CDNs, and serverless platforms",
        text: "Even with correct Express config, infrastructure can still break CORS behavior. Reverse proxies may strip headers, edge platforms may cache responses across origins incorrectly, and serverless adapters may handle OPTIONS differently than local Node does. If symptoms appear only in production, inspect response headers at the final public URL, not just the app server layer. Also validate that your proxy forwards Origin and Access-Control-Request-* headers intact. If your CDN caches API responses, include Vary: Origin where appropriate to prevent cross-origin header mix-ups. Finally, avoid stacking CORS logic in multiple places unless intentional. Two overlapping CORS policies often produce inconsistent headers and hard-to-debug failures."
      },
      {
        heading: "A hardening pattern that keeps CORS stable over time",
        text: "Once fixed, codify this so it does not break next sprint. Keep CORS configuration centralized in one module, source allowed origins from environment config, and add a smoke test that runs preflight + authenticated request against production after deploy. Document the credential rule clearly for teammates: no wildcard origin when cookies are included. Add lightweight logging for blocked origins so you can distinguish attacks from legitimate misconfigurations. During incident review, treat CORS breaks as deployment/config regressions, not random frontend bugs. Teams that do this stop firefighting the same issue repeatedly and ship cross-origin features with much less risk."
      },
      {
        heading: "Related reading",
        bullets: [
          "Vite Environment Variables Not Working in Production: A Complete Fix Guide",
          "React Router + Vercel 404 Fix: Make Direct URL Visits Work in Production",
          "How We Shipped Car Deal Checker Live with Secure Auth (in One Sprint)"
        ]
      }
    ]
  },
  {
    slug: "supabase-auth-redirect-url-not-working",
    title: "Supabase Auth Redirect URL Not Working? Fix OAuth Callback Mismatches Fast",
    date: "2026-02-10",
    excerpt: "If Supabase login keeps sending users to localhost, the wrong domain, or an auth-code error page, this guide walks through the exact redirect URL fixes for dev and production.",
    sections: [
      {
        heading: "What breaks (and what users usually report)",
        text: "You click \"Continue with Google\" (or GitHub), the provider flow looks normal, and then the app lands on the wrong URL. Sometimes users get dumped on localhost in production. Sometimes they return to your domain but with an auth-code error. Sometimes they authenticate successfully but your app never picks up a session and looks logged out. This failure is one of the most common Supabase Auth launch blockers because every environment variable and dashboard URL can look almost right while still being wrong. The symptoms are noisy, but the root cause is usually narrow: your callback URLs do not match exactly across Supabase settings, provider settings, and the frontend sign-in request."
      },
      {
        heading: "Why this issue happens",
        text: "Supabase OAuth relies on strict URL matching and environment-aware configuration. If your Site URL points to one domain but redirectTo points to another, callbacks can fail or route unexpectedly. If your provider (Google, GitHub, etc.) has a different authorized callback URL than Supabase expects, the provider may reject or partially complete the auth handshake. Teams also get burned by trailing slash mismatches, wrong protocol (http vs https), and stale preview domains after redeploys. Another common issue is leaving localhost values in production env vars. Finally, some apps complete OAuth correctly but fail to exchange code for a session because the callback route does not run the right Supabase client logic."
      },
      {
        heading: "Exact implementation/fix steps",
        bullets: [
          "Set Supabase Auth Site URL to your canonical production app origin",
          "Add all valid callback targets to Supabase Redirect URLs (local + production)",
          "Ensure OAuth provider authorized redirect URI matches Supabase callback endpoint exactly",
          "Pass redirectTo explicitly from frontend when environment-specific behavior is required",
          "Handle auth callback route in the app and wait for session exchange before routing away",
          "Retest full login/logout flow in both local and production after every URL change"
        ]
      },
      {
        heading: "Code example: safe signInWithOAuth redirect setup",
        text: "Use one helper that builds redirectTo from runtime origin to avoid hardcoded localhost leaks.",
        code: "import { createClient } from '@supabase/supabase-js'\n\nconst supabase = createClient(\n  import.meta.env.VITE_SUPABASE_URL,\n  import.meta.env.VITE_SUPABASE_ANON_KEY\n)\n\nexport async function signInWithGoogle() {\n  const redirectTo = `${window.location.origin}/auth/callback`\n\n  const { data, error } = await supabase.auth.signInWithOAuth({\n    provider: 'google',\n    options: { redirectTo },\n  })\n\n  if (error) throw error\n  return data\n}\n"
      },
      {
        heading: "Code example: callback route that finalizes the session",
        text: "After provider redirect, parse the auth response and only then forward the user to the app.",
        code: "import { useEffect } from 'react'\nimport { useNavigate } from 'react-router-dom'\nimport { supabase } from '../lib/supabaseClient'\n\nexport default function AuthCallbackPage() {\n  const navigate = useNavigate()\n\n  useEffect(() => {\n    async function finishAuth() {\n      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)\n\n      if (error) {\n        navigate('/login?error=oauth_callback_failed')\n        return\n      }\n\n      navigate('/dashboard')\n    }\n\n    finishAuth()\n  }, [navigate])\n\n  return <p>Signing you in…</p>\n}\n"
      },
      {
        heading: "Code example: environment variables for predictable redirects",
        text: "Keep these values explicit per environment and avoid mixing preview/prod domains accidentally.",
        code: "# .env.local\nVITE_APP_URL=http://localhost:5173\nVITE_SUPABASE_URL=https://your-project-ref.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key\n\n# .env.production\nVITE_APP_URL=https://app.yourdomain.com\nVITE_SUPABASE_URL=https://your-project-ref.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key\n"
      },
      {
        heading: "Verification checklist (how to confirm the fix works)",
        bullets: [
          "Start login from production and confirm browser returns to https://your-domain/... not localhost",
          "Confirm the callback route receives code/state params and completes session exchange",
          "Run a hard refresh on the destination page and verify user remains authenticated",
          "Test logout then login again to confirm auth state transitions are stable",
          "Validate one local login flow and one production flow after each config update",
          "Check Supabase Auth logs for callback or provider errors during test runs"
        ]
      },
      {
        heading: "Troubleshooting and common mistakes",
        bullets: [
          "Site URL set to marketing domain while app actually runs on a subdomain",
          "Using http in one system and https in another",
          "Missing /auth/callback route in the client router",
          "Forgetting to add both localhost and production URLs to allowed redirects",
          "Deploying env var changes without rebuilding frontend artifacts",
          "Redirecting immediately before exchangeCodeForSession completes"
        ]
      },
      {
        heading: "Provider-specific pitfalls that waste hours",
        text: "Google and GitHub both require exact callback URI matches, but each dashboard UX can hide small differences. In Google Cloud, one extra slash or outdated redirect path can quietly invalidate your latest deployment. In GitHub OAuth app settings, teams often update homepage URL and forget to update Authorization callback URL. If you use multiple environments, keep a small table in your repo listing local, preview, and production callback values for Supabase and each provider. During incident response, compare those values line-by-line before touching app code. Most redirect bugs are configuration drift, not runtime logic defects."
      },
      {
        heading: "How to prevent this from breaking again",
        text: "Treat auth redirects like deployment infrastructure, not one-time setup. Keep all auth URL values documented in version control, and include a post-deploy smoke test that performs a full OAuth login in the deployed environment. Use one canonical app domain for production wherever possible; every extra alias increases mismatch risk. If preview environments are required, define whether they are allowed to authenticate or intentionally blocked. Also log callback errors with enough context to identify environment and provider quickly. These guardrails turn a fragile onboarding flow into a predictable system and prevent late-night auth outages."
      },
      {
        heading: "A practical debug sequence when redirects still fail",
        text: "When the bug survives initial fixes, debug in one strict order. First, capture the exact URL where login starts and the exact URL where callback lands. Second, compare those URLs against Supabase Site URL and Redirect URLs word-for-word, including trailing slash and protocol. Third, confirm provider dashboard callback values still match your Supabase project region endpoint after any project migration. Fourth, inspect network logs for the callback request and verify your app actually renders the callback route component. Fifth, log auth events (SIGNED_IN, TOKEN_REFRESHED) so you can separate redirect issues from state management bugs. Finally, test on an incognito browser and mobile device to rule out stale session cookies. This sequence removes guesswork and usually identifies the mismatch in minutes instead of hours."
      },
      {
        heading: "Reader FAQ",
        text: "Do you always need redirectTo in signInWithOAuth? Not always, but it is safer when your app runs across multiple environments because it makes intent explicit at runtime. Should you allow wildcard redirects for convenience? No. Wildcards increase account takeover risk and make debugging harder because unexpected domains may receive auth responses. What if your app has both www and non-www domains? Pick one canonical auth domain and redirect the other at the edge before users start OAuth. Can this issue happen even when user login appears successful? Yes. Providers may authenticate correctly while your app fails to finish session exchange, which looks like an instant logout."
      },
      {
        heading: "Related reading",
        bullets: [
          "How We Shipped Car Deal Checker Live with Secure Auth (in One Sprint)",
          "Vite Environment Variables Not Working in Production: A Complete Fix Guide",
          "CORS Error on Fetch API? Fix It in Express Without Breaking Security"
        ]
      }
    ]
  }
]

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)

export const sortPostsByNewest = (list) =>
  list
    .map((post, index) => ({ post, index }))
    .sort((a, b) => {
      const byDate = new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
      if (byDate !== 0) return byDate
      return b.index - a.index
    })
    .map(({ post }) => post)
