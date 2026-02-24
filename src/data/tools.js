export const tools = [
  {
    slug: 'pdf-merge',
    name: 'PDF Merge',
    category: 'PDF',
    description: 'Combine multiple PDFs into one file right in your browser.',
    instructions: [
      'Choose two or more PDF files.',
      'Click Merge PDFs to combine pages in selected order.',
      'Download the merged PDF to your device.',
    ],
    faqs: [
      { q: 'Does PDF merge upload my files?', a: 'No. Files are processed locally in your browser and not uploaded by this tool.' },
      { q: 'Can I merge more than two PDFs?', a: 'Yes. Select as many PDFs as you need, then merge in one click.' },
    ],
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'Image',
    description: 'Compress JPG/PNG images client-side and download the result.',
    instructions: [
      'Upload an image file.',
      'Adjust compression quality using the slider.',
      'Download the compressed image.',
    ],
    faqs: [
      { q: 'Will image quality drop?', a: 'Compression reduces file size and may reduce quality depending on your selected level.' },
      { q: 'Can I preview before downloading?', a: 'Yes. A preview appears before download so you can verify quality.' },
    ],
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    category: 'Image',
    description: 'Resize images by width and height in your browser.',
    instructions: [
      'Choose your image file.',
      'Set target width and height.',
      'Click Resize and then download the output image.',
    ],
    faqs: [
      { q: 'Is this image resizer free?', a: 'Yes, this tool is completely free to use in your browser.' },
      { q: 'Can I set custom dimensions?', a: 'Yes. Enter any width and height values before resizing.' },
    ],
  },
  {
    slug: 'qr-generator',
    name: 'QR Generator',
    category: 'Utility',
    description: 'Generate QR codes for links, text, and contact info.',
    instructions: [
      'Enter your text or URL.',
      'The QR code is generated instantly.',
      'Download the QR image as PNG.',
    ],
    faqs: [
      { q: 'Can I create QR codes for URLs and text?', a: 'Yes. You can generate a QR code from plain text, links, and many short data types.' },
      { q: 'Do you store generated QR data?', a: 'No. Generation happens locally in your browser.' },
    ],
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    category: 'Calculator',
    description: 'Estimate monthly payment, total interest, and payoff amount.',
    instructions: [
      'Enter loan amount, APR, and term length.',
      'Optionally add extra monthly payment.',
      'Review monthly payment and total interest results.',
    ],
    faqs: [
      { q: 'Is this loan calculator accurate?', a: 'It provides practical estimates using standard amortization math. Confirm final values with your lender.' },
      { q: 'Can I include extra principal payments?', a: 'Yes, use the extra monthly payment field.' },
    ],
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'Security',
    description: 'Create strong random passwords with customizable rules.',
    instructions: [
      'Set your preferred password length.',
      'Toggle uppercase, lowercase, numbers, and symbols.',
      'Generate and copy your password.',
    ],
    faqs: [
      { q: 'Are generated passwords secure?', a: 'Passwords are generated locally with randomized character selection and never sent to a server.' },
      { q: 'Can I control character types?', a: 'Yes. You can enable or disable each character group before generating.' },
    ],
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'Developer',
    description: 'Format and validate JSON instantly in your browser.',
    instructions: [
      'Paste JSON into the input box.',
      'Click Format to prettify or Minify to compact.',
      'Copy the output for reuse.',
    ],
    faqs: [
      { q: 'Can this JSON tool validate syntax?', a: 'Yes. Invalid JSON returns a clear error message.' },
      { q: 'Does JSON content leave my browser?', a: 'No. Formatting and validation happen locally in-browser.' },
    ],
  },
]

export function getTool(slug) {
  return tools.find((t) => t.slug === slug)
}
