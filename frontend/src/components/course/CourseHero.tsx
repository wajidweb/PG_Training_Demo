'use client'

import { Course } from '@/types'
import { Clock, Users, Monitor, MapPin, ArrowRight, MessageCircle } from 'lucide-react'

const pathGradients: Record<string, string> = {
  academic: 'from-[#1D5C3A] to-[#2D7A52]',
  administrative: 'from-[#1A5050] to-[#247870]',
  leadership: 'from-[#7A3A1A] to-[#C46030]',
}

export default function CourseHero({ course }: { course: Course }) {
  const gradient = pathGradients[course.pathId] ?? pathGradients.academic

  return (
    <section className={`bg-gradient-to-br ${gradient} pt-20 sm:pt-24 pb-14 sm:pb-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/#courses" className="hover:text-white transition-colors">Courses</a>
            <span>/</span>
            <span className="text-white">{course.code}</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="text-white/70 text-sm">Course Code:</span>
            <span className="text-white font-bold text-sm">{course.code}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {course.title}
          </h1>

          <p className="text-base sm:text-xl text-white/80 leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            {course.shortDescription}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 mb-8 sm:mb-10">
            {course.deliveryMethods.map(d => {
              const Icon = d.type === 'onsite' ? MapPin : Monitor
              return (
                <div key={d.type} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs sm:text-sm">
                  <Icon className="w-4 h-4" />
                  {d.label}
                </div>
              )
            })}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs sm:text-sm">
              <Users className="w-4 h-4" />
              1–{course.pricing.maxParticipants} participants
            </div>
            {course.upcomingDates[0] && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs sm:text-sm">
                <Clock className="w-4 h-4" />
                Next: {course.upcomingDates[0]}
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#D4890A', color: '#0F1F12' }}
            >
              Enrol Now <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => document.getElementById('chatbot-trigger')?.click()}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base sm:text-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat to Order
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
