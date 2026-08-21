'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
    desc: 'Create absolute clarity, align core corporate priorities, and shape long term growth.'
  },
  {
    id: 'decision-making',
    title: 'Executive Decision Making',
    icon: Target,
    desc: 'Make rapid, confident, and high stakes decisions in complex and volatile environments.'
  },
  {
    id: 'influence',
    title: 'Leadership & Influence',
    icon: Sparkles,
    desc: 'Build deep organisational trust, inspire high performance, and strengthen team culture.'
  },
  {
    id: 'talent',
    title: 'People & Talent',
    icon: Users,
    desc: 'Develop exceptional executive teams, align human capital, and prepare future leaders.'
  },
  {
    id: 'innovation',
    title: 'Digital Transformation',
    icon: Activity,
    desc: 'Leverage advanced Artificial Intelligence and emerging technologies to stay competitive.'
  },
  {
    id: 'performance',
    title: 'Business Growth & Performance',
    icon: TrendingUp,
    desc: 'Systematically improve productivity, optimize profitability, and scale group capability.'
  },
  {
    id: 'governance',
    title: 'Governance & Risk',
    icon: ShieldAlert,
    desc: 'Lead responsibly with sound corporate governance, protect brand equity, and manage risk.'
  },
  {
    id: 'resilience',
    title: 'Executive Resilience',
    icon: HeartHandshake,
    desc: 'Maintain absolute clarity, mental agility, and leadership confidence under pressure.'
  },
  {
    id: 'legacy',
    title: 'Enduring Legacy',
    icon: BookOpen,
    desc: 'Build an enduring organisation that continues to thrive beyond today’s leadership.'
  }
]

// Ecosystem stages
const ECOSYSTEM_STAGES = [
  { step: '01', title: 'CEO Success Assessment™', desc: 'Identify core executive strengths and target high value development priorities.' },
  { step: '02', title: 'Executive Coaching & Mentoring', desc: 'Receive personalized, high impact strategic guidance from our master coaches.' },
  { step: '03', title: 'CEO Masterclasses', desc: 'Access continuous, rigorous executive learning programs structured for outcomes.' },
  { step: '04', title: 'The Successful CEO Podcast', desc: 'Explore advanced insights from leading global executives and industry experts.' },
  { step: '05', title: 'The Successful CEO Book Series', desc: 'Access practical leadership frameworks designed specifically for modern corporate CEOs.' },
  { step: '06', title: 'CEO Community', desc: 'Join a highly selective network of ambitious executives committed to mutual growth.' }
]

