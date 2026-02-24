import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

function detectAdBlock() {
  return new Promise((resolve) => {
    const bait = document.createElement('div')
    bait.className = 'adsbox ad-banner ad-placement'
    bait.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;'
    document.body.appendChild(bait)

    setTimeout(() => {
      const blocked = bait.offsetParent === null || bait.clientHeight === 0 || getComputedStyle(bait).display === 'none'
      bait.remove()
      resolve(blocked)
    }, 120)
  })
}

export default function AdblockGate({ children }) {
  const [blocked, setBlocked] = useState(false)
  const [checked, setChecked] = useState(false)

  const runCheck = async () => {
    const isBlocked = await detectAdBlock()
    setBlocked(isBlocked)
    setChecked(true)
  }

  useEffect(() => {
    runCheck()
  }, [])

  if (!checked) return null

  if (blocked) {
    return (
      <Box sx={{ my: 2 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Ad blocker detected. These free tools are funded by ads.
        </Alert>
        <Stack spacing={1.5}>
          <Typography color="text.secondary">Please disable ad blocker for this page, then retry.</Typography>
          <Button variant="contained" onClick={runCheck} sx={{ width: 'fit-content' }}>I disabled it — retry</Button>
        </Stack>
      </Box>
    )
  }

  return (
    <>
      <Box className="ad-slot" sx={{ border: '1px dashed rgba(255,255,255,0.2)', p: 1.5, borderRadius: 2, mb: 2 }}>
        <Typography variant="caption" color="text.secondary">Advertisement</Typography>
      </Box>
      {children}
    </>
  )
}
