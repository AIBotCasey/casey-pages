import { Alert, Box, Button, FormControlLabel, LinearProgress, Slider, Stack, Switch, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'

let _qrcode
let _marked
let _pdfLib

async function getQrCode() {
  if (!_qrcode) _qrcode = (await import('qrcode')).default
  return _qrcode
}

async function getMarked() {
  if (!_marked) _marked = (await import('marked')).marked
  return _marked
}

async function getPdfLib() {
  if (!_pdfLib) _pdfLib = await import('pdf-lib')
  return _pdfLib
}

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
    getQrCode().then((QRCode) => QRCode.toDataURL(text || ' ', { width: 260, margin: 1 })).then(setSrc).catch(() => setSrc(''))
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
        const { PDFDocument } = await getPdfLib()
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
      const { PDFDocument } = await getPdfLib()
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
      const { PDFDocument } = await getPdfLib()
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
    const { PDFDocument } = await getPdfLib()
    const pdf = await PDFDocument.load(await nextFile.arrayBuffer())
    setPages(pdf.getPageCount())
  }

  const split = async () => {
    if (!file) return
    const { PDFDocument } = await getPdfLib()
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

function PdfRotate() {
  const [file, setFile] = useState(null)
  const [range, setRange] = useState('all')
  const [rotation, setRotation] = useState(90)
  const [pages, setPages] = useState(0)

  const onFile = async (nextFile) => {
    setFile(nextFile)
    if (!nextFile) return
    const { PDFDocument } = await getPdfLib()
    const pdf = await PDFDocument.load(await nextFile.arrayBuffer())
    setPages(pdf.getPageCount())
  }

  const rotatePdf = async () => {
    if (!file) return
    const { PDFDocument, degrees } = await getPdfLib()
    const pdf = await PDFDocument.load(await file.arrayBuffer())
    const total = pdf.getPageCount()
    const selected = range.trim().toLowerCase() === 'all' ? Array.from({ length: total }, (_, i) => i + 1) : parseRange(range, total)
    const selectedSet = new Set(selected.map((p) => p - 1))
    pdf.getPages().forEach((page, i) => {
      if (!selectedSet.has(i)) return
      const current = page.getRotation().angle || 0
      page.setRotation(degrees((current + Number(rotation)) % 360))
    })
    downloadBlob(new Blob([await pdf.save()], { type: 'application/pdf' }), 'rotated.pdf')
  }

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose PDF<input hidden type="file" accept="application/pdf" onChange={(e) => onFile(e.target.files?.[0])} /></Button>
      {file ? <Alert severity="info">{file.name} · {pages} pages</Alert> : null}
      <TextField label="Pages (all or 1-3,5)" value={range} onChange={(e) => setRange(e.target.value)} />
      <TextField select SelectProps={{ native: true }} label="Rotate" value={rotation} onChange={(e) => setRotation(Number(e.target.value))}>
        <option value={90}>90° clockwise</option>
        <option value={180}>180°</option>
        <option value={270}>270° clockwise</option>
      </TextField>
      <Button variant="contained" onClick={rotatePdf} disabled={!file}>Rotate PDF</Button>
    </Stack>
  )
}

function PdfCompress() {
  const [file, setFile] = useState(null)
  const [quality, setQuality] = useState(75)
  const [outBytes, setOutBytes] = useState(0)
  const [busy, setBusy] = useState(false)

  const optimize = async () => {
    if (!file) return
    setBusy(true)
    try {
      const srcBytes = await file.arrayBuffer()
      const { PDFDocument } = await getPdfLib()
      const srcPdf = await PDFDocument.load(srcBytes)
      const outPdf = await PDFDocument.create()
      const scale = quality >= 90 ? 1 : quality >= 70 ? 0.85 : quality >= 50 ? 0.7 : 0.55
      for (let i = 0; i < srcPdf.getPageCount(); i += 1) {
        const [page] = await outPdf.copyPages(srcPdf, [i])
        const { width, height } = page.getSize()
        const newPage = outPdf.addPage([width, height])
        newPage.drawPage(page, {
          x: (width - width * scale) / 2,
          y: (height - height * scale) / 2,
          width: width * scale,
          height: height * scale,
        })
      }
      const out = await outPdf.save({ useObjectStreams: true, addDefaultPage: false, objectsPerTick: 50 })
      setOutBytes(out.length)
      downloadBlob(new Blob([out], { type: 'application/pdf' }), 'optimized.pdf')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Stack spacing={1.2}>
      <Alert severity="warning">Browser-side best effort: this optimizes structure and optionally downscales page content. It is not equivalent to full server-grade PDF recompression.</Alert>
      <Button variant="contained" component="label">Choose PDF<input hidden type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} /></Button>
      {file ? <Alert severity="info">Original: {bytesToKB(file.size)}</Alert> : null}
      <Typography>Optimization strength: {quality}%</Typography>
      <Slider min={30} max={100} value={quality} onChange={(_, v) => setQuality(v)} />
      <Button variant="contained" onClick={optimize} disabled={!file || busy}>{busy ? 'Optimizing…' : 'Optimize PDF'}</Button>
      {outBytes ? <Alert severity="success">Output: {bytesToKB(outBytes)} · change: {((1 - outBytes / file.size) * 100).toFixed(1)}%</Alert> : null}
    </Stack>
  )
}

