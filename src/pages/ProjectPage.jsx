import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { projects } from '../data/projects'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    document.title = project ? `${project.name} | AIBotCasey` : 'Project not found | AIBotCasey'
  }, [project])

  if (!project) {
    return (
      <Stack spacing={2}>
        <Typography variant="h4">Project not found</Typography>
        <Button component={RouterLink} to="/" variant="contained">Back Home</Button>
      </Stack>
    )
  }

  return (
    <Stack spacing={3}>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ width: 'fit-content' }}>← Back</Button>
      <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', sm: '2.2rem', md: '3rem' } }}>{project.name}</Typography>
      <Typography color="text.secondary">{project.summary}</Typography>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {project.stack.map((tag) => <Chip key={tag} label={tag} variant="outlined" />)}
      </Stack>
      <Card sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Status: {project.status}</Typography>
          <Typography color="text.secondary">
            Project notes, implementation details, and launch updates are published here as this portfolio continues to expand.
          </Typography>
          <Button variant="contained" href={project.repoUrl} target="_blank" rel="noreferrer" sx={{ mt: 2 }}>
            Open GitHub Repo
          </Button>
        </CardContent>
      </Card>
    </Stack>
  )
}
