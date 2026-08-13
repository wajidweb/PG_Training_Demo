import Link from 'next/link'
import Image from 'next/image'
import {
  Check,
  ArrowRight,
  Award,
  Users,
  Target,
  Globe,
  ChevronRight,
  BookOpen,
  Cpu,
  FileText,
  PlayCircle,
  GraduationCap,
  ArrowUpRight,
  Lightbulb,
  TrendingUp
} from 'lucide-react'

export const metadata = {
  title: 'Paragon Global Training (PGT) — Building Exceptional People',
  description: 'Developing Exceptional People. Building Stronger Organisations. Creating Lasting Impact.',
}

export default function HomePage() {
  return (
    <main className="bg-[#FAF9F6] text-[#0B1B3D] min-h-screen selection:bg-[#B89047]/30 selection:text-[#0B1B3D] overflow-hidden font-sans">
      
      {/* 1. HERO SECTION (Replicated Visual Layout from Image.png) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 lg:pt-28 pb-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Block (5 Cols): Rounded Pure Visual Card (Covering full available width and height) */}
          <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm relative min-h-[300px] lg:min-h-0">
            <Image 
              src="/bgimage.png" 
              alt="Paragon Global Training Classroom" 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover select-none"
            />
          </div>

          {/* Right Block (7 Cols): Official Brand Soft Grey Content Card (Increased desktop size) */}
          <div className="lg:col-span-7 bg-[#F1F5F9] border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 flex flex-col justify-between space-y-6 relative overflow-hidden text-left group">
            {/* Subtle floating branding symbol top-right */}
            <div className="absolute top-6 right-6 text-[#0B1B3D]/5">
              <svg className="w-8 h-8 fill-current text-[#B89047]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            </div>

            <div className="space-y-6">
              {/* Massive bold uppercase header - properly visible text */}
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-none text-[#0B1B3D] tracking-tighter uppercase font-sans">
                Building Exceptional People. <br />
                Transforming Organisations. <br />
                Shaping the Future.
              </h1>
              
              {/* Description body copy - exact word-for-word, highly visible Deep Navy text */}
              <div className="space-y-4 text-xs sm:text-sm text-[#0B1B3D] leading-relaxed font-normal">
                <p>
                  The organisations that thrive tomorrow will be those that invest in their people today.
                </p>
                <p>
                  At Paragon Global Training, we help CEOs, educational institutions and organisations develop the capability, confidence and strategic thinking needed to perform, innovate and grow in a rapidly changing world.
                </p>
              </div>
            </div>

            {/* Highlight Box - exact copy verbatim */}
            <div className="border-t border-[#E2E8F0] pt-4">
              <p className="text-xs font-bold text-[#0B1B3D] leading-relaxed">
                Through two specialist Schools of Thought, we deliver practical learning experiences that create measurable organisational impact.
              </p>
            </div>

            {/* CTAs Row - exact copy verbatim */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/executive-success"
                className="px-4 py-3 bg-[#0B1B3D] hover:bg-slate-900 text-white text-center font-bold uppercase tracking-wider text-[10px] rounded-lg shadow-sm transition-all flex-1"
              >
                Explore the School of Executive Success
              </Link>
              <Link
                href="/academic-excellence"
                className="px-4 py-3 border border-[#0B1B3D] hover:bg-[#0B1B3D]/5 text-[#0B1B3D] text-center font-bold uppercase tracking-wider text-[10px] rounded-lg transition-all flex-1"
              >
                Explore Academic & Workforce Excellence
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Strip (3 Brand Cards with metallic Gold ↗ buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          
          {/* Card 1: School of Executive Success Outcome */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 relative flex flex-col justify-between min-h-[140px] group shadow-sm hover:shadow-md hover:border-[#B89047]/30 transition-all">
            <div className="space-y-2 pr-10">
              <h3 className="text-xs font-extrabold text-[#0B1B3D] uppercase tracking-wider font-sans">
                School of Executive Success
              </h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed font-light">
                Develop the strategic capability to lead with confidence, make better decisions and build organisations that outperform.
              </p>
            </div>
            <Link 
              href="/executive-success" 
              aria-label="Explore Executive Success"
              className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-[#B89047] text-white flex items-center justify-center font-bold shadow-sm cursor-pointer hover:bg-[#B89047]/90 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: School of Academic & Workforce Excellence Outcome */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 relative flex flex-col justify-between min-h-[140px] group shadow-sm hover:shadow-md hover:border-[#B89047]/30 transition-all">
            <div className="space-y-2 pr-10">
              <h3 className="text-xs font-extrabold text-[#0B1B3D] uppercase tracking-wider font-sans">
                School of Academic & Workforce Excellence
              </h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed font-light">
                Equip learners, professionals and teams with the capabilities needed to excel in today's workplace and tomorrow's economy.
              </p>
            </div>
            <Link 
              href="/academic-excellence" 
              aria-label="Explore Academic Excellence"
              className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-[#B89047] text-white flex items-center justify-center font-bold shadow-sm cursor-pointer hover:bg-[#B89047]/90 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Schools of Thought Alignment */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 relative flex flex-col justify-between min-h-[140px] group shadow-sm hover:shadow-md hover:border-[#B89047]/30 transition-all">
            <div className="space-y-2 pr-10">
              <h3 className="text-xs font-extrabold text-[#0B1B3D] uppercase tracking-wider font-sans">
                Measurable Impact
              </h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed font-light">
                Through two specialist Schools of Thought, we deliver practical learning experiences that create measurable organisational impact.
              </p>
            </div>
            <Link 
              href="/learning-pathways" 
              aria-label="Explore Learning Pathways"
              className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-[#B89047] text-white flex items-center justify-center font-bold shadow-sm cursor-pointer hover:bg-[#B89047]/90 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 2. TRUST BAR (Immediately below Hero - Highly Clean & Elegant) */}
      <section className="bg-[#0B1B3D] text-white py-6 border-y border-[#0B1B3D]/80 overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center gap-8 text-[11px] font-semibold tracking-wider uppercase">
          <span className="text-slate-400 font-extrabold border-r border-slate-800 pr-6">Trusted by organisations across Europe</span>
          <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#B89047]" /> 25+ Years of Experience</span>
          <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#B89047]" /> 6,000+ Professionals Developed</span>
          <span className="flex items-center gap-2"><Target className="w-4 h-4 text-[#B89047]" /> 500+ Learning Programmes</span>
          <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#B89047]" /> International Partnerships</span>
        </div>
      </section>

      {/* 3. SECTION 2: Your People Will Shape Your Future (High-End Editorial UX Design) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20 relative border-b border-[#E2E8F0]/40 font-sans">
        {/* Abstract luxury ambient gradients */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#B89047]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#0B1B3D]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Row-level Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-10 lg:mb-12 space-y-3 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Your People Will Shape Your Future
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          
          {/* Left Column (5 Cols): Sticky Brand Narrative Anchor (No boxes, pure typographic elegance) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#B89047] uppercase block">
                01 / THE CORE PHILOSOPHY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none">
                The Foundation of Adaptability.
              </h3>
            </div>

            {/* Fused Realities Paragraph - extremely elegant and smooth */}
            <div className="space-y-4 text-sm text-[#64748B] leading-relaxed font-light">
              <p>
                Markets evolve constantly. Technology changes overnight. Artificial Intelligence is actively redefining how modern organisations operate.
              </p>
              <p>
                Yet, through every cycle of technological disruption and industrial shift, one competitive advantage remains absolute and constant.
              </p>
            </div>

            {/* Typographic Pivot: PEOPLE (Serif High-contrast Statement) */}
            <div className="pt-5 border-t border-[#E2E8F0]/80 space-y-5">
              <div>
                <span className="text-[9px] font-mono text-[#B89047] font-bold tracking-widest block uppercase mb-1">
                  The Constant Benchmark
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold italic text-[#B89047] font-serif tracking-wide mb-2 select-none">
                  People.
                </div>
                <p className="text-xs text-[#0B1B3D]/80 leading-relaxed">
                  When you invest in human development, you build the capacity, confidence, and strategic thinking that drive long-term institutional performance.
                </p>
              </div>

              {/* Seamless Ultimate Outcome Integration */}
              <div className="bg-[#B89047]/10 border border-[#B89047]/20 rounded-xl p-4 relative overflow-hidden">
                <span className="text-[9px] font-mono text-[#B89047] font-bold tracking-widest uppercase block mb-1">
                  THE ULTIMATE OUTCOME
                </span>
                <p className="text-xs text-[#0B1B3D] leading-relaxed font-medium">
                  That is why every programme we design focuses on one outcome: <span className="font-bold text-[#B89047]">Helping people create measurable value for their organisation.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): The Scrolling Growth Cascade Experience */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="space-y-2 border-b border-[#E2E8F0] pb-4">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">
                02 / THE GROWTH CASCADE
              </span>
              <h3 className="text-lg font-bold text-[#0B1B3D] uppercase tracking-wide">
                When people grow...
              </h3>
            </div>

            {/* Cascade Cards (Borderless, Floating Flat Glassmorphism Style) */}
            <div className="space-y-1">
              
              {/* Card 1 */}
              <div className="group border-b border-[#E2E8F0]/80 hover:border-[#B89047] pb-6 pt-2 transition-all duration-300 relative flex gap-5 sm:gap-6 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5 group-hover:bg-[#B89047]/15 transition-colors">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="text-base sm:text-lg font-extrabold text-[#0B1B3D] uppercase tracking-wider group-hover:text-[#B89047] transition-colors">
                    Organisations innovate.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-light">
                    Fresh ideas, creative problem-solving, and advanced strategic frameworks emerge naturally from a highly skilled, confident and inspired workforce.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group border-b border-[#E2E8F0]/80 hover:border-[#B89047] pb-6 pt-4 transition-all duration-300 relative flex gap-5 sm:gap-6 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5 group-hover:bg-[#B89047]/15 transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="text-base sm:text-lg font-extrabold text-[#0B1B3D] uppercase tracking-wider group-hover:text-[#B89047] transition-colors">
                    Teams perform.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-light">
                    Collaboration standards rise, operational friction drops, and complex projects are executed with speed and absolute alignment under expert guidance.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group border-b border-[#E2E8F0]/80 hover:border-[#B89047] pb-6 pt-4 transition-all duration-300 relative flex gap-5 sm:gap-6 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5 group-hover:bg-[#B89047]/15 transition-colors">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="text-base sm:text-lg font-extrabold text-[#0B1B3D] uppercase tracking-wider group-hover:text-[#B89047] transition-colors">
                    Opportunities expand.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-light">
                    Higher capability levels drive scalable solutions, opening doors to international collaborations, structural funding, and resilient long-term expansion.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. SECTION 3: Choose the Path That's Right for You */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0B1B3D]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 space-y-3">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">CHOOSE YOUR FOCUS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Choose the Path That's Right for You
          </h2>
        </div>

        {/* Asymmetrical Cards Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: SCHOOL OF EXECUTIVE SUCCESS (Premium White Vibe) */}
          <div className="bg-white text-[#0B1B3D] rounded-2xl p-6 sm:p-10 border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#B89047]/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B89047]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[9px] font-bold text-[#B89047] tracking-[0.2em] bg-[#B89047]/15 border border-[#B89047]/20 px-3 py-1 rounded-full uppercase">
                  For CEOs, Directors, and Executive Leadership Teams
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] mb-3 uppercase tracking-wide">
                SCHOOL OF EXECUTIVE SUCCESS
              </h3>
              
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-6 font-light">
                Develop the strategic capability to lead with confidence and build exceptional organisations that outperform.
              </p>
              
              <div className="border-t border-[#E2E8F0]/60 pt-4 mb-8">
                <h4 className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest mb-3">Includes:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 font-sans">
                  {[
                    { title: 'Executive Coaching', desc: 'Personal strategic guidance to accelerate leadership impact.' },
                    { title: 'Executive Mentoring', desc: 'Expert real-world insights to navigate complex decisions.' },
                    { title: 'CEO Masterclasses', desc: 'High-impact cohorts focused on corporate transformation.' },
                    { title: 'Executive Strategy', desc: 'Tactical planning and structures for sustainable growth.' },
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
            </div>

            <Link
              href="/executive-success"
              className="w-full py-3 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold uppercase tracking-wider text-[10px] rounded-lg text-center shadow-sm transition-all"
            >
              Explore Executive Success
            </Link>
          </div>

          {/* Card 2: SCHOOL OF ACADEMIC & WORKFORCE EXCELLENCE (Warm White Vibe) */}
          <div className="bg-white text-[#0B1B3D] rounded-2xl p-6 sm:p-10 border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#B89047]/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0B1B3D]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[9px] font-bold text-[#0B1B3D] tracking-[0.2em] bg-[#0B1B3D]/5 border border-[#0B1B3D]/10 px-3 py-1 rounded-full uppercase">
                  For Universities, Schools, and Public Organisations
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] mb-3 uppercase tracking-wide">
                SCHOOL OF ACADEMIC EXCELLENCE
              </h3>
              
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-6 font-light">
                Equip your learners and teams with the skills needed to perform and build future-ready careers that excel.
              </p>

              <div className="border-t border-[#E2E8F0]/60 pt-4 mb-8">
                <h4 className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest mb-3 font-sans">Includes:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 font-sans">
                  {[
                    { title: 'Erasmus+ Training', desc: 'Certified professional courses for European educators.' },
                    { title: 'Artificial Intelligence', desc: 'Practical AI skills to automate and raise productivity.' },
                    { title: 'Workforce Capability', desc: 'Modern skill development built for industrial excellence.' },
                    { title: 'International Learning', desc: 'Enriching academic standards through global partnerships.' },
                    { title: 'Professional Growth', desc: 'Accredited training programs designed for actual impact.' }
                  ].map(item => (
                    <li key={item.title} className="flex items-start gap-2.5 text-xs text-[#64748B]">
                      <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                      <div>
                        <span className="font-bold text-[#0B1B3D] block">{item.title}</span>
                        <span className="font-light text-[11px] leading-tight block mt-0.5">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/academic-excellence"
              className="w-full py-3 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-bold uppercase tracking-wider text-[10px] rounded-lg text-center shadow-sm transition-all"
            >
              Explore Academic & Workforce Excellence
            </Link>
          </div>

        </div>
      </section>

      {/* 5. SECTION 4: Why Organisations Partner With PGT (Centered & Full Content Grid) */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#E2E8F0]/60 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PARTNERSHIP QUALITY</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Why Organisations Partner With PGT
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] font-light max-w-2xl mx-auto">
              Because learning should create results, not simply certificates. We partner with leaders to drive real world institutional impact.
            </p>
          </div>

          {/* Full Content Grid (3 Columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: 'Strengthen Leadership',
                desc: 'Equipping executive teams with the confidence, clarity, and strategic capabilities needed to outperform.'
              },
              {
                title: 'Workforce Performance',
                desc: 'Transforming core team dynamics to elevate daily execution standards and operational productivity.'
              },
              {
                title: 'Future Ready Careers',
                desc: 'Preparing students and professionals with highly relevant, accredited, and adaptable modern skills.'
              },
              {
                title: 'Confidential AI Adoption',
                desc: 'Harnessing Artificial Intelligence securely to streamline tasks, raise efficiency, and scale output.'
              },
              {
                title: 'Erasmus Opportunities',
                desc: 'Maximizing funded mobility programs to integrate best practices and build European networks.'
              },
              {
                title: 'Bespoke Learning Designs',
                desc: 'Customizing and delivering specialized learning tracks that directly align with your business goals.'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E2E8F0]/40 shadow-sm flex items-start gap-4 hover:shadow-md hover:border-[#B89047]/20 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 text-left">
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

      {/* 6. SECTION 5: Results That Matter (Sophisticated displays, smaller metrics) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative border-b border-[#E2E8F0]/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B89047] uppercase block">METRICS OF TRUST</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Results That Matter
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl mx-auto font-light">
            A proven record of delivering measurable value, international scope, and institutional growth.
          </p>
        </div>

        {/* High-end Thin Border grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#E2E8F0] rounded-2xl overflow-hidden border border-[#E2E8F0] relative z-10">
          {[
            { stat: '25+', label: 'Years supporting organisations to develop their people' },
            { stat: '6,000+', label: 'Professionals developed through practical programs' },
            { stat: '500+', label: 'Accredited learning experiences delivered by experts' },
            { stat: 'Europe-wide', label: 'International partnerships with leading institutions' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 flex flex-col justify-between h-48 hover:bg-[#FAF9F6]/50 transition-colors">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#B89047] block tracking-tight leading-none mb-2">
                  {item.stat}
                </span>
              </div>
              <p className="text-[10px] text-[#64748B] leading-relaxed font-bold uppercase tracking-wider pt-4 border-t border-[#E2E8F0]/40">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SECTION 6: Learning That Delivers Measurable Impact */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[90px] pointer-events-none" />
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-10 lg:mb-12 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">Outcome Scoping</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Learning That Delivers Measurable Impact
            </h2>
            <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="space-y-4 text-[#64748B] text-xs sm:text-sm leading-relaxed font-light">
                <p>
                  Every organisation is different. That is why every learning journey begins with understanding your goals, rather than selling a standard programme. Whether you need executive development, Erasmus training, AI capability, or workforce transformation, we design solutions around the outcomes you want to achieve.
                </p>
                <p>
                  Our experienced consulting specialists work closely with your directors to map key competency gaps and build certified curriculums that align with your institutional objectives. By combining global best practices with practical applications, we ensure your team gains the actionable capability needed to drive long term growth, innovation, and measurable performance success.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#0B1B3D] text-white font-bold uppercase tracking-wider text-[10px] rounded-lg shadow-sm hover:bg-[#0B1B3D]/95 transition-all"
                >
                  Discuss Your Requirements
                </Link>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[240px] lg:h-[280px] border border-[#E2E8F0]/80 shadow-md">
              <Image
                src="/paragonimage2.png"
                alt="Learning outcomes scoping session"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 8. SECTION 7: Knowledge That Keeps You Ahead (Full-Width Visual Cards Grid) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-[#E2E8F0]/40 relative">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B89047] uppercase block">CURATED PERSPECTIVES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Knowledge That Keeps You Ahead
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl mx-auto font-light mt-2">
            Access practical resources created by our specialists.
          </p>
        </div>

        {/* 3-Column Premium Card Grid spanning the entire section width */}
        <div className="space-y-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                cat: 'Executive Guides', 
                desc: 'Specialized strategic guides designed to accelerate executive decision making and sustainable corporate growth.', 
                icon: BookOpen,
                image: '/bgimage.png'
              },
              { 
                cat: 'Artificial Intelligence', 
                desc: 'Practical implementation manuals to automate administrative workflows and adopt advanced AI securely.', 
                icon: Cpu,
                image: '/ai.png'
              },
              { 
                cat: 'Erasmus+ Mobilities', 
                desc: 'Planning checklists and outcome templates to maximize funding impact across European institutions.', 
                icon: Globe,
                image: '/erasmus.png'
              },
              { 
                cat: 'Professional Development', 
                desc: 'Accredited programs engineered to elevate core workforce career skills and institutional standards.', 
                icon: GraduationCap,
                image: '/development.png'
              },
              { 
                cat: 'Research & White Papers', 
                desc: 'Data driven publications, industry benchmarks, and strategic operational insights for managers.', 
                icon: FileText,
                image: '/research.jpg'
              },
              { 
                cat: 'Video Insights', 
                desc: 'High impact expert masterclasses and lessons covering modern educational and leadership priorities.', 
                icon: PlayCircle,
                image: '/paragonimage2.png'
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0]/80 shadow-sm hover:shadow-lg hover:border-[#B89047]/30 transition-all duration-300 flex flex-col group text-left"
                >
                  {/* Card Cover Image */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden border-b border-[#E2E8F0]/40">
                    <Image
                      src={item.image}
                      alt={item.cat}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 group-hover:bg-[#B89047]/15 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-[#0B1B3D] uppercase tracking-wide block">
                          {item.cat}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Centered Large Button */}
          <div className="pt-4 flex justify-center">
            <Link
              href="/knowledge-hub"
              className="inline-flex items-center justify-center gap-2 px-12 sm:px-16 py-3.5 bg-[#0B1B3D] text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:bg-[#0B1B3D]/95 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all w-full sm:w-auto"
            >
              <span>Visit the Resource Hub</span>
              <ArrowRight className="w-4 h-4 text-[#B89047]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION (Elegant Slate Vibe, small fonts) */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-20 relative z-10">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-8 sm:p-12 lg:p-14 border border-[#0B1B3D]/80 shadow-xl relative overflow-hidden">
          {/* Subtle gold-framed borders */}
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/10 rounded-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[90px] pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/15 px-3 py-1.5 rounded-full inline-block mb-4 border border-[#B89047]/20">
            PARTNERSHIP INQUIRY
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase tracking-tight">
            Let's Build What's Next
          </h2>
          
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 text-xs font-light">
            Whether you're leading an organisation, preparing future professionals or investing in workforce capability, we're ready to help you achieve measurable results. Let's start with a conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center relative z-10">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold tracking-wider rounded-lg text-center uppercase text-[10px] shadow-sm"
            >
              Book a Consultation
            </Link>
            <Link
              href="/learning-pathways"
              className="w-full sm:w-auto px-6 py-3 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-bold tracking-wider rounded-lg text-center uppercase text-[10px]"
            >
              Explore Our Programmes
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
