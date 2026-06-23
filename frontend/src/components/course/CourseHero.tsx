'use client'

import { Course } from '@/types'
import { Users, Monitor, Award, CheckCircle2, ChevronRight, Calendar } from 'lucide-react'
import Link from 'next/link'

const pathConfig: Record<string, { bg: string, text: string, gradient: string }> = {
  academic: { bg: '#223292', text: '#EBEFFF', gradient: 'from-[#223292] to-[#1a2673]' },
  administrative: { bg: '#45A29E', text: '#E6F4F3', gradient: 'from-[#45A29E] to-[#34807c]' },
  leadership: { bg: '#C85A43', text: '#FDF1EE', gradient: 'from-[#C85A43] to-[#a34734]' },
}

export default function CourseHero({ course }: { course: Course }) {
  const config = pathConfig[course.pathId] ?? pathConfig.academic

  const hasDates = course.upcomingDates && course.upcomingDates.length > 0
  let nextDateStr = ''
  if (hasDates) {
    const firstDate = course.upcomingDates[0]
    if (firstDate.includes('|')) {
      nextDateStr = new Date(firstDate.split('|')[0]).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    } else {
      nextDateStr = new Date(firstDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  return (
    <section className={`relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-r ${config.gradient}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-[11px] font-bold uppercase tracking-wider mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/programmes" className="hover:text-white transition-colors">Programmes</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{course.code}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-md px-2.5 py-1 text-white text-[10px] font-bold tracking-widest uppercase border border-white/10">
              <Award className="w-3 h-3" />
              Professional Certificate
            </div>
            {nextDateStr && (
              <div className="inline-flex items-center gap-1.5 bg-[#F2D03B] rounded-md px-2.5 py-1 text-[#0F1F12] text-[10px] font-bold tracking-widest uppercase">
                <Calendar className="w-3 h-3" />
                Starts: {nextDateStr}
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-sm">
            {course.title}
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8 max-w-3xl font-medium">
            {course.shortDescription}
          </p>

          {/* Key Selling Points */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-white/90 text-sm font-semibold">
              <div className="bg-white/10 p-1.5 rounded-md">
                <CheckCircle2 className="w-4 h-4 text-[#F2D03B]" />
              </div>
              Expert Facilitators
            </div>
            {course.pricing?.maxParticipants > 0 && (
              <div className="flex items-center gap-2.5 text-white/90 text-sm font-semibold">
                <div className="bg-white/10 p-1.5 rounded-md">
                   <Users className="w-4 h-4 text-[#F2D03B]" />
                </div>
                Up to {course.pricing.maxParticipants} participants
              </div>
            )}
            <div className="flex items-center gap-2.5 text-white/90 text-sm font-semibold">
              <div className="bg-white/10 p-1.5 rounded-md">
                <Monitor className="w-4 h-4 text-[#F2D03B]" />
              </div>
              {course.deliveryMethods?.length > 1 ? 'Multiple Delivery Options' : course.deliveryMethods?.[0]?.label}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
