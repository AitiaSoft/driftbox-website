import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200/50 dark:border-slate-800/50 py-16">
      {/* Subtle top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50/50 dark:from-slate-900/30 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="url(#logo-gradient-footer)"/>
                <path d="M12 14C12 12.8954 12.8954 12 14 12H22C23.1046 12 24 12.8954 24 14V20C24 21.1046 23.1046 22 22 22H16L13 25V22H14C12.8954 22 12 21.1046 12 20V14Z" fill="white" opacity="0.9"/>
                <path d="M16 18C16 16.8954 16.8954 16 18 16H26C27.1046 16 28 16.8954 28 18V24C28 25.1046 27.1046 26 26 26H25V29L22 26H18C16.8954 26 16 25.1046 16 24V18Z" fill="white" opacity="0.6"/>
                <defs>
                  <linearGradient id="logo-gradient-footer" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#6366F1"/>
                    <stop offset="1" stopColor="#8B5CF6"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xl font-extrabold font-display text-slate-900 dark:text-white">DriftBox</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Never let a conversation drift away.</p>
            <a href="https://x.com/rvaldezv" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Product</h4>
            <div className="space-y-3">
              <Link href="/#features" className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Features</Link>
              <Link href="/#pricing" className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Pricing</Link>
              <Link href="/#how-it-works" className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">How It Works</Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Company</h4>
            <div className="space-y-3">
              <Link href="/blog" className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Blog</Link>
              <a href="https://aitiasoft.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">About</a>
              <a href="https://aitiasoft.com#contact" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
          <p className="text-sm text-slate-400 dark:text-slate-500">&copy; 2026 AitiaSoft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
