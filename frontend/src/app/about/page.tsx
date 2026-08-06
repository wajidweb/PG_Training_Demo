import Link from 'next/link'
import { Check, Compass, Target, Award, Users, Globe } from 'lucide-react'

export const metadata = {
  title: 'About PGT — Paragon Global Training',
  description: 'Developing People. Strengthening Organisations. Creating Lasting Impact. Read about our 25-year history, philosophy, and two schools of thought.',
}

export default function AboutPage() {
  return (
    <main className="pt-28 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 text-center mb-16 lg:mb-24">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-3.5 py-1 rounded-full inline-block mb-4">
          OUR PURPOSE & APPROACH
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B1B3D] leading-tight max-w-4xl mx-auto mb-6">
          Developing People. Strengthening Organisations. Creating Lasting Impact.
        </h1>
        <div className="text-xs sm:text-sm text-[#64748B] max-w-2xl mx-auto leading-relaxed space-y-4 font-normal">
          <p>
            We believe every organisation can achieve more by investing in its people.
          </p>
          <p>
            Technology evolves. Markets shift. Business models change. Yet one truth remains constant.
            People remain the greatest driver of organisational performance.
          </p>
          <p>
            That belief has guided Paragon Global Training for more than 25 years.
            Today, we partner with CEOs, educational institutions, public organisations and employers to develop the capability, confidence and practical skills that create measurable results.
          </p>
          <p className="font-bold text-[#0B1B3D] pt-2">
            Because stronger people build stronger organisations.
          </p>
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
              <div className="text-xs text-[#64748B] space-y-3 leading-relaxed font-light">
                <p>
                  Learning should do more than transfer knowledge. It should improve decision-making. Strengthen capability. Build confidence. Create opportunity.
                </p>
                <p>
                  And deliver results that continue long after the programme has ended.
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
              <div className="text-xs text-[#64748B] space-y-3 leading-relaxed font-light">
                <p>
                  Every organisation is different. Every challenge is different. That is why we don't deliver off-the-shelf programmes.
                </p>
                <p>
                  We work with every client to understand their objectives before designing learning experiences that produce measurable impact.
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
          <p className="text-xs text-[#64748B] max-w-md mx-auto mt-2 font-light">
            Specialist Expertise. One Shared Philosophy. Every client has different priorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* School of Executive Success */}
          <div className="bg-[#0E1629] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col justify-between group">
            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#B89047] uppercase bg-[#B89047]/10 px-2.5 py-1 rounded-full">
                PREMIUM EXECUTIVE ACADEMY
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-4 mb-2 text-white uppercase tracking-wide">
                School of Executive Success
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                Supporting CEOs and executive teams to strengthen strategic thinking, executive decision-making and organisational performance.
              </p>
              <h4 className="text-[9px] font-bold text-[#B89047] tracking-wider uppercase mb-2">Focus Areas:</h4>
              <ul className="grid grid-cols-1 gap-1.5 mb-6">
                {['Executive Coaching', 'Executive Mentoring', 'CEO Masterclasses', 'Strategic Growth', 'Organisational Transformation'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/executive-success"
              className="inline-flex items-center justify-center px-4 py-2.5 border border-[#B89047] hover:bg-[#B89047]/10 text-[#B89047] font-bold rounded-lg transition-colors text-center uppercase tracking-wider text-[10px]"
            >
              Explore Executive Success
            </Link>
          </div>

          {/* School of Academic & Workforce Excellence */}
          <div className="bg-white text-[#0B1B3D] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between group">
            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#0B1B3D] uppercase bg-[#0B1B3D]/5 px-2.5 py-1 rounded-full">
                ACADEMIC & WORKFORCE DEVELOPMENT
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-4 mb-2 text-[#0B1B3D] uppercase tracking-wide">
                School of Academic & Workforce Excellence
              </h3>
              <p className="text-[#64748B] text-xs leading-relaxed mb-6 font-light">
                Partnering with universities, VET providers, schools, employers and public organisations to prepare future-ready learners, strengthen workforce capability and maximise educational impact.
              </p>
              <h4 className="text-[9px] font-bold text-[#B89047] tracking-wider uppercase mb-2">Focus Areas:</h4>
              <ul className="grid grid-cols-1 gap-1.5 mb-6">
                {['Erasmus+ Professional Development', 'Artificial Intelligence', 'Workforce Capability', 'International Learning', 'Professional Development'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#64748B] font-semibold">
                    <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
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

      {/* Why Organisations Choose PGT */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">PARTNERSHIP QUALITY</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">
                WHY ORGANISATIONS CHOOSE PGT
              </h2>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-light">
                A Partner, Not Just a Training Provider
              </p>
              <p className="text-xs text-[#64748B] leading-relaxed font-light">
                Clients work with us because they want more than a course. They want outcomes.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Tailored Solutions', desc: 'Aligned with your specific goals' },
                { title: 'Practical Application', desc: 'Programmes apply immediately to your work' },
                { title: 'International Expertise', desc: 'Across European education & organisations' },
                { title: 'Measurable Improvements', desc: 'Empirical capability & performance growth' },
                { title: 'Flexible Delivery', desc: 'Scaled for organisations of every size' },
                { title: 'Long-Term Partnerships', desc: 'Built on trust and continuous results' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E2E8F0]/40 flex gap-3 shadow-sm">
                  <div className="w-4 h-4 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] mt-0.5 flex-shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide">{item.title}</h4>
                    <p className="text-[10px] text-[#64748B] mt-0.5 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results That Matter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">METRICS OF TRUST</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">
            RESULTS THAT MATTER
          </h2>
          <p className="text-xs text-[#64748B] max-w-md mx-auto mt-2 font-light">
            More Than 25 Years of Building Capability
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[
            { metric: '25+ Years', label: 'Supporting organisations across Europe' },
            { metric: '6,000+', label: 'Professionals developed through practical learning' },
            { metric: '500+', label: 'Programmes delivered across fields' },
            { metric: 'Europe-wide', label: 'Working with organisations, universities and public institutions' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#E2E8F0]/60 shadow-sm">
              <p className="text-2xl sm:text-3xl font-bold text-[#B89047] tracking-tight mb-1">{stat.metric}</p>
              <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider max-w-[150px] mx-auto leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#0B1B3D] text-white py-16 mb-16 border-y border-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[9px] font-bold tracking-widest text-[#B89047] uppercase block mb-3">// PGT THEORY</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">OUR PHILOSOPHY</h2>
          <p className="text-base font-light italic text-[#B89047] mt-1 mb-6">"People Create Performance"</p>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-light">
            When people develop... Teams become stronger. Leaders make better decisions. Learners become more employable. Organisations become more resilient. Communities prosper.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-[9px] font-bold uppercase tracking-wider text-[#B89047]">
            {['Teams Perform', 'Leaders Excel', 'Resilient Orgs', 'Learners Thrive', 'Communities Prosper'].map((item) => (
              <div key={item} className="border border-slate-800 bg-slate-900/40 py-3 px-1 rounded-lg">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-20 space-y-4">
        <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">THE BIG PICTURE</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">
          Preparing Organisations for What's Next
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-2xl mx-auto font-light">
          The organisations that will lead tomorrow are those preparing today.
          Whether your priority is developing executive capability, equipping future professionals, embracing Artificial Intelligence or maximising Erasmus+ opportunities, our role is the same:
          To help your people perform with greater confidence, capability and impact.
        </p>
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
