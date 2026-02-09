import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo } from 'react'

function AnimatedBackground() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        zIndex: -2,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '-20%',
          background:
            'radial-gradient(circle at 20% 20%, rgba(124,77,255,0.30), transparent 38%), radial-gradient(circle at 80% 30%, rgba(0,229,255,0.25), transparent 40%), radial-gradient(circle at 40% 80%, rgba(255,64,129,0.20), transparent 35%), linear-gradient(130deg, #070a14 0%, #0c1226 50%, #060912 100%)',
          animation: 'floatBg 28s ease-in-out infinite alternate',
          transformOrigin: 'center',
        },
      }}
    />
  )
}

export default function Layout({ children }) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#7c4dff' },
          secondary: { main: '#00e5ff' },
          background: { default: '#070a14', paper: 'rgba(16, 21, 38, 0.7)' },
        },
        shape: { borderRadius: 16 },
        typography: {
          fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          h1: { fontWeight: 800 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 700 },
        },
      }),
    [],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatedBackground />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: 'blur(8px)',
          background: 'rgba(7, 10, 20, 0.55)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
            py: { xs: 0.75, sm: 0 },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
            <RocketLaunchRoundedIcon color="secondary" sx={{ display: { xs: 'none', sm: 'block' } }} />
            <Typography
              variant="h6"
              fontWeight={800}
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit', fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              Casey // Build Log
            </Typography>
          </Stack>
          <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center" flexWrap="wrap" useFlexGap>
            <Button color="inherit" size="small" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" size="small" component={RouterLink} to="/#blog">Blog</Button>
            <Button color="inherit" size="small" component={RouterLink} to="/#portfolio">Portfolio</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        {children}
        <Stack spacing={1} sx={{ mt: 9, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Chip label="Built with React + MUI" color="secondary" sx={{ width: 'fit-content' }} />
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Casey • Built with AIBotCasey 🤖
          </Typography>
        </Stack>
      </Container>
    </ThemeProvider>
  )
}
