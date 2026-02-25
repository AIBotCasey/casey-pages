import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { toolGuides, getToolGuide } from '../data/toolGuides'
import { getTool } from '../data/tools'
import { useEffect } from 'react'
import { setPageSeo, SITE_URL } from '../utils/seo'
import { getBreadcrumbSchema } from '../utils/seoSchemas'

export default function ToolGuidePage() {
  const { slug } = useParams()
  const guide = getToolGuide(slug)
  const tool = guide ? getTool(guide.toolSlug) : null

  useEffect(() => {
    if (!guide) return
    const path = `/guides/${guide.slug}`
    setPageSeo({
      title: `${guide.title} | AIBotCasey`,
      description: guide.description,
      path,
      jsonLd: [
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Tools', path: '/tools' },
          { name: guide.title, path },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: guide.title,
          description: guide.description,
          step: guide.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
          url: `${SITE_URL}${path}`,
        },
      ],
    })
  }, [guide])

  if (!guide || !tool) {
    return <Stack spacing={2}><Typography variant="h4">Guide not found</Typography><Button component={RouterLink} to="/tools" variant="contained">Back to tools</Button></Stack>
  }

  return (
    <Stack spacing={2}>
      <Button component={RouterLink} to="/tools" variant="outlined" sx={{ width: 'fit-content' }}>← Back to tools</Button>
      <Typography variant="h3">{guide.title}</Typography>
      <Typography color="text.secondary">{guide.intro}</Typography>
      <Card sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Step-by-step</Typography>
          <Stack spacing={1}>
            {guide.steps.map((s, i) => <Typography key={s}>{i + 1}. {s}</Typography>)}
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ background: 'rgba(18, 24, 44, 0.62)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardContent>
          <Typography variant="h6">Use this tool now</Typography>
          <Typography color="text.secondary" sx={{ mb: 1.5 }}>{tool.description}</Typography>
          <Button component={RouterLink} to={`/tools/${tool.slug}`} variant="contained">Open {tool.name}</Button>
        </CardContent>
      </Card>
    </Stack>
  )
}
