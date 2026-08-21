import Link from 'next/link'
import Image from 'next/image'
import { 
  Check, 
  ArrowRight, 
  Compass, 
  GraduationCap, 
  Globe, 
  Cpu, 
  Users, 
  Settings
} from 'lucide-react'

export const metadata = {
  title: 'Learning Pathways — Paragon Global Training',
  description: 'Every Organisation Has a Different Goal. Find the Right Pathway for Yours.',
}

const PATHWAYS = [
  {
    id: 1,
    title: 'I Want to Build a Stronger Executive Team',
    desc: 'Develop strategic thinking, strengthen executive decision making, and build a resilient organisation prepared for sustainable growth.',
    idealFor: ['Managing Boards', 'Corporate CEOs', 'Business Owners', 'Executive Teams'],
    focus: [
      'Executive Coaching',
      'Executive Mentoring',
      'CEO Masterclasses',
      'Strategic Growth'
    ],
    ctaText: 'Explore Executive Success',
    link: '/executive-success',
    icon: Compass
  },
  {
    id: 2,
    title: 'I Want to Prepare Future Ready Learners',
    desc: 'Equip students with the practical skills, academic capability, and complete confidence required to perform in today’s modern economy.',
    idealFor: ['Higher Academies', 'VET Providers', 'Private Schools', 'Universities'],
    focus: [
      'Workforce Readiness',
      'Future Ready Skills',
      'Professional Growth',
      'Academic Capability'
    ],
    ctaText: 'Explore Academic Excellence',
    link: '/academic-excellence',
    icon: GraduationCap
  },
  {
    id: 3,
    title: 'I Want to Maximise Erasmus Plus Funding',
    desc: 'Design high impact professional development programs aligned with European standards while maximizing funded mobility opportunities.',
    idealFor: ['EU Coordinators', 'Adult Education', 'VET Providers', 'Public Bodies'],
    focus: [
      'Staff Mobilities',
      'Job Shadowing Plans',
      'Digital Classrooms',
      'European Partnerships'
    ],
    ctaText: 'Explore Erasmus Opportunities',
    link: '/academic-excellence?tab=erasmus',
    icon: Globe
  },
  {
    id: 4,
    title: 'I Want to Build Artificial Intelligence',
    desc: 'Prepare educators, professionals, and organisations to integrate advanced Artificial Intelligence confidently and productively.',
    idealFor: ['School Teachers', 'Private Firms', 'Public Bodies', 'Government Agencies'],
    focus: [
      'AI in Education',
      'AI for Productivity',
      'Strategic AI Models',
      'Confidential Systems'
    ],
    ctaText: 'Explore AI Programmes',
    link: '/academic-excellence?tab=ai',
    icon: Cpu
  },
  {
    id: 5,
    title: 'I Want to Strengthen My Workforce',
    desc: 'Develop confident professionals, elevate internal workforce capability, and build high performance teams ready for global expansion.',
    idealFor: ['Private Companies', 'Growing Businesses', 'Non Profit Groups', 'Public Sectors'],
    focus: [
      'Workforce Upgrades',
      'Accredited Training',
      'Team Collaboration',
      'Accredited Learning'
    ],
    ctaText: 'Explore Workforce Solutions',
    link: '/academic-excellence',
    icon: Users
  },
  {
    id: 6,
    title: 'I Need a Customized Learning Experience',
    desc: 'Collaborate with our team to analyze objectives and build custom certified tracks tailored strictly around your institutional goals.',
    idealFor: ['Special Agencies', 'Accredited Schools', 'Global Employers', 'Writers and Boards'],
    focus: [
      'Bespoke Scoping',
      'Certified Curricula',
      'Outcome Scoping',
      'Global Partnerships'
    ],
    ctaText: 'Speak With a Consultant',
    link: '/contact?reason=bespoke',
    icon: Settings
  }
]

