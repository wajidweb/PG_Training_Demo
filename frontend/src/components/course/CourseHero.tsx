'use client'

import { Course } from '@/types'
import { Clock, Users, Monitor, MapPin, Award, CheckCircle2, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const pathConfig: Record<string, { bg: string, text: string, gradient: string }> = {
  academic: { bg: '#223292', text: '#EBEFFF', gradient: 'from-[#223292] to-[#1a2673]' },
  administrative: { bg: '#45A29E', text: '#E6F4F3', gradient: 'from-[#45A29E] to-[#34807c]' },
  leadership: { bg: '#C85A43', text: '#FDF1EE', gradient: 'from-[#C85A43] to-[#a34734]' },
}

export default function CourseHero({ course }: { course: Course }) {
  const config = pathConfig[course.pathId] ?? pathConfig.academic

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
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs font-bold tracking-wider uppercase border border-white/20">
              <Award className="w-3.5 h-3.5" />
              Professional Certificate
            </div>
            {course.upcomingDates[0] && (
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs font-bold tracking-wider uppercase border border-white/10">
                <Clock className="w-3.5 h-3.5" />
                Next Cohort: {course.upcomingDates[0].split(' ')[0]}
              </div>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            {course.title}
          </h1>

          <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-3xl font-medium">
            {course.shortDescription}
          </p>

          {/* Key Selling Points */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-white/90 font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#F2D03B]" />
              Expert Facilitators
            </div>
            <div className="flex items-center gap-2 text-white/90 font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#F2D03B]" />
              {course.pricing.maxParticipants} Max Participants
            </div>
            <div className="flex items-center gap-2 text-white/90 font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#F2D03B]" />
              Flexible Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
