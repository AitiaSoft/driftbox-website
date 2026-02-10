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
}

function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  
  // Create directory if it doesn't exist
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
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        excerpt: data.excerpt || '',
        author: data.author || 'DriftBox Team',
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The DriftBox <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-gray-400">
              Insights on communication, AI, and productivity
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-12">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300">
                    <time className="text-sm text-indigo-400 font-semibold">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className="text-3xl font-bold mt-4 mb-4 group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-lg mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">{post.author}</span>
                      <span className="text-indigo-400 font-semibold group-hover:translate-x-2 transition-transform">
                        Read more →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-gray-700/50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
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
                  className="flex-1 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
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
