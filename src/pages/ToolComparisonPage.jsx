import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getToolComparison } from '../data/toolComparisons'
import { getTool } from '../data/tools'
import { setPageSeo, SITE_URL } from '../utils/seo'
import { getBreadcrumbSchema } from '../utils/seoSchemas'

export default function ToolComparisonPage() {
  const { slug } = useParams()
  const comparison = getToolComparison(slug)
  const left = comparison ? getTool(comparison.leftTool) : null
  const right = comparison ? getTool(comparison.rightTool) : null

  useEffect(() => {
    if (!comparison) return
    const path = `/compare/${comparison.slug}`
    setPageSeo({
      title: `${comparison.title} | AIBotCasey`,
      description: comparison.description,
      path,
      jsonLd: [
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Tools', path: '/tools' },
          { name: comparison.title, path },
        ]),
      ],
    })
  }, [comparison])

  if (!comparison || !left || !right) {
    return <Stack spacing={2}><Typography variant="h4">Comparison not found</Typography><Button component={RouterLink} to="/tools" variant="contained">Back to tools</Button></Stack>
  }

  return (
    <Stack spacing={2}>
      <Button component={RouterLink} to="/tools" variant="outlined" sx={{ width: 'fit-content' }}>← Back to tools</Button>
      <Typography variant="h3">{comparison.title}</Typography>
      <Typography color="text.secondary">{comparison.description}</Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card sx={{ flex: 1, background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>{left.name}</Typography>
            <Stack spacing={0.8}>{comparison.useLeftWhen.map((x) => <Typography key={x}>• {x}</Typography>)}</Stack>
            <Button component={RouterLink} to={`/tools/${left.slug}`} sx={{ mt: 1.5 }} variant="contained">Open {left.name}</Button>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>{right.name}</Typography>
            <Stack spacing={0.8}>{comparison.useRightWhen.map((x) => <Typography key={x}>• {x}</Typography>)}</Stack>
            <Button component={RouterLink} to={`/tools/${right.slug}`} sx={{ mt: 1.5 }} variant="contained">Open {right.name}</Button>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  )
}
