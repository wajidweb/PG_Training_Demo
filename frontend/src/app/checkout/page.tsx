'use client'

import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/pricing'
import { CheckCircle, ArrowLeft, Lock, CreditCard, Building2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { createOrder } from '@/lib/api'

const trustBadges = [
  'Certificate of completion included',
  'Full course materials provided',
  'Expert facilitators',
  '30-day satisfaction guarantee',
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', organisation: '',
    role: '', phone: '',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  })

  const total = totalPrice()

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16 px-4">
        <div className="max-w-md w-full mx-auto text-center p-6 sm:p-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you for choosing PG Training.</p>
          <p className="text-gray-600 mb-8">A confirmation and enrolment details will be sent to <strong>{form.email}</strong> within 24 hours.</p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left">
            <div className="text-sm font-semibold text-gray-700 mb-3">Order Summary</div>
            {items.map(item => (
              <div key={item.cartId} className="flex justify-between text-sm py-1">
                <span className="text-gray-600 line-clamp-1 flex-1 pr-4">{item.courseTitle}</span>
                <span className="font-semibold">{formatPrice(item.finalPrice)}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 flex justify-between font-bold">
              <span>Total Paid</span>
              <span style={{ color: '#1D5C3A' }}>{formatPrice(total)}</span>
            </div>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold" style={{ backgroundColor: '#1D5C3A' }}>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold" style={{ backgroundColor: '#1D5C3A' }}>
            <ArrowLeft className="w-4 h-4" /> Browse Courses
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createOrder({
        contact: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          organisation: form.organisation,
          role: form.role || undefined,
          phone: form.phone || undefined,
        },
        items: items.map(item => ({
          courseId: item.courseId,
          courseTitle: item.courseTitle,
          courseCode: item.courseCode,
          deliveryMethod: item.deliveryMethod,
          participants: item.participants,
          basePrice: item.basePrice,
          discountPercent: item.discountPercent,
          finalPrice: item.finalPrice,
          offerLabel: item.offerLabel,
        })),
        total,
        paymentMethod: 'card',
      })
    } catch {
      // Order may not save (backend offline), but demo continues
    }
    clearCart()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm mb-6 sm:mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" style={{ color: '#1D5C3A' }} /> Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'firstName', label: 'First Name', type: 'text', required: true, col: 1 },
                    { key: 'lastName', label: 'Last Name', type: 'text', required: true, col: 1 },
                    { key: 'email', label: 'Work Email', type: 'email', required: true, col: 2 },
                    { key: 'organisation', label: 'Institution / Organisation', type: 'text', required: true, col: 2 },
                    { key: 'role', label: 'Your Role / Position', type: 'text', required: false, col: 1 },
                    { key: 'phone', label: 'Phone (optional)', type: 'tel', required: false, col: 1 },
                  ].map(field => (
                    <div key={field.key} className={field.col === 2 ? 'sm:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-green-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" style={{ color: '#1D5C3A' }} /> Payment Details
                </h2>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <Lock className="w-3 h-3" /> Secured by 256-bit SSL encryption (demo — no real charge)
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      required
                      value={form.cardName}
                      onChange={e => setForm(prev => ({ ...prev, cardName: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-green-500 focus:outline-none"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={form.cardNumber}
                      onChange={e => setForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-green-500 focus:outline-none"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        required
                        value={form.expiry}
                        onChange={e => setForm(prev => ({ ...prev, expiry: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-green-500 focus:outline-none"
                        placeholder="MM / YY"
                        maxLength={7}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        required
                        value={form.cvv}
                        onChange={e => setForm(prev => ({ ...prev, cvv: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-green-500 focus:outline-none"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-lg"
                style={{ backgroundColor: '#D4890A', color: '#0F1F12' }}
              >
                <Lock className="w-5 h-5" />
                Complete Order — {formatPrice(total)}
              </button>
              <p className="text-center text-xs text-gray-400">
                By completing this order you agree to our Terms of Service and Privacy Policy.
                This is a demo — no real payment will be processed.
              </p>
            </form>
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.cartId} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#1D5C3A' }}>
                      {item.courseCode.replace('CPD_', '').replace('ETS_', '').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">{item.courseTitle}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.participants} person{item.participants > 1 ? 's' : ''} · {item.deliveryMethod.label}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900 flex-shrink-0">{formatPrice(item.finalPrice)}</div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (0% — educational)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span style={{ color: '#1D5C3A' }}>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-4 pt-4 border-t space-y-2">
                {trustBadges.map(b => (
                  <div key={b} className="flex items-center gap-2 text-xs text-gray-600">
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