function PdfPageCounter() {
  const [rows, setRows] = useState([])

  const onFiles = async (list) => {
    const files = Array.from(list || [])
    const next = []
    for (const file of files) {
      try {
        const { PDFDocument } = await getPdfLib()
        const pdf = await PDFDocument.load(await file.arrayBuffer())
        next.push({ name: file.name, size: file.size, pages: pdf.getPageCount() })
      } catch {
        next.push({ name: file.name, size: file.size, pages: 'Error' })
      }
    }
    setRows(next)
  }

  const summary = rows.map((r) => `${r.name}: ${r.pages} pages (${bytesToKB(r.size)})`).join('\n')

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose PDF files<input hidden type="file" accept="application/pdf" multiple onChange={(e) => onFiles(e.target.files)} /></Button>
      {rows.length ? <Alert severity="info">Files: {rows.length} · Total pages: {rows.reduce((a, b) => a + (Number(b.pages) || 0), 0)}</Alert> : null}
      {rows.map((row) => <Alert key={row.name} severity="success">{row.name} · {row.pages} pages · {bytesToKB(row.size)}</Alert>)}
      <Button variant="outlined" disabled={!rows.length} onClick={() => navigator.clipboard.writeText(summary)}>Copy Summary</Button>
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
  const [imgInfo, setImgInfo] = useState({ naturalW: 0, naturalH: 0, displayW: 0, displayH: 0 })

  const dragRef = useRef({ active: false, offsetX: 0, offsetY: 0 })

  const clamp = (val, min, max) => Math.max(min, Math.min(Number(val) || 0, max))

  const applyCropBounds = (nextX, nextY, nextW, nextH) => {
    const maxW = imgInfo.naturalW || nextW
    const maxH = imgInfo.naturalH || nextH
    const width = clamp(nextW, 1, maxW)
    const height = clamp(nextH, 1, maxH)
    const left = clamp(nextX, 0, Math.max(0, maxW - width))
    const top = clamp(nextY, 0, Math.max(0, maxH - height))
    setX(left)
    setY(top)
    setW(width)
    setH(height)
  }

  const handleImageLoad = (e) => {
    const img = e.currentTarget
    const next = {
      naturalW: img.naturalWidth,
      naturalH: img.naturalHeight,
      displayW: img.clientWidth,
      displayH: img.clientHeight,
    }
    setImgInfo(next)
    const defaultW = Math.max(40, Math.round(next.naturalW * 0.5))
    const defaultH = Math.max(40, Math.round(next.naturalH * 0.5))
    applyCropBounds(Math.round((next.naturalW - defaultW) / 2), Math.round((next.naturalH - defaultH) / 2), defaultW, defaultH)
  }

  const updateDisplaySize = (e) => {
    const img = e.currentTarget
    setImgInfo((prev) => ({ ...prev, displayW: img.clientWidth, displayH: img.clientHeight }))
  }

  const crop = () => {
    if (!src) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const cw = Math.max(1, Number(w) || 1)
      const ch = Math.max(1, Number(h) || 1)
      canvas.width = cw
      canvas.height = ch
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, Number(x), Number(y), cw, ch, 0, 0, cw, ch)
      setOut(canvas.toDataURL('image/png'))
    }
    img.src = src
  }

  const scaleX = imgInfo.naturalW && imgInfo.displayW ? imgInfo.displayW / imgInfo.naturalW : 1
  const scaleY = imgInfo.naturalH && imgInfo.displayH ? imgInfo.displayH / imgInfo.naturalH : 1

  const beginDrag = (e) => {
    e.preventDefault()
    dragRef.current.active = true
    dragRef.current.offsetX = e.clientX - Number(x) * scaleX
    dragRef.current.offsetY = e.clientY - Number(y) * scaleY
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', endDrag)
  }

  const onDrag = (e) => {
    if (!dragRef.current.active || !imgInfo.displayW || !imgInfo.displayH) return
    const nextDisplayX = e.clientX - dragRef.current.offsetX
    const nextDisplayY = e.clientY - dragRef.current.offsetY
    const nextX = nextDisplayX / scaleX
    const nextY = nextDisplayY / scaleY
    applyCropBounds(nextX, nextY, Number(w), Number(h))
  }

  const endDrag = () => {
    dragRef.current.active = false
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', endDrag)
  }

  useEffect(() => () => endDrag(), [])

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose image<input hidden type="file" accept="image/*" onChange={(e) => {
        const reader = new FileReader()
        reader.onload = () => {
          setOut('')
          setSrc(String(reader.result || ''))
        }
        if (e.target.files?.[0]) reader.readAsDataURL(e.target.files[0])
      }} /></Button>

      {src ? (
        <Box sx={{ position: 'relative', width: 'fit-content', maxWidth: '100%' }}>
          <Box
            component="img"
            src={src}
            onLoad={handleImageLoad}
            onResize={updateDisplaySize}
            sx={{ display: 'block', maxWidth: 'min(100%, 640px)', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}
          />
          {imgInfo.naturalW ? (
            <Box
              onMouseDown={beginDrag}
              sx={{
                position: 'absolute',
                left: `${Number(x) * scaleX}px`,
                top: `${Number(y) * scaleY}px`,
                width: `${Math.max(1, Number(w)) * scaleX}px`,
                height: `${Math.max(1, Number(h)) * scaleY}px`,
                border: '2px solid',
                borderColor: 'secondary.main',
                bgcolor: 'rgba(25, 118, 210, 0.18)',
                cursor: 'move',
                boxSizing: 'border-box',
              }}
            />
          ) : null}
        </Box>
      ) : null}

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <TextField type="number" label="X" value={x} onChange={(e) => applyCropBounds(e.target.value, y, w, h)} />
        <TextField type="number" label="Y" value={y} onChange={(e) => applyCropBounds(x, e.target.value, w, h)} />
        <TextField type="number" label="Width" value={w} onChange={(e) => applyCropBounds(x, y, e.target.value, h)} />
        <TextField type="number" label="Height" value={h} onChange={(e) => applyCropBounds(x, y, w, e.target.value)} />
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

function ImageToBase64() {
  const [dataUrl, setDataUrl] = useState('')
  const [base64, setBase64] = useState('')

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose image<input hidden type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
          const next = String(reader.result || '')
          setDataUrl(next)
          setBase64(next.split(',')[1] || '')
        }
        reader.readAsDataURL(file)
      }} /></Button>
      {dataUrl ? <Box component="img" src={dataUrl} sx={{ maxWidth: 280, borderRadius: 1 }} /> : null}
      {base64 ? <Alert severity="info">Encoded length: {base64.length.toLocaleString()} chars</Alert> : null}
      <TextField multiline minRows={8} label="Base64 output" value={base64} InputProps={{ readOnly: true }} />
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" disabled={!base64} onClick={() => navigator.clipboard.writeText(base64)}>Copy Base64</Button>
        <Button variant="outlined" disabled={!dataUrl} onClick={() => navigator.clipboard.writeText(dataUrl)}>Copy Data URL</Button>
      </Stack>
    </Stack>
  )
}

