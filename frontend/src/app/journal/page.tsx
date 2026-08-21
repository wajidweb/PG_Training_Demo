'use client'

import { useState } from 'react'
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
  Mic
} from 'lucide-react'

const TOPICS = [
  { 
    id: 'executive', 
    title: 'Executive Success', 
    desc: 'Strategic insights on leadership, executive decision making, corporate strategy, and sustainable growth.',
    icon: Compass 
  },
  { 
    id: 'academic', 
    title: 'Academic & Workforce Excellence', 
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
  },
  { 
    id: 'innovation', 
    title: 'Innovation & Future Trends', 
    desc: 'Comprehensive analysis of the key technological forces shaping the future of the global workplace.',
    icon: BookOpen 
  }
]

const TRENDING_ARTICLES = [
  'The Future Skills Every Organisation Needs by 2030',
  'How Artificial Intelligence Is Transforming Professional Learning',
  'Five Characteristics of High Performing Executive Teams',
  'Designing Erasmus Plus Mobilities That Create Lasting Impact',
  'Why Continuous Learning Is Becoming Every Organisation\'s Competitive Advantage',
  'From Knowledge to Capability: The Next Evolution of Professional Development'
]

const REPORTS = [
  'AI & Workforce Readiness Report',
  'Executive Capability Trends',
  'Erasmus+ Impact Report',
  'Future Skills Outlook',
  'Learning & Development Benchmark'
]

const EVENTS = [
  'Executive Masterclasses',
  'AI Workshops',
  'Erasmus+ Information Sessions',
  'Professional Development Webinars',
  'Roundtable Discussions'
]