export default function ExecutiveSuccessPage() {
  const [activePillar, setActivePillar] = useState(PILLARS[0].id)

  return (
    <main className="bg-[#0A1120] text-slate-100 pt-20 pb-20 min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-white">
      
      {/* Intro/Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-900 pt-4 sm:pt-6 pb-16 sm:pb-20 relative font-sans">
        {/* Abstract luxury background lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[250px] h-[300px] bg-blue-950/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block">
              THE SCHOOL OF EXECUTIVE SUCCESS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-5xl mx-auto">
              Helping CEOs Build Organisations That Outperform Today and Endure Tomorrow
            </h1>
            <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
          </div>

          {/* Symmetric Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
            
            {/* Left Column (7 Cols): Editorial Text Content & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4 font-normal">
                <p>
                  The quality of an organisation rarely exceeds the quality of its executive decisions. When chief executive officers think strategically, businesses grow, people perform, and innovation accelerates. Workplace culture strengthens, and overall results improve.
                </p>
                <p>
                  At The School of Executive Success, we help chief executive officers and executive teams develop the mindset, capability, and strategic discipline required to build organisations that create lasting value. Align your core board members to lead with absolute confidence.
                </p>
                <p>
                  By designing our frameworks specifically around empirical results, we help your board members translate abstract corporate values into daily, high performance habits. Our executive consultants work directly with your stakeholders to identify strategic gaps, elevate corporate governance standards, and ensure your enterprise is prepared to lead.
                </p>
              </div>
              
              {/* Clean layout of button actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800/80">
                <Link
                  href="/contact?reason=executive"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all w-full sm:w-auto text-center"
                >
                  Book Your Strategic Consultation
                </Link>
                <Link
                  href="/learning-pathways?pathway=executive"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-slate-900/40 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-[#0B1B3D] hover:bg-[#FAF9F6] font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all w-full sm:w-auto text-center"
                >
                  Explore CEO Programmes
                </Link>
              </div>
            </div>

            {/* Right Column (5 Cols): Boardroom Executive Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-slate-800 shadow-md">
              <Image
                src="/bgimage.png"
                alt="PGT Executive coaching and corporate boardroom session"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
                priority
              />
            </div>

          </div>
        </div>
      </section>

      {/* The PGT Difference Section (Centered & Symmetrical Grid) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-b border-slate-900 relative">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">THE PGT DIFFERENCE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white uppercase tracking-tight leading-tight max-w-4xl mx-auto">
            We Don't Develop Better Leaders. <br className="hidden sm:inline" /> We Develop More Successful CEOs.
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          <div className="text-xs sm:text-sm text-slate-100 max-w-3xl mx-auto leading-relaxed font-normal space-y-4 pt-2">
            <p>
              Leadership matters, but true executive success demands much more. Modern chief executive officers must navigate extreme uncertainty, drive innovation, build high performing teams, embrace Artificial Intelligence safely, strengthen board governance, and create sustainable growth, all while making complex, high stakes decisions that shape the absolute future of their organisations.
            </p>
            <p className="font-bold text-[#B89047] uppercase tracking-wide text-xs">
              That is why our programmes go far beyond traditional leadership development. We focus on the complete executive journey.
            </p>
          </div>
        </div>

        {/* Full Content Grid (4 Columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            {
              title: 'Strategic Adaptability',
              desc: 'Lead with absolute confidence through macroeconomic shifts and volatility.'
            },
            {
              title: 'Artificial Intelligence',
              desc: 'Embed advanced AI technologies into core executive workflows and operations.'
            },
            {
              title: 'Sustainable Growth',
              desc: 'Optimize structural profitability and build scalable models for your business.'
            },
            {
              title: 'Governance & Trust',
              desc: 'Strengthen regulatory governance, board alignment dynamics, and risk control.'
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-[#B89047]/20 transition-all duration-300 text-left"
            >
              <span className="text-[#B89047] text-xs font-mono font-bold block mb-3">// 0{idx+1}</span>
              <h4 className="font-extrabold text-white text-xs sm:text-sm uppercase tracking-wide mb-2">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 9-Pillar Wheel Success Model Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-slate-900 relative">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-2">PROPRIETARY METHODOLOGY</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">The Executive Success Model™</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto mt-2 font-light">
            Nine Pillars. One High Performing Organisation. Click on any pillar to explore how it equips CEOs with the practical disciplines needed to lead with confidence.
          </p>
        </div>

        {/* Desktop View: Interactive Circular Wheel Layout (Widescreen Only) */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-center">
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
                    className={`aspect-square rounded-lg p-3 flex flex-col items-center justify-center text-center transition-all border cursor-pointer ${
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

        {/* Mobile/Tablet View: Symmetrical Full-Width Cards Grid (Hidden on Desktop) */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div 
                key={p.id} 
                className="bg-slate-900/40 p-5 rounded-xl border border-slate-800/80 flex gap-4 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 flex items-center justify-center text-[#B89047] shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-white text-xs uppercase tracking-wide">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

     

      {/* Who We Work With (Centered & Symmetrical Grid with Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-b border-slate-900 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">DESIGNED FOR DECISION MAKERS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Who We Work With
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
        </div>

        {/* Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (7 Cols): Symmetrical Audience Grid */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4 font-normal">
              <p>
                Our specialized executive development programmes are tailored explicitly for leaders operating at the absolute pinnacle of their organisations. Whether you lead a growing company, a family business, a multinational organisation, or a public institution, every programme is designed around your specific strategic priorities.
              </p>
            </div>
            
            {/* Symmetrical Grid of 6 Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              {['CEOs', 'Managing Directors', 'Business Owners', 'Executive Teams', 'Boards of Directors', 'Senior Executives'].map((audience) => (
                <div 
                  key={audience} 
                  className="bg-slate-900/35 border border-slate-800 rounded-xl py-3 text-center text-slate-200 font-bold uppercase tracking-wider text-[10px] shadow-sm hover:border-[#B89047]/20 transition-all duration-300"
                >
                  {audience}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 Cols): Classroom Environment Visual Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto border border-slate-800 shadow-md">
            <Image
              src="/paragonimage2.png"
              alt="PGT elite executive education classroom workspace"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
          </div>

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
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">CONTINUOUS DEVELOPMENT</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            The CEO Ecosystem™
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-normal mt-2">
            Executive development does not end with a single masterclass. Our comprehensive ecosystem provides continuous support, high level learning, and peer connectivity.
          </p>
        </div>

        {/* Symmetrical Timeline blocks (6 Columns on Widescreen Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
          {ECOSYSTEM_STAGES.map((stage, idx) => (
            <div key={idx} className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 flex flex-col justify-between relative shadow-sm h-40 hover:border-[#B89047]/20 transition-colors">
              <div className="absolute top-2.5 right-3 text-slate-800 font-bold text-lg font-mono">{stage.step}</div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-white text-xs uppercase tracking-wide pr-4 leading-tight">{stage.title}</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-light">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why CEOs Choose PGT (Centered & Symmetrical Grid with Left Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-slate-900 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">WHY CEOs CHOOSE PGT</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Because Better Decisions Create Better Organisations
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
        </div>

        {/* Symmetric Columns Grid - Image on the Left, Text on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (5 Cols): Class Environment Visual Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto border border-slate-800 shadow-md">
            <Image
              src="/research.jpg"
              alt="PGT elite executive education classroom workspace"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
          </div>

          {/* Right Column (7 Cols): Symmetrical Audience Grid */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4 font-normal">
              <p>
                Our clients choose us because they want practical outcomes, not theory. With PGT, you gain a trusted executive partner committed to your long term growth, strategic clarity, and enterprise transformation.
              </p>
            </div>
            
            {/* Symmetrical Grid of 5 Cards */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              {[
                'Strategic thinking that strengthens executive decision making.',
                'Practical frameworks that can be implemented immediately.',
                'Bespoke coaching aligned with your business priorities.',
                'A trusted executive partner committed to long term growth.',
                'An integrated ecosystem supporting continuous development.'
              ].map((point, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex items-start gap-4 hover:border-[#B89047]/20 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

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
