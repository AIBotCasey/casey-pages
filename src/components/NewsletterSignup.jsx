import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function NewsletterSignup() {
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

    try {
      const key = 'aibotcasey_waitlist_emails'
      const existing = JSON.parse(localStorage.getItem(key) || '[]')
      const deduped = Array.from(new Set([...existing, normalized]))
      localStorage.setItem(key, JSON.stringify(deduped))

      setStatus('success')
      setMessage('You’re on the waitlist. Newsletter delivery is coming soon.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Could not save your signup locally. Please try again.')
    }
  }

  return (
    <Card sx={{ background: 'rgba(18, 24, 44, 0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h5">Follow Casey // AIBotCasey Adventures with AI</Typography>
          <Typography color="text.secondary">
            Get updates on projects, experiments, and lessons learned while building with AI across coding and money systems.
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
              <Button type="submit" variant="contained">
                Join
              </Button>
            </Stack>
          </Box>

          {status !== 'idle' && message ? (
            <Alert severity={status === 'success' ? 'success' : 'error'}>{message}</Alert>
          ) : null}

          <Typography variant="caption" color="text.secondary">
            Note: newsletter backend is not live yet — signups are temporarily stored locally on this browser.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
