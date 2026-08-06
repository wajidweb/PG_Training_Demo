'use client'

import { useState } from 'react'
import Link from 'next/link'
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
    <main className="pt-28 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Editorial MIT Sloan/HBR Style Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-12">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block mb-3">
          THE KNOWLEDGE HUBS
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1B3D] leading-tight mb-4">
          Practical Knowledge. Real-World Insights. Measurable Impact.
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-2xl mx-auto font-light">
          Learning doesn't end when a programme finishes. The organisations that continue to grow are those that continue to learn. Our Knowledge Hub brings together practical resources, expert insights and proven frameworks to help leaders, educators and organisations stay ahead.
        </p>
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

      {/* Tools & Templates */}
      <section className="bg-[#FAF9F6] border-y border-[#E2E8F0] py-16 mb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-1 block">PRACTICAL RESOURCES</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">Tools & Templates Download Centre</h2>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-light">
                Save hours of institutional design and administrative work with our specialized toolkits and checklists created directly by Paragon Global Training specialists.
              </p>
            </div>

            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0]/80 shadow-sm">
              <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide border-b border-[#E2E8F0]/50 pb-2 mb-4">Available Toolkit Checklists</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  'CEO Self-Assessment Scorecard',
                  'Erasmus+ Quality Assurance Plan',
                  'AI Classroom Integration Policy',
                  'Strategic Planning Toolkit',
                  'Workforce Capability Matrix',
                  'Learning Outcomes Blueprint',
                  'Credit Mobility Templates',
                  'AI Prompts Library Checklist'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px] text-[#64748B] font-semibold">
                    <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact?reason=templates"
                className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold tracking-wider rounded-lg uppercase text-[10px]"
              >
                Access Complete Download Centre
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Learning */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10 mb-16 border-b border-[#E2E8F0]/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-1 block">MICRO LEARNING</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">Video Learning Library</h2>
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-light">
              Watch compact, practical, five-to-ten-minute briefings from our Managing Partners and field specialists covering executive strategy, artificial intelligence policies, and Erasmus+ compliance standards.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { title: 'Executive Success', duration: '8 mins' },
              { title: 'Artificial Intelligence', duration: '12 mins' },
              { title: 'Erasmus+ Mobility', duration: '9 mins' },
              { title: 'Workforce Development', duration: '11 mins' },
              { title: 'Future Skills', duration: '6 mins' },
              { title: 'Organisational Capability', duration: '10 mins' }
            ].map((video, idx) => (
              <div key={idx} className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm flex flex-col justify-between h-28">
                <PlayCircle className="w-5 h-5 text-[#B89047]/80 hover:text-[#B89047] transition-colors cursor-pointer" />
                <div>
                  <h4 className="font-bold text-[#0B1B3D] text-[10px] uppercase tracking-wide leading-tight">{video.title}</h4>
                  <span className="text-[9px] text-[#64748B] block mt-1 font-mono">{video.duration} watch</span>
                </div>
              </div>
            ))}
          </div>
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

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] mb-3 uppercase tracking-tight">Knowledge Creates Opportunity</h2>
        <p className="text-[#64748B] max-w-md mx-auto leading-relaxed mb-6 text-xs font-light">
          Whether you are leading an enterprise, instructing learners, or planning an upcoming mobility, the right insights help you deliver measurable, structural results.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#0B1B3D] text-white font-bold text-[10px] uppercase tracking-widest hover:bg-[#0B1B3D]/95 transition-all rounded-lg shadow-sm animate-pulse-once"
          >
            Book a Consultation
          </Link>
          <Link
            href="/journal"
            className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#0B1B3D] font-bold text-[10px] uppercase tracking-widest hover:bg-[#FAF9F6] transition-all rounded-lg shadow-sm"
          >
            Read Our Journal
          </Link>
        </div>
      </section>
    </main>
  )
}