export default function LearningPathwaysPage() {
  return (
    <main className="pt-28 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Intro section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 sm:pt-6 pb-16 sm:pb-20 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block">
            LEARNING PATHWAYS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] leading-tight max-w-5xl mx-auto">
            Every Organisation Has a Different Goal. Find the Right Pathway for Yours.
          </h1>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
        </div>

        {/* Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (7 Cols): Editorial Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
              <p>
                No two organisations face the same challenges, which is why static catalogs often fail to deliver real value. At Paragon Global Training, we offer a specialized portfolio of distinct learning pathways designed specifically around the concrete outcomes you want to achieve.
              </p>
              <p>
                Whether you are developing your executive board, training future ready students, securely adopting Artificial Intelligence, or maximizing Erasmus mobilities, our paths provide a clear map for progress.
              </p>
              <p>
                By aligning our specialized pathways with your actual operational standards, we transform academic and corporate training into a strategic advantage. Our executive coordinators work directly with your team to verify that knowledge transfers smoothly into daily work routines, maximizing collective efficiency and ensuring your workforce is prepared to lead.
              </p>
            </div>
            <p className="font-extrabold text-sm sm:text-base text-[#0B1B3D] uppercase tracking-wide border-t border-[#E2E8F0]/80 pt-4">
              Choose the pathway that best reflects your priorities.
            </p>
          </div>

          {/* Right Column (5 Cols): Classroom Environment Visual Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/paragonimage2.png"
              alt="Paragon Global Training university classroom environment"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
          </div>

        </div>
      </section>

      {/* Six Pathway Cards Layout */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PATHWAYS.map((path) => {
            const Icon = path.icon
            return (
              <div 
                key={path.id} 
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#B89047]/25 transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047] mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-base font-bold text-[#0B1B3D] mb-3 uppercase tracking-wide leading-tight">
                    {path.title}
                  </h3>
                  <p className="text-xs text-[#0B1B3D] leading-relaxed mb-5 font-normal">
                    {path.desc}
                  </p>
                  
                  {path.idealFor.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest mb-1">Ideal For</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {path.idealFor.map((item) => (
                          <span 
                            key={item} 
                            className="bg-[#FAF9F6] border border-[#E2E8F0]/40 px-2.5 py-1 rounded text-[10px] font-bold text-[#0B1B3D]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {path.focus.length > 0 && (
                    <div className="mb-6 pt-4 border-t border-[#E2E8F0]/40">
                      <h4 className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest mb-2">Explore</h4>
                      <ul className="space-y-1.5">
                        {path.focus.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-[11px] text-[#0B1B3D] font-semibold">
                            <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Link
                  href={path.link}
                  className="inline-flex items-center justify-center w-full py-3 px-4 border border-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-white text-[#0B1B3D] text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors text-center shadow-sm"
                >
                  {path.ctaText}
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* WHY CLIENTS CHOOSE THIS APPROACH (Centered & Symmetrical Grid with Image) */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">THE PGT VALUE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Why Clients Choose This Approach
            </h2>
            <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
              Instead of choosing from a catalogue of courses, you will receive a learning pathway aligned with your organisation's priorities. With PGT, every solution is designed to build capability, drive innovation, and deliver measurable growth.
            </p>
          </div>

          {/* Symmetric Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
            
            {/* Left Column (7 Cols): Symmetrical Benefits Grid */}
            <div className="lg:col-span-7 space-y-4">
              {[
                { title: 'Tailored Solutions', desc: 'Customized educational tracks aligned with your specific institutional goals.' },
                { title: 'Practical Application', desc: 'Actionable courses that apply immediately to elevate your daily operations.' },
                { title: 'Measurable Outcomes', desc: 'Empirical verification of skill growth, operational speed, and performance.' },
                { title: 'Flexible Delivery', desc: 'Scalable learning models designed for institutions and employers of all sizes.' },
                { title: 'Long Term Impact', desc: 'Sustainable solutions built on trust, continuous collaboration, and results.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E2E8F0]/40 flex gap-4 shadow-sm hover:shadow-md hover:border-[#B89047]/20 transition-all duration-300 text-left">
                  <div className="w-8 h-8 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs text-[#0B1B3D] uppercase tracking-wide">{item.title}</h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column (5 Cols): Whiteboard Strategic Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto border border-[#E2E8F0]/80 shadow-md">
              <Image
                src="/development.png"
                alt="Coaching and whiteboard strategic drawing session"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

          </div>

        </div>
      </section>

      {/* NOT SURE WHERE TO START? (Premium Deep Navy Climax Card) */}
      <section className="max-w-5xl mx-auto px-6 mb-16 relative z-10 font-sans">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-8 sm:p-12 border border-[#0B1B3D]/80 shadow-md text-center relative overflow-hidden">
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/10 rounded-xl pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-1">PARTNERSHIP REVIEW</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-2">
            Not Sure Where to Start?
          </h2>
          <h3 className="text-sm sm:text-base font-light italic text-[#B89047] mb-6">
            Let's Find the Right Pathway Together
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 text-xs font-light">
            If you are unsure which pathway best fits your organisation, we are here to help you identify the most appropriate solution. A short consultation is often all it takes to define the next step and align your specific goals with our specialized curricula.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link
              href="/contact?reason=consultation"
              className="px-6 py-3 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold text-[10px] uppercase tracking-widest transition-all rounded-lg shadow-sm"
            >
              Book a Consultation
            </Link>
            <Link
              href="/contact?reason=general"
              className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-all rounded-lg shadow-sm"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
