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
      ],
    })
  }, [])

  return (
    <Stack spacing={3} sx={{ fontFamily: '"Courier New", Courier, monospace' }}>
      <Card
        sx={{
          border: '2px solid #525252',
          borderRadius: 0,
          bgcolor: '#171717',
          boxShadow: '6px 6px 0 rgba(0,0,0,0.45)',
        }}
      >
        <CardContent sx={{ pb: '16px !important' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.5}>
            <Box>
              <Typography variant="h4" sx={{ fontSize: { xs: '1.55rem', md: '1.8rem' }, mb: 0.2 }}>
                Casey
              </Typography>
              <Typography color="text.secondary">IT Professional • Product Builder</Typography>
            </Box>
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Chip label="AIBotCasey" sx={{ borderRadius: 0, bgcolor: '#222', color: '#efefef' }} />
              <Button
                variant="outlined"
                size="small"
                href="mailto:support@aibotcasey.com"
                sx={{ borderRadius: 0, borderColor: '#8f8f8f', color: '#efefef' }}
              >
                Email
              </Button>
              <Button
                variant="outlined"
                size="small"
                href="https://github.com/AIBotCasey"
                target="_blank"
                rel="noreferrer"
                sx={{ borderRadius: 0, borderColor: '#8f8f8f', color: '#efefef' }}
              >
                GitHub
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          href="#projects"
          sx={{ borderRadius: 0, border: '1px solid #8f8f8f', bgcolor: '#e5e5e5', color: '#121212', '&:hover': { bgcolor: '#d5d5d5' } }}
        >
          Projects
        </Button>
        <Button
          variant="outlined"
          href="#experience"
          sx={{ borderRadius: 0, borderColor: '#8f8f8f', color: '#efefef' }}
        >
          Experience
        </Button>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/portfolio"
          sx={{ borderRadius: 0, borderColor: '#8f8f8f', color: '#efefef' }}
        >
          Full Portfolio
        </Button>
      </Box>

      <Box id="projects" sx={{ pt: 1 }}>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          Active Projects
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
                    Repo
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>

      <Box id="experience" sx={{ pt: 1 }}>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          Previous Titles + Dates
        </Typography>

        <Box
          sx={{
            position: 'relative',
            pl: { xs: 3, sm: 4 },
            '&::before': {
              content: '""',
              position: 'absolute',
              left: { xs: 10, sm: 14 },
              top: 6,
              bottom: 6,
              width: '2px',
              bgcolor: '#6a6a6a',
            },
          }}
        >
          <Stack spacing={1.8}>
            {previousTitles.map((item) => (
              <Box
                key={`${item.title}-${item.period}`}
                sx={{
                  position: 'relative',
                  px: 2,
                  py: 1.3,
                  border: '2px solid #525252',
                  borderRadius: 0,
                  bgcolor: '#171717',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.45)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: { xs: -25, sm: -30 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 10,
                    height: 10,
                    bgcolor: '#e0e0e0',
                    border: '2px solid #525252',
                    borderRadius: 0,
                  },
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
                <Typography color="text.secondary">{item.period}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Stack>
  )
}
