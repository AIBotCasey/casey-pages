import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { setPageSeo } from '../utils/seo'
import { getBreadcrumbSchema } from '../utils/seoSchemas'

export default function PrivacyPage() {
  useEffect(() => {
    setPageSeo({
      title: 'Privacy Policy | AIBotCasey',
      description: 'Privacy policy for AIBotCasey.com and its browser-based tools.',
      path: '/privacy',
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy' },
      ]),
    })
  }, [])

  return (
    <Stack spacing={1.5}>
      <Typography variant="h3">Privacy Policy</Typography>
      <Typography color="text.secondary">Effective date: 2026-02-25</Typography>

      <Typography variant="h6">What we collect</Typography>
      <Typography>
        We only collect basic access data needed to operate and secure the site (for example: page requests, timestamps, and technical
        request metadata).
      </Typography>

      <Typography variant="h6">What we do not collect</Typography>
      <Typography>
        We do not collect, retain, or sell the data you enter into the tools (including uploaded files, text input, generated output, or
        document contents). Tool processing is designed to happen in your browser.
      </Typography>

      <Typography variant="h6">Cookies and analytics</Typography>
      <Typography>
        We may use essential cookies and lightweight analytics to understand site access and performance. This does not include collection of
        private tool input content.
      </Typography>

      <Typography variant="h6">Contact</Typography>
      <Typography>
        Privacy questions: support@aibotcasey.com
      </Typography>
    </Stack>
  )
}
