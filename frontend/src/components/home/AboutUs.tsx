import { CheckCircle2, Globe2, Award, Users2, Rocket } from 'lucide-react'

const values = [
  'Extensive experience and proven results across 50+ countries',
  'Expert curriculum design tailored to higher education needs',
  'Scenario-based learning with measurable real-world outcomes',
  'Flexible delivery: online instructor-led, self-paced, and onsite',
  'Dedicated support from enrolment through certification',
]

export default function AboutUs() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#223292 2px, transparent 2px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Content Side */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#EBEFFF] px-4 py-2 rounded-full mb-6 border border-[#223292]/10">
              <Award className="w-4 h-4 text-[#223292]" />
              <span className="text-[#223292] text-xs font-bold uppercase tracking-wider">
                25-Year Legacy of Excellence
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
              Realising Excellence in <span style={{ color: '#223292' }}>Higher Education</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
              <p>
                At <strong className="text-gray-900">Paragon Global Training Academy</strong>, we have spent over two decades empowering academic and administrative staff through innovative, practical training programmes.
              </p>
              <p>
                Our expertise in curriculum development has led to the creation of over <strong>500+ tailored programmes</strong>, specifically designed to address the complex and evolving needs of modern higher education institutions worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#45A29E] transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium leading-snug">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vision/Mission Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 lg:pt-0">
            {[
              { 
                label: 'Our Mission', 
                text: 'Equip professionals with the skills and frameworks to excel in a global academic landscape.', 
                icon: Rocket,
                color: '#223292',
                bg: 'bg-[#EBEFFF]' 
              },
              { 
                label: 'Our Approach', 
                text: 'Scenario-based simulations and expert mentorship that translate into institutional impact.', 
                icon: Users2,
                color: '#45A29E',
                bg: 'bg-[#E6F4F3]' 
              },
              { 
                label: 'Global Reach', 
                text: 'From Malta to the world, serving over 4,000 partner institutions across 50+ countries.', 
                icon: Globe2,
                color: '#C85A43',
                bg: 'bg-[#FDF1EE]' 
              },
              { 
                label: 'Institutional Success', 
                text: 'We do not just train—we transform careers and drive long-term institutional performance.', 
                icon: Award,
                color: '#F2D03B',
                bg: 'bg-[#FFFBF0]' 
              },
            ].map((card, i) => (
              <div 
                key={i} 
                className={`${card.bg} rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group`}
              >
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:-rotate-6"
                  style={{ backgroundColor: 'white' }}
                >
                  <card.icon className="w-6 h-6" style={{ color: card.color }} />
                </div>
                <h4 className="font-black text-gray-900 mb-3 text-lg">{card.label}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Statistics Bar */}
        <div className="mt-20 pt-12 border-t border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Staff Trained', value: '3,000+' },
              { label: 'Institutions', value: '4,000+' },
              { label: 'Countries', value: '50+' },
              { label: 'Tailored Programmes', value: '500+' },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-[#45A29E] text-xs font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
