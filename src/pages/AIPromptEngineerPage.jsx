import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { setPageSeo, SITE_URL } from '../utils/seo'
import { getBreadcrumbSchema } from '../utils/seoSchemas'

export default function AIPromptEngineerPage() {
  useEffect(() => {
    setPageSeo({
      title: 'AI Prompt Engineer — Casey Purves',
      description:
        'Casey Purves is an AI Prompt Engineer building prompt systems, automation workflows, and production AI products for real business outcomes.',
      path: '/ai-prompt-engineer',
      type: 'profile',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'AI Prompt Engineer — Casey Purves',
          url: `${SITE_URL}/ai-prompt-engineer`,
          description:
            'Profile and portfolio page for Casey Purves, focused on AI prompt engineering, automation, and shipped AI products.',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Casey Purves',
          url: `${SITE_URL}/ai-prompt-engineer`,
          sameAs: ['https://github.com/AIBotCasey'],
          jobTitle: 'AI Prompt Engineer',
          knowsAbout: [
            'Prompt Engineering',
            'AI Agent Workflows',
            'LLM Evaluation',
            'Automation Systems',
            'SaaS Product Development',
          ],
        },
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'AI Prompt Engineer', path: '/ai-prompt-engineer' },
        ]),
      ],
    })
  }, [])

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>AI Prompt Engineer</Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 840 }}>
        I design prompt systems and AI workflows that ship into production. My focus is practical results: better
        reliability, faster incident response, and measurable execution quality.
      </Typography>

      <Card sx={{ mb: 3, background: 'rgba(18, 24, 44, 0.78)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>What I build</Typography>
          <Stack spacing={0.9}>
            <Typography>- Prompt architectures for complex business workflows</Typography>
            <Typography>- AI agent pipelines with validation and guardrails</Typography>
            <Typography>- Automation systems that reduce manual operations load</Typography>
            <Typography>- Productized AI experiences that users can trust</Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, background: 'rgba(18, 24, 44, 0.78)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Relevant skills</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {[
              'Prompt Engineering',
              'AI Workflow Automation',
              'Incident Response Systems',
              'SaaS Product Development',
              'IT Systems',
              'LLM Tooling',
            ].map((s) => (
              <Chip key={s} label={s} variant="outlined" size="small" />
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Typography color="text.secondary" sx={{ maxWidth: 840 }}>
        If you’re hiring for AI Prompt Engineer, AI Automation Consultant, or AI Product Builder roles, this portfolio
        highlights shipped work, implementation depth, and production outcomes.
      </Typography>
    </Box>
  )
}
