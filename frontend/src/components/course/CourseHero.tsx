'use client'

import { Course } from '@/types'
import { Clock, Users, Monitor, MapPin, Award, CheckCircle2, ChevronRight, Calendar } from 'lucide-react'
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
    <section className={`relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br ${config.gradient}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/70 text-sm font-medium mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#courses" className="hover:text-white transition-colors">Courses</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{course.code}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-white text-xs font-bold tracking-wider uppercase border border-white/20 shadow-sm">
              <Award className="w-4 h-4" />
              Professional Certificate
            </div>
            {nextDateStr && (
              <div className="inline-flex items-center gap-1.5 bg-[#F2D03B] rounded-full px-4 py-1.5 text-[#0F1F12] text-xs font-black tracking-wider uppercase shadow-lg border-2 border-white/20">
                <Calendar className="w-4 h-4" />
                Starts: {nextDateStr}
              </div>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter drop-shadow-sm">
            {course.title}
          </h1>

          <p className="text-lg sm:text-2xl text-white/90 leading-relaxed mb-12 max-w-3xl font-medium drop-shadow-sm">
            {course.shortDescription}
          </p>

          {/* Key Selling Points */}
          <div className="flex flex-wrap gap-x-10 gap-y-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-white font-bold">
              <div className="bg-white/10 p-2 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#F2D03B]" />
              </div>
              Expert Facilitators
            </div>
            {course.pricing?.maxParticipants > 0 && (
              <div className="flex items-center gap-3 text-white font-bold">
                <div className="bg-white/10 p-2 rounded-lg">
                   <Users className="w-6 h-6 text-[#F2D03B]" />
                </div>
                Up to {course.pricing.maxParticipants} participants
              </div>
            )}
            <div className="flex items-center gap-3 text-white font-bold">
              <div className="bg-white/10 p-2 rounded-lg">
                <Monitor className="w-6 h-6 text-[#F2D03B]" />
              </div>
              {course.deliveryMethods?.length > 1 ? 'Multiple Delivery Options' : course.deliveryMethods?.[0]?.label}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
