import Link from 'next/link'
import { 
  GraduationCap, 
  BookOpen, 
  Cpu, 
  Globe, 
  Check, 
  Compass, 
  Award, 
  Users, 
  ArrowUpRight,
  Sparkles,
  School
} from 'lucide-react'

export const metadata = {
  title: 'School of Academic & Workforce Excellence — PGT',
  description: 'Developing Future-Ready People. Strengthening Organisations. Creating Lasting Impact. Partner with PGT for Erasmus+, AI capability, and workforce development.',
}

export default function AcademicExcellencePage() {
  return (
    <main className="pt-20 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Optimistic Bright Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] border-b border-[#E2E8F0]/40">
        {/* Soft light accents */}
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-[#B89047]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 font-sans">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block mb-4">
            SCHOOL OF ACADEMIC & WORKFORCE EXCELLENCE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B1B3D] leading-tight max-w-4xl mx-auto mb-6">
            Developing Future-Ready People. Strengthening Organisations. Creating Lasting Impact.
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            The future belongs to organisations that never stop learning. Today's learners need more than knowledge. Professionals need more than qualifications. Organisations need more than training. They need people who can adapt, innovate and perform in a rapidly changing world.
          </p>
          <div className="text-xs sm:text-sm text-[#0B1B3D] font-bold max-w-2xl mx-auto mb-10 leading-relaxed uppercase tracking-wide">
            At Paragon Global Training, we partner with universities, VET providers, schools, employers and public organisations to design learning experiences that strengthen capability, improve employability and deliver measurable organisational impact.
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/learning-pathways?school=academic"
              className="w-full sm:w-auto px-6 py-3 bg-[#0B1B3D] text-white font-bold tracking-wider hover:bg-[#0B1B3D]/90 transition-all rounded-lg text-center uppercase text-[10px] shadow-sm"
            >
              Explore Our Programmes
            </Link>
            <Link
              href="/contact?reason=academic"
              className="w-full sm:w-auto px-6 py-3 bg-white border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-bold tracking-wider hover:bg-[#F1F5F9]/60 transition-all rounded-lg text-center uppercase text-[10px] shadow-sm"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Matters & Philosophy */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-b border-[#E2E8F0]/40 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-2 block">WHY THIS MATTERS</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight mb-4">
              Learning Should Deliver More Than Knowledge
            </h2>
            <div className="text-xs sm:text-sm text-[#64748B] space-y-4 leading-relaxed font-light">
              <p>
                Every investment in learning should create value. For individuals. For organisations. For society.
              </p>
              <p>
                That is why every programme we design is built around practical application, measurable outcomes and lasting capability.
              </p>
              <p className="font-bold text-[#0B1B3D] uppercase tracking-wide">
                Because the real value of learning is not what participants know when they finish. It is what they are able to achieve afterwards.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] flex flex-col justify-center shadow-sm">
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-2 block font-mono">OUR PHILOSOPHY</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B1B3D] mb-3 leading-snug uppercase tracking-wide">
              Connecting Learning with Real-World Performance
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4 font-light">
              We believe learning should prepare people for the opportunities of tomorrow—not simply the requirements of today. Every programme combines academic excellence with practical application, enabling participants to develop the confidence, capability and adaptability needed to perform in an evolving global workplace.
            </p>
            <p className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest font-mono">
              ★ SHAPING EUROPEAN EDUCATION FOR over 25 years
            </p>
          </div>
        </div>
      </section>

      {/* The PGT Future-Ready Framework™ (5 foundations) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-[#E2E8F0]/40 font-sans">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-2 block">PEDAGOGICAL CORE</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">The PGT Future-Ready Framework™</h2>
          <p className="text-xs text-[#64748B] max-w-md mx-auto mt-2 font-light">
            Our programmes are built around five interconnected foundations that prepare individuals and organisations for long-term growth and success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Knowledge', desc: 'Develop current, relevant expertise aligned with today\'s professional environment.' },
            { title: 'Capability', desc: 'Turn learning into confident action and measurable real world performance.' },
            { title: 'Innovation', desc: 'Embrace Artificial Intelligence, digital technologies and new ways of thinking.' },
            { title: 'Global Perspective', desc: 'Strengthen international collaboration through Erasmus+ and cross-cultural learning.' },
            { title: 'Impact', desc: 'Create meaningful, long-lasting value for individuals, organisations and communities.' },
          ].map((foundation, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm hover:border-[#B89047]/30 transition-all flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#B89047]/10 text-[#B89047] flex items-center justify-center font-bold text-[10px] mb-3">
                  0{idx+1}
                </span>
                <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">{foundation.title}</h3>
                <p className="text-[10px] text-[#64748B] leading-relaxed font-light">{foundation.desc}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0]/40 text-[9px] uppercase font-bold text-[#B89047] tracking-widest font-mono">
                Foundation {idx+1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Academic Solutions */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-[#E2E8F0]/40 font-sans">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase mb-2 block">DEVELOPMENT PATHWAYS</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">Learning Designed Around Your Goals</h2>
          <p className="text-xs text-[#64748B] max-w-md mx-auto mt-2 font-light">
            Whether your objective is professional development, organisational capability or international collaboration, our programmes are designed to create measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Erasmus+ Professional Development', desc: 'High-impact development programmes perfectly aligned with European priorities, quality standards, and funding requirements.' },
            { title: 'Artificial Intelligence', desc: 'Practical AI implementation and literacy programmes that help educators, professionals and organisations work more effectively and confidently.' },
            { title: 'Workforce Capability', desc: 'Develop adaptable, highly collaborative, and future-focused professional teams ready to perform in today’s evolving workplace.' },
            { title: 'Future Skills', desc: 'Equip learners, researchers, and professional staff with the critical soft and hard competencies required for tomorrow’s economy.' },
            { title: 'Staff Mobility & Job Shadowing', desc: 'Promote innovation, collaborative exchanges, and the cross-border sharing of international best practices.' },
            { title: 'International Learning', desc: 'Create meaningful global learning experiences that broaden horizons, break cultural silos, and strengthen professional capability.' },
            { title: 'Bespoke Learning Solutions', desc: 'Tailored training, consulting, and development experiences custom designed around your specific organizational objectives and challenges.' }
          ].map((sol, idx) => (
            <div key={idx} className={`bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${idx === 6 ? 'md:col-span-2 lg:col-span-3 border-[#B89047]/20 bg-[#B89047]/5' : ''}`}>
              <div>
                <span className="text-[#B89047] text-[10px] font-bold tracking-widest block mb-1.5 uppercase">// Service 0{idx+1}</span>
                <h3 className="font-bold text-[#0B1B3D] text-base mb-2 uppercase tracking-wide">{sol.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4 font-light">{sol.desc}</p>
              </div>
              <Link href="/contact?reason=academic" className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B89047] uppercase tracking-widest hover:text-[#0B1B3D] transition-colors">
                <span>Request details</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Erasmus+ Excellence Highlight Section */}
      <section className="bg-[#0B1B3D] text-white py-16 lg:py-20 border-y border-slate-900 relative font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#B89047] uppercase bg-[#B89047]/15 px-3 py-1.5 rounded-full border border-[#B89047]/30 inline-block mb-4">
                EUROPE-WIDE EXCELLENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                Maximise the Value of Every Erasmus+ Mobility
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                Paragon Global Training works with Higher Education Institutions, VET providers, schools, adult education organisations and public bodies across Europe to deliver development programmes aligned directly with Erasmus+ priorities.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed mb-6 font-light">
                Where eligible, Erasmus+ funding can significantly reduce—or fully cover—the cost of institutional participation. We provide exhaustive planning support, documentation assistance, and learning agreement development to ensure seamless mobilization.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {[
                  'Strengthen internationalisation',
                  'Enhance professional capability',
                  'Support digital transformation',
                  'Integrate Artificial Intelligence',
                  'Promote inclusion & sustainability',
                  'Deliver measurable learning outcomes'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#B89047] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900/40 p-6 sm:p-8 rounded-xl border border-slate-800 shadow-xl">
              <h3 className="font-bold text-white text-xs uppercase tracking-wide border-b border-slate-800 pb-2 mb-4">Erasmus+ Partnerships</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-6 font-light">
                Our certified programmes align with Key Action 1 and Key Action 2 standards to guarantee European-recognized credit equivalence (ECTS / ECVET compliance) and maximize organizational value.
              </p>
              <div className="space-y-3">
                <Link
                  href="/learning-pathways?pathway=erasmus"
                  className="block w-full py-3 px-4 bg-[#B89047] text-white text-center font-bold uppercase tracking-wider text-[10px] rounded-lg hover:bg-[#B89047]/90 transition-colors shadow-sm"
                >
                  Explore Erasmus+ Opportunities
                </Link>
                <Link
                  href="/contact?reason=erasmus"
                  className="block w-full py-3 px-4 border border-slate-700 hover:border-slate-600 text-center font-bold uppercase tracking-wider text-[10px] rounded-lg text-slate-300 hover:text-white transition-colors"
                >
                  Download planning checklist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20 border-b border-[#E2E8F0]/40 font-sans">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">EUROPEAN NETWORK</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">Supporting Learning Across Europe</h2>
          <p className="text-xs text-[#64748B] max-w-md mx-auto mt-2 font-light">
            We operate in deep strategic partnership with educational institutions, employers, and governance bodies to scale collective capability.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Universities & HEIs', icon: School },
            { label: 'Secondary & Primary Schools', icon: GraduationCap },
            { label: 'VET Providers', icon: Award },
            { label: 'Adult Education Centres', icon: BookOpen },
            { label: 'Private Sector Employers', icon: Users },
            { label: 'Public Organisations', icon: Globe },
            { label: 'Non-Governmental Orgs (NGOs)', icon: Compass },
            { label: 'International Networks', icon: Sparkles }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#E2E8F0] flex items-center gap-3 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#0B1B3D] uppercase tracking-wide">{item.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Beyond the Classroom section (Ecosystem preview) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-[#E2E8F0]/40 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">CONTINUOUS VALUE</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">
              Beyond the Classroom
            </h2>
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-light">
              Learning does not end when a professional development programme finishes. Every client partnership with Paragon Global Training provides access to our growing ecosystem of practical resources, digital insights, and planning tools.
            </p>
            <p className="text-[#64748B] text-xs leading-relaxed font-light">
              These resources are continuously developed by our educational and technological specialists, designed specifically to help your organisation sustain capability long after training completion.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { title: 'Practical Guides', detail: 'Comprehensive booklets' },
              { title: 'Video Learning', detail: 'Brief briefings & lectures' },
              { title: 'Toolkits & Templates', detail: 'Planning spreadsheets' },
              { title: 'AI Resources', detail: 'Prompt engineering libraries' },
              { title: 'Erasmus+ Planners', detail: 'Credit mobility agreements' },
              { title: 'Insights & Webinars', detail: 'Online roundtable reviews' }
            ].map((resource, idx) => (
              <div key={idx} className="bg-white border border-[#E2E8F0] p-4 rounded-xl flex flex-col justify-between shadow-sm h-28">
                <span className="text-[8px] uppercase tracking-widest font-bold text-[#B89047]">// Resource</span>
                <div>
                  <h4 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wider">{resource.title}</h4>
                  <p className="text-[10px] text-[#64748B] mt-0.5 font-light">{resource.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-4xl mx-auto px-6 pt-16">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-8 sm:p-12 border border-[#0B1B3D]/80 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mb-3">Build Capability. Create Opportunity. Deliver Impact.</h2>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 text-xs font-light">
            Whether you're strengthening your workforce, preparing future professionals, planning an Erasmus+ mobility or investing in organisational development, Paragon Global Training is ready to support your journey. Let's build a learning solution that creates measurable value for your people and your organisation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link
              href="/contact?reason=academic"
              className="px-6 py-3 bg-[#B89047] text-white font-bold uppercase tracking-wider text-[10px] rounded-lg shadow-sm"
            >
              Book a Consultation
            </Link>
            <Link
              href="/learning-pathways"
              className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-bold uppercase tracking-wider text-[10px]"
            >
              Explore Academic & Workforce Excellence
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
