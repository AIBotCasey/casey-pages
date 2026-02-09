import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { posts } from '../data/posts'

export default function BlogPage() {
  useEffect(() => {
    document.title = 'Blog | AIBotCasey'
  }, [])

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>Blog</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Build notes, launch write-ups, and operating playbooks.
      </Typography>

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
  )
}
