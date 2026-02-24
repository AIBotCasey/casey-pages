import { Alert, Box, Button, FormControlLabel, LinearProgress, Slider, Stack, Switch, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { PDFDocument } from 'pdf-lib'

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

function dataUrlToBlob(dataUrl) {
  const [header, data] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)?.[1] || 'application/octet-stream'
  const bytes = atob(data)
  const arr = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i += 1) arr[i] = bytes.charCodeAt(i)
  return new Blob([arr], { type: mime })
}

const bytesToKB = (n) => `${(n / 1024).toFixed(1)} KB`

function LoanCalculator() {
  const [amount, setAmount] = useState(25000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(5)
  const [extra, setExtra] = useState(0)

  const monthlyRate = rate / 100 / 12
  const months = Math.max(1, years * 12)
  const basePayment = monthlyRate === 0 ? amount / months : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
  const payment = basePayment + Number(extra || 0)
  const total = payment * months

  const series = useMemo(() => {
    let balance = amount
    const points = []
    for (let i = 0; i < months; i += 1) {
      const interest = balance * monthlyRate
      const principal = Math.max(0, payment - interest)
      balance = Math.max(0, balance - principal)
      points.push(balance)
      if (balance <= 0) break
    }
    return points
  }, [amount, monthlyRate, months, payment])

  const maxBalance = Math.max(...series, 1)

  return (
    <Stack spacing={1.25}>
      <TextField type="number" label="Loan Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value || 0))} />
      <TextField type="number" label="APR (%)" value={rate} onChange={(e) => setRate(Number(e.target.value || 0))} />
      <TextField type="number" label="Term (years)" value={years} onChange={(e) => setYears(Number(e.target.value || 0))} />
      <TextField type="number" label="Extra monthly payment" value={extra} onChange={(e) => setExtra(Number(e.target.value || 0))} />
      <Alert severity="info">Monthly: ${payment.toFixed(2)} · Total: ${total.toFixed(2)} · Interest: ${(total - amount).toFixed(2)}</Alert>
      {series.length > 1 ? (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Balance payoff trend</Typography>
          <svg width="100%" viewBox="0 0 320 80" role="img" aria-label="Loan payoff trend chart">
            <polyline
              fill="none"
              stroke="#90caf9"
              strokeWidth="2"
              points={series.map((v, i) => `${(i / (series.length - 1 || 1)) * 320},${(v / maxBalance) * 70 + 5}`).join(' ')}
              transform="scale(1,-1) translate(0,-80)"
            />
          </svg>
        </Box>
      ) : null}
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

function ImageCompressor() {
  const [beforeSrc, setBeforeSrc] = useState('')
  const [result, setResult] = useState('')
  const [quality, setQuality] = useState(70)
  const [stats, setStats] = useState({ before: 0, after: 0 })

  const handle = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const img = new Image()
    const reader = new FileReader()
    reader.onload = () => {
      setBeforeSrc(String(reader.result || ''))
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
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const ratio = stats.before ? Math.max(0, Math.min(100, ((stats.before - stats.after) / stats.before) * 100)) : 0

  return (
    <Stack spacing={1.2}>
      <Typography>Quality: {quality}%</Typography>
      <Slider min={30} max={95} value={quality} onChange={(_, v) => setQuality(v)} />
      <Button variant="contained" component="label">Choose image<input hidden type="file" accept="image/*" onChange={handle} /></Button>
      {result ? (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2}>
          <Box><Typography variant="body2">Before</Typography><Box component="img" src={beforeSrc} sx={{ maxWidth: 280, borderRadius: 1 }} /></Box>
          <Box><Typography variant="body2">After</Typography><Box component="img" src={result} sx={{ maxWidth: 280, borderRadius: 1 }} /></Box>
        </Stack>
      ) : null}
      {result ? (
        <>
          <Alert severity="info">Before: {bytesToKB(stats.before)} · After: {bytesToKB(stats.after)} · Saved: {ratio.toFixed(1)}%</Alert>
          <Box>
            <Typography variant="body2" color="text.secondary">Compression ratio</Typography>
            <LinearProgress variant="determinate" value={ratio} sx={{ height: 10, borderRadius: 10, mt: 0.5 }} />
          </Box>
        </>
      ) : null}
      <Button variant="outlined" onClick={() => downloadBlob(dataUrlToBlob(result), 'compressed.jpg')} disabled={!result}>Download Compressed</Button>
    </Stack>
  )
}

function ImageResizer() {
  const [src, setSrc] = useState('')
  const [width, setWidth] = useState(1200)
  const [height, setHeight] = useState(800)
  const [out, setOut] = useState('')
  const [sourceSize, setSourceSize] = useState({ w: 0, h: 0 })

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const next = String(reader.result || '')
      setSrc(next)
      const img = new Image()
      img.onload = () => setSourceSize({ w: img.width, h: img.height })
      img.src = next
    }
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
      {sourceSize.w ? <Alert severity="info">Before: {sourceSize.w}×{sourceSize.h}px · After: {width}×{height}px</Alert> : null}
      {out ? (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2}>
          <Box><Typography variant="body2">Before</Typography><Box component="img" src={src} sx={{ maxWidth: 280, borderRadius: 1 }} /></Box>
          <Box><Typography variant="body2">After</Typography><Box component="img" src={out} sx={{ maxWidth: 280, borderRadius: 1 }} /></Box>
        </Stack>
      ) : null}
      <Button variant="outlined" onClick={() => downloadBlob(dataUrlToBlob(out), 'resized.jpg')} disabled={!out}>Download Resized</Button>
    </Stack>
  )
}

