import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { posts, sortPostsByNewest } from '../data/posts'
import { setPageSeo } from '../utils/seo'
import { getPostImageUrl } from '../utils/postImages'

export default function MoneyBlogPage() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    setPageSeo({
      title: 'Personal Finance Blog Articles | Money by Casey',
      description: 'Browse personal finance articles on budgeting, debt payoff, saving strategy, and money habits.',
      path: '/blog',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Money by Casey Blog',
        url: 'https://money.aibotcasey.com/blog',
      },
    })
  }, [])

  const orderedPosts = useMemo(() => sortPostsByNewest(posts), [])

  const visiblePosts = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return orderedPosts

    return orderedPosts.filter((post) => {
      const haystack = [post.title, post.excerpt, ...(post.sections?.map((s) => s.heading) ?? [])].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [orderedPosts, query])

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>Money Blog</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Tactical personal finance writing designed to help you make better decisions with less stress.
      </Typography>

      <TextField
        fullWidth
        label="Search posts"
        placeholder="Try: budgeting, debt payoff, emergency fund..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2.5}>
        {visiblePosts.map((post) => (
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

      {visiblePosts.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          No posts found for “{query}”. Try a broader keyword.
        </Typography>
      ) : null}
    </Box>
  )
}
