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
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-[#C85A43] rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold shadow-sm">
            {String(v).padStart(2, '0')}
          </div>
          <div className="text-white/80 text-[10px] sm:text-xs mt-1">{l}</div>
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
    <div className="bg-gradient-to-br from-[#C85A43] to-[#9b402e] rounded-3xl p-6 sm:p-10 shadow-lg border border-[#a34734] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-6 border border-white/20">
          <Clock className="w-3.5 h-3.5" /> Limited Time Offers
        </div>
        
        <div className="space-y-6">
          {course.offers.limited.map(offer => {
            const delivery = course.deliveryMethods[0]
            const original = calculatePrice(course, delivery, 1)
            const discounted = calculatePrice(course, delivery, 1, offer.discountPercent)

            return (
              <div key={offer.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{offer.title}</h3>
                    <p className="text-white/80 text-sm sm:text-base mb-4">{offer.description}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-white/50 line-through text-lg font-medium">{formatPrice(original.total)}</span>
                      <span className="text-2xl sm:text-3xl font-black text-[#F2D03B] drop-shadow-sm">{formatPrice(discounted.total)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center gap-4 w-full xl:w-auto">
                    <Countdown expiresAt={offer.expiresAt} />
                    <button
                      onClick={() => handleClaim(offer.discountPercent)}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm w-full transition-all hover:scale-105 shadow-md"
                      style={{ backgroundColor: '#F2D03B', color: '#0F1F12' }}
                    >
                      Claim {offer.discountPercent}% Off <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