function PdfMerge() {
  const [files, setFiles] = useState([])
  const [busy, setBusy] = useState(false)
  const [summary, setSummary] = useState([])

  const onFiles = async (list) => {
    const arr = Array.from(list || [])
    setFiles(arr)
    const next = []
    for (const file of arr) {
      try {
        const pdf = await PDFDocument.load(await file.arrayBuffer())
        next.push({ name: file.name, pages: pdf.getPageCount() })
      } catch {
        next.push({ name: file.name, pages: '?' })
      }
    }
    setSummary(next)
  }

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
      <Button variant="contained" component="label">Choose PDF files<input hidden type="file" accept="application/pdf" multiple onChange={(e) => onFiles(e.target.files)} /></Button>
      {summary.length ? <Alert severity="info">{summary.map((s) => `${s.name} (${s.pages}p)`).join(' • ')}</Alert> : null}
      <Button variant="contained" onClick={merge} disabled={!files.length || busy}>{busy ? 'Merging…' : 'Merge PDFs'}</Button>
    </Stack>
  )
}

function JpgToPdf() {
  const [files, setFiles] = useState([])
  const [busy, setBusy] = useState(false)

  const convert = async () => {
    if (!files.length) return
    setBusy(true)
    try {
      const pdf = await PDFDocument.create()
      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer())
        const embedded = file.type.includes('png') ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes)
        const page = pdf.addPage([embedded.width, embedded.height])
        page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height })
      }
      downloadBlob(new Blob([await pdf.save()], { type: 'application/pdf' }), 'images-to-pdf.pdf')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose JPG/PNG files<input hidden type="file" multiple accept="image/jpeg,image/png" onChange={(e) => setFiles(Array.from(e.target.files || []))} /></Button>
      {files.length ? <Alert severity="info">{files.length} image(s) ready for PDF conversion.</Alert> : null}
      <Button variant="contained" onClick={convert} disabled={!files.length || busy}>{busy ? 'Converting…' : 'Convert to PDF'}</Button>
    </Stack>
  )
}

function parseRange(range, total) {
  const pages = new Set()
  range.split(',').map((part) => part.trim()).filter(Boolean).forEach((part) => {
    if (part.includes('-')) {
      const [a, b] = part.split('-').map((n) => Number(n.trim()))
      const start = Math.max(1, Math.min(a, b))
      const end = Math.min(total, Math.max(a, b))
      for (let i = start; i <= end; i += 1) pages.add(i)
    } else {
      const n = Number(part)
      if (n >= 1 && n <= total) pages.add(n)
    }
  })
  return [...pages].sort((a, b) => a - b)
}

