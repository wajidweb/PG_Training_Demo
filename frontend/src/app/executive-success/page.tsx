'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, 
  Check, 
  Sparkles, 
  Compass, 
  Target, 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  Activity, 
  HeartHandshake,
  BookOpen,
  ArrowRight,
  UserCheck
} from 'lucide-react'

// Pillars data for the interactive 9-pillar wheel/grid
const PILLARS = [
  {
    id: 'vision',
    title: 'Vision & Strategic Direction',
    icon: Compass,
    desc: 'Create absolute clarity, align enterprise-wide priorities and shape long-term sustainable growth.'
  },
  {
    id: 'decision-making',
    title: 'Executive Decision-Making',
    icon: Target,
    desc: 'Make rapid, confident, high-stakes decisions in complex, volatile and fast-changing environments.'
  },
  {
    id: 'influence',
    title: 'Leadership & Influence',
    icon: Sparkles,
    desc: 'Build deep organizational trust, inspire high performance and strengthen executive culture.'
  },
  {
    id: 'talent',
    title: 'People & Talent',
    icon: Users,
    desc: 'Develop exceptional executive teams, align human capital and prepare future ready leaders.'
  },
  {
    id: 'innovation',
    title: 'Innovation & Digital Transformation',
    icon: Activity,
    desc: 'Leverage Artificial Intelligence, digital assets and emerging technologies to maintain market leadership.'
  },
  {
    id: 'performance',
    title: 'Business Growth & Performance',
    icon: TrendingUp,
    desc: 'Systematically improve enterprise productivity, optimize profitability and scale overall capability.'
  },
  {
    id: 'governance',
    title: 'Governance & Risk',
    icon: ShieldAlert,
    desc: 'Lead responsibly with sound governance, manage enterprise risk and protect long-term brand equity.'
  },
  {
    id: 'resilience',
    title: 'Executive Resilience',
    icon: HeartHandshake,
    desc: 'Maintain extreme clarity, mental agility and leadership confidence under intensive pressure.'
  },
  {
    id: 'legacy',
    title: 'Legacy',
    icon: BookOpen,
    desc: 'Build an enduring, high-performing organisation that continues to thrive beyond today’s leadership.'
  }
]

// Ecosystem stages
const ECOSYSTEM_STAGES = [
  { step: '01', title: 'CEO Success Assessment™', desc: 'Identify core executive strengths and target development priorities.' },
  { step: '02', title: 'Executive Coaching & Mentoring', desc: 'Personalised, high-impact strategic guidance.' },
  { step: '03', title: 'CEO Masterclasses', desc: 'Rigorous and continuous executive learning.' },
  { step: '04', title: 'The Successful CEO Podcast', desc: 'Cutting-edge ideas from world leading executives and experts.' },
  { step: '05', title: 'The Successful CEO Book Series', desc: 'Practical frameworks designed specifically for modern CEOs.' },
  { step: '06', title: 'CEO Community', desc: 'A vetted network of ambitious executives committed to mutual growth.' }
]

