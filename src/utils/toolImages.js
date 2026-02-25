export const getToolImageUrl = (tool) => {
  const q = encodeURIComponent(`${tool.name} ${tool.category} utility web app`)
  return `/api/pexels-image?q=${q}`
}
