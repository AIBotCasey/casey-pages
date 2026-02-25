import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { setPageSeo, SITE_URL } from '../utils/seo'
import { getBreadcrumbSchema } from '../utils/seoSchemas'

export default function TermsPage() {
  useEffect(() => {
    setPageSeo({
      title: 'Terms of Use | AIBotCasey Tools',
      description: 'Terms of use for AIBotCasey tools, including browser-local processing and usage limits.',
      path: '/terms',
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Terms of Use', path: '/terms' },
      ]),
    })
  }, [])

  return (
    <Stack spacing={1.5}>
      <Typography variant="h3">Terms of Use</Typography>
      <Typography color="text.secondary">Effective date: 2026-02-25</Typography>

      <Typography>
        By using AIBotCasey.com and its free tools, you agree to use the site for lawful purposes and at your own risk.
      </Typography>

      <Typography variant="h6">Tool usage and data handling</Typography>
      <Typography>
        The tools on this site are designed to process your input in your browser. We do not collect, store, or sell the data you type,
        paste, upload, or generate inside tool workflows.
      </Typography>

      <Typography variant="h6">Service availability</Typography>
      <Typography>
        Tools are provided “as is” without warranties of availability, fitness for a specific purpose, or error-free operation.
      </Typography>

      <Typography variant="h6">Limits of liability</Typography>
      <Typography>
        You are responsible for verifying output before business, legal, financial, or technical use. AIBotCasey is not liable for losses
        caused by tool output or temporary downtime.
      </Typography>

      <Typography variant="h6">Contact</Typography>
      <Typography>
        Questions about these terms: support@aibotcasey.com
      </Typography>
    </Stack>
  )
}
