import { Box, Card, CardActions, CardContent, Chip, Stack, TextField, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { tools } from '../data/tools'
import { setPageSeo } from '../utils/seo'

export default function ToolsLibraryPage() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    setPageSeo({
      title: 'Free Browser Tools Library | AIBotCasey',
      description: 'Browser-based tools for PDF, image, calculator, JSON, and security tasks. Fast and privacy-first.',
      path: '/tools',
    })
  }, [])

  const filtered = useMemo(() => tools.filter((t) => `${t.name} ${t.category} ${t.description}`.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <Stack spacing={2.5}>
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
    </Stack>
  )
}
