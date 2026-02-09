import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { posts, sortPostsByNewest } from '../data/posts'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'
import NewsletterSignup from '../components/NewsletterSignup'
import { getPostImageUrl } from '../utils/postImages'

export default function StartHerePage() {
  const topPosts = sortPostsByNewest(posts).slice(0, 5)
  const topProjects = projects.slice(0, 2)

  useEffect(() => {
    setPageSeo({
      title: 'Start Here: Best AI Build Posts and Projects | AIBotCasey',
      description:
        'Start here for the best AI build posts, SEO implementation guides, and shipped projects from AIBotCasey.',
      path: '/start-here',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Start Here | AIBotCasey',
        url: `${SITE_URL}/start-here`,
        description: 'Curated best posts and projects to start with on AIBotCasey.',
      },
    })
  }, [])

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>Start Here</Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 860 }}>
        New here? Start with these core posts and projects. This page is the fastest path to the most useful SEO, routing,
        and product execution examples on the site.
      </Typography>

      <Typography variant="h4" sx={{ mb: 2 }}>Top 5 Posts</Typography>
      <Grid container spacing={2.5} sx={{ mb: 6 }}>
        {topPosts.map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={post.slug}>
            <Card sx={{ height: '100%', background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <CardMedia
                component="img"
                image={getPostImageUrl(post)}
                alt={post.title}
                sx={{ aspectRatio: '16 / 9', objectFit: 'cover', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              />
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

      <Typography variant="h4" sx={{ mb: 2 }}>Top Projects</Typography>
      <Grid container spacing={2.5}>
        {topProjects.map((project) => (
          <Grid size={{ xs: 12, md: 6 }} key={project.slug}>
            <Card sx={{ height: '100%', background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{project.name}</Typography>
                <Typography color="text.secondary">{project.summary}</Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
                <Button component={RouterLink} to={`/projects/${project.slug}`} variant="outlined">Project Page</Button>
                <Button href={project.repoUrl} target="_blank" rel="noreferrer" variant="contained">Repository</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 5, mb: 4 }}>
        <Button component={RouterLink} to="/blog" variant="outlined">Browse All Posts</Button>
        <Button component={RouterLink} to="/portfolio" variant="outlined">Browse Full Portfolio</Button>
      </Stack>

      <NewsletterSignup source="start-here" />
    </Box>
  )
}
