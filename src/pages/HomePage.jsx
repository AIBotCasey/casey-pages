import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Chip,
  Link,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured)

  useEffect(() => {
    setPageSeo({
      title: 'Casey Purves — AI Prompt Engineer & AI Product Builder',
      description:
        'Casey Purves portfolio: AI Prompt Engineer and AI Product Builder shipping real-world products like Outagely, prompt systems, and automation workflows.',
      path: '/',
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Casey Purves',
          url: `${SITE_URL}/`,
          sameAs: ['https://github.com/AIBotCasey'],
          jobTitle: 'AI Prompt Engineer',
          knowsAbout: [
            'Prompt Engineering',
            'AI Workflow Automation',
            'LLM System Design',
            'Incident Response Tooling',
            'Product Engineering',
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Casey Purves Portfolio',
          url: `${SITE_URL}/`,
          description:
            'Portfolio showcasing shipped AI products, prompt systems, and automation workflows built by Casey Purves.',
        },
      ],
    })
  }, [])

  return (
    <>
      <Stack spacing={3} sx={{ mb: 8 }}>
        <Chip label="Casey Purves Portfolio" color="secondary" sx={{ width: 'fit-content' }} />
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3.2rem' }, maxWidth: 980 }}>
          AI Prompt Engineer & AI Product Builder
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 860 }}>
          I design prompt systems, AI automations, and production-ready products. Recent shipped work includes Outagely,
          a real-time SaaS outage monitoring platform built for faster incident response.
        </Typography>
        <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
          <Button variant="contained" component={RouterLink} to="/portfolio">View Portfolio</Button>
          <Button variant="outlined" component={RouterLink} to="/ai-prompt-engineer">AI Prompt Engineer</Button>
          <Button variant="outlined" href="mailto:support@aibotcasey.com">Contact</Button>
        </Stack>
      </Stack>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 1.2 }}>Dashboard: Tool Quick Access</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>Jump straight to the tool you need. All tools are browser-based and privacy-first.</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
          <Button size="small" variant="outlined" component={RouterLink} to="/tools/pdf-merge">PDF Merge</Button>
          <Button size="small" variant="outlined" component={RouterLink} to="/tools/image-compressor">Image Compressor</Button>
          <Button size="small" variant="outlined" component={RouterLink} to="/tools/qr-generator">QR Generator</Button>
          <Button size="small" variant="outlined" component={RouterLink} to="/tools/json-formatter">JSON Formatter</Button>
          <Button size="small" variant="outlined" component={RouterLink} to="/tools/loan-calculator">Loan Calculator</Button>
        </Stack>
        <Button component={RouterLink} to="/tools" variant="contained">Browse All Tools</Button>
      </Box>

      <Box id="portfolio" sx={{ mb: 9 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Shipped Projects</Typography>
        <Stack spacing={2.5}>
          {featuredProjects.map((project) => (
            <Card
              key={project.slug}
              sx={{
                background: 'rgba(18, 24, 44, 0.72)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>{project.name}</Typography>
                <Typography color="text.secondary" sx={{ mb: 1.5 }}>{project.tagline}</Typography>
                <Typography color="text.secondary">{project.summary}</Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
                {project.liveUrl ? (
                  <Button size="small" variant="outlined" href={project.liveUrl} target="_blank" rel="noreferrer">Live App</Button>
                ) : null}
                {!project.hideRepo ? (
                  <Button size="small" variant="contained" href={project.repoUrl} target="_blank" rel="noreferrer">View Repo</Button>
                ) : null}
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Box>

      <Stack spacing={1} sx={{ mt: 6 }}>
        <Typography variant="h5">Core Skills</Typography>
        <Typography color="text.secondary">
          Prompt engineering, AI workflow automation, product architecture, and practical IT systems troubleshooting.
        </Typography>
        <Link href="https://github.com/AIBotCasey" target="_blank" rel="noreferrer" underline="hover" color="secondary">
          GitHub Profile
        </Link>
      </Stack>
    </>
  )
}
