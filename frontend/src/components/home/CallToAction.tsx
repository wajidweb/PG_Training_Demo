'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#223292] rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -mr-32 -mb-32" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 tracking-tight">
              Ready to Invest in Your Future?
            </h2>
            <p className="text-blue-100 text-xl leading-relaxed mb-12">
              Whether you want to advance your academic career, improve administrative effectiveness, or develop stronger leadership capabilities, PG Training is ready to support your journey.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/#courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#F2D03B] text-[#0F1F12] font-black text-lg rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#F2D03B]/20"
              >
                Explore Programmes <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => document.getElementById('chatbot-trigger')?.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black text-lg rounded-2xl hover:bg-white/20 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Our Team
              </button>
            </div>
            
            <p className="mt-12 text-blue-200/60 text-sm font-medium uppercase tracking-widest">
              Bespoke Learning. Lasting Growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
