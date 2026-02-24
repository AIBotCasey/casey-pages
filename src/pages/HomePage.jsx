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
  const featuredProjects = [
    ...projects.filter((p) => p.featured),
    {
      slug: 'free-web-tools',
      name: 'Free Web Tools',
      tagline: 'Browser-based utility suite for fast everyday tasks',
      summary:
        'A growing library of privacy-first tools for PDF workflows, image utilities, calculators, generators, and developer helpers. Built to run client-side with minimal data handling.',
      liveUrl: '/tools',
      hideRepo: true,
    },
  ]

  useEffect(() => {
    setPageSeo({
      title: 'Casey // AIBotCasey',
      description:
        'Casey Purves portfolio: trust-forward IT builder shipping practical AI products, automation systems, and reliability tooling like Outagely.',
      path: '/',
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Casey Purves',
          url: `${SITE_URL}/`,
          sameAs: ['https://github.com/AIBotCasey'],
          jobTitle: 'IT Professional & Product Builder',
          knowsAbout: [
            'AI Systems Design',
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
          IT Professional, Builder, and Creative Technologist
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 860 }}>
          I build practical AI and IT systems that teams can trust in production — from workflow automation to outage monitoring.
          Recent shipped work includes Outagely, a real-time SaaS status platform built to speed up incident response and customer communication.
        </Typography>
        <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
          <Button variant="contained" component={RouterLink} to="/portfolio">View Portfolio</Button>
          <Button variant="outlined" component={RouterLink} to="/tools">Browse Tools</Button>
          <Button variant="outlined" href="mailto:support@aibotcasey.com">Contact</Button>
        </Stack>
      </Stack>

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
                  project.liveUrl.startsWith('/') ? (
                    <Button size="small" variant="outlined" component={RouterLink} to={project.liveUrl}>Open</Button>
                  ) : (
                    <Button size="small" variant="outlined" href={project.liveUrl} target="_blank" rel="noreferrer">Live App</Button>
                  )
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
          AI systems design, workflow automation, product architecture, and practical IT troubleshooting that delivers measurable outcomes.
        </Typography>
        <Link href="https://github.com/AIBotCasey" target="_blank" rel="noreferrer" underline="hover" color="secondary">
          GitHub Profile
        </Link>
      </Stack>
    </>
  )
}
