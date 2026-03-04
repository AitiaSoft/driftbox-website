import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author?: string
  readingTime: number
}

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content/blog')

  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        excerpt: data.excerpt || '',
        author: data.author || 'DriftBox Team',
        readingTime: getReadingTime(content),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="min-h-screen bg-drift-bg pt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-drift-text">
              The DriftBox <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-drift-muted">
              Insights on communication, AI, and productivity
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-drift-muted text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-12">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-drift-card/50 backdrop-blur-sm border border-drift-border rounded-xl p-8 hover:border-drift-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-3 text-sm">
                      <time className="text-drift-primary font-semibold">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="text-drift-muted">&middot;</span>
                      <span className="text-drift-muted">{post.readingTime} min read</span>
                    </div>
                    <h2 className="text-3xl font-bold mt-4 mb-4 text-drift-text group-hover:text-drift-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-drift-muted text-lg mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-drift-muted text-sm">{post.author}</span>
                      <span className="text-drift-primary font-semibold group-hover:translate-x-2 transition-transform">
                        Read more &rarr;
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-drift-surface border border-drift-border rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-drift-text">Stay Updated</h3>
            <p className="text-drift-muted mb-6">
              Get notified when we publish new articles and product updates
            </p>
            <form
              action="https://formsubmit.co/rvaldez@aitiasoft.com"
              method="POST"
              className="max-w-md mx-auto"
            >
              <input type="hidden" name="_subject" value="DriftBox Blog Newsletter Signup" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://driftbox.ai/blog" />
              <input
                type="text"
                name="_honey"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-3 bg-drift-hover border border-drift-border rounded-xl focus:outline-none focus:ring-2 focus:ring-drift-primary/50 text-drift-text placeholder-drift-muted/60"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-drift-primary text-white font-semibold rounded-xl hover:bg-drift-primary-hover hover:shadow-lg hover:shadow-drift-primary/25 transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
