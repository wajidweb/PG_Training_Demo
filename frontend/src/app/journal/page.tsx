'use client'

import { useState } from 'react'
import Link from 'next/link'
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
    desc: 'Insights on leadership, executive decision-making, organisational strategy and sustainable growth.',
    icon: Compass 
  },
  { 
    id: 'academic', 
    title: 'Academic & Workforce Excellence', 
    desc: 'New thinking on education, employability, professional development and future skills.',
    icon: GraduationCap 
  },
  { 
    id: 'ai', 
    title: 'Artificial Intelligence', 
    desc: 'Practical applications of AI in education, business and organisational development.',
    icon: Cpu 
  },
  { 
    id: 'erasmus', 
    title: 'Erasmus+', 
    desc: 'Funding opportunities, mobility trends, international collaboration and programme design.',
    icon: Globe 
  },
  { 
    id: 'workforce', 
    title: 'Workforce Development', 
    desc: 'Building capable teams, developing talent and strengthening organisational performance.',
    icon: Users 
  },
  { 
    id: 'innovation', 
    title: 'Innovation & Future Trends', 
    desc: 'Understanding the forces shaping tomorrow\'s workplace.',
    icon: BookOpen 
  }
]

const TRENDING_ARTICLES = [
  'The Future Skills Every Organisation Needs by 2030',
  'How Artificial Intelligence Is Transforming Professional Learning',
  'Five Characteristics of High-Performing Executive Teams',
  'Designing Erasmus+ Mobilities That Create Lasting Impact',
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
    <main className="pt-2 pb-16 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* HERO SECTION (Compact Premium Split-Editorial Column Redesign) */}
      <section className="relative pt-12 pb-12 lg:pt-16 lg:pb-16 border-b border-[#E2E8F0]/40 overflow-hidden bg-white">
        {/* Soft luxury background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column (4 cols): Title & Quick CTAs */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-r lg:border-[#E2E8F0]/60 lg:pr-8">
              <div className="space-y-4">
                <span className="text-[9px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-3 py-1 rounded-full inline-block">
                  THE PGT JOURNAL
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B3D] leading-tight uppercase">
                  Ideas That Inspire Better Decisions
                </h1>
              </div>

              {/* Elegant, clean stack of button actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-2">
                <button
                  onClick={() => handleScrollToSection('topics')}
                  className="group inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#0B1B3D] text-white font-bold tracking-wider rounded-lg uppercase text-[10px] shadow-sm hover:bg-[#0B1B3D]/95 transition-colors"
                >
                  <span>Explore the Latest Articles</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B89047] group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => handleScrollToSection('subscribe')}
                  className="inline-flex items-center justify-center px-5 py-3 bg-white border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-bold tracking-wider rounded-lg uppercase text-[10px] shadow-sm hover:bg-[#FAF9F6] transition-colors"
                >
                  Subscribe to the Journal
                </button>
              </div>
            </div>

            {/* Right Column (8 cols): Manifesto List & Summary Paragraph */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6 lg:pl-4">
              {/* Manifesto Bullet Stack */}
              <div className="border-l-2 border-[#B89047] pl-6 space-y-3 py-0.5">
                {[
                  'The world of work is evolving.',
                  'Leadership is changing.',
                  'Artificial Intelligence is transforming industries.',
                  'Education is being reimagined.',
                  'The organisations that succeed tomorrow are those that continue learning today.'
                ].map((sentence, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-[#0B1B3D] font-bold tracking-wide leading-relaxed uppercase">
                    {sentence}
                  </p>
                ))}
              </div>

              {/* Curated Summary Paragraph */}
              <div className="pt-4 border-t border-[#E2E8F0]/60">
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-light">
                  The PGT Journal brings together expert perspectives, practical guidance and emerging trends to help leaders, educators and organisations navigate change with confidence.
                </p>
              </div>
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
            <div className="text-slate-300 text-xs sm:text-sm space-y-4 leading-relaxed mb-8 font-light">
              <p className="font-bold text-white text-base">
                Every generation of leaders faces change.
              </p>
              <p>
                Today's leaders face transformation at unprecedented speed.
              </p>
              <p>
                Artificial Intelligence, shifting workforce expectations, international collaboration and rapid technological innovation are reshaping how organisations operate.
              </p>
              <p>
                The question is no longer whether change will happen.
              </p>
              <p className="font-semibold text-white">
                The question is whether your organisation is prepared for it.
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
                  <p className="text-xs text-[#64748B] leading-relaxed mt-2 mb-6 font-light">{topic.desc}</p>
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

      {/* TRENDING ARTICLES */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-0.5">POPULAR READS</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">TRENDING ARTICLES</h2>
            <p className="text-xs text-[#64748B] font-light mt-1">Display these as visual article cards.</p>
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

      {/* FEATURED SERIES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-4 mb-16">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-6 sm:p-10 border border-slate-900 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase bg-[#B89047]/15 px-3 py-1 rounded-full border border-[#B89047]/25 inline-block">
                IN-DEPTH FOCUS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                The Future of Learning Series
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                A collection of in-depth articles exploring how organisations can prepare people for an increasingly digital, international and AI-enabled future.
              </p>
              <button 
                onClick={() => alert('Loading the Future of Learning Series collection...')}
                className="px-5 py-3 bg-[#B89047] hover:bg-[#B89047]/95 text-white font-bold uppercase tracking-wider text-[10px] rounded-lg transition-all shadow-sm"
              >
                Explore the Series
              </button>
            </div>

            <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
              <h3 className="font-bold text-white text-xs tracking-wider uppercase mb-3">Topics include:</h3>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 font-light uppercase tracking-wider">
                {['Future Skills', 'AI', 'Leadership', 'Organisational Development', 'Internationalisation', 'Innovation'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
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

      {/* FROM PGT TEAM */}
      <section className="bg-white py-12 mb-16 text-center border-y border-[#E2E8F0]/60">
        <div className="max-w-2xl mx-auto px-6 space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">FROM THE PGT TEAM</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0B1B3D] uppercase tracking-wide">Experience Meets Practical Insight</h2>
          <p className="text-xs text-[#64748B] leading-relaxed font-light">
            Every article published by PGT is grounded in real-world experience. Our contributors work closely with executives, educational institutions, employers and public organisations across Europe, ensuring that every insight is practical, relevant and focused on measurable outcomes. Rather than commenting on trends, we help organisations understand how to respond to them.
          </p>
        </div>
      </section>

      {/* JOIN OUR COMMUNITY */}
      <section id="subscribe" className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B89047] uppercase block mb-2">JOIN OUR COMMUNITY</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 uppercase tracking-tight">Stay Ahead of What's Next</h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-6 font-light">
            Receive the latest articles, research, practical guides and invitations to exclusive webinars directly in your inbox. Subscribers receive:
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left max-w-md mx-auto mb-6 text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
            {[
              'New Journal Articles',
              'Research Reports',
              'Practical Resources',
              'AI Updates',
              'Erasmus+ News',
              'Invitations to Executive Briefings'
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#B89047]" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/60 border border-slate-800 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-[#B89047]"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold uppercase tracking-wider text-[10px] rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-[#B89047]/10 border border-[#B89047]/20 rounded-xl p-3 max-w-sm mx-auto text-[#B89047] text-xs font-bold">
              ✓ Welcome. You are subscribed!
            </div>
          )}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-6 text-center font-sans">
        <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">THE PGT JOURNAL</span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] mb-3 uppercase tracking-tight">Knowledge Shapes Better Decisions</h2>
        <p className="text-[#64748B] max-w-md mx-auto leading-relaxed mb-6 text-xs font-light">
          Whether you're leading an organisation, designing learning experiences or preparing your workforce for the future, the right ideas can create lasting impact. Explore the PGT Journal and discover practical perspectives that help you lead with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 bg-[#0B1B3D] text-white font-bold text-[10px] uppercase tracking-widest hover:bg-[#0B1B3D]/95 transition-all rounded-lg shadow-sm"
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
      </section>

    </main>
  )
}
