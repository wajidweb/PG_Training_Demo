'use client'

import { ShieldCheck, Award, Compass, Users, Target, Calendar, Settings } from 'lucide-react'

export default function WhyChooseUs() {
  const trustPoints = [
    {
      index: "01",
      title: "Practical Scenario-Based Learning",
      description: "We do not focus on abstract theories; instead, we utilize real-world simulations and immersive, case-based learning, allowing you to immediately apply active skills directly to your everyday academic or administrative role.",
      icon: Compass,
      color: "#223292", // Royal Blue
      bg: "bg-blue-50"
    },
    {
      index: "02",
      title: "Decades of Institutional Expertise",
      description: "With over a quarter-century of educational leadership, our programs are grounded in a deep and proven understanding of the global higher education landscape, making us a highly trusted advisor.",
      icon: Award,
      color: "#C85A43", // Terracotta
      bg: "bg-orange-50"
    },
    {
      index: "03",
      title: "Led by Elite Academic Faculty",
      description: "Learn from highly experienced higher education administrators, senior researchers, and global leaders who bring active, real-world experience and recognized credentials to every session.",
      icon: Users,
      color: "#45A29E", // Teal
      bg: "bg-emerald-50"
    },
    {
      index: "04",
      title: "Surgically Tailored to Your Specific Goals",
      description: "Every syllabus is custom designed to address the localized challenges faced by your department or university, ensuring that your training matches your exact career and institutional objectives.",
      icon: Settings,
      color: "#F2D03B", // Gold
      bg: "bg-amber-50"
    },
    {
      index: "05",
      title: "Measurable Outcomes and Proven Success",
      description: "We are dedicated to high-impact training solutions that drive tangible improvements in teaching quality, operational efficiency, and overall student success, maximizing your professional growth.",
      icon: Target,
      color: "#223292",
      bg: "bg-blue-50"
    },
    {
      index: "06",
      title: "Flexible Delivery Built for Your Schedule",
      description: "Gain the confidence to manage complex challenges with versatile learning formats, selecting from interactive online classrooms or immersive in-person training structures built to fit your schedule.",
      icon: Calendar,
      color: "#C85A43",
      bg: "bg-orange-50"
    }
  ]

  return (
    <section id="why-choose-us" className="py-24 sm:py-32 bg-slate-50 text-gray-900 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-[#223292]" />
            <span className="text-[#223292] text-xs font-extrabold uppercase tracking-widest">
              Why Choose PG Training
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-gray-900">
            The Ultimate Partner for Professional Development
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            We deliver high-impact training solutions that combine extensive experience and proven results, helping you gain the confidence to excel within the higher education landscape.
          </p>
        </div>

        {/* 6-Card Trust-Building Grid (No Image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {trustPoints.map((item) => {
            const Icon = item.icon
            return (
              <div 
                key={item.index}
                className="bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-blue-200/50 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Subtle Overlapping Number Index for Style */}
                <div className="absolute right-8 top-6 text-5xl font-black text-gray-100 select-none pointer-events-none group-hover:text-blue-50 transition-colors">
                  {item.index}
                </div>

                <div className="space-y-6">
                  {/* Icon wrapper */}
                  <div className={`p-4 rounded-2xl ${item.bg} flex-shrink-0 inline-block self-start group-hover:scale-110 transition-transform`} style={{ color: item.color }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-black uppercase tracking-wider text-gray-900 group-hover:text-[#223292] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
