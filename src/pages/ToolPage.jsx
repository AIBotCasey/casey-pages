import { Alert, Box, Breadcrumbs, Button, Chip, Stack, Typography, Link } from '@mui/material'
import { useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { getTool, tools } from '../data/tools'
import { setPageSeo, SITE_URL } from '../utils/seo'
import AdblockGate from '../components/AdblockGate'
import { toolRenderers } from '../tools/ToolWidgets'

export default function ToolPage() {
  const { slug } = useParams()
  const tool = getTool(slug)
  const relatedTools = tools.filter((t) => t.slug !== slug).slice(0, 6)

  useEffect(() => {
    if (!tool) return
    setPageSeo({
      title: `${tool.name} - Free Online ${tool.category} Tool | AIBotCasey`,
      description: `${tool.description} Free, browser-based, and privacy-first with no server uploads required.`,
      path: `/tools/${tool.slug}`,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
            { '@type': 'ListItem', position: 3, name: tool.name, item: `${SITE_URL}/tools/${tool.slug}` },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: `${tool.category}Application`,
          operatingSystem: 'Web Browser',
          isAccessibleForFree: true,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          description: tool.description,
          url: `${SITE_URL}/tools/${tool.slug}`,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (tool.faqs || []).map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        },
      ],
    })
  }, [tool])

  if (!tool) return <Stack spacing={2}><Alert severity="error">Tool not found.</Alert><Button component={RouterLink} to="/tools">Back to tools</Button></Stack>

  const ToolComponent = toolRenderers[tool.slug]

  return (
    <Stack spacing={2.5}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">Home</Link>
        <Link component={RouterLink} underline="hover" color="inherit" to="/tools">Tools</Link>
        <Typography color="text.primary">{tool.name}</Typography>
      </Breadcrumbs>

      <Button component={RouterLink} to="/tools" variant="text" sx={{ width: 'fit-content' }}>← Back to Tools Library</Button>
      <Chip label={tool.category} sx={{ width: 'fit-content' }} />
      <Typography variant="h3">{tool.name}</Typography>
      <Typography color="text.secondary">{tool.description}</Typography>
      <Alert severity="success">Privacy-first: this tool runs in your browser. No server uploads required.</Alert>

      <Box>
        <Typography variant="h5" sx={{ mb: 1 }}>How to use {tool.name}</Typography>
        <Stack spacing={0.8}>
          {(tool.instructions || []).map((step, idx) => (
            <Typography key={step} color="text.secondary">{idx + 1}. {step}</Typography>
          ))}
        </Stack>
      </Box>

      <AdblockGate>
        {ToolComponent ? <ToolComponent /> : <Alert severity="info">This tool is coming soon.</Alert>}
      </AdblockGate>

      <Box>
        <Typography variant="h5" sx={{ mb: 1 }}>Related free tools</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {relatedTools.map((item) => (
            <Button key={item.slug} size="small" variant="outlined" component={RouterLink} to={`/tools/${item.slug}`}>
              {item.name}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ mb: 1 }}>{tool.name} FAQ</Typography>
        <Stack spacing={1}>
          {(tool.faqs || []).map((faq) => (
            <Typography key={faq.q} color="text.secondary"><strong>{faq.q}</strong> {faq.a}</Typography>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}
