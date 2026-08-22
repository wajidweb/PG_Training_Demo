'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  BookOpen, 
  Share2, 
  Clock,
  Loader2,
  Bookmark
} from 'lucide-react'
import { fetchArticleBySlug } from '@/lib/api'

interface ArticleDetail {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  series: string
  tags: string[]
  publishedAt: string
}

function ArticleReaderContent() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return

    const loadArticle = async () => {
      try {
        const data = await fetchArticleBySlug(slug)
        if (!data) throw new Error('Article not found')
        setArticle(data)
      } catch (err: any) {
        console.error(err)
        setError('Article not found or failed to load. Ensure the backend is active.')
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#B89047]" />
        <p className="text-xs text-muted-foreground font-mono">Syncing Editorial Plates...</p>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-4 text-center p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl max-w-md">
          <p className="text-sm font-bold">{error || 'Article not found'}</p>
        </div>
        <Link href="/journal">
          <Button variant="outline" className="border-2 text-xs font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Journal
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B1B3D] font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D] pt-20 pb-20">
      
      {/* Editorial Title Block */}
      <header className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-[#E2E8F0] mb-8">
          <Link href="/journal" className="inline-flex items-center text-xs font-bold text-[#B89047] uppercase tracking-widest hover:text-[#0B1B3D] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Back to Journal</span>
          </Link>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('Article URL copied to clipboard!')
            }}
            className="text-xs font-bold text-[#B89047] hover:text-[#0B1B3D] transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-widest"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Series Badge */}
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block">
          {article.series}
        </span>

        {/* Article Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-[#0B1B3D] leading-tight max-w-3xl mx-auto uppercase tracking-tight">
          {article.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#0B1B3D] font-medium pt-2 border-y border-[#E2E8F0]/40 py-4 max-w-xl mx-auto">
          <div className="flex items-center gap-1.5 capitalize">
            <User className="w-4 h-4 text-[#B89047]" />
            <span>By {article.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#B89047]" />
            <span>{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#B89047]" />
            <span>5 Min Read</span>
          </div>
        </div>

      </header>

      {/* Hero Editorial Image */}
      <section className="max-w-5xl mx-auto px-6 my-10 relative">
        <div className="relative rounded-3xl overflow-hidden h-[240px] sm:h-[380px] lg:h-[460px] border border-[#E2E8F0]/80 shadow-md">
          <Image
            src="/research.jpg"
            alt={article.title}
            fill
            className="object-cover select-none"
            priority
          />
        </div>
      </section>

      {/* Body Prose Editorial Content */}
      <main className="max-w-3xl mx-auto px-6">
        <article className="prose prose-slate max-w-none text-[#0B1B3D] leading-relaxed text-sm sm:text-base font-normal space-y-6 text-left selection:bg-[#B89047]/20">
          
          {/* Excerpt Pullout */}
          <p className="text-lg font-extrabold border-l-4 border-[#B89047] pl-4 py-2 italic text-[#0B1B3D]/80 leading-relaxed uppercase tracking-tight mb-8">
            {article.excerpt}
          </p>

          {/* Formatted body copy split by paragraph gaps */}
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="font-normal text-[#0B1B3D] leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Symmetrical tags block */}
          <div className="border-t border-[#E2E8F0]/60 pt-6 mt-12 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-bold text-[#B89047] uppercase tracking-wider mr-2">PUBLICATION TAGS:</span>
            {article.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded bg-[#FAF9F6] border border-[#E2E8F0] text-[9px] font-mono font-bold uppercase tracking-wider text-[#0B1B3D]/80">
                #{tag}
              </span>
            ))}
          </div>

        </article>

        {/* Dynamic Author Signature Card */}
        <div className="bg-[#FAF9F6] border border-[#E2E8F0] p-6 rounded-2xl shadow-xs mt-12 text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] font-bold shrink-0">
            PG
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold tracking-widest text-[#B89047] uppercase block">EDITORIAL TEAM SIGNATURE</span>
            <h4 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide">PGT Research & Insights Consortium</h4>
            <p className="text-[11px] text-[#0B1B3D] font-normal leading-relaxed">
              Our contributors compile structural research and compliance guidelines from major institutional frameworks across Europe to support continuous organisational improvement.
            </p>
          </div>
        </div>

      </main>

    </div>
  )
}

import { Button } from '@/components/ui/button'

export default function ArticleReaderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#B89047]" />
        <p className="text-xs text-muted-foreground font-mono">Syncing Editorial Plates...</p>
      </div>
    }>
      <ArticleReaderContent />
    </Suspense>
  )
}
