export const tools = [
  { slug: 'pdf-merge', name: 'PDF Merge', category: 'PDF', description: 'Combine multiple PDFs into one file right in your browser.' },
  { slug: 'image-compressor', name: 'Image Compressor', category: 'Image', description: 'Compress JPG/PNG images client-side and download the result.' },
  { slug: 'image-resizer', name: 'Image Resizer', category: 'Image', description: 'Resize images by width and height in your browser.' },
  { slug: 'qr-generator', name: 'QR Generator', category: 'Utility', description: 'Generate QR codes for links, text, and contact info.' },
  { slug: 'loan-calculator', name: 'Loan Calculator', category: 'Calculator', description: 'Estimate monthly payment, total interest, and payoff amount.' },
  { slug: 'password-generator', name: 'Password Generator', category: 'Security', description: 'Create strong random passwords with customizable rules.' },
  { slug: 'json-formatter', name: 'JSON Formatter', category: 'Developer', description: 'Format and validate JSON instantly in your browser.' },
]

export function getTool(slug) {
  return tools.find((t) => t.slug === slug)
}
