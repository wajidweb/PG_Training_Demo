import { GraduationCap, Briefcase, UserCircle2, Building2 } from 'lucide-react'

const segments = [
  {
    title: 'Academic Professionals',
    icon: GraduationCap,
    items: ['University lecturers', 'Professors', 'Researchers', 'PhD candidates', 'Academic leaders', 'Faculty members'],
    color: '#223292' // Royal Blue
  },
  {
    title: 'Administrative Professionals',
    icon: Briefcase,
    items: ['Registry teams', 'Student services staff', 'Operations managers', 'Quality assurance personnel', 'Human resources', 'Institutional support'],
    color: '#45A29E' // Teal
  },
  {
    title: 'Leadership Professionals',
    icon: UserCircle2,
    items: ['Department heads', 'Directors', 'Senior managers', 'Institutional leaders', 'Project leaders', 'Emerging leaders'],
    color: '#C85A43' // Terracotta
  },
  {
    title: 'Organisations & Institutions',
    icon: Building2,
    items: ['Universities', 'Higher education institutions', 'Research centres', 'Government agencies', 'Public sector', 'Private enterprises'],
    color: '#F2D03B' // Gold
  }
]

export default function WhoWeServe() {
  return (
    <section className="py-24 sm:py-32 bg-[#0F1F12] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#223292]/20 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#45A29E]/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[1px] h-full bg-white/5 -translate-x-1/2 -translate-y-1/2 hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#F2D03B] animate-pulse" />
            <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">Our Global Reach</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">
            Who We <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Serve</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
            PG Training proudly supports a diverse range of professionals and institutions across the global higher education landscape, delivering bespoke solutions for every layer of academia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {segments.map((segment, i) => (
            <div 
              key={i} 
              className="group relative bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 overflow-hidden"
            >
              {/* Dynamic Glow Effect */}
              <div 
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: segment.color }} 
              />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-6 mb-10">
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                    style={{ backgroundColor: segment.color }}
                  >
                    <segment.icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: segment.title.includes('Organisations') ? '#0F1F12' : '#FFFFFF' }} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                    {segment.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {segment.items.map((item, j) => (
                    <span 
                      key={j} 
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 text-gray-300 border border-white/10 hover:bg-white/20 hover:text-white transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
