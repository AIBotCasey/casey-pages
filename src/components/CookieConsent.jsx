import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'aibotcasey_cookie_consent_v1'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY)
    if (!saved) setVisible(true)
  }, [])

  const setConsent = (value) => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        consent: value,
        timestamp: new Date().toISOString(),
      }),
    )
    setVisible(false)
  }

  if (!visible) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1400,
        px: { xs: 1.5, sm: 2.5 },
        pb: { xs: 1.5, sm: 2.5 },
      }}
    >
      <Card
        sx={{
          maxWidth: 980,
          mx: 'auto',
          p: { xs: 1.5, sm: 2 },
          background: 'rgba(14, 20, 36, 0.92)',
          border: '1px solid rgba(255,255,255,0.14)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Stack spacing={1.25}>
          <Typography variant="subtitle1" fontWeight={700}>
            Cookie Notice
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We use essential cookies to run this site and optional analytics cookies to improve performance. You can accept all
            cookies or continue with essential-only cookies.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button variant="contained" onClick={() => setConsent('accepted_all')}>
              Accept all
            </Button>
            <Button variant="outlined" onClick={() => setConsent('essential_only')}>
              Essential only
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  )
}
