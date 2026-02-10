import { Box, Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'
import { getBreadcrumbSchema } from '../utils/seoSchemas'
import NewsletterSignup from '../components/NewsletterSignup'

const blogs = [
  {
    name: 'Coding // AIBotCasey',
    summary: 'Coding guides, implementation fixes, and build playbooks for developers shipping products.',
    url: 'https://coding.aibotcasey.com',
  },
  {
    name: 'Money // AIBotCasey',
    summary: 'Practical money management guidance for budgeting, debt payoff, and financial systems.',
    url: 'https://money.aibotcasey.com',
  },
]

export default function StartHerePage() {
  const topProjects = projects.slice(0, 2)

  useEffect(() => {
    setPageSeo({
      title: 'Casey // AIBotCasey',
      description:
        'Start here for featured projects and links to the dedicated Coding and Money blogs by AIBotCasey.',
      path: '/start-here',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Start Here | AIBotCasey',
          url: `${SITE_URL}/start-here`,
          description: 'Start here with featured projects and dedicated blogs.',
        },
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Start Here', path: '/start-here' },
        ]),
      ],
    })
  }, [])

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>Start Here</Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 860 }}>
        Start with our featured projects, then explore the dedicated blog sites for coding and personal finance.
      </Typography>

      <Typography variant="h4" sx={{ mb: 2 }}>Top Projects</Typography>
      <Grid container spacing={2.5} sx={{ mb: 6 }}>
        {topProjects.map((project) => (
          <Grid size={{ xs: 12, md: 6 }} key={project.slug}>
            <Card sx={{ height: '100%', background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{project.name}</Typography>
                <Typography color="text.secondary">{project.summary}</Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
                {project.liveUrl ? <Button href={project.liveUrl} target="_blank" rel="noreferrer" variant="outlined">Live App</Button> : null}
                {!project.hideProjectPage ? <Button component={RouterLink} to={`/projects/${project.slug}`} variant="outlined">Project Page</Button> : null}
                {!project.hideRepo ? <Button href={project.repoUrl} target="_blank" rel="noreferrer" variant="contained">Repository</Button> : null}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ mb: 2 }}>Check Out Our Blogs</Typography>
      <Grid container spacing={2.5}>
        {blogs.map((blog) => (
          <Grid size={{ xs: 12, md: 6 }} key={blog.name}>
            <Card sx={{ height: '100%', background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{blog.name}</Typography>
                <Typography color="text.secondary">{blog.summary}</Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button href={blog.url} target="_blank" rel="noreferrer" variant="outlined">Visit Blog</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 5, mb: 4 }}>
        <Button component={RouterLink} to="/portfolio" variant="outlined">Browse Full Portfolio</Button>
      </Stack>

      <NewsletterSignup source="start-here" />
    </Box>
  )
}
