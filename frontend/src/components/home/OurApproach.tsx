'use client'

import { Search, PenTool, GraduationCap, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function OurApproach() {
  const steps = [
    {
      step: "Step One",
      title: "Understand Needs",
      description: "We conduct a thorough analysis of your professional goals and institutional structures, ensuring that every course matches the unique requirements of your educational environment.",
      icon: Search,
      color: "#223292", // Royal Blue
      bg: "bg-blue-50"
    },
    {
      step: "Step Two",
      title: "Design Solutions",
      description: "We craft innovative and practical training frameworks, utilizing a scenario-based design process to engineer relevant, high-impact learning experiences.",
      icon: PenTool,
      color: "#C85A43", // Terracotta
      bg: "bg-orange-50"
    },
    {
      step: "Step Three",
      title: "Deliver Expert Training",
      description: "Our interactive workshops are led by highly experienced international higher education professionals, utilizing real-world simulations to ensure active participation.",
      icon: GraduationCap,
      color: "#45A29E", // Teal
      bg: "bg-emerald-50"
    },
    {
      step: "Step Four",
      title: "Create Long-Term Impact",
      description: "We empower participants with actionable skills and confidence, allowing them to apply their knowledge directly in their active workplace environments.",
      icon: TrendingUp,
      color: "#F2D03B", // Gold
      bg: "bg-amber-50"
    }
  ]

  return (
    <section className="relative py-24 sm:py-32 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-[#223292]" />
            <span className="text-[#223292] text-xs font-extrabold uppercase tracking-widest">
              Our Approach
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-gray-900">
            How We Create Meaningful Learning Experiences
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Our established development process bridges the gap between academic theory and practical, real-world application, ensuring that institutional growth is sustainable and immediate.
          </p>
        </div>

        {/* Timeline Flow Steps */}
        <div className="relative">
          {/* Horizontal Connecting Line for Desktop */}
          <div className="absolute top-16 left-16 right-16 h-0.5 border-t-2 border-dashed border-gray-200/80 z-0 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((item) => {
              const Icon = item.icon
              return (
                <div 
                  key={item.step} 
                  className="flex flex-col items-center text-center space-y-6 group"
                >
                  {/* Floating Icon Frame */}
                  <div className="relative">
                    <div 
                      className={`w-24 h-24 rounded-3xl ${item.bg} border-4 border-white flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10`}
                      style={{ color: item.color }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    {/* Small Step Number Floating Tag */}
                    <div className="absolute -top-2.5 -right-2 bg-gray-900 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md z-20">
                      {item.step}
                    </div>
                  </div>

                  {/* Narrative details */}
                  <div className="space-y-3 px-2">
                    <h3 className="text-xl font-black uppercase tracking-wider text-gray-900 group-hover:text-[#223292] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section Footer Call to Action */}
        <div className="mt-20 text-center">
          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#223292] text-xs font-extrabold uppercase tracking-wider rounded-xl text-white hover:opacity-90 shadow-lg shadow-blue-900/20 transition-all"
          >
            See how our methodology is applied <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>

      </div>
    </section>
  )
}