function ImageColorPicker() {
  const [src, setSrc] = useState('')
  const [hex, setHex] = useState('')
  const [rgb, setRgb] = useState('')

  const pick = (e) => {
    const img = e.target
    const rect = img.getBoundingClientRect()
    const sx = img.naturalWidth / rect.width
    const sy = img.naturalHeight / rect.height
    const x = Math.floor((e.clientX - rect.left) * sx)
    const y = Math.floor((e.clientY - rect.top) * sy)
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data
    const h = `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()}`
    setHex(h)
    setRgb(`rgb(${r}, ${g}, ${b})`)
  }

  return (
    <Stack spacing={1.2}>
      <Button variant="contained" component="label">Choose image<input hidden type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => setSrc(String(reader.result || ''))
        reader.readAsDataURL(file)
      }} /></Button>
      {src ? <Box component="img" src={src} onClick={pick} sx={{ maxWidth: 320, cursor: 'crosshair', borderRadius: 1 }} /> : null}
      {hex ? <Alert severity="success">HEX: {hex} · RGB: {rgb}</Alert> : <Alert severity="info">Click image to sample a color.</Alert>}
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" disabled={!hex} onClick={() => navigator.clipboard.writeText(hex)}>Copy HEX</Button>
        <Button variant="outlined" disabled={!rgb} onClick={() => navigator.clipboard.writeText(rgb)}>Copy RGB</Button>
      </Stack>
      {hex ? <Box sx={{ width: 56, height: 56, borderRadius: 1, border: '1px solid #666', bgcolor: hex }} /> : null}
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

