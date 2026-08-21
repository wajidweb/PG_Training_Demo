'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  BookOpen, 
  Download, 
  Check, 
  PlayCircle, 
  ArrowRight, 
  Cpu,
  Compass,
  Users,
  Award,
  FileText
} from 'lucide-react'

const RESOURCES = [
  {
    id: 1,
    title: 'The Successful CEO Guide',
    desc: 'Practical strategies for building resilient organisations and high-performing executive teams in volatile markets.',
    category: 'executive',
    type: 'guide',
    link: '/ebook-placeholder.pdf'
  },
  {
    id: 2,
    title: 'The Erasmus+ Planning Guide',
    desc: 'A practical handbook for planning impactful mobilities, learning agreements, and professional development programs.',
    category: 'erasmus',
    type: 'guide',
    link: '/ebook-placeholder.pdf'
  },
  {
    id: 3,
    title: 'Artificial Intelligence for Organisations',
    desc: 'A practical introduction to AI implementation, prompt engineering, and policy formulation for leaders and corporate teams.',
    category: 'ai',
    type: 'guide',
    link: '/ebook-placeholder.pdf'
  },
  {
    id: 4,
    title: 'Building Future-Ready Workforces',
    desc: 'A comprehensive capability framework helping HR leaders and executives prepare people for rapidly changing workplaces.',
    category: 'workforce',
    type: 'guide',
    link: '/ebook-placeholder.pdf'
  },
  {
    id: 5,
    title: 'The Future of Learning',
    desc: 'An in-depth study of how artificial intelligence, international collaboration, and global trends are transforming professional education.',
    category: 'academic',
    type: 'guide',
    link: '/ebook-placeholder.pdf'
  }
]

