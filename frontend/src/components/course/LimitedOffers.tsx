'use client'

import { Course } from '@/types'
import { useEffect, useState } from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { calculatePrice, formatPrice } from '@/lib/pricing'
import { useCartStore } from '@/store/cart'
import { nanoid } from 'nanoid'

function Countdown({ expiresAt }: { expiresAt: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const calc = () => {
      const diff = new Date(expiresAt).getTime() - Date.now()
      if (diff <= 0) return
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) })
    }
    calc()
    const timer = setInterval(calc, 1000)
    return () => clearInterval(timer)
  }, [expiresAt])

  return (
    <div className="flex gap-2">
      {[{ v: t.d, l: 'Days' }, { v: t.h, l: 'Hrs' }, { v: t.m, l: 'Min' }, { v: t.s, l: 'Sec' }].map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="w-12 h-12 bg-white text-red-600 rounded-lg flex items-center justify-center text-xl font-bold shadow-sm">
            {String(v).padStart(2, '0')}
          </div>
          <div className="text-red-200 text-xs mt-1">{l}</div>
        </div>
      ))}
    </div>
  )
}

export default function LimitedOffers({ course }: { course: Course }) {
  const { addItem, openCart } = useCartStore()
  if (!course.offers.limited?.length) return null

  const handleClaim = (discountPct: number) => {
    const delivery = course.deliveryMethods[0]
    const breakdown = calculatePrice(course, delivery, 1, discountPct)
    addItem({
      cartId: nanoid(),
      courseId: course.id,
      courseTitle: course.title,
      courseCode: course.code,
      deliveryMethod: delivery,
      participants: 1,
      basePrice: course.pricing.basePrice,
      discountPercent: discountPct,
      finalPrice: breakdown.total,
      offerLabel: `Limited Time — ${discountPct}% off`,
    })
    openCart()
  }

  return (
    <section className="py-14 sm:py-16" style={{ backgroundColor: '#1D5C3A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            <Clock className="w-4 h-4" /> Limited Time Offers
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Act Fast — These Deals Expire Soon</h2>
          <p className="text-green-200 text-sm sm:text-base">Time-sensitive savings on this course. Once gone, these prices won&apos;t return.</p>
        </div>

        <div className="space-y-5 sm:space-y-6 max-w-3xl mx-auto">
          {course.offers.limited.map(offer => {
            const delivery = course.deliveryMethods[0]
            const original = calculatePrice(course, delivery, 1)
            const discounted = calculatePrice(course, delivery, 1, offer.discountPercent)

            return (
              <div key={offer.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
                      SAVE {offer.discountPercent}%
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{offer.title}</h3>
                    <p className="text-green-200 text-sm mb-3">{offer.description}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-white/50 line-through text-lg">{formatPrice(original.total)}</span>
                      <span className="text-2xl sm:text-3xl font-bold text-amber-400">{formatPrice(discounted.total)}</span>
                      <span className="text-white/70 text-sm">per person</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-center gap-4">
                    <Countdown expiresAt={offer.expiresAt} />
                    <button
                      onClick={() => handleClaim(offer.discountPercent)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                      style={{ backgroundColor: '#D4890A', color: '#0F1F12' }}
                    >
                      Claim This Offer <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