function BmiCalculator() {
  const [mode, setMode] = useState('metric')
  const [heightCm, setHeightCm] = useState(175)
  const [weightKg, setWeightKg] = useState(72)
  const [feet, setFeet] = useState(5)
  const [inches, setInches] = useState(10)
  const [lbs, setLbs] = useState(160)

  const bmi = useMemo(() => {
    if (mode === 'metric') {
      const m = Number(heightCm) / 100
      if (!m || !weightKg) return 0
      return Number(weightKg) / (m * m)
    }
    const totalInches = Number(feet) * 12 + Number(inches)
    if (!totalInches || !lbs) return 0
    return (703 * Number(lbs)) / (totalInches * totalInches)
  }, [mode, heightCm, weightKg, feet, inches, lbs])

  const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obesity'

  return (
    <Stack spacing={1.2}>
      <TextField select SelectProps={{ native: true }} label="Mode" value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="metric">Metric (cm/kg)</option>
        <option value="imperial">Imperial (ft/in/lbs)</option>
      </TextField>
      {mode === 'metric' ? (
        <Stack direction="row" spacing={1}>
          <TextField type="number" label="Height (cm)" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
          <TextField type="number" label="Weight (kg)" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
        </Stack>
      ) : (
        <Stack direction="row" spacing={1}>
          <TextField type="number" label="Feet" value={feet} onChange={(e) => setFeet(e.target.value)} />
          <TextField type="number" label="Inches" value={inches} onChange={(e) => setInches(e.target.value)} />
          <TextField type="number" label="Weight (lbs)" value={lbs} onChange={(e) => setLbs(e.target.value)} />
        </Stack>
      )}
      {bmi ? <Alert severity="info">BMI: {bmi.toFixed(1)} · Category: {category}</Alert> : null}
    </Stack>
  )
}

function UnitConverter() {
  const [type, setType] = useState('length')
  const [value, setValue] = useState(1)
  const num = Number(value || 0)

  const values = useMemo(() => {
    if (type === 'length') {
      const meters = num
      return {
        'Meters (m)': meters,
        'Kilometers (km)': meters / 1000,
        'Feet (ft)': meters * 3.28084,
        'Inches (in)': meters * 39.3701,
        'Miles (mi)': meters / 1609.344,
      }
    }
    if (type === 'weight') {
      const kg = num
      return {
        'Kilograms (kg)': kg,
        'Grams (g)': kg * 1000,
        'Pounds (lb)': kg * 2.20462,
        'Ounces (oz)': kg * 35.274,
      }
    }
    const c = num
    return {
      'Celsius (°C)': c,
      'Fahrenheit (°F)': (c * 9) / 5 + 32,
      'Kelvin (K)': c + 273.15,
    }
  }, [num, type])

  return (
    <Stack spacing={1.2}>
      <TextField select SelectProps={{ native: true }} label="Category" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="length">Length (input in meters)</option>
        <option value="weight">Weight (input in kilograms)</option>
        <option value="temperature">Temperature (input in celsius)</option>
      </TextField>
      <TextField type="number" label="Input value" value={value} onChange={(e) => setValue(e.target.value)} />
      {Object.entries(values).map(([label, v]) => <Alert key={label} severity="info">{label}: {v.toFixed(4).replace(/\.?0+$/, '')}</Alert>)}
    </Stack>
  )
}

