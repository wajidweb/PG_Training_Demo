'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight, MessageCircle, BookOpen, Building2, TrendingUp } from 'lucide-react'
import { TrainingPath } from '@/types'

const pathIcons: Record<string, React.ElementType> = {
  academic: BookOpen,
  administrative: Building2,
  leadership: TrendingUp,
}

const slideConfig = [
  { pathIndex: 0, tagline: 'Master the Art of Effective Teaching and Research', subtext: 'Equip yourself with advanced pedagogical skills, research writing mastery, and digital literacy to excel in higher education.', gradient: 'from-[#1D5C3A] to-[#2D7A52]' },
  { pathIndex: 1, tagline: 'Navigate the Complexities of Higher Education Administration', subtext: 'Build the skills to manage diverse student populations, protect institutional data, and drive international engagement.', gradient: 'from-[#1A5050] to-[#247870]' },
  { pathIndex: 2, tagline: 'Transform Your Career into Leadership', subtext: 'Develop the strategic vision, governance expertise, and innovation mindset needed to lead higher education institutions.', gradient: 'from-[#7A3A1A] to-[#C46030]' },
]

export default function HeroBanner({ paths }: { paths: TrainingPath[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slideConfig.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent(c => (c - 1 + slideConfig.length) % slideConfig.length)
  const next = () => setCurrent(c => (c + 1) % slideConfig.length)

  const config = slideConfig[current]
  const path = paths[config.pathIndex] ?? paths[0]
  if (!path) return null
  const PathIcon = pathIcons[path.id] ?? BookOpen

  return (
    <section className={`relative min-h-screen flex items-center bg-gradient-to-br ${config.gradient} transition-all duration-700`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>
      <div className="absolute top-20 right-10 lg:right-20 w-48 lg:w-64 h-48 lg:h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 lg:left-20 w-64 lg:w-96 h-64 lg:h-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36 w-full">
        <div className="max-w-3xl">
          {/* Path badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <PathIcon className="w-5 h-5 text-white" />
            <span className="text-white font-medium text-sm">{path.title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {config.tagline}
          </h1>

          <p className="text-base sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            {config.subtext}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/#path-${path.id}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#D4890A', color: '#0F1F12' }}
            >
              Explore {path.title} <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => document.getElementById('chatbot-trigger')?.click()}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base sm:text-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat to Order
            </button>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '25+', label: 'Years Experience' },
              { value: '3,000+', label: 'Staff Trained' },
              { value: '500+', label: 'Programmes' },
              { value: '50+', label: 'Countries' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={prev} aria-label="Previous slide" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button onClick={next} aria-label="Next slide" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slideConfig.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all ${i === current ? 'w-8 h-3 bg-[#D4890A]' : 'w-3 h-3 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  )
}
