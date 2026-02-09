export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
  const email = String(body.email || '').trim().toLowerCase()
  const source = String(body.source || 'site').trim() || 'site'

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!validEmail) {
    res.status(400).json({ error: 'Invalid email address' })
    return
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    res.status(500).json({
      error: 'Newsletter DB is not configured',
      hint: 'Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel project env vars.',
    })
    return
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify([
        {
          email,
          source,
          subscribed_at: new Date().toISOString(),
        },
      ]),
    })

    if (!response.ok) {
      const text = await response.text()
      res.status(502).json({ error: 'Failed to save subscriber', details: text })
      return
    }

    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: 'Unexpected subscribe error' })
  }
}
