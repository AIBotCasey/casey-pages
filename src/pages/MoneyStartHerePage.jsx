import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { posts, sortPostsByNewest } from '../data/posts'
import { setPageSeo } from '../utils/seo'
import NewsletterSignup from '../components/NewsletterSignup'
import { getPostImageUrl } from '../utils/postImages'

const starterTracks = [
  {
    title: 'If your money feels messy',
    steps: ['Start with a simple monthly spending baseline', 'Set fixed bill dates and a weekly 15-minute money check-in', 'Create one emergency buffer target (even small)'],
  },
  {
    title: 'If debt is the main stress point',
    steps: ['List balances, rates, and minimums in one place', 'Pick one payoff strategy and stick with it for 90 days', 'Automate minimums so you never miss a payment'],
  },
]

export default function MoneyStartHerePage() {
  const topPosts = sortPostsByNewest(posts).slice(0, 5)

  useEffect(() => {
    setPageSeo({
      title: 'Start Here: Personal Finance Foundations | Money by Casey',
      description: 'Start here for practical personal finance fundamentals: budgeting, debt payoff, and money systems that last.',
      path: '/start-here',
    })
  }, [])

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>Start Here</Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 860 }}>
        If you want a calmer money life, begin with consistent systems — not complicated spreadsheets.
        Here are the best first reads and a simple path to get traction.
      </Typography>

      <Typography variant="h4" sx={{ mb: 2 }}>Best First Reads</Typography>
      <Grid container spacing={2.5} sx={{ mb: 6 }}>
        {topPosts.map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={post.slug}>
            <Card sx={{ height: '100%', background: 'rgba(18, 28, 32, 0.72)', border: '1px solid rgba(255,255,255,0.1)' }}>
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

      <Typography variant="h4" sx={{ mb: 2 }}>Choose Your Starting Track</Typography>
      <Grid container spacing={2.5}>
        {starterTracks.map((track) => (
          <Grid size={{ xs: 12, md: 6 }} key={track.title}>
            <Card sx={{ height: '100%', background: 'rgba(18, 28, 32, 0.72)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1.5 }}>{track.title}</Typography>
                <Stack component="ul" sx={{ pl: 2.2, m: 0, gap: 0.75 }}>
                  {track.steps.map((step) => (
                    <Typography component="li" key={step} color="text.secondary">{step}</Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 5, mb: 4 }}>
        <Button component={RouterLink} to="/blog" variant="outlined">Browse All Posts</Button>
      </Stack>

      <NewsletterSignup source="money-start-here" />
    </Box>
  )
}
