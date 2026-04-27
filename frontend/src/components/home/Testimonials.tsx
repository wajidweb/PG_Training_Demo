'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Testimonial } from '@/types'

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [startIdx, setStartIdx] = useState(0)
  const visible = 3

  const prev = () => setStartIdx(i => Math.max(0, i - 1))
  const next = () => setStartIdx(i => Math.min(testimonials.length - visible, i + 1))

  const shown = testimonials.slice(startIdx, startIdx + visible)

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#223292' }}>
            What Our Participants Say
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Hear from the academic and administrative professionals who have transformed their careers with PG Training.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {shown.map(t => (
              <div key={t.id} className="bg-gray-50 rounded-2xl p-5 sm:p-6 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ backgroundColor: '#223292' }}>
                    {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                    <div className="text-xs font-medium" style={{ color: '#277550' }}>{t.institution}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} disabled={startIdx === 0} className="p-2 rounded-full border-2 border-gray-200 hover:border-green-400 disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-500">{startIdx + 1}–{Math.min(startIdx + visible, testimonials.length)} of {testimonials.length}</span>
            <button onClick={next} disabled={startIdx >= testimonials.length - visible} className="p-2 rounded-full border-2 border-gray-200 hover:border-green-400 disabled:opacity-30 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
