import { useEffect, useMemo, useState } from 'react'
import { Alert, Box, Breadcrumbs, Button, Card, Chip, Link, Stack, Typography } from '@mui/material'
import CropIcon from '@mui/icons-material/Crop'
import CompressIcon from '@mui/icons-material/Compress'
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge'
import ImageIcon from '@mui/icons-material/Image'
import PaletteIcon from '@mui/icons-material/Palette'
import DataObjectIcon from '@mui/icons-material/DataObject'
import MergeTypeIcon from '@mui/icons-material/MergeType'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import NumbersIcon from '@mui/icons-material/Numbers'
import { Link as RouterLink } from 'react-router-dom'
import { getTool } from '../data/tools'
import { toolRenderers } from '../tools/ToolWidgets'
import { setPageSeo, SITE_URL } from '../utils/seo'

const SUITES = {
  image: {
    slug: 'image-suite',
    name: 'Image Suite',
    title: 'Image Suite | Crop, Compress, Resize & Convert Images',
    description: 'Use the all-in-one image editing suite to crop, compress, resize, convert formats, extract base64, and pick colors in your browser.',
    intro: 'Bring in one image and switch tools from the left rail — crop, compress, resize, convert formats, and more.',
    tools: [
      { slug: 'image-cropper', icon: CropIcon },
      { slug: 'image-compressor', icon: CompressIcon },
      { slug: 'image-resizer', icon: PhotoSizeSelectLargeIcon },
      { slug: 'image-format-converter', icon: ImageIcon },
      { slug: 'image-to-base64', icon: DataObjectIcon },
      { slug: 'image-color-picker', icon: PaletteIcon },
    ],
  },
  pdf: {
    slug: 'pdf-suite',
    name: 'PDF Suite',
    title: 'PDF Suite | Merge, Split, Rotate, Compress & Convert',
    description: 'Use the all-in-one PDF suite to merge, split, rotate, compress PDFs, count pages, and convert JPG to PDF locally in your browser.',
    intro: 'Load your documents once and move between merge, split, rotate, and compression workflows from the left rail.',
    tools: [
      { slug: 'pdf-merge', icon: MergeTypeIcon },
      { slug: 'pdf-split', icon: ContentCutIcon },
      { slug: 'pdf-rotate', icon: RotateRightIcon },
      { slug: 'pdf-compress', icon: CompressIcon },
      { slug: 'pdf-page-counter', icon: NumbersIcon },
      { slug: 'jpg-to-pdf', icon: FitScreenIcon },
    ],
  },
}

export default function ToolSuitePage({ suite = 'image' }) {
  const cfg = SUITES[suite] || SUITES.image
  const [activeSlug, setActiveSlug] = useState(cfg.tools[0].slug)

  const tools = useMemo(() => cfg.tools.map((item) => ({ ...item, meta: getTool(item.slug) })).filter((item) => item.meta), [cfg])
  const active = tools.find((t) => t.slug === activeSlug) || tools[0]
  const ActiveRenderer = active ? toolRenderers[active.slug] : null

  useEffect(() => {
    setPageSeo({
      title: cfg.title,
      description: cfg.description,
      path: `/tools/${cfg.slug}`,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
            { '@type': 'ListItem', position: 3, name: cfg.name, item: `${SITE_URL}/tools/${cfg.slug}` },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: cfg.name,
          url: `${SITE_URL}/tools/${cfg.slug}`,
          description: cfg.description,
        },
      ],
    })
  }, [cfg])

  return (
    <Stack spacing={2.5}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">Home</Link>
        <Link component={RouterLink} underline="hover" color="inherit" to="/tools">Tools</Link>
        <Typography color="text.primary">{cfg.name}</Typography>
      </Breadcrumbs>

      <Chip label={`${cfg.name} Workspace`} color="secondary" sx={{ width: 'fit-content' }} />
      <Typography variant="h3">{cfg.name}</Typography>
      <Typography color="text.secondary">{cfg.intro}</Typography>

      <Card sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ minHeight: 560 }}>
          <Box sx={{ borderRight: { md: '1px solid rgba(255,255,255,0.08)' }, borderBottom: { xs: '1px solid rgba(255,255,255,0.08)', md: 'none' }, p: 1.2, minWidth: { md: 235 } }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Tools</Typography>
            <Stack spacing={0.8}>
              {tools.map((tool) => {
                const Icon = tool.icon
                const selected = active?.slug === tool.slug
                return (
                  <Button
                    key={tool.slug}
                    onClick={() => setActiveSlug(tool.slug)}
                    variant={selected ? 'contained' : 'outlined'}
                    color={selected ? 'secondary' : 'inherit'}
                    startIcon={<Icon fontSize="small" />}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                  >
                    {tool.meta.name}
                  </Button>
                )
              })}
            </Stack>
          </Box>

          <Stack spacing={1.2} sx={{ p: 2, flex: 1 }}>
            {active ? (
              <>
                <Alert severity="info">Settings panel: <strong>{active.meta.name}</strong> · {active.meta.description}</Alert>
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, p: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Live Preview & Controls</Typography>
                  {ActiveRenderer ? <ActiveRenderer /> : <Alert severity="error">Renderer not found for this tool.</Alert>}
                </Box>
              </>
            ) : (
              <Alert severity="warning">No tools configured in this suite.</Alert>
            )}
          </Stack>
        </Stack>
      </Card>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {tools.map((tool) => (
          <Button key={tool.slug} component={RouterLink} to={`/tools/${tool.slug}`} size="small" variant="text">
            Open {tool.meta.name} page
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}
