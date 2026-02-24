import { Alert, Box, Breadcrumbs, Button, Chip, FormControlLabel, Slider, Stack, Switch, TextField, Typography, Link } from '@mui/material'
import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { PDFDocument } from 'pdf-lib'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { getTool } from '../data/tools'
import { setPageSeo, SITE_URL } from '../utils/seo'
import AdblockGate from '../components/AdblockGate'

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

function LoanCalculator() {
  const [amount, setAmount] = useState(25000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(5)
  const [extra, setExtra] = useState(0)
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const basePayment = monthlyRate === 0 ? amount / months : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
  const payment = basePayment + Number(extra || 0)
  const total = payment * months

  return (
    <Stack spacing={1.25}>
      <TextField type="number" label="Loan Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value || 0))} />
      <TextField type="number" label="APR (%)" value={rate} onChange={(e) => setRate(Number(e.target.value || 0))} />
      <TextField type="number" label="Term (years)" value={years} onChange={(e) => setYears(Number(e.target.value || 0))} />
      <TextField type="number" label="Extra monthly payment" value={extra} onChange={(e) => setExtra(Number(e.target.value || 0))} />
      <Alert severity="info">Monthly: ${payment.toFixed(2)} · Total: ${total.toFixed(2)} · Interest: ${(total - amount).toFixed(2)}</Alert>
    </Stack>
  )
}

function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState('')

  const generate = () => {
    const groups = [
      upper ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : '',
      lower ? 'abcdefghijkmnopqrstuvwxyz' : '',
      numbers ? '23456789' : '',
      symbols ? '!@#$%*' : '',
    ].filter(Boolean)

    if (!groups.length) return setPassword('')
    const chars = groups.join('')
    let out = ''
    for (let i = 0; i < length; i += 1) out += chars[Math.floor(Math.random() * chars.length)]
    setPassword(out)
  }

  useEffect(() => { generate() }, [length, upper, lower, numbers, symbols])

  return (
    <Stack spacing={1.2}>
      <Typography>Length: {length}</Typography>
      <Slider min={8} max={64} value={length} onChange={(_, v) => setLength(v)} />
      <Stack direction="row" flexWrap="wrap" useFlexGap>
        <FormControlLabel control={<Switch checked={upper} onChange={(e) => setUpper(e.target.checked)} />} label="Upper" />
        <FormControlLabel control={<Switch checked={lower} onChange={(e) => setLower(e.target.checked)} />} label="Lower" />
        <FormControlLabel control={<Switch checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />} label="Numbers" />
        <FormControlLabel control={<Switch checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />} label="Symbols" />
      </Stack>
      <TextField value={password} InputProps={{ readOnly: true }} />
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={generate}>Regenerate</Button>
        <Button variant="outlined" onClick={() => navigator.clipboard.writeText(password)} disabled={!password}>Copy</Button>
      </Stack>
    </Stack>
  )
}

function JsonFormatter() {
  const [input, setInput] = useState('{\n  "hello": "world"\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const format = (pretty = true) => {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, pretty ? 2 : 0))
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <Stack spacing={1.2}>
      <TextField multiline minRows={8} value={input} onChange={(e) => setInput(e.target.value)} />
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => format(true)}>Format JSON</Button>
        <Button variant="outlined" onClick={() => format(false)}>Minify</Button>
        <Button variant="outlined" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>Copy</Button>
      </Stack>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {output ? <TextField multiline minRows={8} value={output} InputProps={{ readOnly: true }} /> : null}
    </Stack>
  )
}

function QrGenerator() {
  const [text, setText] = useState('https://aibotcasey.com')
  const [src, setSrc] = useState('')

  useEffect(() => {
    QRCode.toDataURL(text || ' ', { width: 260, margin: 1 }).then(setSrc).catch(() => setSrc(''))
  }, [text])

  return (
    <Stack spacing={1.2}>
      <TextField label="Text or URL" value={text} onChange={(e) => setText(e.target.value)} />
      {src ? <Box component="img" src={src} alt="QR code" sx={{ width: 260, height: 260, borderRadius: 1 }} /> : null}
      <Button variant="outlined" onClick={() => downloadBlob(dataUrlToBlob(src), 'qrcode.png')} disabled={!src}>Download PNG</Button>
    </Stack>
  )
}

function dataUrlToBlob(dataUrl) {
  const [header, data] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)?.[1] || 'application/octet-stream'
  const bytes = atob(data)
  const arr = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i += 1) arr[i] = bytes.charCodeAt(i)
  return new Blob([arr], { type: mime })
}

function ImageCompressor() {
  const [result, setResult] = useState('')
  const [quality, setQuality] = useState(70)
  const [stats, setStats] = useState({ before: 0, after: 0 })

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
        const out = canvas.toDataURL('image/jpeg', quality / 100)
        setResult(out)
        setStats({ before: file.size, after: Math.round((out.length * 3) / 4) })
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  return (
    <Stack spacing={1.2}>
      <Typography>Quality: {quality}%</Typography>
      <Slider min={30} max={95} value={quality} onChange={(_, v) => setQuality(v)} />
      <Button variant="contained" component="label">Choose image<input hidden type="file" accept="image/*" onChange={handle} /></Button>
      {result ? <Box component="img" src={result} sx={{ maxWidth: 360 }} /> : null}
      {result ? <Alert severity="info">Before: {(stats.before / 1024).toFixed(1)} KB · After: {(stats.after / 1024).toFixed(1)} KB</Alert> : null}
      <Button variant="outlined" onClick={() => downloadBlob(dataUrlToBlob(result), 'compressed.jpg')} disabled={!result}>Download Compressed</Button>
    </Stack>
  )
}

