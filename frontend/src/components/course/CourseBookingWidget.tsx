'use client'

import { useState, useMemo } from 'react'
import { Course, PackageTier, CartAddon } from '@/types'
import { PACKAGE_TIERS, ADD_ONS } from '@/data/packages'
import { calculatePrice, formatPrice } from '@/lib/pricing'
import { useCartStore } from '@/store/cart'
import { nanoid } from 'nanoid'
import {
  Users, Monitor, MapPin, Check, Plus, Minus,
  ShoppingCart, BookOpen, Play, MessageCircle, Award, ClipboardCheck,
} from 'lucide-react'
import Link from 'next/link'

const addonIcons: Record<string, React.ElementType> = {
  printed_kit: BookOpen,
  extended_access: Play,
  extra_qa: MessageCircle,
  group_coaching: Users,
  assessment: ClipboardCheck,
  custom_branding: Award,
}

const pathColors: Record<string, string> = {
  academic: '#1D5C3A',
  administrative: '#1A5050',
  leadership: '#7A3A1A',
}

export default function CourseBookingWidget({ course }: { course: Course }) {
  const [delivery, setDelivery] = useState(course.deliveryMethods[0])
  const [participants, setParticipants] = useState(1)
  const [packageTier, setPackageTier] = useState<PackageTier>(PACKAGE_TIERS[1])
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set())
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()

  const accent = pathColors[course.pathId] ?? '#1D5C3A'

  const toggleAddOn = (id: string) =>
    setSelectedAddOns(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const cartAddOns: CartAddon[] = useMemo(() =>
    ADD_ONS
      .filter(a => selectedAddOns.has(a.id))
      .map(a => ({
        id: a.id,
        name: a.name,
        unitPrice: a.unitPrice,
        priceType: a.priceType,
        totalPrice: a.priceType === 'per_person' ? a.unitPrice * participants : a.unitPrice,
      })),
    [selectedAddOns, participants]
  )

  const breakdown = useMemo(
    () => calculatePrice(course, delivery, participants, 0, packageTier, cartAddOns),
    [course, delivery, participants, packageTier, cartAddOns]
  )

  const handleAddToCart = () => {
    addItem({
      cartId: nanoid(),
      courseId: course.id,
      courseTitle: course.title,
      courseCode: course.code,
      deliveryMethod: delivery,
      participants,
      basePrice: course.pricing.basePrice,
      packageTier,
      addOns: cartAddOns,
      discountPercent: 0,
      finalPrice: breakdown.total,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const stepLabel = (n: number) => (
    <span
      className="w-7 h-7 rounded-full text-white text-sm flex items-center justify-center font-bold flex-shrink-0"
      style={{ backgroundColor: accent }}
    >
      {n}
    </span>
  )

  return (
    <section id="packages" className="py-14 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            Enrol Now
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Build Your Package</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Choose delivery, participants, and package tier. Add optional extras — the price updates live.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: 4 configuration steps ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1 – Delivery */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                {stepLabel(1)} Delivery Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {course.deliveryMethods.map(d => {
                  const active = delivery.type === d.type
                  return (
                    <button
                      key={d.type}
                      onClick={() => setDelivery(d)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${active ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {d.type === 'onsite'
                          ? <MapPin className="w-4 h-4" style={{ color: accent }} />
                          : <Monitor className="w-4 h-4" style={{ color: accent }} />}
                        <span className="font-semibold text-sm text-gray-900">{d.label}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {d.multiplier === 1 ? 'Standard rate' : d.multiplier < 1 ? `${Math.round((1 - d.multiplier) * 100)}% cheaper` : `+${Math.round((d.multiplier - 1) * 100)}% premium`}
                      </div>
                      {active && <Check className="w-4 h-4 text-green-500 mt-2" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2 – Participants */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                {stepLabel(2)} Number of Participants
              </h3>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => setParticipants(p => Math.max(1, p - 1))}
                  className="w-11 h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <div className="text-4xl font-bold text-gray-900 w-14 text-center">{participants}</div>
                <button
                  onClick={() => setParticipants(p => Math.min(course.pricing.maxParticipants, p + 1))}
                  className="w-11 h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                <div className="text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Max {course.pricing.maxParticipants}</span>
                  {breakdown.volumeDiscount > 0 && (
                    <span className="text-green-600 font-semibold block mt-0.5">{breakdown.volumeDiscount}% volume discount!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3 – Package tier */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                {stepLabel(3)} Choose Package
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PACKAGE_TIERS.map(tier => {
                  const tierTotal = Math.round(
                    course.pricing.basePrice * tier.multiplier * delivery.multiplier * participants *
                    (1 - (breakdown.volumeDiscount / 100)) * 100
                  ) / 100
                  const active = packageTier.id === tier.id
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setPackageTier(tier)}
                      className={`p-5 rounded-xl border-2 text-left transition-all relative ${active ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      {tier.badge && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                          {tier.badge}
                        </span>
                      )}
                      <div className="font-bold text-gray-900 mb-0.5">{tier.name}</div>
                      <div className="text-base font-bold mb-3" style={{ color: accent }}>{formatPrice(tierTotal)}</div>
                      <ul className="space-y-1.5">
                        {tier.features.map(f => (
                          <li key={f} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <Check className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      {active && <div className="mt-3 text-xs font-bold text-green-600">✓ Selected</div>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 4 – Add-ons */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                {stepLabel(4)} Optional Add-ons
              </h3>
              <p className="text-sm text-gray-500 mb-4 ml-9">Enhance your experience — price adds automatically</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ONS.map(addon => {
                  const active = selectedAddOns.has(addon.id)
                  const price = addon.priceType === 'per_person' ? addon.unitPrice * participants : addon.unitPrice
                  const Icon = addonIcons[addon.id] ?? BookOpen
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${active ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <Icon className="w-4 h-4" style={{ color: active ? '#1D5C3A' : '#9CA3AF' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-0.5">{addon.name}</div>
                          <div className="text-xs text-gray-500 mb-2 leading-relaxed">{addon.description}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold" style={{ color: accent }}>+{formatPrice(price)}</span>
                            <span className="text-xs text-gray-400">
                              {addon.priceType === 'per_person' ? `(${formatPrice(addon.unitPrice)}/person)` : '(flat fee)'}
                            </span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${active ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                          {active && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Sticky order summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-24 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-5">Order Summary</h3>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Base price / person</span>
                  <span>{formatPrice(breakdown.basePrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Package ({breakdown.packageName})</span>
                  <span>×{breakdown.packageMultiplier.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>×{breakdown.deliveryMultiplier.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Participants</span>
                  <span>×{breakdown.participants}</span>
                </div>
                {breakdown.volumeDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Volume discount</span>
                    <span>−{breakdown.volumeDiscount}%</span>
                  </div>
                )}

                <div className="border-t pt-2.5 flex justify-between font-semibold text-gray-900">
                  <span>Course subtotal</span>
                  <span>{formatPrice(breakdown.courseSubtotal)}</span>
                </div>

                {cartAddOns.length > 0 && (
                  <>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide pt-1">Add-ons</div>
                    {cartAddOns.map(a => (
                      <div key={a.id} className="flex justify-between text-gray-600">
                        <span className="truncate pr-2 flex-1">{a.name}</span>
                        <span className="flex-shrink-0">+{formatPrice(a.totalPrice)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2.5 flex justify-between font-semibold text-gray-900">
                      <span>Add-ons</span>
                      <span>+{formatPrice(breakdown.addOnsTotal)}</span>
                    </div>
                  </>
                )}

                <div className="border-t-2 border-gray-200 pt-3 flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span style={{ color: accent }}>{formatPrice(breakdown.total)}</span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full mt-6 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg active:scale-100"
                style={{ backgroundColor: added ? '#1D5C3A' : '#D4890A', color: added ? '#fff' : '#0F1F12' }}
              >
                {added ? (
                  <><Check className="w-5 h-5" /> Added to Cart!</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Add to Cart — {formatPrice(breakdown.total)}</>
                )}
              </button>

              {added && (
                <Link
                  href="/cart"
                  className="mt-3 flex items-center justify-center gap-1 w-full py-3 rounded-xl font-semibold text-sm text-white transition-colors"
                  style={{ backgroundColor: '#1D5C3A' }}
                >
                  View Cart & Checkout →
                </Link>
              )}

              <p className="mt-3 text-center text-xs text-gray-400">
                30-day satisfaction guarantee · No real charge (demo)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
