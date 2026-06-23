'use client'

import { Target, Compass, Sparkles } from 'lucide-react'

export default function VisionMission() {
  return (
    <section className="py-24 sm:py-32 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-[#223292]" />
            <span className="text-[#223292] text-xs font-extrabold uppercase tracking-widest">
              Mission & Vision
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-gray-900">
            Guiding Our Purpose and Impact
          </h2>
        </div>

        {/* Master Vision & Mission Card Panel */}
        <div className="relative bg-slate-50 border border-gray-100 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-sm overflow-hidden group">
          {/* Decorative background shapes */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start divide-y md:divide-y-0 md:divide-x divide-gray-200/80">
            
            {/* Mission Section */}
            <div className="space-y-6 md:pr-10 lg:pr-16">
              <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-[#223292] shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase tracking-wider text-gray-900">
                  Our Mission
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-[#223292]/80">
                  Practical Capability Building
                </p>
              </div>
              
              <p className="text-gray-600 text-lg sm:text-xl font-medium leading-relaxed">
                We design useful, real-world learning programs that help educators and administrative teams grow their skills, gain confidence, and achieve lasting success.
              </p>
            </div>

            {/* Vision Section */}
            <div className="space-y-6 pt-10 md:pt-0 md:pl-16">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#C85A43] shadow-sm border border-orange-100">
                <Target className="w-6 h-6" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-wider text-gray-900">
                  Our Vision
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-[#C85A43]/90">
                  Inspiring Growth Globally
                </p>
                <p className="text-gray-600 text-lg sm:text-xl font-medium leading-relaxed pt-3">
                  To inspire professionals and build stronger institutions around the globe through the power of practical, life-changing education.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