function PdfSplit() {
  const [file, setFile] = useState(null)
  const [range, setRange] = useState('1-2')
  const [pages, setPages] = useState(0)

  const onFile = async (nextFile) => {
    setFile(nextFile)
    if (!nextFile) return
    const pdf = await PDFDocument.load(await nextFile.arrayBuffer())
    setPages(pdf.getPageCount())
  }

  const split = async () => {
    if (!file) return
    const src = await PDFDocument.load(await file.arrayBuffer())
    const selected = parseRange(range, src.getPageCount()).map((p) => p - 1)
    if (!selected.length) return
    const out = await PDFDocument.create()
    const copied = await out.copyPages(src, selected)
    copied.forEach((p) => out.addPage(p))
    downloadBlob(new Blob([await out.save()], { type: 'application/pdf' }), 'split-pages.pdf')
  }

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose PDF<input hidden type="file" accept="application/pdf" onChange={(e) => onFile(e.target.files?.[0])} /></Button>
      {file ? <Alert severity="info">{file.name} · {pages} pages · Example range: 1-3,5,8-10</Alert> : null}
      <TextField label="Page range" value={range} onChange={(e) => setRange(e.target.value)} />
      <Button variant="contained" onClick={split} disabled={!file}>Split PDF</Button>
    </Stack>
  )
}

function ImageCropper() {
  const [src, setSrc] = useState('')
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [w, setW] = useState(300)
  const [h, setH] = useState(300)
  const [out, setOut] = useState('')

  const crop = () => {
    if (!src) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = Number(w)
      canvas.height = Number(h)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, Number(x), Number(y), Number(w), Number(h), 0, 0, Number(w), Number(h))
      setOut(canvas.toDataURL('image/png'))
    }
    img.src = src
  }

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose image<input hidden type="file" accept="image/*" onChange={(e) => {
        const reader = new FileReader()
        reader.onload = () => setSrc(String(reader.result || ''))
        if (e.target.files?.[0]) reader.readAsDataURL(e.target.files[0])
      }} /></Button>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <TextField type="number" label="X" value={x} onChange={(e) => setX(e.target.value)} />
        <TextField type="number" label="Y" value={y} onChange={(e) => setY(e.target.value)} />
        <TextField type="number" label="Width" value={w} onChange={(e) => setW(e.target.value)} />
        <TextField type="number" label="Height" value={h} onChange={(e) => setH(e.target.value)} />
      </Stack>
      <Button variant="contained" onClick={crop} disabled={!src}>Crop image</Button>
      {out ? <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2}><Box component="img" src={src} sx={{ maxWidth: 280 }} /><Box component="img" src={out} sx={{ maxWidth: 280 }} /></Stack> : null}
      <Button variant="outlined" disabled={!out} onClick={() => downloadBlob(dataUrlToBlob(out), 'cropped.png')}>Download Cropped</Button>
    </Stack>
  )
}

function ImageFormatConverter() {
  const [src, setSrc] = useState('')
  const [format, setFormat] = useState('image/png')
  const [out, setOut] = useState('')

  const convert = () => {
    if (!src) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      canvas.getContext('2d').drawImage(img, 0, 0)
      setOut(canvas.toDataURL(format, 0.92))
    }
    img.src = src
  }

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose image<input hidden type="file" accept="image/*" onChange={(e) => {
        const reader = new FileReader()
        reader.onload = () => setSrc(String(reader.result || ''))
        if (e.target.files?.[0]) reader.readAsDataURL(e.target.files[0])
      }} /></Button>
      <TextField select SelectProps={{ native: true }} label="Output format" value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="image/jpeg">JPG</option>
        <option value="image/png">PNG</option>
        <option value="image/webp">WEBP</option>
      </TextField>
      <Button variant="contained" onClick={convert} disabled={!src}>Convert format</Button>
      {out ? <Box component="img" src={out} sx={{ maxWidth: 300 }} /> : null}
      <Button variant="outlined" disabled={!out} onClick={() => downloadBlob(dataUrlToBlob(out), `converted.${format.split('/')[1]}`)}>Download Converted</Button>
    </Stack>
  )
}

