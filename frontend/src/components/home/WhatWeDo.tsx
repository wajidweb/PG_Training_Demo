'use client'

import { BookOpen, Layers, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function WhatWeDo() {
  const pillars = [
    {
      title: "Expert Curriculum Design",
      subtitle: "Innovative and Practical Programs",
      description: "We develop useful, highly applicable professional training programs that focus on scenario-based learning, equipping your academic and administrative teams with critical operational skills.",
      icon: BookOpen
    },
    {
      title: "Tailored Development Solutions",
      subtitle: "Addressing Unique Institutional Needs",
      description: "We customize our educational pathways to address the distinct challenges and goals of your organization, fostering the confidence required to tackle complex operational issues.",
      icon: Layers
    },
    {
      title: "Measurable Institutional Results",
      subtitle: "Proven Educational Excellence",
      description: "Our outcomes-driven methodology enhances teaching quality, administrative efficiency, and student success, leading to broad-scale institutional advancement.",
      icon: Award
    }
  ]

  return (
    <section className="relative py-24 sm:py-32 bg-[#102A43] text-white overflow-hidden">
      {/* Decorative background grid and light glows */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#223292]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-900/40 text-blue-300 px-4 py-2 rounded-full border border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-300">
              What We Do
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
            High Impact Solutions for Institutional Success
          </h2>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
            As a proven leader in professional education, we deliver scenario-based learning models and practical development frameworks engineered specifically for the complex higher education landscape.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div 
                key={pillar.title}
                className="relative bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 lg:p-10 flex flex-col justify-between hover:bg-white/[0.06] transition-all duration-300 group shadow-xl"
              >
                {/* Visual Accent Glow on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(34, 50, 146, 0.15), 0 4px 30px rgba(0, 0, 0, 0.5)'
                  }}
                />
                
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-2xl bg-blue-900/40 text-blue-300 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-black uppercase tracking-wider text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                      {pillar.subtitle}
                    </p>
                    <p className="text-blue-100 text-sm leading-relaxed pt-2">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Horizontal Panel: Educational Approach */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-xl">
          <h3 className="text-lg font-black uppercase tracking-widest text-center text-blue-300 mb-10">
            Our Educational Methodology
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-world simulations",
                text: "Apply learning outcomes directly to your academic or administrative role through practical, active scenario sessions."
              },
              {
                title: "Proven Results",
                text: "Enhance your personal and professional impact on student success and institutional performance."
              },
              {
                title: "Expert Faculty",
                text: "Learn from highly qualified higher education professionals who bring decades of specialized operational expertise."
              }
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">
                    {item.title}
                  </h4>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed pl-8">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Flexible Options note */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center text-xs sm:text-sm text-blue-100 font-medium">
            Gain the confidence to tackle complex challenges; select from <span className="text-white font-bold">flexible online delivery</span> or <span className="text-white font-bold">immersive in-person structures</span> built around your team&apos;s operational schedule.
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="mt-16 text-center">
          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-xs font-extrabold uppercase tracking-wider rounded-xl text-[#102A43] hover:bg-blue-50 shadow-lg transition-all"
          >
            Explore our Tailored Programmes <ArrowRight className="w-4 h-4 text-[#102A43]" />
          </Link>
        </div>

      </div>
    </section>
  )
}
