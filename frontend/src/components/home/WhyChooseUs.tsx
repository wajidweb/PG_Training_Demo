'use client'

import { useState } from 'react'
import { CheckCircle2, Star, TrendingUp, Sparkles } from 'lucide-react'

const sections = [
  {
    id: 'why',
    label: 'Why Choose Us',
    icon: Star,
    title: 'Experience That Matters',
    items: [
      { title: 'Experience That Matters', desc: 'With over 25 years of experience, we understand the realities of academic, administrative, and leadership environments.' },
      { title: 'Tailored Solutions', desc: 'Every programme is designed around participant needs, ensuring relevance and impact.' },
      { title: 'Practical Learning', desc: 'Participants gain actionable skills and tools that can be implemented immediately.' },
      { title: 'Collaborative Approach', desc: 'We work closely with individuals and institutions to create meaningful learning experiences.' },
      { title: 'Scenario-Based Learning', desc: 'Real-world situations help participants apply concepts effectively.' },
      { title: 'Measurable Outcomes', desc: 'Every programme focuses on tangible results and professional growth.' },
      { title: 'Flexible Delivery Options', desc: 'Face-to-face, online, hybrid, institutional workshops, or international mobility programmes.' },
      { title: 'Erasmus+ Compatibility', desc: 'Many programmes support recognised Erasmus+ learning outcomes and funding opportunities.' }
    ]
  },
  {
    id: 'difference',
    label: 'The Difference',
    icon: Sparkles,
    title: 'Catalysts for Transformation',
    items: [
      { title: 'Immediate Impact', desc: 'New skills can be applied immediately in professional settings.' },
      { title: 'Improved Performance', desc: 'Greater effectiveness in teaching, administration, management, and leadership.' },
      { title: 'Increased Confidence', desc: 'Enhanced ability to navigate challenges and opportunities.' },
      { title: 'Stronger Professional Networks', desc: 'Connections with peers, experts, and international collaborators.' },
      { title: 'Lasting Personal Growth', desc: 'Development of resilience, adaptability, and lifelong learning habits.' }
    ]
  },
  {
    id: 'outcomes',
    label: 'Expected Outcomes',
    icon: TrendingUp,
    title: 'Measurable Professional Growth',
    items: [
      { title: 'Enhanced Professional Competence', desc: 'Build and refine the skills essential for modern higher education roles.' },
      { title: 'Improved Communication Skills', desc: 'Navigate complex academic and operational environments with clarity.' },
      { title: 'Increased Leadership Effectiveness', desc: 'Lead teams and initiatives with stronger influence and vision.' },
      { title: 'Better Decision-Making Capabilities', desc: 'Approach institutional challenges with strategic clarity.' },
      { title: 'Stronger Problem-Solving Skills', desc: 'Develop practical solutions to everyday operational hurdles.' },
      { title: 'Greater Organisational Impact', desc: 'Drive positive change within your department or faculty.' },
      { title: 'Improved Digital Readiness', desc: 'Leverage modern digital tools for better teaching and administration.' },
      { title: 'Enhanced Research & Teaching', desc: 'Boost academic performance, publication strategies, and student engagement.' },
      { title: 'Increased Confidence & Motivation', desc: 'Tackle new professional milestones with renewed energy.' },
      { title: 'Expanded International Perspectives', desc: 'Broaden your horizons through global best practices and intercultural exchange.' }
    ]
  }
]

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState('why')
  const active = sections.find(s => s.id === activeTab) || sections[0]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">The PG Training Advantage</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our programmes are not simply educational events. They are catalysts for transformation, designed to deliver lasting growth and measurable impact.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-gray-50 rounded-[2rem] w-fit mx-auto border border-gray-100">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activeTab === section.id 
                  ? 'bg-white text-[#223292] shadow-md' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <section.icon className={`w-4 h-4 ${activeTab === section.id ? 'text-[#223292]' : 'text-gray-400'}`} />
              {section.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#F8F9FA] rounded-[3rem] p-8 sm:p-16 border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-black text-gray-900 mb-8 leading-tight">
                {active.title}
              </h3>
              <div className="grid sm:grid-cols-1 gap-6">
                {active.items.map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 transition-transform group-hover:scale-110">
                      <CheckCircle2 className="w-5 h-5 text-[#45A29E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src={
                    activeTab === 'why' ? 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800' :
                    activeTab === 'difference' ? 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800' :
                    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
                  } 
                  alt={active.label}
                  className="w-full h-full object-cover transition-transform duration-1000"
                />
              </div>
              {/* Floating Stat */}
              <div className="absolute -bottom-6 -right-6 bg-[#223292] text-white p-8 rounded-3xl shadow-xl hidden sm:block">
                <div className="text-4xl font-black mb-1">98%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
