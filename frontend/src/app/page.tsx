import Link from 'next/link'
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
  ArrowUpRight
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
          
          {/* Left Block (5 Cols): Rounded Pure Visual Card (Ensuring 100% complete image visibility with no cropping) */}
          <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm relative min-h-[300px] lg:min-h-0 flex items-center justify-center p-6 sm:p-8">
            <img 
              src="/logo.jpg" 
              alt="Paragon Global Training" 
              className="w-full h-full max-h-[280px] lg:max-h-[340px] object-contain rounded-2xl select-none"
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

      {/* 3. SECTION 2: Your People Will Shape Your Future (Spacious pulling layout, smaller fonts) */}
      {/* 3. SECTION 2: Your People Will Shape Your Future (Highly Eye-Catching Growth Cascade Layout) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24 relative border-b border-[#E2E8F0]/40">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: McKinsey-Style Editorial Narrative Card */}
          <div className="lg:col-span-5 bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden group">
            {/* Soft decorative accent borders */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#B89047]" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B89047]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#B89047]">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Enterprise Reality</span>
              </div>
              
              <div className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal space-y-4">
                <p className="border-b border-[#E2E8F0]/50 pb-3 font-medium text-[#0B1B3D]">
                  Markets evolve.
                </p>
                <p className="border-b border-[#E2E8F0]/50 pb-3 font-medium text-[#0B1B3D]">
                  Technology changes.
                </p>
                <p className="border-b border-[#E2E8F0]/50 pb-3 font-medium text-[#0B1B3D]">
                  Artificial Intelligence is redefining how organisations operate.
                </p>
                <p className="font-light italic text-[#0B1B3D]/80">
                  But one competitive advantage remains constant.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] font-black uppercase text-[#B89047] tracking-wider">The constant benchmark</span>
                <span className="text-sm font-black text-[#0B1B3D] uppercase tracking-widest bg-[#B89047]/10 px-2.5 py-1 rounded-md">People.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Growth Cascade Timeline */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">OUR CORE THESIS</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight leading-tight">
                Your People Will Shape Your Future
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] font-light leading-relaxed">
                When people grow...
              </p>
            </div>

            {/* Vertical Cascade Stream */}
            <div className="relative pl-6 sm:pl-8 border-l border-[#B89047]/30 space-y-6">
              {[
                { label: 'Organisations innovate.', step: '01' },
                { label: 'Teams perform.', step: '02' },
                { label: 'Opportunities expand.', step: '03' }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-4 h-4 rounded-full border-2 border-[#B89047] bg-white flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B89047] group-hover:scale-125 transition-transform" />
                  </div>
                  
                  {/* Elegant cascade container */}
                  <div className="bg-white/40 hover:bg-white p-4 rounded-xl border border-[#E2E8F0]/80 shadow-sm hover:shadow-md hover:border-[#B89047]/20 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-[#B89047] font-bold">{item.step}</span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#0B1B3D] uppercase tracking-wider">
                        {item.label}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slogan & Outcome Alignment */}
            <div className="pt-6 border-t border-[#E2E8F0]/80 space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-[#0B1B3D]">
                That is why every programme we design focuses on one outcome:
              </p>
              <div className="inline-flex items-center gap-2 bg-[#B89047]/10 border border-[#B89047]/20 rounded-lg p-4 w-full">
                <div className="w-5 h-5 rounded-full bg-[#B89047]/15 flex items-center justify-center text-[#B89047] flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0B1B3D] uppercase tracking-wider leading-relaxed">
                  Helping people create measurable value for their organisation.
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SECTION 3: Choose the Path That's Right for You */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0B1B3D]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-2">CHOOSE YOUR FOCUS</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">
            Choose the Path That's Right for You
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2 font-light">
            Instead of long paragraphs, use two large visual cards.
          </p>
        </div>

        {/* Asymmetrical Cards Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: SCHOOL OF EXECUTIVE SUCCESS (Premium slate-dark) */}
          <div className="bg-[#0E1629] text-white rounded-2xl p-6 sm:p-10 border border-slate-800/80 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-[#B89047]/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B89047]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[9px] font-bold text-[#B89047] tracking-[0.2em] bg-[#B89047]/15 border border-[#B89047]/20 px-3 py-1 rounded-full uppercase">
                  For CEOs, Directors & Executive Teams
                </span>
                <span className="text-[10px] font-mono text-slate-500">// SUITE 01</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 uppercase tracking-wide">
                SCHOOL OF EXECUTIVE SUCCESS
              </h3>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                Develop the strategic capability to lead with confidence, make better decisions and build organisations that outperform.
              </p>
              
              <div className="border-t border-slate-800/80 pt-4 mb-8">
                <h4 className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest mb-3">Includes:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {[
                    'Executive Coaching',
                    'Executive Mentoring',
                    'CEO Masterclasses',
                    'Executive Strategy',
                    'Organisational Transformation'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                      <span>{item}</span>
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
                  For Universities, VET Providers, Schools, Employers & Public Organisations
                </span>
                <span className="text-[10px] font-mono text-slate-400">// SUITE 02</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] mb-3 uppercase tracking-wide">
                SCHOOL OF ACADEMIC & WORKFORCE EXCELLENCE
              </h3>
              
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-6 font-light">
                Equip learners, professionals and teams with the capabilities needed to excel in today's workplace and tomorrow's economy.
              </p>

              <div className="border-t border-[#E2E8F0]/60 pt-4 mb-8">
                <h4 className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest mb-3 font-sans">Includes:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                  {[
                    'Erasmus+ Professional Development',
                    'Artificial Intelligence',
                    'Workforce Capability',
                    'International Learning',
                    'Professional Development'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#64748B] font-semibold">
                      <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                      <span>{item}</span>
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

      {/* 5. SECTION 4: Why Organisations Partner With PGT */}
      <section className="bg-white py-20 border-y border-[#E2E8F0]/60 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Heading */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">PARTNERSHIP QUALITY</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">
                Why Organisations Partner With PGT
              </h2>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-light">
                Because learning should create results—not simply certificates. We help organisations:
              </p>
            </div>

            {/* Right: Checklists grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#0B1B3D]">
              {[
                'Strengthen leadership capability',
                'Improve workforce performance',
                'Prepare future-ready professionals',
                'Embrace Artificial Intelligence confidently',
                'Maximise Erasmus+ opportunities',
                'Design bespoke learning solutions aligned with organisational goals'
              ].map((reason, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E2E8F0]/40 shadow-sm flex items-start gap-3"
                >
                  <div className="w-4 h-4 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wide leading-relaxed">{reason}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. SECTION 5: Results That Matter (Sophisticated displays, smaller metrics) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative border-b border-[#E2E8F0]/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B89047] uppercase block mb-1">METRICS OF TRUST</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">Results That Matter</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Instead of talking about ourselves... show measurable proof.
          </p>
        </div>

        {/* High-end Thin Border grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#E2E8F0] rounded-2xl overflow-hidden border border-[#E2E8F0]">
          {[
            { stat: '25+', label: 'Years helping organisations develop their people' },
            { stat: '6,000+', label: 'Professionals trained' },
            { stat: '500+', label: 'Learning experiences delivered' },
            { stat: 'Europe-wide', label: 'Partnerships with organisations and educational institutions' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 flex flex-col justify-between h-48 hover:bg-[#FAF9F6]/50 transition-colors">
              <div>
                <span className="text-[9px] font-mono text-[#B89047] block mb-4">// STAT 0{idx+1}</span>
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
        <div className="bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[90px] pointer-events-none" />
          
          {/* Left Block */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block">Outcome Scoping</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight leading-tight">
              Learning That Delivers Measurable Impact
            </h2>
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-light">
              Every organisation is different. That is why every learning journey begins with understanding your goals—not selling a programme. Whether you need executive development, Erasmus+ training, AI capability or workforce transformation, we design solutions around the outcomes you want to achieve.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#0B1B3D] text-white font-bold uppercase tracking-wider text-[10px] rounded-lg shadow-sm hover:bg-[#0B1B3D]/95 transition-all"
              >
                Discuss Your Requirements
              </Link>
            </div>
          </div>

          {/* Right Block */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-6 border border-[#E2E8F0] rounded-xl shadow-inner space-y-4">
            <h3 className="font-bold text-[#0B1B3D] text-[10px] uppercase tracking-widest border-b border-[#E2E8F0]/60 pb-2">// Engagement Process</h3>
            <div className="space-y-3.5">
              {[
                { title: 'Step 1: Scoping Objectives', desc: 'Scoping exact institutional blockages, resource goals, and AI directions.' },
                { title: 'Step 2: Designing the Pathway', desc: 'Tailoring structured, certified curricula matching your budget and schedule.' },
                { title: 'Step 3: Measuring Outcomes', desc: 'Validating staff knowledge transfer, performance indices, and mobility standards.' }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#B89047]/10 text-[#B89047] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {idx+1}
                  </span>
                  <div>
                    <h4 className="font-bold text-[#0B1B3D] text-[11px] uppercase tracking-wide">{step.title}</h4>
                    <p className="text-[10px] text-[#64748B] mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. SECTION 7: Knowledge That Keeps You Ahead */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-[#E2E8F0]/40 relative">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 border-b border-[#E2E8F0]/60 pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">CURATED PERSPECTIVES</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] uppercase tracking-tight">Knowledge That Keeps You Ahead</h2>
          </div>
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#B89047] hover:text-[#0B1B3D] transition-colors tracking-widest"
          >
            <span>Visit the Resource Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Cover card */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#B89047]/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="text-[9px] font-bold text-[#B89047] tracking-[0.2em] bg-[#B89047]/10 border border-[#B89047]/20 px-3 py-1 rounded-full uppercase inline-block mb-4">
                FEATURED RESOURCE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] mb-3 uppercase tracking-wide leading-tight">
                Access practical resources created by our specialists.
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-light">
                Explore research papers, implementation guidelines, planning templates, and video lessons tailored strictly for European educational organizations and enterprise managers.
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[#E2E8F0]/40 text-xs">
              <span className="text-[9px] text-[#64748B] uppercase font-mono">Aug 2026 • Curated Series</span>
              <Link href="/knowledge-hub" className="inline-flex items-center gap-1 font-bold text-[#B89047] uppercase tracking-widest hover:text-[#0B1B3D] transition-colors">
                <span>View resource hub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Categories */}
          <div className="lg:col-span-5 space-y-5">
            <h4 className="font-extrabold text-[#0B1B3D] text-[10px] uppercase tracking-widest border-b border-[#E2E8F0]/60 pb-2">// Curated Formats</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {[
                { cat: 'Executive Guides', icon: BookOpen },
                { cat: 'Artificial Intelligence', icon: Cpu },
                { cat: 'Erasmus+', icon: Globe },
                { cat: 'Professional Development', icon: GraduationCap },
                { cat: 'Research & White Papers', icon: FileText },
                { cat: 'Video Insights', icon: PlayCircle }
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#B89047]" />
                    <span className="text-[11px] font-bold text-[#0B1B3D] uppercase tracking-wide">{item.cat}</span>
                  </div>
                )
              })}
            </div>
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
