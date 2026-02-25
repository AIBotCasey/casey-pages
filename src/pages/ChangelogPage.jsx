import { Card, CardContent, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { setPageSeo } from '../utils/seo'
import { getBreadcrumbSchema } from '../utils/seoSchemas'

const entries = [
  {
    date: '2026-02-25',
    title: 'SEO and performance overhaul',
    notes: [
      'Large bundle split into smaller lazy chunks for faster page loads.',
      'Expanded product/tool SEO metadata and schema coverage.',
      'Added Terms and Privacy pages with footer links.',
    ],
  },
  {
    date: '2026-02-25',
    title: 'Content expansion for tool growth',
    notes: [
      'Added long-tail tool guide pages and comparison pages.',
      'Added Outagely solutions page for audience-specific positioning.',
      'Added trust messaging and richer tool page context blocks.',
    ],
  },
]

export default function ChangelogPage() {
  useEffect(() => {
    setPageSeo({
      title: 'Product Changelog | AIBotCasey',
      description: 'Track new releases and updates to AIBotCasey products and tools.',
      path: '/changelog',
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Changelog', path: '/changelog' },
      ]),
    })
  }, [])

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Changelog</Typography>
      <Typography color="text.secondary">Recent updates across AIBotCasey tools and shipped products.</Typography>
      {entries.map((e) => (
        <Card key={`${e.date}-${e.title}`} sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent>
            <Typography variant="overline" color="secondary">{e.date}</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>{e.title}</Typography>
            <Stack spacing={0.7}>{e.notes.map((n) => <Typography key={n}>• {n}</Typography>)}</Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}
