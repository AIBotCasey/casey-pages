export const getPostImageUrl = (post) => {
  const q = encodeURIComponent(post.imageQuery || post.title)
  return `/api/pexels-image?q=${q}`
}
