const TARGET_ASPECT = 16 / 9

function pickBestPhoto(photos = []) {
  const viable = photos.filter((p) => p?.width && p?.height && p?.src?.large2x)
  if (!viable.length) return null

  return viable
    .map((p) => ({
      photo: p,
      score: Math.abs(p.width / p.height - TARGET_ASPECT),
    }))
    .sort((a, b) => a.score - b.score)[0]?.photo
}

export default async function handler(req, res) {
  const apiKey = process.env.PEXELS_API_KEY
  const query = String(req.query?.q || req.query?.query || '').trim()

  if (!apiKey) {
    res.status(500).json({ error: 'PEXELS_API_KEY not configured' })
    return
  }

  if (!query) {
    res.status(400).json({ error: 'Missing query parameter q' })
    return
  }

  try {
    const url = new URL('https://api.pexels.com/v1/search')
    url.searchParams.set('query', query)
    url.searchParams.set('per_page', '30')
    url.searchParams.set('orientation', 'landscape')
    url.searchParams.set('size', 'large')

    const response = await fetch(url.toString(), {
      headers: { Authorization: apiKey },
    })

    if (!response.ok) {
      const text = await response.text()
      res.status(502).json({ error: 'Pexels search failed', details: text })
      return
    }

    const data = await response.json()
    const best = pickBestPhoto(data.photos)

    if (!best) {
      res.status(404).json({ error: 'No suitable image found' })
      return
    }

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    res.redirect(302, best.src.large2x)
  } catch {
    res.status(500).json({ error: 'Unexpected pexels image error' })
  }
}
