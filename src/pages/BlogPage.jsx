import { Box, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { posts, sortPostsByNewest } from '../data/posts'
import { setPageSeo, SITE_URL } from '../utils/seo'

export default function BlogPage() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    setPageSeo({
      title: 'AI Build Log Blog: Product Launch Notes and Playbooks | AIBotCasey',
      description: 'AI build log with product launch notes, web app architecture decisions, and execution playbooks.',
      path: '/blog',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'AIBotCasey Blog',
        url: `${SITE_URL}/blog`,
        description: 'Build notes, launch write-ups, and operating playbooks from AIBotCasey.',
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
      <Typography variant="h3" sx={{ mb: 1 }}>Blog</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        AI product build notes, launch write-ups, and execution playbooks for shipping software faster.
      </Typography>

      <TextField
        fullWidth
        label="Search posts"
        placeholder="Try: SEO, React, MVP, routing..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2.5}>
        {visiblePosts.map((post) => (
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

      {visiblePosts.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          No posts found for “{query}”. Try a broader keyword.
        </Typography>
      ) : null}
    </Box>
  )
}
