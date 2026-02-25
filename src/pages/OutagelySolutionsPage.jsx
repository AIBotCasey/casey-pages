import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { setPageSeo, SITE_URL } from '../utils/seo'
import { getBreadcrumbSchema } from '../utils/seoSchemas'

const audiences = [
  {
    name: 'MSPs and IT Service Providers',
    value: 'Track customer-impacting vendor outages in one pane and communicate faster.',
  },
  {
    name: 'SaaS Support Teams',
    value: 'Correlate support spikes with third-party incidents before ticket volume escalates.',
  },
  {
    name: 'Operations and Reliability Teams',
    value: 'Get a live view of service disruptions to shorten incident triage and status updates.',
  },
]

export default function OutagelySolutionsPage() {
  useEffect(() => {
    setPageSeo({
      title: 'Outagely Solutions | Monitoring for MSPs, Support, and Ops Teams',
      description: 'See how Outagely helps teams monitor SaaS outages, reduce response time, and improve incident communication.',
      path: '/outagely/solutions',
      jsonLd: [
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Outagely Solutions', path: '/outagely/solutions' },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Outagely',
          applicationCategory: 'BusinessApplication',
          url: 'https://www.outagely.com',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          description: 'Real-time SaaS outage monitoring, service status tracking, and downtime alerts.',
        },
      ],
    })
  }, [])

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Outagely Solutions by Team</Typography>
      <Typography color="text.secondary">Outagely helps teams detect upstream SaaS disruptions faster and communicate clearly during incidents.</Typography>
      {audiences.map((a) => (
        <Card key={a.name} sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CardContent>
            <Typography variant="h6">{a.name}</Typography>
            <Typography color="text.secondary">{a.value}</Typography>
          </CardContent>
        </Card>
      ))}
      <Stack direction="row" spacing={1}>
        <Button variant="contained" href="https://www.outagely.com" target="_blank" rel="noreferrer">Open Outagely</Button>
        <Button variant="outlined" href="https://www.outagely.com/for-business.html" target="_blank" rel="noreferrer">For Business</Button>
      </Stack>
    </Stack>
  )
}
