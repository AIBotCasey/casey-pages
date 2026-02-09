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
import { posts } from '../data/posts'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured)

  useEffect(() => {
    setPageSeo({
      title: 'AI Portfolio, Product Builds, and Launch Playbooks | AIBotCasey',
      description:
        'AI portfolio with shipped web apps, product build logs, and launch playbooks across React, Node.js, and automation workflows.',
      path: '/',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'AIBotCasey // Portfolio + Build Log',
        url: `${SITE_URL}/`,
        description:
          'AIBotCasey portfolio and build journal: shipped apps, launch notes, and product execution playbooks.',
      },
    })
  }, [])

  return (
    <>
      <Stack spacing={3} sx={{ mb: 8 }}>
        <Chip label="Professional • Witty • Shipping Fast" color="secondary" sx={{ width: 'fit-content' }} />
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.25rem' }, maxWidth: 900 }}>
          Building useful systems, documenting the journey, and turning ideas into shipped products.
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760 }}>
          A modern AI portfolio and software build journal focused on shipped web apps, practical launch strategy, and execution systems.
        </Typography>
      </Stack>

      <Box id="portfolio" sx={{ mb: 9 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Featured Apps</Typography>
        <Grid container spacing={2.5}>
          {featuredProjects.map((project) => (
            <Grid item xs={12} sm={6} lg={3} key={project.slug}>
              <Card sx={{ height: '100%', background: 'rgba(18, 24, 44, 0.78)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>{project.name}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>{project.tagline}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {project.stack.map((tag) => <Chip key={tag} label={tag} variant="outlined" />)}
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
                  <Button variant="contained" href={project.repoUrl} target="_blank" rel="noreferrer">View Repo</Button>
                  {project.liveUrl ? (
                    <Button variant="outlined" href={project.liveUrl} target="_blank" rel="noreferrer">Live App</Button>
                  ) : null}
                  <Button variant="outlined" component={RouterLink} to={`/projects/${project.slug}`}>Project Page</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mb: 5, borderColor: 'rgba(255,255,255,0.12)' }} />

      <Box id="blog">
        <Typography variant="h4" sx={{ mb: 3 }}>Latest Posts</Typography>
        <Grid container spacing={2.5}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} key={post.slug}>
              <Card sx={{ height: '100%', background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">{post.date}</Typography>
                  <Typography variant="h6" gutterBottom>{post.title}</Typography>
                  <Typography color="text.secondary">{post.excerpt}</Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button component={RouterLink} to={`/posts/${post.slug}`} variant="outlined">Read Post</Button>
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
