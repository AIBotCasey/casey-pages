import { Box, Breadcrumbs, Card, CardActions, CardContent, Chip, Stack, TextField, Typography, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { tools } from '../data/tools'
import { setPageSeo, SITE_URL } from '../utils/seo'

export default function ToolsLibraryPage() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    setPageSeo({
      title: 'Free Browser Tools Library | AIBotCasey',
      description: 'Free browser-based PDF, image, QR, calculator, password, and JSON tools. Fast, privacy-first, and no upload required for core features.',
      path: '/tools',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'AIBotCasey Tools Library',
          itemListElement: tools.map((tool, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${SITE_URL}/tools/${tool.slug}`,
            name: tool.name,
          })),
        },
      ],
    })
  }, [])

  const filtered = useMemo(() => tools.filter((t) => `${t.name} ${t.category} ${t.description}`.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <Stack spacing={2.5}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">Home</Link>
        <Typography color="text.primary">Tools</Typography>
      </Breadcrumbs>

      <Chip label="Tools Library" color="secondary" sx={{ width: 'fit-content' }} />
      <Typography variant="h3">Pick a tool and get it done fast</Typography>
      <Typography color="text.secondary">All tools run in your browser. We only use what’s needed to generate the result.</Typography>
      <TextField label="Search tools" value={query} onChange={(e) => setQuery(e.target.value)} />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 2 }}>
        {filtered.map((tool) => (
          <Card key={tool.slug} sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <CardContent>
              <Chip size="small" label={tool.category} sx={{ mb: 1 }} />
              <Typography variant="h6">{tool.name}</Typography>
              <Typography color="text.secondary">{tool.description}</Typography>
            </CardContent>
            <CardActions>
              <Button component={RouterLink} to={`/tools/${tool.slug}`} variant="contained" size="small">Open Tool</Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>How to use this tools library</Typography>
        <Typography color="text.secondary">1) Search by task, 2) open your tool, 3) complete the action in-browser, 4) download your result.</Typography>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ mb: 1 }}>Tools FAQ</Typography>
        <Stack spacing={1}>
          <Typography color="text.secondary"><strong>Are these tools free?</strong> Yes, all tools in this library are free to use.</Typography>
          <Typography color="text.secondary"><strong>Do I need to create an account?</strong> No account is required for core tools.</Typography>
          <Typography color="text.secondary"><strong>Do you store my files?</strong> Core tool processing is browser-based and privacy-first.</Typography>
        </Stack>
      </Box>
    </Stack>
  )
}
