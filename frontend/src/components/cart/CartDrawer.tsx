'use client'

import { useCartStore } from '@/store/cart'
import { X, Trash2, ShoppingBag, ArrowRight, Monitor, MapPin, Users, Package, Plus } from 'lucide-react'
import { formatPrice } from '@/lib/pricing'
import Link from 'next/link'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, totalPrice } = useCartStore()
  const total = totalPrice()

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={closeCart} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b" style={{ backgroundColor: '#1D5C3A' }}>
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="font-bold text-lg">Your Cart</h2>
            {items.length > 0 && (
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-sm mb-6">Browse our courses and add them to your cart</p>
              <button
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ backgroundColor: '#1D5C3A' }}
              >
                Browse Courses <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => {
                const addonTotal = item.addOns?.reduce((s, a) => s + a.totalPrice, 0) ?? 0
                const coursePrice = item.finalPrice - addonTotal
                return (
                  <div key={item.cartId} className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold mb-1" style={{ color: '#1D5C3A' }}>{item.courseCode}</div>
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-2">
                          {item.courseTitle}
                        </h4>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div className="flex items-center gap-1.5">
                            {item.deliveryMethod.type === 'onsite' ? <MapPin className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                            {item.deliveryMethod.label}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3 h-3" />
                            {item.participants} participant{item.participants > 1 ? 's' : ''}
                          </div>
                          {item.packageTier && (
                            <div className="flex items-center gap-1.5">
                              <Package className="w-3 h-3" />
                              {item.packageTier.name} package
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="p-1.5 hover:bg-red-100 text-gray-400 hover:text-red-500 rounded-lg transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add-ons */}
                    {item.addOns && item.addOns.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Course</span>
                          <span>{formatPrice(coursePrice)}</span>
                        </div>
                        {item.addOns.map(a => (
                          <div key={a.id} className="flex justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Plus className="w-2.5 h-2.5" />{a.name}</span>
                            <span>+{formatPrice(a.totalPrice)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                      <span className="text-xs text-gray-500">Item total</span>
                      <span className="font-bold text-gray-900">{formatPrice(item.finalPrice)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between text-lg">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-2xl" style={{ color: '#1D5C3A' }}>{formatPrice(total)}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
              style={{ backgroundColor: '#D4890A', color: '#0F1F12' }}
            >
              View Cart & Checkout <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={closeCart}
              className="w-full py-3 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
