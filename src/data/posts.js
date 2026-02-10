export const posts = []

export function sortPostsByNewest(items = posts) {
  return [...items].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}
