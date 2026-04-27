'use client'

import Link from 'next/link'
import { ArrowRight, GraduationCap, MessageCircle } from 'lucide-react'

export default function LegacyBanner() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: '#0F1F12' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '30px 30px',
        }} />
      </div>
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#F2D03B' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#2D7A52' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <GraduationCap className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6" style={{ color: '#F2D03B' }} />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          25 Years of Transforming<br />
          <span style={{ color: '#F2D03B' }}>Higher Education Excellence</span>
        </h2>
        <p className="text-gray-300 text-base sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          PG Training has been the trusted partner of higher education institutions worldwide. Join over 3,000 professionals who have advanced their careers with us.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/#courses"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-105"
            style={{ backgroundColor: '#F2D03B', color: '#0F1F12' }}
          >
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
          <button
            onClick={() => document.getElementById('chatbot-trigger')?.click()}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base sm:text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Talk to Our Team
          </button>
        </div>
      </div>
    </section>
  )
}
