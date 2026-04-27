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
  academic: '#223292',
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

  const accent = pathColors[course.pathId] ?? '#223292'

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
      })),
    [selectedAddOns]
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
      className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold flex-shrink-0"
      style={{ backgroundColor: accent }}
    >
      {n}
    </span>
  )

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-gray-200/50 border border-gray-100 lg:sticky lg:top-24 flex flex-col gap-6">
      <div className="text-center">
        <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          Enrol Now
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Build Your Package</h2>
      </div>

      {/* Step 1 – Delivery */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
          {stepLabel(1)} Delivery Method
        </h3>
        <div className="flex flex-col gap-2">
          {course.deliveryMethods.map(d => {
            const active = delivery.type === d.type
            return (
              <button
                key={d.type}
                onClick={() => setDelivery(d)}
                className={`p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between ${active ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-2">
                  {d.type === 'onsite'
                    ? <MapPin className="w-4 h-4" style={{ color: accent }} />
                    : <Monitor className="w-4 h-4" style={{ color: accent }} />}
                  <div>
                    <div className="font-semibold text-sm text-gray-900 leading-none">{d.label}</div>
                    <div className="text-[10px] text-gray-500 mt-1">
                      {d.multiplier === 1 ? 'Standard rate' : d.multiplier < 1 ? `${Math.round((1 - d.multiplier) * 100)}% cheaper` : `+${Math.round((d.multiplier - 1) * 100)}% premium`}
                    </div>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${active ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                   {active && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2 – Participants */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
          {stepLabel(2)} Participants
        </h3>
        <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
          <button
            onClick={() => setParticipants(p => Math.max(1, p - 1))}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all bg-white"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <div className="text-2xl font-bold text-gray-900 flex-1 text-center">{participants}</div>
          <button
            onClick={() => setParticipants(p => Math.min(course.pricing.maxParticipants, p + 1))}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all bg-white"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="text-[11px] text-gray-500 mt-2 flex justify-between px-1">
          <span>Max {course.pricing.maxParticipants} allowed</span>
          {breakdown.volumeDiscount > 0 && (
            <span className="text-green-600 font-bold">{breakdown.volumeDiscount}% discount active!</span>
          )}
        </div>
      </div>

      {/* Step 3 – Package tier */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
          {stepLabel(3)} Choose Package
        </h3>
        <div className="flex flex-col gap-3">
          {PACKAGE_TIERS.map(tier => {
            const active = packageTier.id === tier.id
            return (
              <button
                key={tier.id}
                onClick={() => setPackageTier(tier)}
                className={`p-4 rounded-xl border-2 text-left transition-all relative flex gap-3 ${active ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${active ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                  {active && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-sm mb-1">{tier.name}</div>
                  <div className="text-xs text-gray-500 mb-2 leading-relaxed">{tier.description}</div>
                  <ul className="space-y-1">
                    {tier.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                        <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                    {tier.features.length > 3 && (
                      <li className="text-[10px] text-gray-400 pl-4.5">+{tier.features.length - 3} more features</li>
                    )}
                  </ul>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 4 – Add-ons */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
          {stepLabel(4)} Add-ons <span className="text-[10px] font-normal text-gray-400">(Free)</span>
        </h3>
        <div className="flex flex-col gap-2">
          {ADD_ONS.slice(0, 3).map(addon => {
            const active = selectedAddOns.has(addon.id)
            const Icon = addonIcons[addon.id] ?? BookOpen
            return (
              <button
                key={addon.id}
                onClick={() => toggleAddOn(addon.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${active ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${active ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Icon className="w-3.5 h-3.5" style={{ color: active ? accent : '#9CA3AF' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-gray-900 leading-tight mb-0.5 truncate">{addon.name}</div>
                  <div className="text-[10px] text-gray-500 line-clamp-1">{addon.description}</div>
                </div>
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${active ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {active && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-5">
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Course Subtotal</span>
            <span>{formatPrice(breakdown.courseSubtotal)}</span>
          </div>
          {cartAddOns.length > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>{cartAddOns.length} Add-ons</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-end mb-4">
          <span className="text-sm font-bold text-gray-900">Total</span>
          <span className="text-3xl font-black" style={{ color: accent }}>{formatPrice(breakdown.total)}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md active:scale-100"
          style={{ backgroundColor: added ? accent : '#F2D03B', color: added ? '#fff' : '#0F1F12' }}
        >
          {added ? (
            <><Check className="w-5 h-5" /> Added to Cart!</>
          ) : (
            <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
          )}
        </button>

        {added && (
          <Link
            href="/cart"
            className="mt-3 flex items-center justify-center w-full py-3 rounded-xl font-bold text-sm text-white transition-colors"
            style={{ backgroundColor: accent }}
          >
            Checkout Now →
          </Link>
        )}
      </div>
    </div>
  )
}
