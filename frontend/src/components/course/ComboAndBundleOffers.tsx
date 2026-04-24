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
    <section className="py-14 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-100 text-teal-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            More Ways to Save
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1D5C3A' }}>Combo, Bundle &amp; Celebration Offers</h2>
        </div>

        <div className="space-y-8">
          {/* Combo Offers */}
          {hasCombo && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-gray-900 text-lg">Combo Offers — Better Together</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.offers.combo!.map(combo => {
                  const pairedCourse = allCourses.find(c => combo.courses.find(id => id !== course.id && id === c.id))
                  return (
                    <div key={combo.id} className="bg-white rounded-2xl border-2 border-teal-200 p-5 sm:p-6">
                      <div className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-2 py-0.5 rounded mb-3">
                        {combo.discountPercent}% OFF BOTH
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{combo.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{combo.description}</p>
                      {pairedCourse && (
                        <div className="bg-teal-50 rounded-lg p-3 mb-4 text-sm">
                          <div className="font-semibold text-teal-700">Paired with:</div>
                          <div className="text-gray-700">{pairedCourse.title}</div>
                        </div>
                      )}
                      <Link
                        href={`/courses/${course.slug}`}
                        className="flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Get Combo Deal <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bundle Offers */}
          {hasBundle && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-gray-900 text-lg">Bundle Offers — Train Your Team</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.offers.bundle!.map(bundle => (
                  <div key={bundle.id} className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-5 sm:p-6">
                    <div className="inline-block bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded mb-3">
                      SAVE {bundle.discountPercent}%
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{bundle.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{bundle.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="font-semibold">Minimum:</span>
                      <span>{bundle.minParticipants} participants</span>
                    </div>
                    <div className="mt-3 text-2xl font-bold" style={{ color: '#1D5C3A' }}>
                      {formatPrice(course.pricing.basePrice * (1 - bundle.discountPercent / 100))}
                      <span className="text-sm font-normal text-gray-500"> /person</span>
                    </div>
                    <button
                      onClick={() => document.getElementById('chatbot-trigger')?.click()}
                      className="mt-4 w-full py-2.5 rounded-xl font-semibold text-sm transition-colors"
                      style={{ backgroundColor: '#D4890A', color: '#0F1F12' }}
                    >
                      Chat to Book Group Rate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Celebration Offers */}
          {hasCelebration && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-gray-900 text-lg">Celebration Offers — Seasonal Savings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.offers.celebration!.map(cel => (
                  <div key={cel.id} className="bg-orange-50 rounded-2xl border-2 border-orange-200 p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-2 py-0.5 rounded mb-2">
                      {cel.discountPercent}% OFF
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{cel.title}</h4>
                    <p className="text-orange-700 text-sm font-medium mb-1">{cel.occasion}</p>
                    <p className="text-gray-500 text-xs">Valid until {cel.validUntil}</p>
                    <button
                      onClick={() => document.getElementById('chatbot-trigger')?.click()}
                      className="mt-4 flex items-center gap-1 text-sm font-semibold text-orange-700 hover:text-orange-800"
                    >
                      Claim Celebration Offer <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