function TipCalculator() {
  const [bill, setBill] = useState(100)
  const [tip, setTip] = useState(18)
  const [people, setPeople] = useState(2)
  const tipAmount = (Number(bill) || 0) * ((Number(tip) || 0) / 100)
  const total = (Number(bill) || 0) + tipAmount
  const split = total / Math.max(1, Number(people) || 1)

  return (
    <Stack spacing={1.2}>
      <TextField type="number" label="Bill amount" value={bill} onChange={(e) => setBill(e.target.value)} />
      <TextField type="number" label="Tip %" value={tip} onChange={(e) => setTip(e.target.value)} />
      <TextField type="number" label="People" value={people} onChange={(e) => setPeople(e.target.value)} />
      <Alert severity="info">Tip: ${tipAmount.toFixed(2)} · Total: ${total.toFixed(2)} · Per person: ${split.toFixed(2)}</Alert>
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

function JsonToCsv() {
  const [input, setInput] = useState('[{"name":"Casey","age":32}]')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    try {
      const arr = JSON.parse(input)
      if (!Array.isArray(arr) || !arr.length || typeof arr[0] !== 'object') throw new Error('Input must be a JSON array of objects.')
      const headers = [...new Set(arr.flatMap((obj) => Object.keys(obj || {})))]
      const esc = (v) => {
        const str = v == null ? '' : String(v)
        return /[",\n]/.test(str) ? `"${str.replaceAll('"', '""')}"` : str
      }
      const rows = [headers.join(','), ...arr.map((obj) => headers.map((h) => esc(obj[h])).join(','))]
      setOutput(rows.join('\n'))
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <Stack spacing={1.2}>
      <TextField multiline minRows={8} label="JSON array input" value={input} onChange={(e) => setInput(e.target.value)} />
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={convert}>Convert to CSV</Button>
        <Button variant="outlined" disabled={!output} onClick={() => navigator.clipboard.writeText(output)}>Copy</Button>
        <Button variant="outlined" disabled={!output} onClick={() => downloadBlob(new Blob([output], { type: 'text/csv;charset=utf-8' }), 'output.csv')}>Download CSV</Button>
      </Stack>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <TextField multiline minRows={8} label="CSV output" value={output} InputProps={{ readOnly: true }} />
    </Stack>
  )
}

function UrlEncoderDecoder() {
  const [input, setInput] = useState('https://example.com?q=hello world')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  return (
    <Stack spacing={1.2}>
      <TextField multiline minRows={4} label="Input" value={input} onChange={(e) => setInput(e.target.value)} />
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => { setOutput(encodeURIComponent(input)); setError('') }}>Encode</Button>
        <Button variant="outlined" onClick={() => {
          try {
            setOutput(decodeURIComponent(input))
            setError('')
          } catch {
            setError('Invalid encoded URI component.')
          }
        }}>Decode</Button>
        <Button variant="outlined" disabled={!output} onClick={() => navigator.clipboard.writeText(output)}>Copy</Button>
      </Stack>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <TextField multiline minRows={4} label="Output" value={output} InputProps={{ readOnly: true }} />
    </Stack>
  )
}

function MarkdownPreview() {
  const [input, setInput] = useState('# Markdown Preview\n\n- Fast\n- Browser-only\n\n**Bold** text here.')
  const [html, setHtml] = useState('')

  useEffect(() => {
    let active = true
    getMarked().then((marked) => {
      if (active) setHtml(marked.parse(input || ''))
    })
    return () => { active = false }
  }, [input])

  return (
    <Stack spacing={1.2}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2}>
        <TextField multiline minRows={12} fullWidth label="Markdown" value={input} onChange={(e) => setInput(e.target.value)} />
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1.5, width: '100%', overflow: 'auto' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Preview</Typography>
          <Box sx={{ '& p': { my: 0.75 }, '& h1,& h2,& h3': { my: 1 } }} dangerouslySetInnerHTML={{ __html: html }} />
        </Box>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={() => navigator.clipboard.writeText(input)}>Copy Markdown</Button>
        <Button variant="outlined" onClick={() => navigator.clipboard.writeText(html)}>Copy HTML</Button>
      </Stack>
    </Stack>
  )
}

async function digestText(algorithm, text) {
  const data = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  return [...new Uint8Array(hashBuffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function HashGenerator() {
  const [input, setInput] = useState('')
  const [algorithm, setAlgorithm] = useState('SHA-256')
  const [output, setOutput] = useState('')

  const run = async () => setOutput(await digestText(algorithm, input))

  return (
    <Stack spacing={1.2}>
      <TextField multiline minRows={5} label="Input text" value={input} onChange={(e) => setInput(e.target.value)} />
      <TextField select SelectProps={{ native: true }} label="Algorithm" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <option value="SHA-256">SHA-256</option>
        <option value="SHA-384">SHA-384</option>
        <option value="SHA-512">SHA-512</option>
      </TextField>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={run}>Generate Hash</Button>
        <Button variant="outlined" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>Copy</Button>
      </Stack>
      <TextField multiline minRows={4} label="Digest" value={output} InputProps={{ readOnly: true }} />
    </Stack>
  )
}

function UuidGenerator() {
  const [count, setCount] = useState(5)
  const [list, setList] = useState([])
  const generate = () => setList(Array.from({ length: Math.max(1, Math.min(100, Number(count) || 1)) }, () => crypto.randomUUID()))
  useEffect(() => { generate() }, [])

  return (
    <Stack spacing={1.2}>
      <TextField type="number" label="Quantity (1-100)" value={count} onChange={(e) => setCount(e.target.value)} />
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={generate}>Generate</Button>
        <Button variant="outlined" disabled={!list.length} onClick={() => navigator.clipboard.writeText(list.join('\n'))}>Copy All</Button>
      </Stack>
      <TextField multiline minRows={8} value={list.join('\n')} InputProps={{ readOnly: true }} />
    </Stack>
  )
}

function TextDiffChecker() {
  const [oldText, setOldText] = useState('line 1\nline 2')
  const [newText, setNewText] = useState('line 1\nline changed\nline 3')

  const { lines, added, removed } = useMemo(() => {
    const a = oldText.split('\n')
    const b = newText.split('\n')
    const max = Math.max(a.length, b.length)
    const out = []
    let plus = 0
    let minus = 0
    for (let i = 0; i < max; i += 1) {
      if (a[i] === b[i]) out.push({ type: 'same', text: a[i] ?? '' })
      else {
        if (a[i] != null) { out.push({ type: 'removed', text: a[i] }); minus += 1 }
        if (b[i] != null) { out.push({ type: 'added', text: b[i] }); plus += 1 }
      }
    }
    return { lines: out, added: plus, removed: minus }
  }, [oldText, newText])

  return (
    <Stack spacing={1.2}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2}>
        <TextField multiline minRows={8} fullWidth label="Old text" value={oldText} onChange={(e) => setOldText(e.target.value)} />
        <TextField multiline minRows={8} fullWidth label="New text" value={newText} onChange={(e) => setNewText(e.target.value)} />
      </Stack>
      <Alert severity="info">Added: {added} · Removed: {removed}</Alert>
      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1, fontFamily: 'monospace', fontSize: 13 }}>
        {lines.map((line, i) => (
          <Box key={`${line.type}-${i}`} sx={{ color: line.type === 'added' ? 'success.light' : line.type === 'removed' ? 'error.light' : 'text.primary' }}>
            {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}{line.text}
          </Box>
        ))}
      </Box>
    </Stack>
  )
}

function WordCounter() {
  const [text, setText] = useState('')
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const charsWithSpaces = text.length
  const charsNoSpaces = text.replace(/\s/g, '').length
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0
  const readingMin = words / 200

  return (
    <Stack spacing={1.2}>
      <TextField multiline minRows={10} label="Text" value={text} onChange={(e) => setText(e.target.value)} />
      <Alert severity="info">Words: {words} · Characters: {charsWithSpaces} · No spaces: {charsNoSpaces} · Paragraphs: {paragraphs} · Read time: {readingMin < 1 ? '<1' : readingMin.toFixed(1)} min</Alert>
      <Button variant="outlined" onClick={() => setText('')}>Reset</Button>
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
  'pdf-rotate': PdfRotate,
  'pdf-compress': PdfCompress,
  'pdf-page-counter': PdfPageCounter,
  'image-cropper': ImageCropper,
  'image-format-converter': ImageFormatConverter,
  'image-to-base64': ImageToBase64,
  'image-color-picker': ImageColorPicker,
  'percentage-calculator': PercentageCalculator,
  'date-difference-calculator': DateDifferenceCalculator,
  'bmi-calculator': BmiCalculator,
  'unit-converter': UnitConverter,
  'tip-calculator': TipCalculator,
  'base64-encode-decode': Base64EncodeDecode,
  'csv-to-json': CsvToJson,
  'json-to-csv': JsonToCsv,
  'url-encoder-decoder': UrlEncoderDecoder,
  'markdown-preview': MarkdownPreview,
  'hash-generator': HashGenerator,
  'uuid-generator': UuidGenerator,
  'text-diff-checker': TextDiffChecker,
  'word-counter': WordCounter,
}
