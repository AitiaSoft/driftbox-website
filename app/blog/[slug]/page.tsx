import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

interface BlogPostProps {
  params: {
    slug: string
  }
}

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
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
    .use(remarkGfm)
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
    image: data.image || null,
    readingTime: getReadingTime(content),
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
      ...(post.image ? { images: [post.image] } : {}),
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-drift-bg pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-drift-text">Post Not Found</h1>
          <Link href="/blog" className="text-drift-primary hover:text-drift-primary-hover">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-drift-bg pt-24">
      <article className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-drift-primary hover:text-drift-primary-hover mb-8 inline-flex items-center gap-2 font-medium transition-colors"
          >
            &larr; Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-3 text-sm text-drift-muted">
              <time className="text-drift-primary font-semibold">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>&middot;</span>
              <span>{post.readingTime} min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-drift-text leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-drift-muted">
              <span>By {post.author}</span>
            </div>
          </header>

          {post.image && (
            <div className="mb-12 rounded-xl overflow-hidden border border-drift-border">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          <div
            className="blog-prose prose dark:prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <hr className="my-16 border-drift-border" />

          {/* Newsletter CTA */}
          <div className="bg-drift-surface border border-drift-border rounded-xl p-8 md:p-10 text-center">
            <h3 className="text-2xl font-bold mb-3 text-drift-text">Ready to try DriftBox?</h3>
            <p className="text-drift-muted mb-6 max-w-md mx-auto">
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

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3 bg-drift-hover border border-drift-border rounded-xl focus:outline-none focus:ring-2 focus:ring-drift-primary/50 text-drift-text placeholder-drift-muted/60"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-drift-primary text-white font-semibold rounded-xl hover:bg-drift-primary-hover hover:shadow-lg hover:shadow-drift-primary/25 transition-all duration-300"
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
