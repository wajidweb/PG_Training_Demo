import Link from 'next/link'
import Image from 'next/image'
import { Check, Compass, Target, Award, Users, Globe } from 'lucide-react'

export const metadata = {
  title: 'About PGT — Paragon Global Training',
  description: 'Developing People. Strengthening Organisations. Creating Lasting Impact. Read about our 25-year history, philosophy, and two schools of thought.',
}

export default function AboutPage() {
  return (
    <main className="pt-28 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 sm:pt-6 pb-16 sm:pb-20 relative">
        {/* Row 1: Centered Majestic Heading Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-3.5 py-1 rounded-full inline-block">
            OUR PURPOSE & APPROACH
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B1B3D] leading-tight max-w-5xl mx-auto">
            Developing People. Strengthening Organisations. Creating Lasting Impact.
          </h1>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
        </div>

        {/* Row 2: Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column (7 Cols): Editorial Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
              <p>
                We believe every organisation can achieve more by investing in its people.
              </p>
              <p>
                As global technologies evolve, market parameters shift, and business models continually change, one core truth remains absolute and constant. Human capital remains the ultimate and greatest driver of long term organisational performance.
              </p>
              <p>
                That fundamental belief has guided Paragon Global Training for more than twenty five years. Today, we partner with chief executive officers, educational institutions, public organisations, and employers across Europe to develop the capability, confidence, and practical skills that create measurable results.
              </p>
            </div>
            <p className="font-extrabold text-sm sm:text-base text-[#0B1B3D] uppercase tracking-wide border-t border-[#E2E8F0]/80 pt-4">
              Because stronger people build stronger organisations.
            </p>
          </div>

          {/* Right Column (5 Cols): Class Environment Visual Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[240px] lg:h-auto border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/erasmus.png"
              alt="Paragon Global Training classroom environment"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
          </div>

        </div>
      </section>

      {/* Purpose & Approach */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Our Purpose */}
          <div className="bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#E2E8F0]/40 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047] mb-5">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest mb-1.5 font-sans">VISION SUMMARY</h2>
              <h3 className="text-lg font-bold text-[#0B1B3D] mb-3 uppercase tracking-wide">OUR PURPOSE: Helping People Perform at Their Best</h3>
              <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-3 font-normal">
                <p>
                  Learning should do more than transfer knowledge. It should improve decision making, strengthen capability, build confidence, and create opportunity. We ensure that our educational strategies deliver results that continue long after the programme has ended. Everything we design is built around one essential question: How will this improve the people and organisations we serve?
                </p>
              </div>
            </div>
            <p className="font-bold text-xs text-[#0B1B3D] mt-6 pt-3 border-t border-[#E2E8F0]/40 uppercase tracking-wide">
              How will this improve the people and organisations we serve?
            </p>
          </div>

          {/* Our Approach */}
          <div className="bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#E2E8F0]/40 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047] mb-5">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest mb-1.5 font-sans">METHODOLOGY</h2>
              <h3 className="text-lg font-bold text-[#0B1B3D] mb-3 uppercase tracking-wide">OUR APPROACH: Learning Designed Around Outcomes</h3>
              <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-3 font-normal">
                <p>
                  Every organisation is different and every challenge is unique. That is why we do not deliver standard programmes. We work with every client to understand their objectives before designing learning experiences that produce measurable impact. Our programmes combine international best practice with practical application, ensuring participants leave ready to implement what they have learned.
                </p>
              </div>
            </div>
            <p className="font-bold text-xs text-[#0B1B3D] mt-6 pt-3 border-t border-[#E2E8F0]/40 uppercase tracking-wide">
              Leave ready to implement what you have learned.
            </p>
          </div>
        </div>
      </section>

      {/* Two Schools of Thought */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-2">OUR FRAMEWORKS</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B3D] uppercase">
            OUR TWO SCHOOLS OF THOUGHT
          </h2>
          <p className="text-xs text-[#0B1B3D] max-w-2xl mx-auto mt-2 font-normal">
            Specialist Expertise. One Shared Philosophy. Every client has different priorities. That is why PGT brings together two specialist Schools of Thought, each focused on a distinct area of development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* School of Executive Success */}
          <div className="bg-white text-[#0B1B3D] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0]/80 shadow-md flex flex-col justify-between group text-left">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-bold tracking-widest text-[#B89047] uppercase bg-[#B89047]/10 px-2.5 py-1 rounded-full">
                  PREMIUM EXECUTIVE ACADEMY
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mt-2 mb-2 text-[#0B1B3D] uppercase tracking-wide">
                School of Executive Success
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed mb-6 font-light">
                Supporting chief executive officers and executive teams to strengthen strategic thinking, executive decision making, and organisational performance.
              </p>
              <h4 className="text-[9px] font-bold text-[#B89047] tracking-wider uppercase mb-3">Focus Areas:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6 font-sans">
                {[
                  { title: 'Executive Coaching', desc: 'Personal strategic guidance to accelerate leadership impact.' },
                  { title: 'Executive Mentoring', desc: 'Expert real-world insights to navigate complex decisions.' },
                  { title: 'CEO Masterclasses', desc: 'High-impact cohorts focused on corporate transformation.' },
                  { title: 'Strategic Growth', desc: 'Tactical planning and structures for sustainable growth.' },
                  { title: 'Organisational Change', desc: 'Support corporate adjustments through aligned team actions.' }
                ].map(item => (
                  <li key={item.title} className="flex items-start gap-2.5 text-xs text-[#64748B]">
                    <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0B1B3D] block">{item.title}</span>
                      <span className="font-light text-[11px] leading-tight block mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/executive-success"
              className="inline-flex items-center justify-center px-4 py-2.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold rounded-lg transition-colors text-center uppercase tracking-wider text-[10px]"
            >
              Explore Executive Success
            </Link>
          </div>

          {/* School of Academic & Workforce Excellence */}
          <div className="bg-white text-[#0B1B3D] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0]/80 shadow-md flex flex-col justify-between group text-left">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-bold tracking-widest text-[#0B1B3D] uppercase bg-[#0B1B3D]/5 px-2.5 py-1 rounded-full">
                  ACADEMIC EXCELLENCE TRACK
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mt-2 mb-2 text-[#0B1B3D] uppercase tracking-wide">
                School of Academic Excellence
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed mb-6 font-light">
                Partnering with universities, schools, and public employers to prepare future ready learners, strengthen workforce skills, and maximize educational impact.
              </p>
              <h4 className="text-[9px] font-bold text-[#B89047] tracking-wider uppercase mb-3">Focus Areas:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6 font-sans">
                {[
                  { title: 'Erasmus+ Training', desc: 'Certified professional courses for European educators.' },
                  { title: 'Artificial Intelligence', desc: 'Practical AI skills to automate and raise productivity.' },
                  { title: 'Workforce Capability', desc: 'Modern skill development built for industrial excellence.' },
                  { title: 'International Learning', desc: 'Enriching academic standards through global partnerships.' },
                  { title: 'Professional Growth', desc: 'Accredited training programs designed for actual impact.' }
                ].map(item => (
                  <li key={item.title} className="flex items-start gap-2.5 text-xs text-[#64748B]">
                    <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0B1B3D] block">{item.title}</span>
                      <span className="font-light text-[11px] leading-tight block mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/academic-excellence"
              className="inline-flex items-center justify-center px-4 py-2.5 bg-[#0B1B3D] text-white hover:bg-[#0B1B3D]/90 font-bold rounded-lg transition-colors text-center uppercase tracking-wider text-[10px]"
            >
              Explore Academic & Workforce Excellence
            </Link>
          </div>
        </div>
      </section>

      {/* Why Organisations Choose PGT (Centered & Full Content Grid) */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PARTNERSHIP QUALITY</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Why Organisations Choose PGT
            </h2>
            <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
              Clients work with us because they want more than a course. They want outcomes. Partner with PGT and benefit from:
            </p>
          </div>

          {/* Full Content Grid (3 Columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: 'Tailored Solutions',
                desc: 'Customized educational tracks aligned with your specific institutional goals.'
              },
              {
                title: 'Practical Application',
                desc: 'Actionable courses that apply immediately to elevate your daily operations.'
              },
              {
                title: 'International Expertise',
                desc: 'Global capabilities spanning European schools and professional organisations.'
              },
              {
                title: 'Measurable Progress',
                desc: 'Empirical verification of skill growth, operational speed, and performance.'
              },
              {
                title: 'Flexible Delivery',
                desc: 'Scalable learning models designed for institutions and employers of all sizes.'
              },
              {
                title: 'Long Term Partnerships',
                desc: 'Sustainable alliances built on trust, continuous collaboration, and results.'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E2E8F0]/40 shadow-sm flex items-start gap-4 hover:shadow-md hover:border-[#B89047]/20 transition-all duration-300 text-left"
              >
                <div className="w-8 h-8 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-extrabold text-[#0B1B3D] uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Results That Matter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 relative">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B89047] uppercase block">METRICS OF TRUST</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Results That Matter
          </h2>
          <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
            More than twenty five years of building exceptional human capability.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center relative z-10">
          {[
            { metric: '25+', label: 'Years supporting organisations to develop their people' },
            { metric: '6,000+', label: 'Professionals developed through practical programs' },
            { metric: '500+', label: 'Accredited learning experiences delivered by experts' },
            { metric: 'Europe-wide', label: 'International partnerships with leading institutions' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#E2E8F0]/60 shadow-sm flex flex-col justify-between hover:bg-[#FAF9F6]/50 transition-colors">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#B89047] tracking-tight mb-2 leading-none">{stat.metric}</p>
              </div>
              <p className="text-[10px] text-[#0B1B3D] font-bold uppercase tracking-wider leading-relaxed pt-3 border-t border-[#E2E8F0]/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#0B1B3D] text-white py-16 mb-16 border-y border-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">OUR PHILOSOPHY</h2>
          <p className="text-lg sm:text-xl font-light italic text-[#B89047] mt-2 mb-6">"People Create Performance"</p>
          <div className="text-xs sm:text-sm text-white leading-relaxed max-w-2xl mx-auto mb-8 font-light space-y-4">
            <p>
              When people develop, an incredible transformation begins. Teams become stronger, leaders make better decisions, and learners become more employable. Organisations become more resilient, and communities prosper.
            </p>
            <p>
              This simple belief shapes every single programme we deliver, because investing in people is one of the most valuable investments any organisation can make.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-[9px] font-bold uppercase tracking-wider text-[#B89047]">
            {['Stronger Teams', 'Leaders Excel', 'Resilient Organisations', 'Learners Thrive', 'Prosperous Communities'].map((item) => (
              <div key={item} className="border border-slate-800 bg-slate-900/40 py-3 px-1 rounded-lg">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-10 lg:mb-12 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B89047] uppercase block">WHY THIS MATTERS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Preparing Organisations for What's Next
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
        </div>

        {/* Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (7 Cols): The Narrative Text Content */}
          <div className="lg:col-span-7 space-y-5 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
              <p>
                The organisations that will lead tomorrow are those preparing today. In a business world defined by constant change, standing still is not an option. We partner with you to proactively build the vision and systems needed to thrive.
              </p>
              <p>
                Whether your immediate priority is developing executive capability, equipping future professionals, embracing Artificial Intelligence securely, or maximising Erasmus opportunities, our role remains the same. We help your people perform with greater confidence, capability, and long term impact.
              </p>
              <p>
                By tailoring every curriculum around measurable outcomes, PGT transforms standard training into a strategic asset. Our consultants work directly with your stakeholders to verify that knowledge transfers smoothly into daily workflows, elevating collective efficiency and ensuring your institution is prepared to lead.
              </p>
            </div>
          </div>

          {/* Right Column (5 Cols): Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/research.jpg"
              alt="Strategic planning research session"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>

        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-8 sm:p-12 border border-[#0B1B3D]/80 shadow-md text-center relative overflow-hidden">
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/10 rounded-xl pointer-events-none" />
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mb-3">Let's Start with Your Goals</h2>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 text-xs font-light">
            Every organisation has different challenges. Let's discuss yours. Together, we'll design a learning journey that delivers measurable value for your people and your organisation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold uppercase tracking-wider text-[10px] rounded-lg shadow-sm"
            >
              Book a Consultation
            </Link>
            <Link
              href="/learning-pathways"
              className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-bold uppercase tracking-wider text-[10px]"
            >
              Explore Our Learning Pathways
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
