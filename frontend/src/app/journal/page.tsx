'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Check, 
  ArrowRight, 
  BookOpen, 
  Cpu, 
  Globe, 
  GraduationCap, 
  Users, 
  Compass, 
  ChevronRight,
  FileText,
  Calendar,
  Loader2,
  Bookmark
} from 'lucide-react'
import { fetchArticles, subscribeToCampaign } from '@/lib/api'
import { cn } from '@/lib/utils'

const TOPICS = [
  { 
    id: 'executive', 
    title: 'Executive Success', 
    desc: 'Strategic insights on leadership, executive decision making, corporate strategy, and sustainable growth.',
    icon: Compass 
  },
  { 
    id: 'academic', 
    title: 'Academic Excellence', 
    desc: 'Advanced research on modern education, youth employability, professional development, and core skills.',
    icon: GraduationCap 
  },
  { 
    id: 'ai', 
    title: 'Artificial Intelligence', 
    desc: 'Practical applications of Artificial Intelligence across educational, business, and corporate spaces.',
    icon: Cpu 
  },
  { 
    id: 'erasmus', 
    title: 'Erasmus+', 
    desc: 'Core funding opportunities, mobility trends, international collaboration, and modern program design.',
    icon: Globe 
  },
  { 
    id: 'workforce', 
    title: 'Workforce Development', 
    desc: 'Techniques for building capable teams, developing talent, and elevating overall corporate performance.',
    icon: Users 
  }
]

