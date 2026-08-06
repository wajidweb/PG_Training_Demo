import Link from 'next/link'
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
    desc: 'Develop strategic thinking, strengthen executive decision-making and build an organisation prepared for long-term growth.',
    idealFor: ['CEOs', 'Managing Directors', 'Executive Teams', 'Business Owners', 'Boards'],
    focus: [
      'Executive Coaching',
      'Executive Mentoring',
      'CEO Success Masterclasses',
      'Executive Strategy',
      'Organisational Transformation'
    ],
    ctaText: 'Explore Executive Success',
    link: '/executive-success',
    icon: Compass
  },
  {
    id: 2,
    title: 'I Want to Prepare Future-Ready Learners',
    desc: 'Equip learners with the knowledge, practical capability and confidence required to thrive in today\'s workplace.',
    idealFor: ['Universities', 'Higher Education Institutions', 'Schools', 'Training Providers'],
    focus: [
      'Workforce Readiness',
      'Future Skills',
      'Professional Development',
      'International Learning',
      'Employability'
    ],
    ctaText: 'Explore Academic & Workforce Excellence',
    link: '/academic-excellence',
    icon: GraduationCap
  },
  {
    id: 3,
    title: 'I Want to Maximise Erasmus+ Funding',
    desc: 'Design high-impact professional development programmes aligned with Erasmus+ priorities while maximising the value of every mobility.',
    idealFor: ['HEIs', 'VET Providers', 'Schools', 'Adult Education', 'Public Organisations'],
    focus: [
      'Staff Mobility',
      'Job Shadowing',
      'Professional Development',
      'Digital Transformation',
      'International Collaboration'
    ],
    ctaText: 'Explore Erasmus+ Opportunities',
    link: '/academic-excellence?tab=erasmus',
    icon: Globe
  },
  {
    id: 4,
    title: 'I Want to Build AI Capability',
    desc: 'Prepare educators, professionals and organisations to use Artificial Intelligence confidently, responsibly and productively.',
    idealFor: ['Educational Institutions', 'Businesses', 'Government', 'Public Bodies', 'NGOs'],
    focus: [
      'AI for Education',
      'AI for Organisations',
      'AI Productivity',
      'AI Strategy'
    ],
    ctaText: 'Explore AI Programmes',
    link: '/academic-excellence?tab=ai',
    icon: Cpu
  },
  {
    id: 5,
    title: 'I Want to Strengthen My Workforce',
    desc: 'Develop confident professionals, improve organisational capability and build teams ready for tomorrow\'s challenges.',
    idealFor: ['Private Organisations', 'Public Sector', 'NGOs', 'Growing Businesses', 'International Organisations'],
    focus: [
      'Workforce Capability',
      'Professional Development',
      'Future Skills',
      'Bespoke Learning'
    ],
    ctaText: 'Explore Workforce Solutions',
    link: '/academic-excellence',
    icon: Users
  },
  {
    id: 6,
    title: 'I Need a Tailored Learning Solution',
    desc: 'Every organisation is unique. Your learning strategy should be too. Our consultants work with you to understand your objectives before designing a bespoke programme that reflects your organisation, your people and your ambitions. Whether you require executive development, workforce capability, Erasmus+, AI or a combination of programmes, we\'ll create the right solution together.',
    idealFor: [],
    focus: [],
    ctaText: 'Speak With a Learning Consultant',
    link: '/contact?reason=bespoke',
    icon: Settings
  }
]

export default function LearningPathwaysPage() {
  return (
    <main className="pt-28 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Intro section */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16 animate-fade-in">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block mb-4">
          PHASE 5 LEARNING PATHWAYS
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] mb-4 leading-tight">
          Every Organisation Has a Different Goal. <br className="hidden sm:inline" />
          Find the Right Pathway for Yours.
        </h1>
        <div className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-2xl mx-auto space-y-3 font-normal">
          <p>
            No two organisations face the same challenges.
          </p>
          <p>
            That's why PGT offers a portfolio of specialist learning pathways designed around the outcomes you want to achieve.
          </p>
          <p className="font-bold text-[#0B1B3D] uppercase tracking-wider text-xs">
            Choose the pathway that best reflects your priorities.
          </p>
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
                  
                  <span className="text-[9px] font-bold text-[#B89047] tracking-widest block mb-2">// PATHWAY 0{path.id}</span>
                  <h3 className="text-base font-bold text-[#0B1B3D] mb-3 uppercase tracking-wide leading-tight">
                    {path.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-5 font-light">
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
                          <li key={item} className="flex items-center gap-2 text-[11px] text-[#64748B] font-semibold">
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

      {/* WHY CLIENTS CHOOSE THIS APPROACH */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">THE PGT VALUE</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">
                WHY CLIENTS CHOOSE THIS APPROACH
              </h2>
              <h3 className="text-xs sm:text-sm text-[#64748B] font-bold uppercase tracking-wide">
                Learning Designed Around Your Goals
              </h3>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-light">
                Instead of choosing from a catalogue of courses, you'll receive a learning pathway aligned with your organisation's priorities. With PGT, every solution is:
              </p>
            </div>

            <div className="space-y-3 font-sans">
              {[
                'Tailored to your objectives',
                'Focused on measurable outcomes',
                'Practical and immediately applicable',
                'Flexible in delivery',
                'Designed for long-term impact'
              ].map((benefit, idx) => (
                <div key={idx} className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E2E8F0]/40 flex gap-3 shadow-sm" >
                  <div className="w-4 h-4 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wide leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOT SURE WHERE TO START? */}
      <section className="max-w-4xl mx-auto px-6 text-center font-sans">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-1">PARTNERSHIP REVIEW</span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] mb-2 uppercase tracking-tight">
          NOT SURE WHERE TO START?
        </h2>
        <h3 className="text-xs sm:text-sm text-[#64748B] font-bold uppercase tracking-wide mb-4">
          Let's Find the Right Pathway Together
        </h3>
        <p className="text-[#64748B] max-w-xl mx-auto leading-relaxed mb-8 text-xs font-light">
          If you're unsure which pathway best fits your organisation, we'll help you identify the most appropriate solution. A short consultation is often all it takes to define the next step.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact?reason=consultation"
            className="px-6 py-3 bg-[#B89047] text-white font-bold text-[10px] uppercase tracking-widest hover:bg-[#B89047]/90 transition-all rounded-lg shadow-sm"
          >
            Book a Consultation
          </Link>
          <Link
            href="/contact?reason=general"
            className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#0B1B3D] font-bold text-[10px] uppercase tracking-widest hover:bg-[#FAF9F6] transition-all rounded-lg shadow-sm"
          >
            Contact Our Team
          </Link>
        </div>
      </section>

    </main>
  )
}
