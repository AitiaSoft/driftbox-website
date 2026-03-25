import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://driftbox.ai'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/reserve/free`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/reserve/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/reserve/business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const postsDir = path.join(process.cwd(), 'content/blog')
  let blogPages: MetadataRoute.Sitemap = []

  if (fs.existsSync(postsDir)) {
    blogPages = fs
      .readdirSync(postsDir)
      .filter((f) => f.endsWith('.md'))
      .map((fileName) => {
        const filePath = path.join(postsDir, fileName)
        const { data } = matter(fs.readFileSync(filePath, 'utf8'))
        const slug = fileName.replace(/\.md$/, '')
        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: data.date ? new Date(data.date) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }
      })
  }

  return [...staticPages, ...blogPages]
}
