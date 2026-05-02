'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Building2, TrendingUp, Monitor, Users, Clock, CheckCircle2, Calendar, MapPin, Laptop } from 'lucide-react'
import { TrainingPath, Course } from '@/types'
import { formatPrice } from '@/lib/pricing'

const pathConfig = {
  academic: {
    accent: '#223292', // Paragon Royal Blue
    light: '#EBEFFF',
    icon: BookOpen,
    label: 'Academic Excellence'
  },
  administrative: {
    accent: '#45A29E', // Academy Teal
    light: '#E6F4F3',
    icon: Building2,
    label: 'Administrative Excellence'
  },
  leadership: {
    accent: '#C85A43', // Global Terracotta
    light: '#FDF1EE',
    icon: TrendingUp,
    label: 'Leadership & Strategy'
  },
}

function CourseCard({ course, pathId }: { course: Course; pathId: string }) {
  const config = pathConfig[pathId as keyof typeof pathConfig]
  
  // Format upcoming date if available
  const hasDates = course.upcomingDates && course.upcomingDates.length > 0
  let dateDisplay = 'Flexible Schedule'
  if (hasDates) {
    const firstDate = course.upcomingDates[0]
    if (firstDate.includes('|')) {
      const [start] = firstDate.split('|')
      dateDisplay = `Starts ${new Date(start).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
    } else {
      dateDisplay = new Date(firstDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  // Delivery Icons Map
  const deliveryIcons: Record<string, { icon: React.ElementType, label: string }> = {
    'online-instructor': { icon: Monitor, label: 'Live Online' },
    'self-paced': { icon: Laptop, label: 'Self-Paced' },
    'onsite': { icon: MapPin, label: 'Onsite' }
  }
  
  return (
    <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Card Header: Path Indicator */}
      <div className="px-6 pt-6 pb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" 
             style={{ backgroundColor: config.light, color: config.accent }}>
          <config.icon className="w-3 h-3" />
          {config.label}
        </div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors leading-tight min-h-[3.5rem]">
          {course.title}
        </h3>
      </div>

      {/* Card Body */}
      <div className="px-6 py-2 flex-1 flex flex-col">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
          {course.shortDescription}
        </p>
        
        {/* Dynamic Features / Icons */}
        <div className="flex flex-wrap gap-4 mt-auto">
          {/* Upcoming Date */}
          <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100 w-full mb-1">
            <Calendar className="w-4 h-4 text-[#223292]" />
            <span className="text-xs font-bold text-gray-700">{dateDisplay}</span>
            {course.upcomingDates?.length > 1 && (
              <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-md ml-auto">
                +{course.upcomingDates.length - 1} more
              </span>
            )}
          </div>
          
          {/* Delivery Methods */}
          <div className="flex flex-wrap gap-2 w-full">
            {course.deliveryMethods?.map(method => {
              const deliveryData = deliveryIcons[method.type]
              if (!deliveryData) return null
              const Icon = deliveryData.icon
              return (
                <div key={method.type} className="flex items-center gap-1.5 text-gray-500 bg-white border border-gray-100 px-2 py-1 rounded-md shadow-sm">
                  <Icon className="w-3.5 h-3.5" style={{ color: config.accent }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{deliveryData.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-8 pt-6 mt-4 border-t border-gray-50">

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Starting from</p>
            <p className="text-2xl font-black text-gray-900">{formatPrice(course.pricing.basePrice)}</p>
          </div>
          <Link 
            href={`/courses/${course.slug}`}
            className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all group-hover:scale-110 shadow-md"
            style={{ backgroundColor: config.accent }}
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function TrainingPaths({ paths }: { paths: TrainingPath[] }) {
  const [activePath, setActivePath] = useState<'all' | string>('all')
  
  const filteredPaths = activePath === 'all' 
    ? paths 
    : paths.filter(p => p.id === activePath)

  return (
    <section id="courses" className="py-20 sm:py-28 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Explore Our <span style={{ color: '#223292' }}>Full Curriculum</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Choose from 22 world-class professional development programmes designed specifically for the Higher Education sector.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setActivePath('all')}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${activePath === 'all' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
          >
            All Courses
          </button>
          {paths.map(path => (
            <button
              key={path.id}
              onClick={() => setActivePath(path.id)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border ${
                activePath === path.id 
                  ? 'text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
              }`}
              style={{ 
                backgroundColor: activePath === path.id ? pathConfig[path.id as keyof typeof pathConfig].accent : '',
                borderColor: activePath === path.id ? pathConfig[path.id as keyof typeof pathConfig].accent : ''
              }}
            >
              {path.title}
            </button>
          ))}
        </div>

        {/* Courses Display */}
        <div className="space-y-20">
          {filteredPaths.map(path => (
            <div key={path.id} id={`path-${path.id}`} className="scroll-mt-24">
              {/* Path Header (only shown in 'all' view) */}
              {activePath === 'all' && (
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: pathConfig[path.id as keyof typeof pathConfig].accent + '20' }}>
                    {(() => {
                      const Icon = pathConfig[path.id as keyof typeof pathConfig].icon
                      return <Icon className="w-6 h-6" style={{ color: pathConfig[path.id as keyof typeof pathConfig].accent }} />
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{path.title}</h3>
                    <p className="text-sm text-gray-500 font-medium">{path.subtitle}</p>
                  </div>
                  <div className="flex-1 h-[1px] bg-gray-200 ml-4 hidden sm:block"></div>
                </div>
              )}

              {/* Grid of Course Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {path.courses.map(course => (
                  <CourseCard key={course.id} course={course} pathId={path.id} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPaths.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No courses found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
