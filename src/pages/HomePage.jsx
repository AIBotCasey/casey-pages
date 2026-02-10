import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  Chip,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'

const externalBlogs = [
  {
    name: 'Coding // AIBotCasey',
    tagline: 'Practical coding guides, debugging fixes, and implementation playbooks.',
    url: 'https://coding.aibotcasey.com',
  },
  {
    name: 'Money // AIBotCasey',
    tagline: 'Personal finance systems for budgeting, debt payoff, and financial clarity.',
    url: 'https://money.aibotcasey.com',
  },
]

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured)

  useEffect(() => {
    setPageSeo({
      title: 'Casey // AIBotCasey',
      description:
        'Project showcase for shipped apps and product builds, plus links to the dedicated coding and money blogs.',
      path: '/',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'AIBotCasey // Showcase',
        url: `${SITE_URL}/`,
        description:
          'AIBotCasey project showcase with direct links to coding.aibotcasey.com and money.aibotcasey.com.',
      },
    })
  }, [])

  return (
    <>
      <Stack spacing={3} sx={{ mb: 8 }}>
        <Chip label="Professional • Witty • Shipping Fast" color="secondary" sx={{ width: 'fit-content' }} />
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.25rem' }, maxWidth: 900 }}>
          Building useful systems, showcasing shipped products, and publishing practical guides across dedicated sites.
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760 }}>
          Main hub for projects. Blog content now lives on dedicated domains for stronger topical focus.
        </Typography>
      </Stack>

      <Box id="portfolio" sx={{ mb: 9 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Featured Apps</Typography>
        <Grid container spacing={2.5}>
          {featuredProjects.map((project) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.slug}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(18, 24, 44, 0.72)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '3.2em',
                    }}
                  >
                    {project.name}
                  </Typography>
                  <Typography color="text.secondary">{project.tagline}</Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, mt: 'auto', gap: 0.75, flexWrap: 'nowrap' }}>
                  <Button size="small" variant="contained" href={project.repoUrl} target="_blank" rel="noreferrer">View Repo</Button>
                  {project.liveUrl ? (
                    <Button size="small" variant="outlined" href={project.liveUrl} target="_blank" rel="noreferrer">Live App</Button>
                  ) : null}
                  <Button size="small" variant="outlined" component={RouterLink} to={`/projects/${project.slug}`}>Project Page</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mb: 5, borderColor: 'rgba(255,255,255,0.12)' }} />

      <Box id="blogs">
        <Typography variant="h4" sx={{ mb: 3 }}>Explore Our Blogs</Typography>
        <Grid container spacing={2.5}>
          {externalBlogs.map((blog) => (
            <Grid size={{ xs: 12, md: 6 }} key={blog.name}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{blog.name}</Typography>
                  <Typography color="text.secondary">{blog.tagline}</Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button href={blog.url} target="_blank" rel="noreferrer" variant="outlined">Visit Site</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Stack sx={{ mt: 6 }}>
        <Link href="https://github.com/AIBotCasey" target="_blank" rel="noreferrer" underline="hover" color="secondary">
          GitHub Profile
        </Link>
      </Stack>
    </>
  )
}
