import { Alert, Box, Button, Chip, Slider, Stack, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { getTool } from '../data/tools'
import { setPageSeo } from '../utils/seo'
import AdblockGate from '../components/AdblockGate'

function LoanCalculator() {
  const [amount, setAmount] = useState(25000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(5)
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const payment = monthlyRate === 0 ? amount / months : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
  const total = payment * months
  return <Typography>Monthly: ${payment.toFixed(2)} · Total: ${total.toFixed(2)} · Interest: ${(total - amount).toFixed(2)}</Typography>
}

function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [password, setPassword] = useState('')
  const generate = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%*'
    let out = ''
    for (let i = 0; i < length; i += 1) out += chars[Math.floor(Math.random() * chars.length)]
    setPassword(out)
  }
  useEffect(() => { generate() }, [length])
  return <Stack spacing={1}><Typography>Length: {length}</Typography><Slider min={8} max={48} value={length} onChange={(_, v) => setLength(v)} /><TextField value={password} InputProps={{ readOnly: true }} /><Button variant="outlined" onClick={generate}>Regenerate</Button></Stack>
}

function JsonFormatter() {
  const [input, setInput] = useState('{\n  "hello": "world"\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const format = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2))
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }
  return <Stack spacing={1.2}><TextField multiline minRows={8} value={input} onChange={(e) => setInput(e.target.value)} /><Button variant="contained" onClick={format}>Format JSON</Button>{error ? <Alert severity="error">{error}</Alert> : null}{output ? <TextField multiline minRows={8} value={output} InputProps={{ readOnly: true }} /> : null}</Stack>
}

function QrGenerator() {
  const [text, setText] = useState('https://aibotcasey.com')
  const [src, setSrc] = useState('')

  useEffect(() => {
    QRCode.toDataURL(text || ' ', { width: 220, margin: 1 })
      .then((url) => setSrc(url))
      .catch(() => setSrc(''))
  }, [text])

  return <Stack spacing={1.2}><TextField label="Text or URL" value={text} onChange={(e) => setText(e.target.value)} />{src ? <Box component="img" src={src} alt="QR code" sx={{ width: 220, height: 220, borderRadius: 1 }} /> : null}</Stack>
}

function ImageCompressor() {
  const [result, setResult] = useState('')
  const handle = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const img = new Image()
    const reader = new FileReader()
    reader.onload = () => {
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        setResult(canvas.toDataURL('image/jpeg', 0.7))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }
  return <Stack spacing={1.2}><Button variant="contained" component="label">Choose image<input hidden type="file" accept="image/*" onChange={handle} /></Button>{result ? <Box component="img" src={result} sx={{ maxWidth: 340 }} /> : null}</Stack>
}

function Placeholder({ label }) { return <Alert severity="info">{label} is scaffolded. Next: wire full in-browser processing workflow.</Alert> }

export default function ToolPage() {
  const { slug } = useParams()
  const tool = getTool(slug)

  useEffect(() => {
    if (!tool) return
    setPageSeo({ title: `${tool.name} | AIBotCasey Tools`, description: tool.description, path: `/tools/${tool.slug}` })
  }, [tool])

  if (!tool) return <Stack spacing={2}><Alert severity="error">Tool not found.</Alert><Button component={RouterLink} to="/tools">Back to tools</Button></Stack>

  const renderTool = () => {
    switch (tool.slug) {
      case 'loan-calculator': return <LoanCalculator />
      case 'password-generator': return <PasswordGenerator />
      case 'json-formatter': return <JsonFormatter />
      case 'qr-generator': return <QrGenerator />
      case 'image-compressor': return <ImageCompressor />
      case 'pdf-merge':
      case 'image-resizer':
      default: return <Placeholder label={tool.name} />
    }
  }

  return (
    <Stack spacing={2.5}>
      <Button component={RouterLink} to="/tools" variant="text" sx={{ width: 'fit-content' }}>← Back to Tools Library</Button>
      <Chip label={tool.category} sx={{ width: 'fit-content' }} />
      <Typography variant="h3">{tool.name}</Typography>
      <Typography color="text.secondary">{tool.description}</Typography>
      <Alert severity="success">Privacy-first: this tool is browser-based and only uses data needed for the result.</Alert>
      <AdblockGate>
        {renderTool()}
      </AdblockGate>
    </Stack>
  )
}