export default function KnowledgeHubPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const handleDownload = (id: number) => {
    setDownloadingId(id)
    setTimeout(() => {
      setDownloadingId(null)
      alert('Your download has started. (Using placeholder guide)')
    }, 1200)
  }

  const filteredResources = activeCategory === 'all' 
    ? RESOURCES 
    : RESOURCES.filter(r => r.category === activeCategory)

  return (
    <main className="pt-20 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Intro/Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 sm:pt-6 pb-16 sm:pb-20 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block">
            THE KNOWLEDGE HUB
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] leading-tight max-w-5xl mx-auto">
            Practical Knowledge. Real World Insights. Measurable Impact.
          </h1>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
        </div>

        {/* Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (7 Cols): Editorial Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
              <p>
                Learning does not end when a training programme finishes. In an era of rapid technological change and industrial disruption, the organisations that continue to grow are those that continue to learn. Human capital development remains the single most reliable driver of long term success.
              </p>
              <p>
                Our Knowledge Hub brings together practical resources, expert insights, and proven academic frameworks to help leaders, educators, and organisations stay ahead. Explore our publications to equip your teams with actionable capability.
              </p>
              <p>
                By compiling elite case studies, operational checklists, and comprehensive reports, PGT empowers executives and team leaders to make better decisions with confidence. Our publications bridge the gap between theoretical frameworks and daily business execution, ensuring your organisation remains prepared for future market shifts.
              </p>
            </div>
          </div>

          {/* Right Column (5 Cols): Class Environment Visual Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/research.jpg"
              alt="Strategic planning research session"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
          </div>

        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">CURATED COLLECTIONS</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">Explore Knowledge by Topic</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Executive Success */}
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center mb-4">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">EXECUTIVE SUCCESS</h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">For CEOs and Executive Teams looking to strengthen strategic thinking, decision-making and governance.</p>
              <ul className="space-y-1 text-[10px] text-[#64748B] border-t border-[#E2E8F0]/50 pt-2.5 font-semibold">
                {['CEO Guides', 'Executive Scorecards', 'Planning Templates', 'Decision Frameworks', 'Executive Checklists'].map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="w-3 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveCategory('executive')} className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest text-left mt-5 hover:text-[#0B1B3D] transition-colors flex items-center gap-1">
              <span>View Collection</span>
              <ArrowRight className="w-3" />
            </button>
          </div>

          {/* Erasmus+ Resource Centre */}
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center mb-4">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">ERASMUS+ CENTRE</h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">Everything institutions need to plan, design, and execute high-impact European funded mobilities.</p>
              <ul className="space-y-1 text-[10px] text-[#64748B] border-t border-[#E2E8F0]/50 pt-2.5 font-semibold">
                {['Planning Guides', 'Learning Outcome Templates', 'Mobility Checklists', 'Proposal Resources', 'Best Practice Guides'].map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="w-3 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveCategory('erasmus')} className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest text-left mt-5 hover:text-[#0B1B3D] transition-colors flex items-center gap-1">
              <span>View Collection</span>
              <ArrowRight className="w-3" />
            </button>
          </div>

          {/* AI Knowledge Centre */}
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center mb-4">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">AI KNOWLEDGE</h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">Discover practical ways to integrate Artificial Intelligence into classrooms, business workflows, and operations.</p>
              <ul className="space-y-1 text-[10px] text-[#64748B] border-t border-[#E2E8F0]/50 pt-2.5 font-semibold">
                {['AI Implementation Guides', 'Productivity Frameworks', 'Prompt Libraries', 'AI Policies', 'Practical Tutorials'].map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="w-3 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveCategory('ai')} className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest text-left mt-5 hover:text-[#0B1B3D] transition-colors flex items-center gap-1">
              <span>View Collection</span>
              <ArrowRight className="w-3" />
            </button>
          </div>

          {/* Workforce Development */}
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center mb-4">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">WORKFORCE DEV</h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">Build highly collaborative, adaptable, and future-focused professional staff and teams.</p>
              <ul className="space-y-1 text-[10px] text-[#64748B] border-t border-[#E2E8F0]/50 pt-2.5 font-semibold">
                {['Workforce Planning Guides', 'Future Skills Frameworks', 'Employability Toolkits', 'PD Resources', 'Capability Indicators'].map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="w-3 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveCategory('workforce')} className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest text-left mt-5 hover:text-[#0B1B3D] transition-colors flex items-center gap-1">
              <span>View Collection</span>
              <ArrowRight className="w-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-[#E2E8F0]/40 mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-0.5">FEATURED PUBLICATIONS</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">Our Most Popular Guides</h2>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'executive', label: 'Executive' },
              { id: 'erasmus', label: 'Erasmus+' },
              { id: 'ai', label: 'AI Programs' },
              { id: 'workforce', label: 'Workforce' }
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setActiveCategory(pill.id)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors border ${
                  activeCategory === pill.id 
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]' 
                    : 'bg-white hover:bg-[#FAF9F6] text-[#64748B] border-[#E2E8F0]'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div key={res.id} className="bg-white border border-[#E2E8F0]/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#B89047]/15 transition-all">
              <div>
                <div className="text-2xl text-[#B89047] mb-4 font-bold">📘</div>
                <h3 className="text-sm font-bold text-[#0B1B3D] mb-2 uppercase tracking-wide leading-tight">{res.title}</h3>
                <p className="text-[11px] text-[#64748B] leading-relaxed mb-5 font-light">{res.desc}</p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]/40 flex items-center justify-between">
                <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest">{res.category} Collection</span>
                <button
                  onClick={() => handleDownload(res.id)}
                  disabled={downloadingId !== null}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  <span>{downloadingId === res.id ? 'Starting...' : 'Download'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Templates (Centered Header & Symmetrical Grid with Image) */}
      <section className="bg-[#FAF9F6] border-y border-[#E2E8F0] py-16 mb-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PRACTICAL RESOURCES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Tools and Templates Download Centre
            </h2>
            <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
            <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
              Save hours of institutional design and administrative work with our specialized toolkits and checklists created directly by Paragon Global Training specialists.
            </p>
          </div>

          {/* Symmetric Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
            
            {/* Left Column (7 Cols): Symmetrical Checklists Card */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between text-left">
              <div>
                <h3 className="font-bold text-[#0B1B3D] text-xs sm:text-sm uppercase tracking-wide border-b border-[#E2E8F0]/50 pb-2 mb-4">
                  Available Toolkit Checklists
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 font-sans">
                  {[
                    'CEO Assessment Scorecard',
                    'Erasmus Quality Assurance',
                    'AI Classroom Integration',
                    'Strategic Planning Tools',
                    'Workforce Capability Map',
                    'Learning Outcome Blueprints',
                    'Credit Mobility Templates',
                    'AI Prompt Library Lists'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0B1B3D] font-normal">
                      <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/contact?reason=templates"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all text-center"
              >
                Access Complete Download Centre
              </Link>
            </div>

            {/* Right Column (5 Cols): Class Environment Visual Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto border border-[#E2E8F0]/80 shadow-md">
              <Image
                src="/development.png"
                alt="Practical toolkits and checklist scoping workshops"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Video Learning (Centered Header & Symmetrical Grid - No Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10 mb-16 border-b border-[#E2E8F0]/40 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">MICRO LEARNING</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Video Learning Library
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
            Watch compact, practical, five to ten minute briefings from our Managing Partners and field specialists covering executive strategy, artificial intelligence policies, and Erasmus Plus compliance standards.
          </p>
        </div>

        {/* Full Content Grid (3 Columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {[
            { title: 'Executive Success', duration: '8 mins' },
            { title: 'Artificial Intelligence', duration: '12 mins' },
            { title: 'Erasmus Plus Mobility', duration: '9 mins' },
            { title: 'Workforce Development', duration: '11 mins' },
            { title: 'Future Ready Skills', duration: '6 mins' },
            { title: 'Organisational Change', duration: '10 mins' }
          ].map((video, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-[#E2E8F0] p-6 rounded-xl shadow-sm flex flex-col justify-between h-36 hover:shadow-md hover:border-[#B89047]/20 transition-all duration-300 text-left"
            >
              <PlayCircle className="w-8 h-8 text-[#B89047]/80 hover:text-[#B89047] transition-all cursor-pointer hover:scale-105" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide leading-tight">
                  {video.title}
                </h4>
                <span className="text-[10px] text-[#64748B] block font-mono">
                  {video.duration} watch duration
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leads capture */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B89047] uppercase block mb-2">THE PGT LEARNING COMMUNITY</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 uppercase tracking-tight">Keep Learning Beyond the Classroom</h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-6 font-light">
            Join thousands of professionals across Europe who receive our practical guides, research briefings, prompt checklists, and exclusive masterclass webinar invites.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
              <input
                type="email"
                required
                placeholder="Professional email address"
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
              ✓ Welcome to the community. You are subscribed!
            </div>
          )}
        </div>
      </section>

      {/* Final CTA (Premium Soft-Beige Card - Widened with Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative z-10 font-sans">
        <div className="bg-[#FAF9F6] border border-[#E2E8F0]/80 rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden group">
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/10 rounded-xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
            
            {/* Left Column (7 Cols): Editorial Text Content & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">
                  THE KNOWLEDGE HUB
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none">
                  Knowledge Creates Opportunity
                </h2>
                <div className="h-0.5 w-12 bg-[#B89047] rounded mt-4" />
              </div>

              {/* Narrative text in black */}
              <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed font-normal">
                <p>
                  Whether you are leading an enterprise, instructing learners, or planning an upcoming mobility, the right insights help you deliver measurable, structural results. Explore our curated publications to equip your teams with actionable capability.
                </p>
              </div>
              
              {/* Widened Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/contact"
                  className="px-12 sm:px-16 py-3.5 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all text-center"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/journal"
                  className="px-12 sm:px-16 py-3.5 bg-white border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:bg-[#FAF9F6] transition-all text-center"
                >
                  Read Our Journal
                </Link>
              </div>
            </div>

            {/* Right Column (5 Cols): Classroom Environment Visual Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
              <Image
                src="/paragonimage2.png"
                alt="PGT modern university VET classroom environment"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
