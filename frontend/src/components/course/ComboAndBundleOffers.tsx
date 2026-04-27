'use client'

import { Course } from '@/types'
import { Layers, Zap, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/pricing'

export default function ComboAndBundleOffers({ course, allCourses }: { course: Course; allCourses: Course[] }) {
  const hasCombo = course.offers.combo && course.offers.combo.length > 0
  const hasBundle = course.offers.bundle && course.offers.bundle.length > 0
  const hasCelebration = course.offers.celebration && course.offers.celebration.length > 0

  if (!hasCombo && !hasBundle && !hasCelebration) return null

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#223292' }}>More Ways to Save</h2>
        <p className="text-gray-600 text-sm sm:text-base">Explore special combination and group rates for this programme.</p>
      </div>

      <div className="space-y-6">
        {/* Combo Offers */}
        {hasCombo && (
          <div className="space-y-4">
            {course.offers.combo!.map(combo => {
              const pairedCourse = allCourses.find(c => combo.courses.find(id => id !== course.id && id === c.id))
              return (
                <div key={combo.id} className="bg-gradient-to-r from-[#E6F4F3] to-[#f0f9f8] rounded-2xl border border-[#b2dbd9] p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-5 h-5 text-[#45A29E]" />
                    <span className="inline-block bg-[#45A29E] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
                      {combo.discountPercent}% OFF COMBO
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{combo.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{combo.description}</p>
                  {pairedCourse && (
                    <div className="bg-white/60 rounded-xl p-3 mb-4 text-sm border border-white">
                      <div className="font-bold text-[#45A29E] mb-1">Paired with:</div>
                      <div className="text-gray-700 font-medium">{pairedCourse.title}</div>
                    </div>
                  )}
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#45A29E] hover:text-[#34807c] transition-colors"
                  >
                    Explore Combo Deal <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Bundle Offers */}
          {hasBundle && course.offers.bundle!.map(bundle => (
            <div key={bundle.id} className="bg-[#FFFBF0] rounded-2xl border border-[#F2D03B] p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-[#D4890A]" />
                <span className="inline-block bg-[#F2D03B] text-[#0F1F12] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
                  TEAM BUNDLE
                </span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{bundle.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{bundle.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4 bg-white/50 px-3 py-2 rounded-lg">
                <span className="font-bold">Min. {bundle.minParticipants} participants:</span>
                <span className="font-black text-green-600">Save {bundle.discountPercent}%</span>
              </div>
              <button
                onClick={() => document.getElementById('chatbot-trigger')?.click()}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] shadow-sm"
                style={{ backgroundColor: '#F2D03B', color: '#0F1F12' }}
              >
                Chat to Book Group Rate
              </button>
            </div>
          ))}

          {/* Celebration Offers */}
          {hasCelebration && course.offers.celebration!.map(cel => (
            <div key={cel.id} className="bg-[#FDF1EE] rounded-2xl border border-[#e8a394] p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C85A43]" />
                <span className="inline-block bg-[#C85A43] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
                  SEASONAL OFFER
                </span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{cel.title}</h4>
              <p className="text-[#C85A43] text-sm font-bold mb-1">{cel.occasion}</p>
              <p className="text-gray-500 text-xs mb-4">Valid until {cel.validUntil}</p>
              <div className="text-2xl font-black text-gray-900 mb-4">{cel.discountPercent}% OFF</div>
              <button
                onClick={() => document.getElementById('chatbot-trigger')?.click()}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] shadow-sm text-white"
                style={{ backgroundColor: '#C85A43' }}
              >
                Claim Seasonal Offer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
