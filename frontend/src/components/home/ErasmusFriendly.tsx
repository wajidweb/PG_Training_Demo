'use client'

import { Globe, CheckCircle2, ShieldCheck, Award, Users, BookOpen } from 'lucide-react'

export default function ErasmusFriendly() {
  const impactCards = [
    {
      title: "Decades of Educational Legacy",
      description: "Supporting professional development and international mobility for higher education institutions around the globe.",
      icon: Award
    },
    {
      title: "Thousands of Empowered Staff",
      description: "Helping academics, researchers, and administrators build confidence and cultivate deep operational competence.",
      icon: Users
    },
    {
      title: "Hundreds of Tailored Programs",
      description: "Surgically designing practical, scenario-based curricula built around the precise goals of modern institutions.",
      icon: BookOpen
    }
  ]

  return (
    <section className="py-24 bg-[#223292] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -ml-48 -mb-48" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Core Narrative */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/20">
              <Globe className="w-4 h-4 text-blue-200" />
              <span className="text-white text-xs font-bold uppercase tracking-widest">Our Global Impact</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              Transforming Professionals Around The World
            </h2>
            
            <p className="text-blue-100 text-lg leading-relaxed mb-10">
              We are committed to delivering high-impact professional development solutions that drive institutional success. Through our deep understanding of the global higher education landscape, we empower educators and administrative teams to navigate complex international challenges, improve operational efficiency, and lead with strategic foresight.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Enhanced academic competence",
                "Advanced research writing",
                "Immersive scenario learning",
                "Inclusive campus environments",
                "Administrative excellence",
                "Strategic leadership training",
                "Robust cybersecurity systems",
                "Fostered student success models"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-300 flex-shrink-0" />
                  <span className="text-blue-50 text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Impact Showcase Panels */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-20 h-24 bg-amber-400 rounded-3xl flex items-center justify-center shadow-lg rotate-12">
                <ShieldCheck className="w-12 h-12 text-[#223292]" />
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-8 leading-tight">
                Our Global Legacy and Capability
              </h3>
              
              <div className="space-y-6">
                {impactCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <div key={card.title} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-slate-50 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#223292] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-gray-900 font-extrabold text-sm uppercase tracking-wide leading-tight">
                          {card.title}
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
