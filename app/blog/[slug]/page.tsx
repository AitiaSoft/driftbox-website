import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import Link from 'next/link'
import { Metadata } from 'next'

interface BlogPostProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    title: data.title || 'Untitled',
    date: data.date || '',
    author: data.author || 'DriftBox Team',
    excerpt: data.excerpt || '',
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ''),
    }))
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} — DriftBox Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <article className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog" 
            className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block"
          >
            ← Back to Blog
          </Link>

          <header className="mb-12">
            <time className="text-sm text-indigo-400 font-semibold">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-400">
              <span>By {post.author}</span>
            </div>
          </header>

          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-white
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-gray-300 prose-ol:text-gray-300
              prose-li:text-gray-300 prose-li:my-2
              prose-code:text-indigo-300 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700
              prose-blockquote:border-l-indigo-500 prose-blockquote:text-gray-400"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Newsletter CTA at bottom of post */}
          <div className="mt-16 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-gray-700/50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to try DriftBox?</h3>
            <p className="text-gray-400 mb-6">
              Join the waitlist and get early access when we launch
            </p>
            <form 
              action="https://formsubmit.co/rvaldez@aitiasoft.com" 
              method="POST"
              className="max-w-md mx-auto"
            >
              <input type="hidden" name="_subject" value="DriftBox Waitlist Signup - Blog Post" />
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
                  Get Early Access
                </button>
              </div>
            </form>
          </div>
        </div>
      </article>
    </div>
  )
}
