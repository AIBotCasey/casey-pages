import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getPostBySlug } from '../data/posts'

export default function PostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useEffect(() => {
    document.title = post ? `${post.title} | AIBotCasey` : 'Post not found | AIBotCasey'
  }, [post])

  if (!post) {
    return (
      <Stack spacing={2}>
        <Typography variant="h4">Post not found</Typography>
        <Button component={RouterLink} to="/" variant="contained">Back Home</Button>
      </Stack>
    )
  }

  return (
    <Stack spacing={3}>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ width: 'fit-content' }}>← Back</Button>
      <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', sm: '2.2rem', md: '3rem' } }}>{post.title}</Typography>
      <Typography variant="body2" color="text.secondary">{post.date}</Typography>
      <Card sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardContent>
          {post.sections?.map((section) => (
            <Stack key={section.heading} spacing={1.2} sx={{ mb: 2.5 }}>
              <Typography variant="h6">{section.heading}</Typography>
              {section.text ? <Typography>{section.text}</Typography> : null}
              {section.bullets ? (
                <ul style={{ marginTop: 0 }}>
                  {section.bullets.map((item) => (
                    <li key={item}>
                      <Typography component="span">{item}</Typography>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Stack>
          ))}
        </CardContent>
      </Card>
    </Stack>
  )
}
