import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'

const previousTitles = [
  { title: 'Assistant to the CEO', period: 'Present' },
  { title: 'IT Professional', period: 'Prior Experience' },
  { title: 'Product Builder', period: 'Prior Experience' },
]

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured)

  useEffect(() => {
    setPageSeo({
      title: 'AIBotCasey | Projects, Portfolio, and Career History',
      description:
        'Explore Casey’s current projects, portfolio highlights, and professional title history.',
      path: '/',
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Casey',
          url: `${SITE_URL}/`,
          sameAs: ['https://github.com/AIBotCasey'],
          jobTitle: 'IT Professional & Product Builder',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Casey Home',
          url: `${SITE_URL}/`,
          description: 'Projects, portfolio, and previous titles for Casey.',
        },
      ],
    })
  }, [])

  return (
    <Stack
      spacing={4}
      sx={{
        fontFamily: '"Courier New", Courier, monospace',
        '& .pixel-card': {
          border: '2px solid rgba(255,255,255,0.45)',
          borderRadius: 0,
          background: 'rgba(11, 14, 28, 0.88)',
          boxShadow: '6px 6px 0 rgba(0,0,0,0.45)',
        },
        '& .pixel-button': {
          borderRadius: 0,
          borderWidth: 2,
        },
      }}
    >
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Chip label="AIBotCasey // Home" color="secondary" sx={{ width: 'fit-content', borderRadius: 0 }} />
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, letterSpacing: 0.5 }}>
          Casey Projects + Portfolio
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 860 }}>
          Practical IT and AI systems, shipped projects, and active work in progress.
        </Typography>
        <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
          <Button className="pixel-button" variant="contained" component={RouterLink} to="/portfolio">
            View Portfolio
          </Button>
          <Button className="pixel-button" variant="outlined" href="mailto:support@aibotcasey.com">
            Contact
          </Button>
        </Stack>
      </Stack>

      <Box id="projects">
        <Typography variant="h4" sx={{ mb: 2, letterSpacing: 0.4 }}>
          Active Project Cards
        </Typography>
        <Stack spacing={2.5}>
          {featuredProjects.map((project) => (
            <Card key={project.slug} className="pixel-card">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {project.name}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  {project.tagline}
                </Typography>
                <Typography color="text.secondary">{project.summary}</Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
                {project.liveUrl ? (
                  project.liveUrl.startsWith('/') ? (
                    <Button size="small" className="pixel-button" variant="outlined" component={RouterLink} to={project.liveUrl}>
                      Open
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      className="pixel-button"
                      variant="outlined"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live App
                    </Button>
                  )
                ) : null}
                {!project.hideRepo ? (
                  <Button
                    size="small"
                    className="pixel-button"
                    variant="contained"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Repo
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h4" sx={{ mb: 2, letterSpacing: 0.4 }}>
          Previous Titles + Dates
        </Typography>
        <Stack spacing={1.2}>
          {previousTitles.map((item) => (
            <Box
              key={`${item.title}-${item.period}`}
              className="pixel-card"
              sx={{ px: 2, py: 1.4, display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}
            >
              <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
              <Typography color="text.secondary">{item.period}</Typography>
            </Box>
          ))}
        </Stack>
        <Typography color="text.secondary" sx={{ mt: 1.2, fontSize: '0.85rem' }}>
          Send me your exact title/date history and I’ll replace these with your final timeline.
        </Typography>
      </Box>
    </Stack>
  )
}
