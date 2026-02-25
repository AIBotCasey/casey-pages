import { Box, Button, Card, CardActions, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'
import { projects } from '../data/projects'
import { setPageSeo, SITE_URL } from '../utils/seo'
import { getBreadcrumbSchema } from '../utils/seoSchemas'

export default function PortfolioPage() {
  useEffect(() => {
    setPageSeo({
      title: 'Shipped Products Portfolio | Outagely, AI Apps & Tools by AIBotCasey',
      description: 'Explore shipped products from AIBotCasey including Outagely and active AI software builds focused on real-world reliability and utility.',
      path: '/portfolio',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'AIBotCasey Portfolio',
          url: `${SITE_URL}/portfolio`,
          description: 'Portfolio of shipped and active product builds by AIBotCasey.',
        },
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
        ]),
      ],
    })
  }, [])

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>Portfolio</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Software product portfolio of active builds and shipped apps across web, automation, and trading workflows.
      </Typography>

      <Grid container spacing={2.5}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={project.slug}>
            <Card sx={{ height: '100%', background: 'rgba(18, 24, 44, 0.78)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{project.name}</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>{project.tagline}</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {project.stack.map((tag) => <Chip key={tag} label={tag} variant="outlined" size="small" />)}
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
                {project.liveUrl ? <Button size="small" variant="outlined" href={project.liveUrl} target="_blank" rel="noreferrer">Live</Button> : null}
                {!project.hideRepo ? <Button size="small" variant="contained" href={project.repoUrl} target="_blank" rel="noreferrer">Repo</Button> : null}
                {!project.hideProjectPage ? <Button size="small" variant="outlined" component={RouterLink} to={`/projects/${project.slug}`}>Details</Button> : null}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
