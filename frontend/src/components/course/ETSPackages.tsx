'use client'

import { Course, DeliveryMethod } from '@/types'
import { useState } from 'react'
import { CheckCircle, Users, Minus, Plus } from 'lucide-react'
import { calculatePrice, formatPrice } from '@/lib/pricing'
import { useCartStore } from '@/store/cart'
import { nanoid } from 'nanoid'

export default function ETSPackages({ course }: { course: Course }) {
  const [delivery, setDelivery] = useState<DeliveryMethod>(course.deliveryMethods[0])
  const [participants, setParticipants] = useState(1)
  const { addItem, openCart } = useCartStore()

  if (!course.offers.ets?.length) return null

  const breakdown = calculatePrice(course, delivery, participants, 0)

  const handleAdd = (offerIdx: number) => {
    const offer = course.offers.ets![offerIdx]
    addItem({
      cartId: nanoid(),
      courseId: course.id,
      courseTitle: course.title,
      courseCode: course.code,
      deliveryMethod: delivery,
      participants,
      basePrice: course.pricing.basePrice,
      discountPercent: 0,
      finalPrice: breakdown.total,
      offerLabel: offer.title,
    })
    openCart()
  }

  return (
    <section id="packages" className="py-14 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            ETS Packages
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1D5C3A' }}>Choose Your Package</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Transparent, fixed pricing for every team size.</p>
        </div>

        {/* Config panel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="font-bold text-gray-900 mb-4">Configure Your Enrolment</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Delivery method */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Delivery Method</label>
              <div className="space-y-2">
                {course.deliveryMethods.map(d => (
                  <button
                    key={d.type}
                    onClick={() => setDelivery(d)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                      delivery.type === d.type ? 'border-green-600 bg-green-50 text-green-800' : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div>{d.label}</div>
                    <div className="text-xs opacity-70">{d.multiplier === 1 ? 'Standard' : d.multiplier < 1 ? `${Math.round((1-d.multiplier)*100)}% cheaper` : `+${Math.round((d.multiplier-1)*100)}% premium`}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Participants */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Number of Participants</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setParticipants(p => Math.max(1, p - 1))} className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-green-400">
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold text-gray-900">{participants}</div>
                  <div className="text-xs text-gray-500">participants</div>
                </div>
                <button onClick={() => setParticipants(p => Math.min(course.pricing.maxParticipants, p + 1))} className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-green-400">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {participants >= 5 && (
                <div className="mt-2 text-xs text-emerald-600 font-semibold text-center">
                  Volume discount: {breakdown.volumeDiscount}% applied
                </div>
              )}

              {/* Price breakdown */}
              <div className="mt-4 bg-gray-50 rounded-xl p-3 text-sm space-y-1">
                <div className="flex justify-between text-gray-600">
                  <span>Base price/person</span>
                  <span>{formatPrice(course.pricing.basePrice)}</span>
                </div>
                {delivery.multiplier !== 1 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery factor</span>
                    <span>×{delivery.multiplier}</span>
                  </div>
                )}
                {breakdown.volumeDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Volume discount</span>
                    <span>-{breakdown.volumeDiscount}%</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Participants</span>
                  <span>×{participants}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-1 mt-1">
                  <span>Total</span>
                  <span style={{ color: '#1D5C3A' }}>{formatPrice(breakdown.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {course.offers.ets.map((offer, i) => (
            <div key={offer.id} className={`rounded-2xl border-2 p-6 ${i === 0 ? 'border-gray-200 bg-white' : 'border-amber-400 bg-amber-50'}`}>
              {i === 1 && (
                <div className="inline-block bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                  MOST POPULAR
                </div>
              )}
              <h3 className="font-bold text-gray-900 text-lg mb-1">{offer.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{offer.description}</p>
              <div className="text-3xl font-bold mb-1" style={{ color: '#1D5C3A' }}>{formatPrice(offer.pricePerPerson)}</div>
              <div className="text-sm text-gray-500 mb-4">per person</div>
              <ul className="space-y-2 mb-6">
                {offer.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleAdd(i)}
                className="w-full py-3 rounded-xl font-bold text-sm transition-colors text-white"
                style={{ backgroundColor: i === 1 ? '#D4890A' : '#1D5C3A' }}
              >
                Add to Cart — {formatPrice(breakdown.total)}
              </button>
              <p className="text-xs text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                <Users className="w-3 h-3 inline" />{participants} participant{participants > 1 ? 's' : ''} · {delivery.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
