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
import { useEffect } from 'react'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured)

  useEffect(() => {
    setPageSeo({
      title: 'Casey Portfolio // AIBotCasey',
      description: 'Product portfolio featuring shipped projects by Casey: OutageRadar and Futures Trading Journal.',
      path: '/',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Casey Product Portfolio',
        url: `${SITE_URL}/`,
        description: 'A focused product portfolio featuring shipped projects including OutageRadar and Futures Trading Journal.',
      },
    })
  }, [])

  return (
    <>
      <Stack spacing={3} sx={{ mb: 8 }}>
        <Chip label="Casey Product Portfolio" color="secondary" sx={{ width: 'fit-content' }} />
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.25rem' }, maxWidth: 900 }}>
          Product Portfolio
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760 }}>
          A focused showcase of shipped products I’ve built and launched.
        </Typography>
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

      <Stack sx={{ mt: 6 }}>
        <Link href="https://github.com/AIBotCasey" target="_blank" rel="noreferrer" underline="hover" color="secondary">
          GitHub Profile
        </Link>
      </Stack>
    </>
  )
}
