import { Alert, Box, Breadcrumbs, Button, Chip, Stack, Typography, Link, Card, CardContent, CardMedia } from '@mui/material'
import { useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { getTool, tools } from '../data/tools'
import { setPageSeo, SITE_URL } from '../utils/seo'
import AdblockGate from '../components/AdblockGate'
import { toolRenderers } from '../tools/ToolWidgets'
import { getToolImageUrl } from '../utils/toolImages'

const toolContext = {
  'pdf-merge': {
    whoFor: 'Operations teams, admins, and freelancers combining multiple documents into a single shareable file.',
    bestFor: 'Combining contracts, receipts, and reports without uploading sensitive files.',
    extraFaqs: [
      { q: 'Can I merge files in a specific order?', a: 'Yes, upload files in your preferred order before merging.' },
      { q: 'Will bookmarks or links remain?', a: 'Most page content remains, but advanced PDF metadata may vary by source files.' },
    ],
  },
  'pdf-split': {
    whoFor: 'Teams that need to extract only relevant pages from larger PDF packs.',
    bestFor: 'Creating focused client packets from multi-section source documents.',
    extraFaqs: [
      { q: 'Can I split into multiple outputs?', a: 'Current flow creates one output from selected ranges; repeat for additional outputs.' },
      { q: 'Can I keep original file unchanged?', a: 'Yes, the original source file is never modified.' },
    ],
  },
  'jpg-to-pdf': {
    whoFor: 'Users converting scans, photos, and receipts into clean PDF deliverables.',
    bestFor: 'Submitting receipts and image-based forms in PDF format.',
    extraFaqs: [
      { q: 'Can I combine many images into one PDF?', a: 'Yes, multiple images are added as separate pages in one PDF.' },
      { q: 'Do images get uploaded to a server?', a: 'No, conversion is performed in-browser.' },
    ],
  },
  'image-compressor': {
    whoFor: 'Site owners, marketers, and creators optimizing media for faster loading.',
    bestFor: 'Reducing image weight before publishing to websites or newsletters.',
    extraFaqs: [
      { q: 'How much size reduction can I expect?', a: 'It varies by source image and quality setting; preview before download.' },
      { q: 'Does compression change dimensions?', a: 'No, this tool focuses on quality/file-size tradeoff.' },
    ],
  },
  'image-resizer': {
    whoFor: 'Designers and social managers needing exact pixel dimensions.',
    bestFor: 'Preparing assets for social posts, ads, and CMS image slots.',
    extraFaqs: [
      { q: 'Can I upscale small images?', a: 'Yes, but quality may degrade when enlarging low-resolution files.' },
      { q: 'Is output immediate?', a: 'Yes, resize and preview run instantly in the browser.' },
    ],
  },
  'json-formatter': {
    whoFor: 'Developers, QA analysts, and technical writers working with API payloads.',
    bestFor: 'Debugging malformed JSON and creating readable payload snippets.',
    extraFaqs: [
      { q: 'Can I minify JSON for production payloads?', a: 'Yes, use Minify to produce compact output.' },
      { q: 'Is there a data retention risk?', a: 'No, formatting and validation happen locally in your browser.' },
    ],
  },
  'password-generator': {
    whoFor: 'Anyone needing strong random passwords quickly without external services.',
    bestFor: 'Generating unique credentials for work tools and personal accounts.',
    extraFaqs: [
      { q: 'Are generated passwords stored anywhere?', a: 'No, they are generated client-side and not saved by the site.' },
      { q: 'Can I generate longer passwords?', a: 'Yes, increase length up to the tool maximum.' },
    ],
  },
  'qr-generator': {
    whoFor: 'Teams and creators sharing links quickly via print or mobile-friendly QR codes.',
    bestFor: 'Event links, menus, check-in pages, and app downloads.',
    extraFaqs: [
      { q: 'Can I generate QR for plain text?', a: 'Yes, URLs, text, and simple values are all supported.' },
      { q: 'What file format can I download?', a: 'QR downloads are provided as PNG files.' },
    ],
  },
}

export default function ToolPage() {
  const { slug } = useParams()
  const tool = getTool(slug)
  const relatedTools = tools.filter((t) => t.slug !== slug).slice(0, 6)
  const context = toolContext[slug] || {}
  const faqs = [...(tool.faqs || []), ...(context.extraFaqs || [])]

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
          mainEntity: faqs.map((faq) => ({
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
      <Card sx={{ background: 'rgba(18, 24, 44, 0.62)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardMedia component="img" image={getToolImageUrl(tool)} alt={`${tool.name} preview`} sx={{ aspectRatio: '16 / 9', objectFit: 'cover' }} />
      </Card>
      <Alert severity="success">Privacy-first: this tool runs in your browser. No server uploads required.</Alert>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
        <Card sx={{ flex: 1, background: 'rgba(18, 24, 44, 0.62)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent>
            <Typography variant="h6">Who this tool is for</Typography>
            <Typography color="text.secondary">{context.whoFor || 'Anyone who needs a fast, browser-based utility workflow.'}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, background: 'rgba(18, 24, 44, 0.62)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent>
            <Typography variant="h6">Best use case</Typography>
            <Typography color="text.secondary">{context.bestFor || 'Quick one-off tasks with privacy-first local processing.'}</Typography>
          </CardContent>
        </Card>
      </Stack>

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
          {faqs.map((faq) => (
            <Typography key={faq.q} color="text.secondary"><strong>{faq.q}</strong> {faq.a}</Typography>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}
