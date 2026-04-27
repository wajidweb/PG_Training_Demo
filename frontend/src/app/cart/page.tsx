'use client'

import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/pricing'
import {
  Trash2, ShoppingBag, ArrowRight, Monitor, MapPin,
  Users, Package, Plus, ArrowLeft, CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

const trustBadges = [
  'Certificate of completion included',
  'Expert facilitators',
  '30-day satisfaction guarantee',
  'Full course materials provided',
]

export default function CartPage() {
  const { items, removeItem, clearCart, totalPrice } = useCartStore()
  const total = totalPrice()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-4 bg-gray-50">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Browse our courses and add them to your cart.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
            style={{ backgroundColor: '#1D5C3A' }}
          >
            <ArrowLeft className="w-4 h-4" /> Browse Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-7 h-7" style={{ color: '#1D5C3A' }} />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Cart</h1>
            <span className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-400 hover:text-red-600 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Cart items ── */}
          <div className="lg:col-span-2 space-y-5">
            {items.map(item => {
              const addonTotal = item.addOns?.reduce((s, a) => s + a.totalPrice, 0) ?? 0
              const coursePrice = item.finalPrice - addonTotal
              return (
                <div key={item.cartId} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">

                  {/* Course header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex gap-4 flex-1 min-w-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: '#1D5C3A' }}
                      >
                        {item.courseCode.replace('CPD_', '').replace('ETS_', '').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold mb-0.5" style={{ color: '#1D5C3A' }}>{item.courseCode}</div>
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight">{item.courseTitle}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartId)}
                      className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Details chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                        {item.deliveryMethod.type === 'onsite' ? <MapPin className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                        Delivery
                      </div>
                      <div className="font-semibold text-sm text-gray-900">{item.deliveryMethod.label}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Participants
                      </div>
                      <div className="font-semibold text-sm text-gray-900">
                        {item.participants} person{item.participants !== 1 ? 's' : ''}
                      </div>
                    </div>
                    {item.packageTier && (
                      <div className="bg-gray-50 rounded-xl p-3 col-span-2 sm:col-span-1">
                        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                          <Package className="w-3 h-3" /> Package
                        </div>
                        <div className="font-semibold text-sm text-gray-900">{item.packageTier.name}</div>
                      </div>
                    )}
                  </div>

                  {/* Price breakdown */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{item.packageTier?.name ?? 'Essentials'} package</span>
                      <span>{formatPrice(coursePrice)}</span>
                    </div>
                    {item.addOns && item.addOns.length > 0 && item.addOns.map(addon => (
                      <div key={addon.id} className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Plus className="w-3 h-3 text-gray-400" />{addon.name}
                          <span className="text-xs text-gray-400">
                            ({addon.priceType === 'per_person' ? `${item.participants}×${formatPrice(addon.unitPrice)}` : 'flat'})
                          </span>
                        </span>
                        <span>+{formatPrice(addon.totalPrice)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                      <span className="text-gray-900">Item Total</span>
                      <span style={{ color: '#1D5C3A' }}>{formatPrice(item.finalPrice)}</span>
                    </div>
                  </div>
                </div>
              )
            })}

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Continue shopping
            </Link>
          </div>

          {/* ── Order summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Total</h3>

              <div className="space-y-2 mb-4">
                {items.map(item => (
                  <div key={item.cartId} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate pr-2 flex-1 leading-tight">{item.courseTitle}</span>
                    <span className="flex-shrink-0 font-medium">{formatPrice(item.finalPrice)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax (0% — educational)</span>
                  <span>€0.00</span>
                </div>
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span style={{ color: '#1D5C3A' }}>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-lg"
                style={{ backgroundColor: '#D4890A', color: '#0F1F12' }}
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Trust badges */}
              <div className="mt-5 pt-5 border-t space-y-2">
                {trustBadges.map(b => (
                  <div key={b} className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
