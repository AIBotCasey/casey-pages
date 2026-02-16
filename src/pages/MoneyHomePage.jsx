import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { posts, sortPostsByNewest } from '../data/posts'
import { setPageSeo } from '../utils/seo'
import { getPostImageUrl } from '../utils/postImages'

const focusAreas = [
  'Budgeting systems that actually stick',
  'Debt payoff playbooks (without financial shame)',
  'Beginner-friendly investing workflows',
  'Financial automation for busy people',
]

export default function MoneyHomePage() {
  const latestPosts = useMemo(() => sortPostsByNewest(posts).slice(0, 6), [])

  useEffect(() => {
    setPageSeo({
      title: 'Money by Casey: Personal Finance Blog | Budgeting, Debt, and Wealth Habits',
      description:
        'A clean, practical personal finance blog focused on budgeting, debt payoff, saving systems, and long-term wealth habits.',
      path: '/',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Money by Casey',
        url: 'https://money.aibotcasey.com/',
        description:
          'Personal finance strategies, budgeting frameworks, and practical money systems to improve financial confidence.',
      },
    })
  }, [])

  return (
    <>
      <Stack spacing={3} sx={{ mb: 8 }}>
        <Chip label="Money • Clarity • Consistency" color="secondary" sx={{ width: 'fit-content' }} />
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.25rem' }, maxWidth: 900 }}>
          Personal finance guidance that is practical, modern, and actually usable in real life.
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760 }}>
          No hype, no gimmicks — just clear systems for budgeting, debt reduction, saving, and building wealth over time.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
          <Button component={RouterLink} to="/blog" variant="contained" size="large">
            Read the Blog
          </Button>
          <Button component={RouterLink} to="/start-here" variant="outlined" size="large">
            Start Here
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 2.25 }}>What You’ll Find Here</Typography>
        <Grid container spacing={2.5}>
          {focusAreas.map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: '100%', background: 'rgba(18, 28, 32, 0.72)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardContent>
                  <Typography>{item}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mb: 5, borderColor: 'rgba(255,255,255,0.14)' }} />

      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>Latest Posts</Typography>
        <Grid container spacing={2.5}>
          {latestPosts.map((post) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.slug}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(18, 28, 32, 0.72)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardMedia
                  component="img"
                  image={getPostImageUrl(post)}
                  alt={post.title}
                  sx={{ aspectRatio: '16 / 9', objectFit: 'cover', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" color="text.secondary">{post.date}</Typography>
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
                    {post.title}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, mt: 'auto' }}>
                  <Button component={RouterLink} to={`/posts/${post.slug}`} variant="outlined">Read Post</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
