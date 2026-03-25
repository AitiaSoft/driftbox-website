import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'

function getLatestPosts(count: number) {
  const postsDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(postsDir)) return []

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))

  const posts = files
    .map((fileName) => {
      const filePath = path.join(postsDir, fileName)
      const { data } = matter(fs.readFileSync(filePath, 'utf8'))
      return {
        slug: fileName.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        date: data.date || '',
        excerpt: data.excerpt || '',
      }
    })
    .filter((post) => post.title !== 'Coming Soon' && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)

  return posts
}

export default function BlogPreview() {
  const posts = getLatestPosts(3)
  if (posts.length === 0) return null

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-drift-text">
              From the <span className="gradient-text">DriftBox Blog</span>
            </h2>
            <p className="text-lg text-drift-muted max-w-xl mx-auto">
              Insights on communication, productivity, and building in public.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-drift-card border border-drift-border rounded-xl p-6 hover:border-drift-primary/30 hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <time className="text-xs text-drift-primary font-semibold">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <h3 className="text-lg font-bold mt-2 mb-3 text-drift-text leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-drift-muted leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-4 text-sm text-drift-primary font-medium">
                  Read more &rarr;
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="text-drift-primary hover:text-drift-primary-hover font-medium transition-colors"
            >
              View all posts &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
