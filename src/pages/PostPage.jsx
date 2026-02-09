import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getPostBySlug, posts } from '../data/posts'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'
import { getPostImageUrl } from '../utils/postImages'

export default function PostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 2)
  const relatedProjects = projects.slice(0, 2)

  useEffect(() => {
    if (!post) {
      setPageSeo({
        title: 'Post not found | AIBotCasey',
        description: 'The requested post could not be found.',
        path: `/posts/${slug}`,
        robots: 'noindex, follow',
      })
      return
    }

    const path = `/posts/${post.slug}`
    setPageSeo({
      title: `${post.title} | AIBotCasey`,
      description: post.excerpt,
      path,
      type: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Person',
          name: 'Casey',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AIBotCasey',
          url: SITE_URL,
        },
        mainEntityOfPage: `${SITE_URL}${path}`,
        url: `${SITE_URL}${path}`,
      },
    })
  }, [post, slug])

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
      <Button component={RouterLink} to="/blog" variant="outlined" sx={{ width: 'fit-content' }}>← Back to Blog</Button>
      <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', sm: '2.2rem', md: '3rem' } }}>{post.title}</Typography>
      <Typography variant="body2" color="text.secondary">{post.date}</Typography>
      <Card sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardMedia
          component="img"
          image={getPostImageUrl(post)}
          alt={post.title}
          sx={{ aspectRatio: '16 / 9', objectFit: 'cover', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        />
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

      <Card sx={{ background: 'rgba(18, 24, 44, 0.62)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Related Build Posts</Typography>
          <Stack spacing={1}>
            {relatedPosts.map((related) => (
              <Typography key={related.slug}>
                <RouterLink to={`/posts/${related.slug}`}>{related.title}</RouterLink>
              </Typography>
            ))}
          </Stack>

          <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Related Product Projects</Typography>
          <Stack spacing={1}>
            {relatedProjects.map((project) => (
              <Typography key={project.slug}>
                <RouterLink to={`/projects/${project.slug}`}>{project.name}</RouterLink> — {project.tagline}
              </Typography>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
