import { Box, Breadcrumbs, Card, CardActions, CardContent, CardMedia, Chip, Stack, TextField, Typography, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { tools } from '../data/tools'
import { toolGuides } from '../data/toolGuides'
import { toolComparisons } from '../data/toolComparisons'
import { setPageSeo, SITE_URL } from '../utils/seo'
import { getToolImageUrl } from '../utils/toolImages'

export default function ToolsLibraryPage() {
  const [query, setQuery] = useState('')
  const [cluster, setCluster] = useState('All')

  const categories = ['All', ...new Set(tools.map((t) => t.category))]

  useEffect(() => {
    setPageSeo({
      title: 'Free Online Tools by AIBotCasey | PDF, Image, Calculator & Dev Utilities',
      description: 'Use fast, privacy-first online tools for PDF merge/split/compress, image resize/convert/crop, calculators, and developer text utilities.',
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
          itemListElement: [
            { '@type': 'ListItem', position: 1, url: `${SITE_URL}/tools/image-suite`, name: 'Image Suite' },
            { '@type': 'ListItem', position: 2, url: `${SITE_URL}/tools/pdf-suite`, name: 'PDF Suite' },
            ...tools.map((tool, idx) => ({ '@type': 'ListItem', position: idx + 3, url: `${SITE_URL}/tools/${tool.slug}`, name: tool.name })),
          ],
        },
      ],
    })
  }, [])

  const filtered = useMemo(() => tools.filter((t) => {
    const textMatch = `${t.name} ${t.category} ${t.description}`.toLowerCase().includes(query.toLowerCase())
    const clusterMatch = cluster === 'All' || t.category === cluster
    return textMatch && clusterMatch
  }), [query, cluster])

  return (
    <Stack spacing={2.5}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">Home</Link>
        <Typography color="text.primary">Tools</Typography>
      </Breadcrumbs>

      <Chip label="Tools Library" color="secondary" sx={{ width: 'fit-content' }} />
      <Typography variant="h3">Clustered browser tools for fast workflows</Typography>
      <Typography color="text.secondary">All tools run in your browser with privacy-first processing.</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 2 }}>
        <Card sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent>
            <Chip size="small" color="secondary" label="Suite" sx={{ mb: 1 }} />
            <Typography variant="h6">Image Suite</Typography>
            <Typography color="text.secondary">Photoshop-style workspace for crop, compress, resize, convert, Base64, and color picking in one flow.</Typography>
          </CardContent>
          <CardActions>
            <Button component={RouterLink} to="/tools/image-suite" variant="contained" size="small">Open Image Suite</Button>
          </CardActions>
        </Card>

        <Card sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent>
            <Chip size="small" color="secondary" label="Suite" sx={{ mb: 1 }} />
            <Typography variant="h6">PDF Suite</Typography>
            <Typography color="text.secondary">Single workspace for merge, split, rotate, compress, page count, and JPG-to-PDF tasks with faster switching.</Typography>
          </CardContent>
          <CardActions>
            <Button component={RouterLink} to="/tools/pdf-suite" variant="contained" size="small">Open PDF Suite</Button>
          </CardActions>
        </Card>
      </Box>

      <TextField label="Search tools" value={query} onChange={(e) => setQuery(e.target.value)} />

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {categories.map((cat) => (
          <Chip key={cat} label={cat} clickable color={cluster === cat ? 'primary' : 'default'} onClick={() => setCluster(cat)} />
        ))}
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 2 }}>
        {filtered.map((tool) => (
          <Card key={tool.slug} sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <CardMedia component="img" image={getToolImageUrl(tool)} alt={tool.name} sx={{ aspectRatio: '16 / 9', objectFit: 'cover', borderBottom: '1px solid rgba(255,255,255,0.08)' }} />
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

      <Box>
        <Typography variant="h5" sx={{ mb: 1.25 }}>Popular How-To Guides</Typography>
        <Stack spacing={0.8}>
          {toolGuides.slice(0, 5).map((g) => (
            <Link key={g.slug} component={RouterLink} to={`/guides/${g.slug}`} underline="hover" color="secondary">{g.title}</Link>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ mb: 1.25 }}>Tool Comparisons</Typography>
        <Stack spacing={0.8}>
          {toolComparisons.map((c) => (
            <Link key={c.slug} component={RouterLink} to={`/compare/${c.slug}`} underline="hover" color="secondary">{c.title}</Link>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}
