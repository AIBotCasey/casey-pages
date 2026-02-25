export const toolComparisons = [
  {
    slug: 'pdf-merge-vs-pdf-split',
    title: 'PDF Merge vs PDF Split: Which One Do You Need?',
    description: 'Understand when to combine files vs extract pages from a single PDF.',
    leftTool: 'pdf-merge',
    rightTool: 'pdf-split',
    useLeftWhen: ['You have multiple files and need one final PDF.', 'You are consolidating docs for sharing.'],
    useRightWhen: ['You need only selected pages from a PDF.', 'You are creating a smaller subset document.'],
  },
  {
    slug: 'image-compressor-vs-image-resizer',
    title: 'Image Compressor vs Image Resizer',
    description: 'Pick compression for smaller file size or resizing for exact dimensions.',
    leftTool: 'image-compressor',
    rightTool: 'image-resizer',
    useLeftWhen: ['You want smaller file size with similar dimensions.', 'You need better web performance.'],
    useRightWhen: ['You need exact pixel dimensions.', 'A platform requires specific width/height.'],
  },
  {
    slug: 'csv-to-json-vs-json-to-csv',
    title: 'CSV to JSON vs JSON to CSV',
    description: 'Choose the right converter based on your source format and destination workflow.',
    leftTool: 'csv-to-json',
    rightTool: 'json-to-csv',
    useLeftWhen: ['Your source data is spreadsheet-style CSV.', 'You need API-ready JSON objects.'],
    useRightWhen: ['Your source data is JSON arrays.', 'You need spreadsheet-compatible CSV output.'],
  },
]

export function getToolComparison(slug) {
  return toolComparisons.find((c) => c.slug === slug)
}
