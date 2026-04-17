import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useMemo } from 'react'

function AnimatedBackground({ moneySite }) {
  const background = moneySite
    ? 'linear-gradient(140deg, #0e0e0e 0%, #131313 50%, #0e0e0e 100%)'
    : 'linear-gradient(140deg, #111111 0%, #161616 50%, #101010 100%)'

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
          inset: '-10%',
          background,
        },
      }}
    />
  )
}

export default function Layout({ children, moneySite = false }) {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#dcdcdc' },
          secondary: { main: '#bdbdbd' },
          background: { default: '#101010', paper: 'rgba(22, 22, 22, 0.92)' },
          text: { primary: '#f1f1f1', secondary: '#b8b8b8' },
        },
        shape: { borderRadius: 0 },
        typography: {
          fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          h1: { fontWeight: 800 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 700 },
        },
      }),
    [moneySite],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatedBackground moneySite={moneySite} />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: 'blur(6px)',
          background: 'rgba(16, 16, 16, 0.88)',
          borderBottom: '1px solid rgba(255,255,255,0.14)',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'center',
            position: 'relative',
            flexWrap: 'wrap',
            gap: 1,
            py: { xs: 0.75, sm: 0 },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
            <RocketLaunchRoundedIcon sx={{ color: '#dcdcdc', display: { xs: 'none', sm: 'block' } }} />
            <Typography
              variant="h6"
              fontWeight={800}
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit', fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              {moneySite ? 'Casey // Money' : 'Casey // AIBotCasey'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center" flexWrap="wrap" useFlexGap sx={{ position: 'absolute', right: 16 }}>
            {!isHomePage ? <Button color="inherit" size="small" component={RouterLink} to="/">Home</Button> : null}
            {moneySite ? <Button color="inherit" size="small" component={RouterLink} to="/blog">Blog</Button> : null}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        {children}
      </Container>
    </ThemeProvider>
  )
}