export default function JournalPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const handleScrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="pt-2 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Intro section */}
      <section className="relative pt-10 pb-16 sm:pb-20 border-b border-[#E2E8F0]/40 overflow-hidden bg-white">
        {/* Soft luxury background glow */}
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
                  onClick={() => handleScrollToSection('topics')}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm transition-all"
                >
                  <span>Explore the Latest Articles</span>
                  <ArrowRight className="w-4 h-4 text-[#B89047] group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => handleScrollToSection('subscribe')}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-bold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:bg-[#FAF9F6] transition-all"
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

      {/* FEATURED ARTICLE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="bg-[#0B1B3D] text-white rounded-2xl overflow-hidden border border-slate-900 shadow-md grid grid-cols-1 lg:grid-cols-12">
          
          {/* Cover style block */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0B1B3D] to-accent/20 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/30 px-2.5 py-1 rounded-full inline-block mb-6">
                FEATURED ARTICLE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
                Leading Through Change: Why Adaptability Is the New Competitive Advantage
              </h2>
            </div>
            <div className="text-[9px] text-[#B89047] uppercase font-mono tracking-widest">
              By PGT Contributors
            </div>
          </div>

          {/* Copy block */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-slate-900/60">
            <div className="text-slate-200 text-xs sm:text-sm space-y-4 leading-relaxed mb-8 font-light">
              <p className="font-bold text-white text-base">
                Every generation of leaders faces change, but modern executives face transformation at unprecedented speed.
              </p>
              <p>
                Today, Artificial Intelligence, shifting workforce expectations, international collaboration, and rapid technological innovation are actively reshaping how modern organisations operate and scale.
              </p>
              <p>
                In this volatile environment, the core question is no longer whether industrial change will happen, but whether your teams possess the strategic adaptability needed to thrive.
              </p>
              <p className="font-semibold text-white">
                The ultimate question is whether your organisation is fully prepared to lead.
              </p>
            </div>
            <button 
              onClick={() => alert('Article view stimulated. (Reading Featured Editorial)')}
              className="px-6 py-3 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold uppercase tracking-wider text-[10px] rounded-lg transition-all self-start shadow-sm"
            >
              Read Article
            </button>
          </div>

        </div>
      </section>

      {/* EXPLORE BY TOPIC */}
      <section id="topics" className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-[#E2E8F0]/40 mb-16 scroll-mt-24">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">EXPLORE BY TOPIC</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">Find the Knowledge That Matters Most</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((topic) => {
            const Icon = topic.icon
            return (
              <div 
                key={topic.id} 
                className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#B89047]/10 transition-all"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#B89047]/10 flex items-center justify-center text-[#B89047] mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[#0B1B3D] text-sm uppercase tracking-wide leading-snug">{topic.title}</h3>
                  <p className="text-xs text-[#0B1B3D] leading-relaxed mt-2 mb-6 font-normal">{topic.desc}</p>
                </div>
                <button 
                  onClick={() => alert(`Filtering Journal by: ${topic.title}`)}
                  className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest hover:text-[#0B1B3D] transition-colors flex items-center gap-1.5 self-start"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* TRENDING ARTICLES (Centered Header & Full Width Grid) */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">POPULAR READS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Trending Articles
            </h2>
            <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
            <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
              Explore the most widely read publications and expert opinions from our specialized Schools of Thought.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRENDING_ARTICLES.map((art, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF9F6] p-5 sm:p-6 rounded-xl border border-[#E2E8F0]/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <span className="text-[9px] font-mono text-[#B89047] block mb-3 uppercase tracking-wider">// Trending 0{idx+1}</span>
                  <h3 className="font-bold text-[#0B1B3D] text-xs sm:text-sm mb-6 leading-snug uppercase tracking-wide group-hover:text-[#B89047] transition-colors cursor-pointer">
                    {art}
                  </h3>
                </div>
                <button 
                  onClick={() => alert(`Opening paper: ${art}`)}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B89047] uppercase tracking-widest hover:text-[#0B1B3D] transition-colors self-start"
                >
                  <span>Read →</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERIES (Centered & Symmetrical Grid) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-4 mb-16 relative z-10 font-sans">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-8 sm:p-12 border border-slate-900 shadow-lg text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            {/* Centered Header Block */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block">
                IN DEPTH FOCUS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white uppercase tracking-tight leading-none">
                The Future of Learning Series
              </h2>
              <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
              <p className="text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed font-normal">
                A collection of in depth articles exploring how organisations can prepare people for an increasingly digital, international, and AI enabled future.
              </p>
            </div>

            {/* Centered Topics Grid (6 Columns on desktop, 3 on tablet, 2 on mobile) */}
            <div className="pt-6 border-t border-slate-800/80">
              <h3 className="font-extrabold text-white text-[10px] tracking-widest uppercase mb-6">Topics include:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
                {['Future Skills', 'AI Technology', 'Board Leadership', 'Organisational Change', 'Global Networks', 'Modern Innovation'].map((item) => (
                  <div 
                    key={item} 
                    className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#B89047]/30 transition-all duration-300"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Centered CTA Button */}
            <div className="pt-6">
              <button
                onClick={() => alert('Loading the Future of Learning Series collection...')}
                className="inline-flex items-center justify-center gap-2 px-12 sm:px-16 py-3.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all w-full sm:w-auto"
              >
                <span>Explore the Series</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* RESEARCH & REPORTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Research Papers */}
        <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-2xl shadow-sm">
          <div className="flex gap-2 items-center mb-3">
            <FileText className="w-4.5 h-4.5 text-[#B89047]" />
            <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-widest">RESEARCH & REPORTS</h3>
          </div>
          <p className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest mb-1 font-mono">Evidence That Supports Better Decisions</p>
          <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">
            Access research reports, industry analysis and practical publications developed by PGT. Featured Reports:
          </p>
          
          <div className="space-y-3 mb-6 border-b border-[#E2E8F0]/40 pb-4 text-xs font-semibold text-[#0B1B3D]">
            {REPORTS.map((rep) => (
              <div key={rep} className="flex items-center gap-2.5">
                <span className="text-[#B89047]">📄</span>
                <span className="uppercase tracking-wide">{rep}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => alert('Accessing complete report center...')}
            className="w-full py-3 border border-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-white text-[#0B1B3D] text-center font-bold text-[10px] uppercase tracking-widest rounded-lg transition-colors"
          >
            View Reports
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-2xl shadow-sm">
          <div className="flex gap-2 items-center mb-3">
            <Mic className="w-4.5 h-4.5 text-[#B89047]" />
            <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-widest">EVENTS & WEBINARS</h3>
          </div>
          <p className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest mb-1 font-mono">Continue the Conversation</p>
          <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">
            Join our online and in-person events designed to help professionals stay informed and connected. Upcoming events include:
          </p>
          
          <div className="space-y-3 mb-6 border-b border-[#E2E8F0]/40 pb-4 text-xs font-semibold text-[#0B1B3D]">
            {EVENTS.map((evt) => (
              <div key={evt} className="flex items-center gap-2.5">
                <span className="text-[#B89047]">🎤</span>
                <span className="uppercase tracking-wide">{evt}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => alert('Loading upcoming events calendar...')}
            className="w-full py-3 border border-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-white text-[#0B1B3D] text-center font-bold text-[10px] uppercase tracking-widest rounded-lg transition-colors"
          >
            View Events
          </button>
        </div>
      </section>

      {/* FROM THE PGT TEAM (Centered & Symmetrical Grid with Image) */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-10 lg:mb-12 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">FROM THE PGT TEAM</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Experience Meets Practical Insight
            </h2>
            <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          </div>

          {/* Symmetric Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
            
            {/* Left Column (7 Cols): The Narrative Text Content */}
            <div className="lg:col-span-7 space-y-5 text-left flex flex-col justify-center">
              <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
                <p>
                  Every article published by PGT is grounded in real world experience. Our contributors work closely with executives, educational institutions, employers, and public organisations across Europe, ensuring that every insight is practical, relevant, and focused on measurable outcomes.
                </p>
                <p>
                  Rather than simply commenting on general trends, we actively guide organisations on how to respond to them strategically. We translate complex industrial transformations into actionable pathways that empower teams to excel and build sustainable value.
                </p>
                <p>
                  Our goal is to foster an elite learning community where knowledge is collaboratively created and shared. Through deep collaboration, we continue to bridge the gap between academic theory and practical enterprise execution, ensuring your teams remain future ready.
                </p>
              </div>
            </div>

            {/* Right Column (5 Cols): Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
              <Image
                src="/development.png"
                alt="Practical insights and executive coaching workshops"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

          </div>

        </div>
      </section>

      {/* JOIN OUR COMMUNITY (Centered Newsletter Card) */}
      <section id="subscribe" className="max-w-4xl mx-auto px-6 mb-16 relative z-10 font-sans">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-8 sm:p-12 border border-slate-900 shadow-xl text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            {/* Centered Header Block */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">
                JOIN OUR COMMUNITY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white uppercase tracking-tight leading-none">
                Stay Ahead of What's Next
              </h2>
              <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
              <p className="text-xs sm:text-sm text-slate-100 max-w-xl mx-auto leading-relaxed font-normal">
                Receive the latest in depth articles, strategic research, practical guides, and exclusive invitations to webinars directly in your inbox. Partner with PGT and prepare your organisation to lead.
              </p>
            </div>

            {/* Symmetrical Curated List Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-left max-w-lg mx-auto mb-4 text-[10px] font-bold text-slate-200 uppercase tracking-wider">
              {[
                'New Journal Articles',
                'Accredited Research Reports',
                'Practical Study Resources',
                'Artificial Intelligence Updates',
                'Erasmus Plus Program News',
                'Executive Briefing Invitations'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Widened Centered Form Elements */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900/60 border border-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-xs w-full focus:outline-none focus:border-[#B89047] font-normal"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl transition-all whitespace-nowrap shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="bg-[#B89047]/10 border border-[#B89047]/20 rounded-xl p-4 max-w-md mx-auto text-[#B89047] text-xs font-bold">
                ✓ Welcome! You are now subscribed to the PGT community.
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION (Premium Soft-Beige Card) */}
      <section className="max-w-5xl mx-auto px-6 mb-16 relative z-10 font-sans">
        <div className="bg-[#FAF9F6] border border-[#E2E8F0]/80 rounded-2xl p-8 sm:p-12 shadow-md text-center relative overflow-hidden">
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/10 rounded-xl pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-1">THE PGT JOURNAL</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] uppercase tracking-tight mb-3">
            Knowledge Shapes Better Decisions
          </h2>
          <p className="text-[#0B1B3D] max-w-xl mx-auto leading-relaxed mb-8 text-xs font-normal">
            Whether you are leading an organisation, designing learning experiences, or preparing your workforce for the future, the right ideas can create lasting impact. Explore the PGT Journal and discover practical perspectives that help you lead with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-bold text-[10px] uppercase tracking-widest transition-all rounded-lg shadow-sm"
            >
              Read the Latest Articles
            </button>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#0B1B3D] font-bold text-[10px] uppercase tracking-widest hover:bg-[#FAF9F6] transition-all rounded-lg shadow-sm"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
