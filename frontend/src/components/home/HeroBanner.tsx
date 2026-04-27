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
  { 
    pathIndex: 0, 
    tagline: 'Mastering Excellence in Modern Teaching and Research', 
    subtext: 'Equip yourself with advanced pedagogical skills, research writing mastery, and digital literacy to excel in higher education.', 
    gradient: 'from-[#223292] to-[#2D7A52]',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    pathIndex: 1, 
    tagline: 'Leading Excellence in Institutional Administration', 
    subtext: 'Build the skills to manage diverse student populations, protect institutional data, and drive international engagement.', 
    gradient: 'from-[#1A5050] to-[#247870]',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    pathIndex: 2, 
    tagline: 'Developing Excellence in Strategic Academic Leadership', 
    subtext: 'Develop the strategic vision, governance expertise, and innovation mindset needed to lead higher education institutions.', 
    gradient: 'from-[#7A3A1A] to-[#C46030]',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000'
  },
]

export default function HeroBanner({ paths }: { paths: TrainingPath[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slideConfig.length), 8000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent(c => (c - 1 + slideConfig.length) % slideConfig.length)
  const next = () => setCurrent(c => (c + 1) % slideConfig.length)

  const config = slideConfig[current]
  const path = paths[config.pathIndex] ?? paths[0]
  if (!path) return null
  const PathIcon = pathIcons[path.id] ?? BookOpen

  return (
    <section className={`relative min-h-screen flex items-center bg-gradient-to-br ${config.gradient} transition-all duration-700 overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>
      <div className="absolute top-20 right-10 lg:right-20 w-48 lg:w-64 h-48 lg:h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 lg:left-20 w-64 lg:w-96 h-64 lg:h-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 max-w-3xl">
            {/* Path badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
              <PathIcon className="w-4 h-4 sm:w-5 h-5 text-white" />
              <span className="text-white font-medium text-xs sm:text-sm uppercase tracking-wider">{path.title}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              {config.tagline}
            </h1>

            <p className="text-base sm:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl">
              {config.subtext}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                href={`/#path-${path.id}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-xl hover:shadow-[#F2D03B]/20"
                style={{ backgroundColor: '#F2D03B', color: '#0F1F12' }}
              >
                Explore {path.title} <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => document.getElementById('chatbot-trigger')?.click()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base sm:text-lg bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Chat to Order
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-t border-white/10">
              {[
                { value: '25+', label: 'Years Experience' },
                { value: '3,000+', label: 'Staff Trained' },
                { value: '500+', label: 'Programmes' },
                { value: '50+', label: 'Countries' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-[10px] sm:text-xs uppercase tracking-widest font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="order-1 lg:order-2 relative group">
            <div className="absolute -inset-4 bg-white/5 rounded-[2.5rem] blur-2xl group-hover:bg-white/10 transition-all duration-500" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] lg:aspect-square xl:aspect-[4/3]">
              <img 
                src={config.image} 
                alt={config.tagline}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              {/* Floating Decorative Element */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 hidden sm:block">
                <p className="text-white/90 text-sm font-medium italic">
                  "Empowering the next generation of higher education leaders and educators."
                </p>
              </div>
            </div>
            
            {/* Background elements for depth */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#F2D03B]/20 blur-2xl rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
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
            className={`rounded-full transition-all ${i === current ? 'w-8 h-3 bg-[#F2D03B]' : 'w-3 h-3 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  )
}
