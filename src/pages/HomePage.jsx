import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'

const previousTitles = [
  { title: 'IT Support Specialist', period: 'Mar 2022 – Present' },
  { title: 'IT Support Specialist', period: 'Jul 2020 – Mar 2022' },
  { title: 'IT System Support Analyst', period: 'Jul 2019 – Jul 2020' },
  { title: 'IT Helpdesk Operator', period: 'Dec 2018 – Jul 2019' },
  { title: 'System Designer', period: 'Jun 2017 – Dec 2018' },
  { title: 'Sales Associate', period: 'Oct 2015 – Jun 2017' },
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
    <Box
      sx={{
        fontFamily: '"Courier New", Courier, monospace',
      }}
    >
      <Box sx={{ mb: 5 }}>
        <Chip
          label="AIBotCasey // Home"
          sx={{
            width: 'fit-content',
            borderRadius: 0,
            bgcolor: '#1f1f1f',
            color: '#efefef',
            border: '1px solid #4f4f4f',
            mb: 2,
          }}
        />
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, letterSpacing: 0.5 }}>
          Casey Projects + Portfolio
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 860, mt: 1.5 }}>
          Practical IT and AI systems, shipped projects, and active work in progress.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap', mt: 2.5 }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/portfolio"
            sx={{ borderRadius: 0, border: '1px solid #8f8f8f', bgcolor: '#e5e5e5', color: '#121212', '&:hover': { bgcolor: '#d5d5d5' } }}
          >
            View Portfolio
          </Button>
          <Button
            variant="outlined"
            href="mailto:support@aibotcasey.com"
            sx={{ borderRadius: 0, borderColor: '#8f8f8f', color: '#f1f1f1' }}
          >
            Contact
          </Button>
        </Box>
      </Box>

      <Box id="projects" sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 2, letterSpacing: 0.4 }}>
          Active Project Cards
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, minmax(0, 1fr))',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {featuredProjects.map((project) => (
            <Card
              key={project.slug}
              sx={{
                border: '2px solid #525252',
                borderRadius: 0,
                bgcolor: '#171717',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.45)',
                aspectRatio: '1 / 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent sx={{ pb: 0 }}>
                <Typography variant="h6" gutterBottom>
                  {project.name}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1.2, fontSize: '0.92rem' }}>
                  {project.tagline}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  {project.summary}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
                {project.liveUrl ? (
                  project.liveUrl.startsWith('/') ? (
                    <Button
                      size="small"
                      variant="outlined"
                      component={RouterLink}
                      to={project.liveUrl}
                      sx={{ borderRadius: 0, borderColor: '#8f8f8f', color: '#efefef' }}
                    >
                      Open
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ borderRadius: 0, borderColor: '#8f8f8f', color: '#efefef' }}
                    >
                      Live App
                    </Button>
                  )
                ) : null}
                {!project.hideRepo ? (
                  <Button
                    size="small"
                    variant="contained"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    sx={{ borderRadius: 0, border: '1px solid #8f8f8f', bgcolor: '#e5e5e5', color: '#121212', '&:hover': { bgcolor: '#d5d5d5' } }}
                  >
                    View Repo
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" sx={{ mb: 2, letterSpacing: 0.4 }}>
          Previous Titles + Dates
        </Typography>
        <Box sx={{ display: 'grid', gap: 1.1 }}>
          {previousTitles.map((item) => (
            <Box
              key={`${item.title}-${item.period}`}
              sx={{
                px: 2,
                py: 1.3,
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
                border: '2px solid #525252',
                borderRadius: 0,
                bgcolor: '#171717',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.45)',
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
              <Typography color="text.secondary">{item.period}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
