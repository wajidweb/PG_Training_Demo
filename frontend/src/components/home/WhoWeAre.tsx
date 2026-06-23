'use client'

import { GraduationCap, Award, Globe, Users, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function WhoWeAre() {
  const coreValues = [
    {
      title: "Transformative Professional Growth",
      description: "We believe that educational development should inspire lasting change, fostering confidence, resilience, and leadership.",
      icon: GraduationCap,
      color: "#223292", // Royal Blue
      bg: "bg-blue-50"
    },
    {
      title: "Bespoke Academic Curricula",
      description: "We design personalized training frameworks that address the specific challenges faced by academic and administrative teams.",
      icon: Award,
      color: "#C85A43", // Terracotta
      bg: "bg-orange-50"
    },
    {
      title: "Global Institutional Network",
      description: "Our legacy of excellence is reflected in the success of thousands of graduates leading institutions across several continents.",
      icon: Globe,
      color: "#45A29E", // Teal
      bg: "bg-emerald-50"
    }
  ]

  return (
    <section id="who-we-are" className="py-20 sm:py-24 bg-gradient-to-b from-gray-50/50 to-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-[#223292]/10">
              <span className="text-[#223292] text-xs font-extrabold uppercase tracking-widest">
                Who We Are
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Nurturing Academic and Leadership Excellence <span style={{ color: '#223292' }}>Worldwide</span>
            </h2>
            
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              At Paragon Global Training Academy, we cultivate professional mastery and facilitate institutional advancement. As the specialized professional development division of Paragon Global, we deliver educational experiences that transcend conventional training, creating sustainable pathways of growth that enrich institutions and empower careers.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              By leveraging an extensive portfolio of tailor-made curricula, we support educators, researchers, administrative personnel, and senior executives. Our immersive training methodologies are designed to build confidence, sharpen strategic foresight, and enable professionals to lead effectively.
            </p>

            {/* Core Values / Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 pt-6 border-t border-gray-100">
              {coreValues.map((val) => {
                const Icon = val.icon
                return (
                  <div key={val.title} className="flex gap-4 items-start group">
                    <div className={`p-3.5 rounded-2xl ${val.bg} transition-transform group-hover:scale-110 flex-shrink-0`} style={{ color: val.color }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base uppercase tracking-wider mb-1">
                        {val.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                        {val.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-6 flex flex-wrap gap-4 items-center">
              <Link
                href="/programmes"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#223292] text-white font-bold text-sm rounded-xl hover:opacity-90 shadow-lg shadow-blue-900/10 transition-all uppercase tracking-wider"
              >
                Our Programmes <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => document.getElementById('chatbot-trigger')?.click()}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors uppercase tracking-wider"
              >
                Connect with our Team
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Credentials */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-50" />
            
            {/* Main Visual Card */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl bg-white p-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000" 
                  alt="PG Training Seminar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Highlight list */}
              <div className="px-4 pb-4 space-y-4">
                <h4 className="font-extrabold text-gray-900 text-lg uppercase tracking-wide border-b border-gray-100 pb-2">
                  Key Credentials
                </h4>
                
                <div className="space-y-3">
                  {[
                    "Fully compatible with European educational funding initiatives",
                    "Elite facilitators from international higher education",
                    "Comprehensive collection of custom designed programmes",
                    "Globally respected credentials and certifications"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overlapping Floating Stats Card */}
            <div className="absolute -bottom-8 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hover:scale-105 transition-transform hidden sm:flex">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#223292]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900">Global</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-bold">Alumni Network</div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -top-6 right-4 bg-white py-3 px-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 hidden md:flex">
              <ShieldCheck className="w-5 h-5 text-[#223292]" />
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quality Assured</span>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  )
}