function ImageResizer() {
  const [src, setSrc] = useState('')
  const [width, setWidth] = useState(1200)
  const [height, setHeight] = useState(800)
  const [out, setOut] = useState('')

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setSrc(String(reader.result || ''))
    reader.readAsDataURL(file)
  }

  const resize = () => {
    if (!src) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = Number(width)
      canvas.height = Number(height)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, Number(width), Number(height))
      setOut(canvas.toDataURL('image/jpeg', 0.9))
    }
    img.src = src
  }

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose image<input hidden type="file" accept="image/*" onChange={handleFile} /></Button>
      <Stack direction="row" spacing={1}>
        <TextField type="number" label="Width" value={width} onChange={(e) => setWidth(e.target.value)} />
        <TextField type="number" label="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
      </Stack>
      <Button variant="contained" onClick={resize} disabled={!src}>Resize</Button>
      {out ? <Box component="img" src={out} sx={{ maxWidth: 360 }} /> : null}
      <Button variant="outlined" onClick={() => downloadBlob(dataUrlToBlob(out), 'resized.jpg')} disabled={!out}>Download Resized</Button>
    </Stack>
  )
}

function PdfMerge() {
  const [files, setFiles] = useState([])
  const [busy, setBusy] = useState(false)

  const merge = async () => {
    if (!files.length) return
    setBusy(true)
    try {
      const merged = await PDFDocument.create()
      for (const file of files) {
        const bytes = await file.arrayBuffer()
        const pdf = await PDFDocument.load(bytes)
        const pages = await merged.copyPages(pdf, pdf.getPageIndices())
        pages.forEach((p) => merged.addPage(p))
      }
      const out = await merged.save()
      downloadBlob(new Blob([out], { type: 'application/pdf' }), 'merged.pdf')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose PDF files<input hidden type="file" accept="application/pdf" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} /></Button>
      {files.length ? <Typography color="text.secondary">{files.length} file(s) selected</Typography> : null}
      <Button variant="contained" onClick={merge} disabled={!files.length || busy}>{busy ? 'Merging…' : 'Merge PDFs'}</Button>
    </Stack>
  )
}

export default function ToolPage() {
  const { slug } = useParams()
  const tool = getTool(slug)

  useEffect(() => {
    if (!tool) return
    setPageSeo({
      title: `${tool.name} | AIBotCasey Tools`,
      description: tool.description,
      path: `/tools/${tool.slug}`,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
            { '@type': 'ListItem', position: 3, name: tool.name, item: `${SITE_URL}/tools/${tool.slug}` },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: `${tool.category}Application`,
          operatingSystem: 'Web Browser',
          isAccessibleForFree: true,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          description: tool.description,
          url: `${SITE_URL}/tools/${tool.slug}`,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (tool.faqs || []).map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        },
      ],
    })
  }, [tool])

  if (!tool) return <Stack spacing={2}><Alert severity="error">Tool not found.</Alert><Button component={RouterLink} to="/tools">Back to tools</Button></Stack>

  const renderTool = () => {
    switch (tool.slug) {
      case 'loan-calculator': return <LoanCalculator />
      case 'password-generator': return <PasswordGenerator />
      case 'json-formatter': return <JsonFormatter />
      case 'qr-generator': return <QrGenerator />
      case 'image-compressor': return <ImageCompressor />
      case 'image-resizer': return <ImageResizer />
      case 'pdf-merge': return <PdfMerge />
      default: return <Alert severity="info">This tool is coming soon.</Alert>
    }
  }

  return (
    <Stack spacing={2.5}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">Home</Link>
        <Link component={RouterLink} underline="hover" color="inherit" to="/tools">Tools</Link>
        <Typography color="text.primary">{tool.name}</Typography>
      </Breadcrumbs>

      <Button component={RouterLink} to="/tools" variant="text" sx={{ width: 'fit-content' }}>← Back to Tools Library</Button>
      <Chip label={tool.category} sx={{ width: 'fit-content' }} />
      <Typography variant="h3">{tool.name}</Typography>
      <Typography color="text.secondary">{tool.description}</Typography>
      <Alert severity="success">Privacy-first: this tool runs in your browser and only uses data needed for your result.</Alert>

      <Box>
        <Typography variant="h5" sx={{ mb: 1 }}>How to use {tool.name}</Typography>
        <Stack spacing={0.8}>
          {(tool.instructions || []).map((step, idx) => (
            <Typography key={step} color="text.secondary">{idx + 1}. {step}</Typography>
          ))}
        </Stack>
      </Box>

      <AdblockGate>
        {renderTool()}
      </AdblockGate>

      <Box>
        <Typography variant="h5" sx={{ mb: 1 }}>{tool.name} FAQ</Typography>
        <Stack spacing={1}>
          {(tool.faqs || []).map((faq) => (
            <Typography key={faq.q} color="text.secondary"><strong>{faq.q}</strong> {faq.a}</Typography>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}
