export const toolGuides = [
  {
    slug: 'merge-pdf-online-no-upload',
    title: 'How to Merge PDF Files Online Without Uploading',
    description: 'Step-by-step guide to combine PDFs in your browser with no server uploads.',
    keyword: 'merge pdf online without uploading',
    toolSlug: 'pdf-merge',
    intro: 'Need to combine multiple PDFs without sending sensitive files to a cloud service? Use the local browser workflow below.',
    steps: [
      'Open the PDF Merge tool and select all files in order.',
      'Check file names and page counts before processing.',
      'Click Merge and save the output PDF to your device.',
    ],
  },
  {
    slug: 'jpg-to-pdf-without-losing-quality',
    title: 'Convert JPG to PDF Online (No Account Required)',
    description: 'Convert JPG/PNG images into one PDF quickly with local browser processing.',
    keyword: 'jpg to pdf online free',
    toolSlug: 'jpg-to-pdf',
    intro: 'Create clean image-to-PDF exports for receipts, forms, and client docs in minutes.',
    steps: [
      'Upload one or more JPG/PNG files.',
      'Confirm all images are included in the order you need.',
      'Convert and download your generated PDF.',
    ],
  },
  {
    slug: 'compress-images-for-web-fast',
    title: 'Compress Images for Web Speed (JPG/PNG)',
    description: 'Reduce image size for faster page loads while keeping acceptable quality.',
    keyword: 'compress image for web',
    toolSlug: 'image-compressor',
    intro: 'Large images hurt load times and SEO. This workflow shrinks file size before publishing.',
    steps: [
      'Upload the source image and set quality level.',
      'Compare before/after preview and file size savings.',
      'Download optimized output for your website or app.',
    ],
  },
  {
    slug: 'resize-image-for-social-media',
    title: 'Resize Images for Social Media Dimensions',
    description: 'Resize images to exact width and height targets for social and ads.',
    keyword: 'resize image for social media',
    toolSlug: 'image-resizer',
    intro: 'Prepare platform-ready image sizes quickly for posts, ads, and profile assets.',
    steps: [
      'Upload source image.',
      'Enter target width and height for the destination platform.',
      'Resize and download the adjusted image.',
    ],
  },
  {
    slug: 'format-json-online',
    title: 'Format and Validate JSON Online',
    description: 'Paste JSON, clean formatting, validate syntax, and copy output instantly.',
    keyword: 'json formatter online',
    toolSlug: 'json-formatter',
    intro: 'Keep API payloads readable and valid while debugging or preparing docs.',
    steps: [
      'Paste JSON into the input panel.',
      'Click Format to prettify or Minify for compact output.',
      'Copy final JSON for API, docs, or code use.',
    ],
  },
]

export function getToolGuide(slug) {
  return toolGuides.find((g) => g.slug === slug)
}