export default function JournalPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTopic, setActiveTopic] = useState('all')

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles()
        setArticles(data)
      } catch (err) {
        console.error('Failed to load dynamic journal articles:', err)
      } finally {
        setLoading(false)
      }
    }
    loadArticles()
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      try {
        await subscribeToCampaign(email, 'journal_newsletter')
        setSubscribed(true)
        setEmail('')
      } catch (err: any) {
        console.error('Subscription failed:', err)
        alert('Subscription failed. Please check if the backend server is active.')
      }
    }
  }

  const handleScrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Segment articles
  const featuredArticle = articles[0]
  const trendingArticles = articles.slice(1) // Shows all articles starting from index 1

  // Dynamically filter trending articles by activeTopic mappings
  const filteredTrending = activeTopic === 'all'
    ? trendingArticles
    : trendingArticles.filter(art => {
        const topicMap: any = {
          executive: 'CEO Briefing',
          academic: 'Future Learning Review',
          ai: 'AI in Practice',
          erasmus: 'Mobility Matters',
          workforce: 'Capability Quarterly'
        }
        return art.series === topicMap[activeTopic]
      })

  const seriesArticles = articles.slice(3, 9) // Next 6 for series slider

  return (
    <main className="pt-2 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Intro section */}
      <section className="relative pt-10 pb-16 sm:pb-20 border-b border-[#E2E8F0]/40 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 font-sans">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block">
              THE PGT JOURNAL
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] leading-tight max-w-5xl mx-auto">
              Ideas That Inspire Better Decisions
            </h1>
            <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
          </div>

          {/* Symmetric Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column (7 Cols): Editorial Text Content & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-[#B89047] font-bold tracking-widest uppercase block">
                  OUR MANIFESTO
                </span>
                <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
                  <p>
                    The world of work is evolving constantly as leadership expectations change to embrace digital capabilities. Artificial Intelligence is restructuring entire industries, and traditional education is actively being reimagined. The organisations that succeed tomorrow are those that continue learning today, ensuring their human capital performs with absolute confidence.
                  </p>
                  <p>
                    The PGT Journal brings together expert perspectives, practical guidance, and emerging trends to help leaders, educators, and organisations navigate change with confidence.
                  </p>
                </div>
              </div>

              {/* Clean layout of button actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E2E8F0]/80">
                <button
                  onClick={() => handleScrollToSection('articles')}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <span>Explore Latest Publications</span>
                  <ArrowRight className="w-4 h-4 text-[#B89047] group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => handleScrollToSection('subscribe')}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-bold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:bg-[#FAF9F6] transition-all cursor-pointer"
                >
                  Subscribe to the Journal
                </button>
              </div>
            </div>

            {/* Right Column (5 Cols): Cover Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
              <Image
                src="/research.jpg"
                alt="Strategic thinking and research planning"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
                priority
              />
            </div>

          </div>

        </div>
      </section>

      {/* FEATURED ARTICLE (Syncs dynamically from DB) */}
      <section id="articles" className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {loading ? (
          <div className="py-12 flex flex-col justify-center items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#B89047]" />
            <p className="text-xs text-muted-foreground font-mono">Syncing Publication Plates...</p>
          </div>
        ) : featuredArticle ? (
          <div className="bg-[#0B1B3D] text-white rounded-3xl overflow-hidden border border-slate-900 shadow-xl grid grid-cols-1 lg:grid-cols-12 text-left">
            
            {/* Cover style block */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0B1B3D] to-accent/20 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
              <div>
                <span className="text-[9px] font-bold tracking-widest text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/30 px-2.5 py-1 rounded-full inline-block mb-6">
                  FEATURED EDITORIAL
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug uppercase tracking-tight">
                  {featuredArticle.title}
                </h2>
              </div>
              <div className="text-[9px] text-[#B89047] uppercase font-mono tracking-widest">
                By {featuredArticle.author} • {featuredArticle.series}
              </div>
            </div>

            {/* Copy block */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-slate-900/60">
              <div className="text-slate-200 text-xs sm:text-sm space-y-4 leading-relaxed mb-8 font-light">
                <p className="font-extrabold text-white text-base">
                  {featuredArticle.excerpt}
                </p>
                <p className="line-clamp-4">
                  {featuredArticle.content}
                </p>
              </div>
              
              <div className="flex pt-4 border-t border-slate-800">
                <Link
                  href={`/journal/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#B89047] hover:text-white uppercase tracking-wider transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white border border-[#E2E8F0] p-12 text-center text-muted-foreground text-xs rounded-2xl">
            No published articles found in the database.
          </div>
        )}
      </section>

      {/* Explore by Topic */}
      <section id="topics" className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">EDITORIAL SEGMENTS</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">Explore Articles by Topic</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOPICS.map((topic) => {
            const Icon = topic.icon
            const isActive = activeTopic === topic.id
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(isActive ? 'all' : topic.id)}
                className={cn(
                  "bg-white border p-6 rounded-2xl flex flex-col justify-between shadow-xs transition-all text-left w-full cursor-pointer hover:shadow-sm",
                  isActive 
                    ? "border-[#B89047] bg-amber-50/10 ring-1 ring-[#B89047]/30" 
                    : "border-[#E2E8F0] hover:border-[#B89047]/15"
                )}
              >
                <div>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center mb-4 transition-colors",
                    isActive ? "bg-[#B89047] text-white" : "bg-[#B89047]/10 text-[#B89047]"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide leading-tight mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-[11px] text-[#0B1B3D] leading-relaxed font-normal line-clamp-3">
                    {topic.desc}
                  </p>
                </div>
                <div 
                  className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest text-left mt-5 hover:text-[#0B1B3D] transition-colors flex items-center gap-1"
                >
                  <span>{isActive ? 'Clear Filter' : 'Filter Stream'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* TRENDING ARTICLES (Loads infinitely from DB and filters in real-time) */}
      {!loading && (trendingArticles.length > 0) && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-[#E2E8F0]/40 mb-16 relative">
          <div className="text-center mb-12 flex flex-col items-center justify-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">
              {activeTopic === 'all' ? 'POPULAR BRIEFINGS' : `${activeTopic.toUpperCase()} STREAM`}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">
              {activeTopic === 'all' ? 'Trending Articles' : 'Filtered Publication Stream'}
            </h2>
            {activeTopic !== 'all' && (
              <button
                onClick={() => setActiveTopic('all')}
                className="text-[10px] font-bold text-[#B89047] bg-[#B89047]/10 hover:bg-[#B89047]/20 border border-[#B89047]/30 px-3 py-1 rounded-full uppercase cursor-pointer"
              >
                Clear Filter • Show All Articles
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {filteredTrending.length === 0 ? (
              <div className="col-span-full py-16 bg-white border border-[#E2E8F0] p-10 text-center rounded-2xl max-w-lg mx-auto space-y-2">
                <FileText className="w-8 h-8 text-[#B89047] mx-auto opacity-50" />
                <h4 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide">No Publications Found</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  We haven't uploaded any articles under this specific segment yet. Please try another category or click "Clear Filter" to read all entries.
                </p>
              </div>
            ) : (
              filteredTrending.map((article) => (
                <div 
                  key={article._id} 
                  className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-40 hover:border-[#B89047]/15 transition-all duration-300 text-left"
                >
                  <div>
                    <span className="text-[9px] font-mono text-[#B89047] font-bold uppercase tracking-wider block mb-1">
                      {article.series}
                    </span>
                    <h4 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide leading-tight line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-[11px] text-[#0B1B3D] font-normal mt-1.5 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <Link 
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#B89047] hover:text-[#0B1B3D] uppercase tracking-widest transition-colors border-t border-[#E2E8F0]/40 pt-3 w-full"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* SERIES SECTION (Widescreen Showcase) */}
      {!loading && seriesArticles.length > 0 && (
        <section className="bg-[#FAF9F6] border-y border-[#E2E8F0] py-16 mb-16 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">RECURRING EDITORIALS</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">The Future of Learning Series</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seriesArticles.slice(0, 4).map((article) => (
                <div 
                  key={article._id}
                  className="bg-white p-6 rounded-2xl border border-[#E2E8F0]/80 shadow-xs flex flex-col sm:flex-row gap-5 items-center text-left"
                >
                  <div className="relative rounded-xl overflow-hidden h-28 w-full sm:w-28 shrink-0 bg-slate-100">
                    <Image
                      src="/paragonimage2.png"
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-[#B89047] font-bold uppercase tracking-wider block">
                      {article.series}
                    </span>
                    <h3 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide leading-tight line-clamp-1">
                      {article.title}
                    </h3>
                    <p className="text-[11px] text-[#0B1B3D] leading-relaxed font-normal line-clamp-2">
                      {article.excerpt}
                    </p>
                    <Link 
                      href={`/journal/${article.slug}`}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B89047] hover:text-[#0B1B3D] uppercase tracking-widest pt-1"
                    >
                      <span>Read Briefing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial from PGT Team */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/paragonimage2.png"
              alt="PGT Editorial whiteboarding session"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>

          <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">
                FROM THE PGT TEAM
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">
                Behind the Scenes of Our Research
              </h3>
              <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
                <p>
                  Our research team regularly collaborates with University boards, corporate leadership groups, and compliance auditors across Europe. This direct line of on-the-ground capability building helps us craft briefings that aren't just theoretical essays, but actionable guidelines.
                </p>
                <p>
                  Every editorial piece is peer-reviewed by our Managing Partners, ensuring that the methodologies we detail match the strict execution standards we enforce inside our classroom workshops.
                </p>
                <p>
                  Whether you are planning Erasmus agreements, adoption frameworks for generative AI, or restructuring board policies, *The PGT Journal* provides the verified insights required to build an adaptable workforce.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Subscribe Funnel */}
      <section id="subscribe" className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#B89047] uppercase block mb-2">NEWSLETTER TELEMETRY</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1B3D] mb-3 uppercase tracking-tight">Join Our Executive Community</h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-6 font-normal">
            Subscribe to receive PGT Editorial releases, micro-learning briefings, and exclusive workshop webinar invitations directly in your professional inbox.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
              <input
                type="email"
                required
                placeholder="Professional email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] placeholder-slate-400 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-[#B89047] font-normal"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-extrabold uppercase tracking-wider text-[10px] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="text-green-600 text-xs font-bold font-mono">
              ✓ Thank you! You have successfully registered for our briefings list.
            </div>
          )}
        </div>
      </section>

    </main>
  )
}
