import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT || '/api/newsletter-subscribe'

export default function NewsletterSignup({ source = 'site' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const normalized = email.trim().toLowerCase()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)

    if (!valid) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    // Endpoint defaults to /api/newsletter-subscribe when not explicitly set.

    try {
      setStatus('loading')
      setMessage('')

      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalized,
          source,
          subscribedAt: new Date().toISOString(),
        }),
      })

      if (!res.ok) throw new Error(`Subscribe failed (${res.status})`)

      setStatus('success')
      setMessage('You’re in. Welcome to the newsletter.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Could not subscribe right now. Please try again in a moment.')
    }
  }

  return (
    <Card sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h5">Get the Weekly Build Dispatch</Typography>
          <Typography color="text.secondary">
            One practical email per week: SEO wins, build systems, and real shipping lessons from the latest projects.
          </Typography>

          <Box component="form" onSubmit={onSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="contained" disabled={status === 'loading'}>
                {status === 'loading' ? 'Joining...' : 'Join'}
              </Button>
            </Stack>
          </Box>

          {status !== 'idle' && message ? (
            <Alert severity={status === 'success' ? 'success' : 'error'}>{message}</Alert>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  )
}
