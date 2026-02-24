export const tools = [
  {
    slug: 'pdf-merge',
    name: 'PDF Merge',
    category: 'PDF',
    description: 'Combine multiple PDFs into one file right in your browser.',
    instructions: ['Choose two or more PDF files.', 'Review file and page counts.', 'Click Merge PDFs, then download.'],
    faqs: [
      { q: 'Does PDF merge upload my files?', a: 'No. Files are processed locally in your browser.' },
      { q: 'Can I merge more than two PDFs?', a: 'Yes, merge as many files as needed in one pass.' },
    ],
  },
  {
    slug: 'pdf-split',
    name: 'PDF Split',
    category: 'PDF',
    description: 'Extract selected page ranges from a PDF using a simple range format.',
    instructions: ['Upload one PDF file.', 'Enter page ranges like 1-3,5,9-11.', 'Split and download the new PDF.'],
    faqs: [
      { q: 'What range format is supported?', a: 'Single pages and ranges separated by commas: 1,3-5,9.' },
      { q: 'Are pages removed from the original file?', a: 'No, the original stays untouched.' },
    ],
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    category: 'PDF',
    description: 'Convert JPG or PNG images into a multi-page PDF in your browser.',
    instructions: ['Upload one or more images.', 'Recheck selected files.', 'Convert and download a PDF.'],
    faqs: [
      { q: 'Can I upload PNG too?', a: 'Yes, JPG and PNG are both supported.' },
      { q: 'Does conversion happen online?', a: 'No, conversion is done in-browser.' },
    ],
  },
  { slug: 'pdf-rotate', name: 'PDF Rotate', category: 'PDF', description: 'Rotate selected PDF pages 90° steps.', instructions: ['Upload PDF.', 'Choose pages and direction.', 'Download rotated PDF.'], faqs: [{ q: 'Can I rotate all pages?', a: 'Yes, you can rotate all or selected pages.' }, { q: 'Will quality change?', a: 'No, page quality is preserved.' }] },
  { slug: 'pdf-compress', name: 'PDF Compress', category: 'PDF', description: 'Reduce PDF size with in-browser optimization presets.', instructions: ['Upload PDF.', 'Pick quality profile.', 'Compress and download.'], faqs: [{ q: 'Is this lossless?', a: 'Some presets may lower image quality for smaller files.' }, { q: 'Do you keep files?', a: 'No, processing is local.' }] },
  { slug: 'pdf-page-counter', name: 'PDF Page Counter', category: 'PDF', description: 'Instantly count pages and show file summary details.', instructions: ['Upload PDF files.', 'Review page totals.', 'Copy summary if needed.'], faqs: [{ q: 'Can I check multiple files?', a: 'Yes, each file gets a page count row.' }, { q: 'Does this edit files?', a: 'No, this is read-only analysis.' }] },

  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'Image',
    description: 'Compress JPG/PNG images client-side with before/after comparisons.',
    instructions: ['Upload an image file.', 'Adjust compression quality.', 'Compare results and download.'],
    faqs: [
      { q: 'Will image quality drop?', a: 'Compression may reduce quality depending on selected level.' },
      { q: 'Can I compare before and after?', a: 'Yes, side-by-side previews are shown.' },
    ],
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    category: 'Image',
    description: 'Resize images by width and height with before/after dimensions.',
    instructions: ['Upload image.', 'Enter target width and height.', 'Resize and download output.'],
    faqs: [
      { q: 'Can I set custom dimensions?', a: 'Yes. Enter any width and height values.' },
      { q: 'Do I get a preview?', a: 'Yes, original and resized previews are displayed.' },
    ],
  },
  {
    slug: 'image-cropper',
    name: 'Image Cropper',
    category: 'Image',
    description: 'Crop images by pixel coordinates and export a trimmed image.',
    instructions: ['Upload image.', 'Set X/Y and crop size.', 'Crop and download the result.'],
    faqs: [
      { q: 'Can I crop to exact pixels?', a: 'Yes, crop values are pixel-based.' },
      { q: 'What format is exported?', a: 'Cropped output exports as PNG.' },
    ],
  },
  {
    slug: 'image-format-converter',
    name: 'Image Format Converter',
    category: 'Image',
    description: 'Convert between JPG, PNG, and WEBP entirely in-browser.',
    instructions: ['Upload any image.', 'Choose target format.', 'Convert and download.'],
    faqs: [
      { q: 'Which output formats are supported?', a: 'JPG, PNG, and WEBP.' },
      { q: 'Are uploads sent to a server?', a: 'No. Conversion stays on your device.' },
    ],
  },
  { slug: 'image-to-base64', name: 'Image to Base64', category: 'Image', description: 'Convert image files into Base64 strings for embeds.', instructions: ['Upload image.', 'Copy base64 output.', 'Use in CSS/HTML as needed.'], faqs: [{ q: 'Can I use this for data URLs?', a: 'Yes, output can be wrapped in data:image/... strings.' }, { q: 'Is there a size limit?', a: 'Limit depends on browser memory.' }] },
  { slug: 'image-color-picker', name: 'Image Color Picker', category: 'Image', description: 'Pick HEX/RGB colors from uploaded images.', instructions: ['Upload image.', 'Click anywhere on preview.', 'Copy color code.'], faqs: [{ q: 'Can I get RGB and HEX?', a: 'Yes, both are available.' }, { q: 'Is color sampling accurate?', a: 'It uses the exact pixel value.' }] },

  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'Dev/Data',
    description: 'Format and validate JSON instantly in your browser.',
    instructions: ['Paste JSON.', 'Format or minify.', 'Copy output.'],
    faqs: [
      { q: 'Can this validate syntax?', a: 'Yes. Invalid JSON returns a clear error.' },
      { q: 'Does JSON content leave my browser?', a: 'No. All parsing is local.' },
    ],
  },
  {
    slug: 'base64-encode-decode',
    name: 'Base64 Encode/Decode',
    category: 'Dev/Data',
    description: 'Encode plain text to Base64 or decode Base64 back to text.',
    instructions: ['Paste text or Base64.', 'Click Encode or Decode.', 'Copy output.'],
    faqs: [
      { q: 'Can it decode Unicode text?', a: 'Yes, UTF-8 text is supported.' },
      { q: 'What if Base64 is invalid?', a: 'You will see an error message.' },
    ],
  },
  {
    slug: 'csv-to-json',
    name: 'CSV to JSON',
    category: 'Dev/Data',
    description: 'Convert CSV rows into structured JSON arrays in seconds.',
    instructions: ['Paste CSV with header row.', 'Run conversion.', 'Copy JSON output.'],
    faqs: [
      { q: 'Does first row become keys?', a: 'Yes, CSV headers map to object keys.' },
      { q: 'Is this for huge files?', a: 'Best for light to medium CSV in-browser.' },
    ],
  },
  { slug: 'json-to-csv', name: 'JSON to CSV', category: 'Dev/Data', description: 'Transform JSON arrays into CSV for spreadsheets.', instructions: ['Paste JSON array.', 'Convert.', 'Download or copy CSV.'], faqs: [{ q: 'Must JSON be an array?', a: 'Yes, provide an array of objects.' }, { q: 'Will nested objects flatten?', a: 'Basic mode keeps top-level fields only.' }] },
  { slug: 'url-encoder-decoder', name: 'URL Encoder/Decoder', category: 'Dev/Data', description: 'Encode or decode URL-safe strings quickly.', instructions: ['Paste URL text.', 'Encode or decode.', 'Copy result.'], faqs: [{ q: 'Is this RFC-compliant?', a: 'It uses native browser encode/decode functions.' }, { q: 'Can I decode query params?', a: 'Yes, paste encoded content to decode.' }] },
  { slug: 'markdown-preview', name: 'Markdown Preview', category: 'Dev/Data', description: 'Write markdown and preview rendered output side-by-side.', instructions: ['Enter markdown.', 'Review preview.', 'Copy markdown or HTML.'], faqs: [{ q: 'Does it support headings and lists?', a: 'Yes, core markdown syntax is supported.' }, { q: 'Is preview live?', a: 'Yes, updates happen as you type.' }] },

  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    category: 'Calculators',
    description: 'Estimate monthly payment, total interest, and payoff trend chart.',
    instructions: ['Enter amount, APR, and term.', 'Optionally add extra payment.', 'Review payment summary and chart.'],
    faqs: [
      { q: 'Is this loan calculator accurate?', a: 'It uses standard amortization formulas for practical estimates.' },
      { q: 'Can I include extra payments?', a: 'Yes, add extra monthly payment to see impact.' },
    ],
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'Calculators',
    description: 'Calculate percentages, increases, and percentage-of values fast.',
    instructions: ['Enter a base number.', 'Enter a percent.', 'View percentage and increased value.'],
    faqs: [
      { q: 'Can this calculate percent increases?', a: 'Yes, it shows base plus percent instantly.' },
      { q: 'Is this mobile-friendly?', a: 'Yes, built with responsive inputs.' },
    ],
  },
  {
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    category: 'Calculators',
    description: 'Find day, week, and approximate month differences between dates.',
    instructions: ['Select start date.', 'Select end date.', 'Read exact day difference.'],
    faqs: [
      { q: 'Does order matter?', a: 'No, difference is shown as absolute duration.' },
      { q: 'Can this include time?', a: 'This version compares dates only.' },
    ],
  },
  { slug: 'bmi-calculator', name: 'BMI Calculator', category: 'Calculators', description: 'Compute body mass index from height and weight.', instructions: ['Enter height and weight.', 'Calculate BMI.', 'Review category guidance.'], faqs: [{ q: 'Is BMI diagnostic?', a: 'No, it is a screening indicator only.' }, { q: 'Metric and imperial?', a: 'Tool supports both modes.' }] },
  { slug: 'unit-converter', name: 'Unit Converter', category: 'Calculators', description: 'Convert length, weight, and temperature units quickly.', instructions: ['Choose unit category.', 'Enter value.', 'See converted outputs.'], faqs: [{ q: 'Which units are supported?', a: 'Common metric and imperial units.' }, { q: 'Is conversion instant?', a: 'Yes, values update live.' }] },
  { slug: 'tip-calculator', name: 'Tip Calculator', category: 'Calculators', description: 'Calculate tip amount, total bill, and split per person.', instructions: ['Enter bill amount.', 'Choose tip percent.', 'Set number of people.'], faqs: [{ q: 'Can I split bill evenly?', a: 'Yes, split amount is included.' }, { q: 'Can I customize tip?', a: 'Yes, any percentage works.' }] },

  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'Utility/Security',
    description: 'Create strong random passwords with customizable rules.',
    instructions: ['Set password length.', 'Toggle character groups.', 'Generate and copy password.'],
    faqs: [
      { q: 'Are generated passwords secure?', a: 'Passwords are generated locally and not stored.' },
      { q: 'Can I control character types?', a: 'Yes, enable or disable each group.' },
    ],
  },
  {
    slug: 'qr-generator',
    name: 'QR Generator',
    category: 'Utility/Security',
    description: 'Generate QR codes for links, text, and simple data.',
    instructions: ['Enter text or URL.', 'Review generated QR.', 'Download PNG file.'],
    faqs: [
      { q: 'Can I create QR for URLs and text?', a: 'Yes, both are supported.' },
      { q: 'Do you store generated data?', a: 'No, generation is browser-local.' },
    ],
  },
  { slug: 'hash-generator', name: 'Hash Generator', category: 'Utility/Security', description: 'Generate SHA hashes for text and quick integrity checks.', instructions: ['Enter input text.', 'Pick hash algorithm.', 'Copy generated digest.'], faqs: [{ q: 'Can I hash files?', a: 'Text mode is default; file mode can be added later.' }, { q: 'Is hashing encryption?', a: 'No, hashing is one-way.' }] },
  { slug: 'uuid-generator', name: 'UUID Generator', category: 'Utility/Security', description: 'Generate random UUIDs for app and database usage.', instructions: ['Choose quantity.', 'Generate UUIDs.', 'Copy list.'], faqs: [{ q: 'Are UUIDs v4?', a: 'Yes, cryptographically random v4 UUIDs.' }, { q: 'Can I create bulk UUIDs?', a: 'Yes, generate multiple at once.' }] },
  { slug: 'text-diff-checker', name: 'Text Diff Checker', category: 'Utility/Security', description: 'Compare two text blocks and highlight differences.', instructions: ['Paste old text.', 'Paste new text.', 'Review added/removed lines.'], faqs: [{ q: 'Is this Git-style diff?', a: 'It provides a lightweight line diff.' }, { q: 'Does text leave browser?', a: 'No, comparison is local.' }] },
  { slug: 'word-counter', name: 'Word Counter', category: 'Utility/Security', description: 'Count words, characters, reading time, and paragraphs.', instructions: ['Paste text.', 'Review counts instantly.', 'Adjust content as needed.'], faqs: [{ q: 'Does it show character count?', a: 'Yes, with and without spaces.' }, { q: 'Can I estimate read time?', a: 'Yes, reading time is included.' }] },
]

export function getTool(slug) {
  return tools.find((t) => t.slug === slug)
}
