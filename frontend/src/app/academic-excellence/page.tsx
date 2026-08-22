import Link from 'next/link'
import Image from 'next/image'
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
  School,
  PlayCircle,
  FileText,
  TrendingUp
} from 'lucide-react'

export const metadata = {
  title: 'School of Academic & Workforce Excellence — PGT',
  description: 'Developing Future-Ready People. Strengthening Organisations. Creating Lasting Impact. Partner with PGT for Erasmus+, AI capability, and workforce development.',
}

export default function AcademicExcellencePage() {
  return (
    <main className="pt-20 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Intro/Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 sm:pt-6 pb-16 sm:pb-20 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block">
            SCHOOL OF ACADEMIC & WORKFORCE EXCELLENCE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] leading-tight max-w-5xl mx-auto">
            Developing Future Ready People. Strengthening Organisations. Creating Lasting Impact.
          </h1>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
        </div>

        {/* Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (7 Cols): Editorial Text Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
              <p>
                The future belongs to organisations that never stop learning. Today learners need more than knowledge, professionals need more than qualifications, and modern organisations need more than basic training. They need people who can adapt, innovate, and perform in a rapidly changing world.
              </p>
              <p>
                At Paragon Global Training, we partner with universities, VET providers, schools, employers, and public organisations globally. We design learning experiences that strengthen capability, improve employability, and deliver measurable organisational impact.
              </p>
              <p>
                By bridging the gap between academic theory and practical workforce execution, we ensure that every training curriculum drives actual career readiness and institutional excellence. Our coordinators collaborate closely with your administrative directors to align our specialized courses with your local timeline, regulatory compliance, and performance milestones.
              </p>
            </div>
            
            {/* Clean layout of button actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E2E8F0]/80">
              <Link
                href="/learning-pathways?school=academic"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0B1B3D] hover:bg-[#0B1B3D]/90 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all w-full sm:w-auto text-center"
              >
                Explore Our Programmes
              </Link>
              <Link
                href="/contact?reason=academic"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:bg-[#FAF9F6] transition-all w-full sm:w-auto text-center"
              >
                Book a Consultation
              </Link>
            </div>
          </div>

          {/* Right Column (5 Cols): Classroom Environment Visual Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/erasmus.png"
              alt="PGT Academic and workforce development university lecture environment"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
          </div>

        </div>
      </section>

      {/* Why This Matters (Centered Header & Symmetrical Grid with Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-b border-[#E2E8F0]/40 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">WHY THIS MATTERS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Learning Should Deliver More Than Knowledge
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
        </div>

        {/* Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (7 Cols): Editorial Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
              <p>
                Every investment in learning must create tangible, enduring value. It should benefit individual careers, strengthen organisational performance, and drive wider societal progress. By aligning educational standards with market priorities, we turn training into progress.
              </p>
              <p>
                That is why every programme we design is built around practical application, measurable outcomes, and lasting capability. We ensure that participants gain the confidence and strategic mindset required to excel and contribute to their institution.
              </p>
            </div>
            <p className="font-extrabold text-sm sm:text-base text-[#0B1B3D] uppercase tracking-wide border-t border-[#E2E8F0]/80 pt-4">
              Because the real value of learning is not what participants know when they finish. It is what they are able to achieve afterwards.
            </p>
          </div>

          {/* Right Column (5 Cols): Cover Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/development.png"
              alt="PGT educational resources and student documentation scoping"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>

        </div>
      </section>

      {/* Our Philosophy (Centered Header & Symmetrical Grid with Left Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-b border-[#E2E8F0]/40 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">OUR PHILOSOPHY</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Connecting Learning with Real World Performance
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
        </div>

        {/* Symmetric Columns Grid - Image on the Left, Text on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (5 Cols): Class Whiteboard Strategic Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/paragonimage2.png"
              alt="Paragon Global Training classroom whiteboard strategic session"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>

          {/* Right Column (7 Cols): Editorial Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
              <p>
                We believe learning should prepare people for the opportunities of tomorrow, not simply the static requirements of today. Every programme combines academic excellence with practical application, enabling participants to develop the confidence, capability, and adaptability needed to perform in an evolving global workplace.
              </p>
              <p>
                This core philosophy shapes every single learning experience delivered by PGT. By collaborating with elite academic partners and leading international employers, we continuously elevate teaching standards and prepare future ready professionals to lead with confidence.
              </p>
            </div>
            <p className="font-extrabold text-xs text-[#B89047] uppercase tracking-widest font-mono border-t border-[#E2E8F0]/80 pt-4">
              ★ SHAPING EUROPEAN EDUCATION FOR OVER 25 YEARS
            </p>
          </div>

        </div>
      </section>

      {/* The PGT Future-Ready Framework™ (5 foundations) (Centered Header & Symmetrical Grid) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-[#E2E8F0]/40 font-sans relative">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PEDAGOGICAL CORE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            The PGT Future Ready Framework™
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
            Our programmes are built around five interconnected foundations that prepare individuals and organisations for long term growth and success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {[
            { title: 'Knowledge', desc: 'Develop current, relevant expertise aligned specifically with today professional environment.' },
            { title: 'Capability', desc: 'Turn active learning into confident action, clear progress, and measurable performance.' },
            { title: 'Innovation', desc: 'Embrace advanced Artificial Intelligence, digital technologies, and modern strategic paths.' },
            { title: 'Global Perspective', desc: 'Strengthen international collaboration through Erasmus Plus and cross cultural learning.' },
            { title: 'Impact', desc: 'Create meaningful, long lasting value for ambitious individuals, groups, and communities.' },
          ].map((foundation, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm hover:border-[#B89047]/30 transition-all flex flex-col justify-between h-44">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#B89047]/10 text-[#B89047] flex items-center justify-center font-bold text-[10px] mb-3">
                  0{idx+1}
                </span>
                <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">{foundation.title}</h3>
                <p className="text-[11px] text-[#0B1B3D] leading-relaxed font-normal">{foundation.desc}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0]/40 text-[9px] uppercase font-bold text-[#B89047] tracking-widest font-mono">
                Foundation {idx+1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Academic Solutions (Centered Header & Symmetrical Grid) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-[#E2E8F0]/40 font-sans relative">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">OUR SOLUTIONS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Learning Designed Around Your Goals
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
            Whether your objective is professional development, organisational capability or international collaboration, our programmes are designed to create measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {[
            { title: 'Erasmus Plus Development', desc: 'Design high impact training programs fully aligned with European learning priorities and structural quality standards.' },
            { title: 'Artificial Intelligence', desc: 'Deliver practical Artificial Intelligence courses that help educators and team professionals work confidently and productively.' },
            { title: 'Workforce Capability', desc: 'Develop highly adaptable, collaborative, and high performing staff teams fully prepared for modern operational environments.' },
            { title: 'Future Skills Focus', desc: 'Equip ambitious academic learners, researchers, and professional staff with critical competencies for tomorrow global economy.' },
            { title: 'Staff Mobility Programs', desc: 'Promote system wide educational innovation, cross border collaboration, and the structured exchange of international best practices.' },
            { title: 'International Learning', desc: 'Create immersive, global learning experiences that broaden professional perspectives and strengthen long term capability.' },
            { title: 'Bespoke Learning Solutions', desc: 'Tailor custom training programs specifically created around your unique institutional objectives, people, and core challenges.' }
          ].map((sol, idx) => (
            <div key={idx} className={`bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:border-[#B89047]/20 ${idx === 6 ? 'md:col-span-2 lg:col-span-3 border-[#B89047]/20 bg-[#FAF9F6]' : ''}`}>
              <div>
                <span className="text-[#B89047] text-[10px] font-bold tracking-widest block mb-2 uppercase font-mono">// Solution 0{idx+1}</span>
                <h3 className="font-bold text-[#0B1B3D] text-sm uppercase tracking-wide leading-tight mb-2">{sol.title}</h3>
                <p className="text-xs text-[#0B1B3D] leading-relaxed mb-6 font-normal">{sol.desc}</p>
              </div>
              <Link href="/contact?reason=academic" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#B89047] uppercase tracking-widest hover:text-[#0B1B3D] transition-colors self-start border-t border-[#E2E8F0]/40 pt-3 w-full">
                <span>Request details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Erasmus+ Excellence Highlight Section (Centered Header & Symmetrical Grid) */}
      <section className="bg-[#0B1B3D] text-white py-16 lg:py-20 border-y border-slate-900 relative font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">ERASMUS PLUS EXCELLENCE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Maximise the Value of Every Erasmus Plus Mobility
            </h2>
            <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column (7 Cols): Symmetrical Narrative Block */}
            <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
              <div className="text-xs sm:text-sm text-slate-100 leading-relaxed space-y-4 font-normal">
                <p>
                  Paragon Global Training works with Higher Education Institutions, VET providers, schools, adult education organisations, and public bodies across Europe to deliver development programmes aligned directly with Erasmus Plus priorities.
                </p>
                <p>
                  Where eligible, Erasmus Plus funding can significantly reduce, or fully cover, the cost of institutional participation. We provide exhaustive planning support, documentation assistance, and learning agreement development to ensure seamless mobilization.
                </p>
                <p>
                  Our certified programmes align with Key Action 1 and Key Action 2 standards to guarantee European recognized credit equivalence, maximizing institutional value.
                </p>
              </div>
            </div>

            {/* Right Column (5 Cols): Bullet checklist card with CTA */}
            <div className="lg:col-span-5 bg-slate-900/40 p-6 sm:p-8 rounded-xl border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-[#B89047] text-xs uppercase tracking-wide border-b border-slate-800 pb-2 mb-4">
                  We Help Organisations:
                </h3>
                <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-200 mb-6 font-sans">
                  {[
                    'Strengthen internationalisation',
                    'Enhance professional capability',
                    'Support digital transformation',
                    'Integrate Artificial Intelligence',
                    'Promote inclusion and sustainability',
                    'Deliver measurable learning outcomes',
                    'Maximise the impact of every mobility'
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#B89047] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/learning-pathways?pathway=erasmus"
                className="block w-full py-3.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white text-center font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Explore Erasmus Plus Opportunities
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Who We Work With (Centered Header & Symmetrical Grid) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-b border-[#E2E8F0]/40 font-sans relative">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">WHO WE WORK WITH</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Supporting Learning Across Europe
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
            Our specialised professional development programmes are tailored explicitly for educational institutions and workforce employers across Europe. Every programme is designed around your objectives, participant profile, and desired outcomes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { label: 'Universities & HEIs', icon: School },
            { label: 'Academic Schools', icon: GraduationCap },
            { label: 'VET Providers', icon: Award },
            { label: 'Adult Education Centres', icon: BookOpen },
            { label: 'Corporate Employers', icon: Users },
            { label: 'Public Organisations', icon: Globe },
            { label: 'Non Governmental Groups', icon: Compass },
            { label: 'International Networks', icon: Sparkles }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#E2E8F0] flex items-center gap-3 shadow-sm hover:border-[#B89047]/20 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#0B1B3D] uppercase tracking-wide">{item.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why Organisations Partner with PGT (Centered Header & Symmetrical Grid with Image - Compacted Layout) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 mb-8 border-b border-[#E2E8F0]/40 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-6 lg:mb-8 space-y-2 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PARTNERSHIP QUALITY</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Why Organisations Partner with PGT
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-2.5 rounded" />
        </div>

        {/* Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column (7 Cols): Symmetrical Benefits Block */}
          <div className="lg:col-span-7 space-y-4 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed font-normal">
              <p>
                Organisations choose PGT because we focus on outcomes rather than activity. Our programmes combine international best practice with practical application, ensuring participants leave ready to implement what they have learned.
              </p>
            </div>
            
            {/* 7 Symmetrical Bullet Points List */}
            <div className="space-y-2.5 pt-3.5 border-t border-[#E2E8F0]/80">
              {[
                'Develop future ready people through custom curricula.',
                'Strengthen workforce capability across technical fields.',
                'Improve organisational performance and work outcomes.',
                'Increase learner engagement with modern learning paths.',
                'Integrate Artificial Intelligence with total confidence.',
                'Maximise Erasmus Plus investment with certified systems.',
                'Build a corporate culture of continuous group learning.'
              ].map((point, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E2E8F0]/40 flex items-start gap-4 hover:border-[#B89047]/20 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-[#0B1B3D] leading-relaxed font-normal">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 Cols): Strategic Workbook Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[200px] lg:h-[260px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/development.png"
              alt="Practical educational workbook and scoping template"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>

        </div>
      </section>

      {/* Beyond the Classroom section (Centered Header & Symmetrical Grid with Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-b border-[#E2E8F0]/40 font-sans relative">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">BEYOND THE CLASSROOM</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Supporting Continuous Professional Growth
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
        </div>

        {/* Symmetric Columns Grid - Text/Cards on Left, Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (7 Cols): Narrative and Symmetrical 7-Card Grid */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed font-normal space-y-4">
              <p>
                Learning does not end when a professional development programme finishes. Every partnership with PGT provides access to a growing ecosystem of practical resources, strategic insights, and professional development tools designed to support continuous improvement.
              </p>
              <p className="font-bold text-[#B89047] uppercase tracking-wide text-xs">
                Everything is created specifically to help your organisation sustain capability long after the learning experience has ended.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-[#E2E8F0]/80">
              {[
                { title: 'Practical Guides', icon: BookOpen, detail: 'Detailed publications covering modern pedagogical guidelines.' },
                { title: 'Video Learning', icon: PlayCircle, detail: 'Compact micro learning briefings delivered by field experts.' },
                { title: 'Toolkits & Templates', icon: FileText, detail: 'Practical spreadsheets to optimize academic administration.' },
                { title: 'AI Resources', icon: Cpu, detail: 'Comprehensive prompt libraries for secure classroom integrations.' },
                { title: 'Erasmus Plus Planners', icon: Globe, detail: 'Exhaustive planning documents to streamline credit mobility.' },
                { title: 'Research & Insights', icon: TrendingUp, detail: 'Empirical research reports covering modern industry trends.' },
                { title: 'Webinars & Masterclasses', icon: Users, detail: 'High impact interactive sessions with our managing partners.' }
              ].map((resource, idx) => {
                const Icon = resource.icon
                return (
                  <div key={idx} className={`bg-[#FAF9F6] border border-[#E2E8F0] p-4 rounded-xl flex flex-col justify-between shadow-sm h-32 hover:border-[#B89047]/20 transition-all duration-300 text-left ${idx === 6 ? 'sm:col-span-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide leading-tight">{resource.title}</h4>
                    </div>
                    <p className="text-[11px] text-[#0B1B3D] font-normal leading-relaxed">{resource.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column (5 Cols): Cover Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/development.png"
              alt="Practical resources and professional development scoping"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>

        </div>
      </section>

      {/* Final Call to Action (Premium Deep Navy Card - Widened with Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative z-10 font-sans">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-8 sm:p-12 border border-[#0B1B3D]/80 shadow-xl relative overflow-hidden group">
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/10 rounded-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
            
            {/* Left Column (7 Cols): Editorial Text Content & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">
                  READY TO PARTNER
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-none">
                  Build Capability. Create Opportunity. Deliver Impact.
                </h2>
                <div className="h-0.5 w-12 bg-[#B89047] rounded mt-4" />
              </div>

              {/* Narrative text in white */}
              <div className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal space-y-4">
                <p>
                  Whether you are strengthening your workforce, preparing future professionals, planning an Erasmus Plus mobility, or investing in organisational development, Paragon Global Training is ready to support your journey. Let us build a learning solution that creates measurable value for your people and your organisation.
                </p>
              </div>
              
              {/* Widened Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/contact?reason=academic"
                  className="px-12 sm:px-16 py-3.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all w-full sm:w-auto text-center"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/learning-pathways"
                  className="px-12 sm:px-16 py-3.5 bg-slate-900/40 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-[#0B1B3D] hover:bg-[#FAF9F6] font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all w-full sm:w-auto text-center"
                >
                  Explore Programmes
                </Link>
              </div>
            </div>

            {/* Right Column (5 Cols): Classroom Environment Visual Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-slate-800 shadow-md">
              <Image
                src="/erasmus.png"
                alt="PGT Academic and workforce development university lecture environment"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