export default function ExecutiveSuccessPage() {
  const [activePillar, setActivePillar] = useState(PILLARS[0].id)

  return (
    <main className="bg-[#0A1120] text-slate-100 pt-20 pb-20 min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-white">
      
      {/* Premium Dark Theme Hero */}
      <section className="relative overflow-hidden border-b border-slate-900 py-16 sm:py-20 lg:py-24">
        {/* Abstract luxury background lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[250px] h-[300px] bg-blue-950/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/5 border border-[#B89047]/25 px-4 py-1 rounded-full inline-block mb-4">
            THE SCHOOL OF EXECUTIVE SUCCESS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto mb-6">
            Helping CEOs Build Organisations That Outperform Today and Endure Tomorrow
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            The quality of an organisation rarely exceeds the quality of its executive decisions. 
            When CEOs think strategically... Businesses grow. People perform. Innovation accelerates. Culture strengthens. Results improve. 
            At The School of Executive Success, we help CEOs and executive teams develop the mindset, capability and strategic discipline required to build organisations that create lasting value.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/contact?reason=executive"
              className="w-full sm:w-auto px-6 py-3 bg-[#B89047] text-white font-bold tracking-wider hover:bg-[#B89047]/90 transition-all rounded-lg text-center uppercase text-[10px]"
            >
              Book Your Strategic Consultation
            </Link>
            <Link
              href="/learning-pathways?pathway=executive"
              className="w-full sm:w-auto px-6 py-3 border border-slate-700 hover:border-[#B89047]/40 text-slate-200 hover:text-white font-bold tracking-wider hover:bg-slate-900/40 transition-all rounded-lg text-center uppercase text-[10px]"
            >
              Explore CEO Programmes
            </Link>
          </div>
        </div>
      </section>

      {/* The PGT Difference Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-b border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">THE PGT DIFFERENCE</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              We Don't Develop Better Leaders. We Develop More Successful CEOs.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Leadership matters. But executive success demands much more. Today's CEOs must navigate uncertainty, drive innovation, build high-performing teams, embrace Artificial Intelligence, strengthen governance and create sustainable growth—all while making decisions that shape the future of their organisations.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed font-semibold">
              That is why our programmes go beyond traditional leadership development. We focus on the complete executive journey.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Extreme Uncertainty', desc: 'Lead with absolute confidence through structural shifts and macroeconomic volatility.' },
              { title: 'Artificial Intelligence', desc: 'Embed AI and future tech into core operations responsibly and productively.' },
              { title: 'Sustainable Growth', desc: 'Optimize profitability and build scalable frameworks for ongoing business health.' },
              { title: 'Governance & Trust', desc: 'Strengthen regulatory governance, board relationship dynamics, and risk control.' }
            ].map((diff, idx) => (
              <div key={idx} className="bg-slate-900/40 p-5 rounded-xl border border-slate-800/80 shadow-md hover:border-[#B89047]/20 transition-all">
                <span className="text-[#B89047] text-xs font-bold block mb-1">// 0{idx+1}</span>
                <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wide">{diff.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1 font-light">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive 9-Pillar Wheel Success Model Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-slate-900 relative">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-2">PROPRIETARY METHODOLOGY</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">The Executive Success Model™</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto mt-2 font-light">
            Nine Pillars. One High-Performing Organisation. Click on any pillar to explore how it equips CEOs with the practical disciplines needed to lead with confidence.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Circular Wheel Grid */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-[450px]">
              {PILLARS.map((p) => {
                const Icon = p.icon
                const isActive = activePillar === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePillar(p.id)}
                    className={`aspect-square rounded-lg p-3 flex flex-col items-center justify-center text-center transition-all border ${
                      isActive 
                        ? 'bg-[#B89047]/10 border-[#B89047] text-white shadow-[0_0_15px_rgba(184,144,71,0.1)]' 
                        : 'bg-slate-900/35 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 transition-colors ${isActive ? 'text-[#B89047]' : 'text-slate-400'}`} />
                    <span className="text-[9px] font-bold uppercase tracking-wider block leading-tight">{p.title.split(' & ')[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detailed Content Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/60 p-6 sm:p-8 rounded-xl border border-slate-800 shadow-lg min-h-[260px] flex flex-col justify-between">
              {(() => {
                const current = PILLARS.find(p => p.id === activePillar) || PILLARS[0]
                const Icon = current.icon
                return (
                  <>
                    <div>
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 flex items-center justify-center text-[#B89047]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-[#B89047]">PILLAR FOCUS</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{current.title}</h3>
                      <p className="text-slate-300 leading-relaxed text-xs sm:text-sm font-light">{current.desc}</p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Interactive Success Model™</span>
                      <span className="text-[#B89047] font-bold uppercase">PGT Methodology</span>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      </section>

     

      {/* Who We Work With */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 border-b border-slate-900 text-center">
        <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-2 block">DESIGNED FOR DECISION MAKERS</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">Who We Work With</h2>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed mb-8 text-xs font-light">
          Our specialized executive development programmes are tailored explicitly for leaders operating at the absolute pinnacle of their organizations.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['CEOs', 'Managing Directors', 'Business Owners', 'Executive Teams', 'Boards of Directors', 'Senior Executives'].map((audience) => (
            <div key={audience} className="bg-slate-900/35 border border-slate-800/80 rounded-lg py-3.5 text-center text-slate-200 font-bold uppercase tracking-wider text-[10px]">
              {audience}
            </div>
          ))}
        </div>
      </section>

      {/* Our Executive Solutions */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-slate-900">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-2 block">OUR RANGE OF SERVICES</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">Choose the Right Development Pathway</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs font-light">
            Each option is built on high-level empirical frameworks and designed to deliver absolute clarity, strategic alignment, and operational excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'CEO Success Accelerator™', desc: 'Accelerate complete executive capability through a structured, rigorous development journey designed for modern corporate CEOs.' },
            { title: 'Executive Coaching', desc: 'Customized, confidential, one-to-one strategic coaching focused entirely on leadership clarity, decision confidence, and business outcomes.' },
            { title: 'Executive Mentoring', desc: 'Receive practical, real-world advisory and guidance from proven executive mentors to help navigate highly complex operational decisions.' },
            { title: 'CEO Masterclasses', desc: 'High-impact, intensive executive learning sessions focused strictly on macro strategy, technology/AI innovation, and governance.' },
            { title: 'Executive Team Development', desc: 'Strengthen core communication, strategic alignment, collaboration, and collective decision-making efficiency across your entire leadership team.' },
            { title: 'Organisational Transformation', desc: 'Support major systemic organizational restructure through direct executive training, strategic messaging, and structured implementation.' }
          ].map((sol, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800 hover:border-[#B89047]/20 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <span className="text-[#B89047] text-xs font-mono block mb-2">// 0{idx+1}</span>
                <h3 className="font-bold text-white text-base mb-2 uppercase tracking-wide">{sol.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-light">{sol.desc}</p>
              </div>
              <Link href="/contact?reason=executive" className="inline-flex items-center gap-1.5 text-[#B89047] font-bold hover:text-white text-[10px] uppercase tracking-wider transition-colors">
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* The CEO Ecosystem™ Timeline Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-slate-900">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-2 block">CONTINUOUS DEVELOPMENT</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">The CEO Ecosystem™</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs font-light">
            Executive development does not end with a single masterclass. Our comprehensive ecosystem provides continuous support, high-level learning, and peer connectivity.
          </p>
        </div>

        {/* Timeline blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 relative">
          {ECOSYSTEM_STAGES.map((stage, idx) => (
            <div key={idx} className="bg-slate-900/20 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between relative shadow-sm h-36">
              <div className="absolute top-2.5 right-3 text-slate-800 font-bold text-lg font-mono">{stage.step}</div>
              <div>
                <h3 className="font-bold text-white text-xs mb-1.5 uppercase tracking-wide pr-4">{stage.title}</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-light">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why CEOs Choose PGT */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 border-b border-slate-900 text-center">
        <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-2 block">WHY TRUST US</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">Because Better Decisions Create Better Organisations</h2>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 text-xs font-light">
          Our clients choose us because they demand immediate, practical outcomes—not theoretical lectures. With PGT, you gain a trusted executive partner committed to your long-term organizational health, strategic clarity, and enterprise transformation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            'Strategic thinking that strengthens executive decision-making.',
            'Practical frameworks that can be implemented immediately.',
            'Bespoke coaching aligned with your business priorities.'
          ].map((point, idx) => (
            <div key={idx} className="bg-slate-900/40 p-4 sm:p-5 rounded-xl border border-slate-800 text-left flex gap-3">
              <div className="w-4.5 h-4.5 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pt-16">
        <div className="bg-slate-950/40 rounded-2xl p-8 sm:p-12 border border-slate-800/80 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 uppercase tracking-tight">Ready to Build Your Next Chapter?</h2>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 text-xs font-light">
            Every organisation is different. Every CEO faces unique, high-stakes challenges. Let's explore yours. Together, we'll design a development journey that strengthens executive capability, improves performance and creates lasting value.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/contact?reason=executive"
              className="w-full sm:w-auto px-6 py-3 bg-[#B89047] text-white font-bold tracking-wider hover:bg-[#B89047]/90 transition-all rounded-lg text-center uppercase text-[10px]"
            >
              Book Your Executive Strategy Consultation
            </Link>
            <a
              href="/ebook-placeholder.pdf"
              download
              className="w-full sm:w-auto px-6 py-3 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold tracking-wider hover:bg-slate-900/40 transition-all rounded-lg text-center uppercase text-[10px]"
            >
              Download the CEO Success Guide
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