function PercentageCalculator() {
  const [a, setA] = useState(100)
  const [b, setB] = useState(15)
  return (
    <Stack spacing={1.2}>
      <TextField type="number" label="Base number" value={a} onChange={(e) => setA(Number(e.target.value || 0))} />
      <TextField type="number" label="Percent" value={b} onChange={(e) => setB(Number(e.target.value || 0))} />
      <Alert severity="info">{b}% of {a} = {(a * (b / 100)).toFixed(2)} · {a} + {b}% = {(a * (1 + b / 100)).toFixed(2)}</Alert>
    </Stack>
  )
}

function DateDifferenceCalculator() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const diffMs = from && to ? new Date(to).getTime() - new Date(from).getTime() : 0
  const days = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24))
  return (
    <Stack spacing={1.2}>
      <TextField type="date" label="From" InputLabelProps={{ shrink: true }} value={from} onChange={(e) => setFrom(e.target.value)} />
      <TextField type="date" label="To" InputLabelProps={{ shrink: true }} value={to} onChange={(e) => setTo(e.target.value)} />
      {from && to ? <Alert severity="info">Difference: {days} day(s) ({Math.floor(days / 7)} week(s), {Math.floor(days / 30)} month(s) approx.)</Alert> : null}
    </Stack>
  )
}

function Base64EncodeDecode() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  return (
    <Stack spacing={1.2}>
      <TextField multiline minRows={6} label="Input" value={input} onChange={(e) => setInput(e.target.value)} />
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => {
          setOutput(btoa(unescape(encodeURIComponent(input))))
          setError('')
        }}>Encode</Button>
        <Button variant="outlined" onClick={() => {
          try {
            setOutput(decodeURIComponent(escape(atob(input))))
            setError('')
          } catch {
            setError('Invalid base64 input.')
          }
        }}>Decode</Button>
      </Stack>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <TextField multiline minRows={6} label="Output" value={output} InputProps={{ readOnly: true }} />
    </Stack>
  )
}

function CsvToJson() {
  const [input, setInput] = useState('name,age\nCasey,32')
  const [output, setOutput] = useState('')
  const convert = () => {
    const rows = input.trim().split('\n').map((r) => r.split(','))
    const headers = rows[0] || []
    const objects = rows.slice(1).map((row) => Object.fromEntries(headers.map((h, i) => [h.trim(), (row[i] || '').trim()])))
    setOutput(JSON.stringify(objects, null, 2))
  }

  return (
    <Stack spacing={1.2}>
      <TextField multiline minRows={8} label="CSV input" value={input} onChange={(e) => setInput(e.target.value)} />
      <Button variant="contained" onClick={convert}>Convert CSV to JSON</Button>
      {output ? <TextField multiline minRows={8} label="JSON output" value={output} InputProps={{ readOnly: true }} /> : null}
    </Stack>
  )
}

export const toolRenderers = {
  'loan-calculator': LoanCalculator,
  'password-generator': PasswordGenerator,
  'json-formatter': JsonFormatter,
  'qr-generator': QrGenerator,
  'image-compressor': ImageCompressor,
  'image-resizer': ImageResizer,
  'pdf-merge': PdfMerge,
  'jpg-to-pdf': JpgToPdf,
  'pdf-split': PdfSplit,
  'image-cropper': ImageCropper,
  'image-format-converter': ImageFormatConverter,
  'percentage-calculator': PercentageCalculator,
  'date-difference-calculator': DateDifferenceCalculator,
  'base64-encode-decode': Base64EncodeDecode,
  'csv-to-json': CsvToJson,
}
