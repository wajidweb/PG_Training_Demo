'use client'

import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/pricing'
import { CheckCircle, ArrowLeft, Lock, Building2, Loader2, ShieldCheck, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const trustBadges = [
  'Certificate of completion included',
  'Full course materials provided',
  'Expert facilitators',
  '30-day satisfaction guarantee',
]

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', organisation: '',
    role: '', phone: '',
  })

  const total = totalPrice()

  if (items.length === 0 && !isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-4 bg-gray-50">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ArrowLeft className="w-10 h-10 text-[#223292]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">Please add at least one course to your cart to proceed with checkout.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-105" style={{ backgroundColor: '#223292' }}>
            <ArrowLeft className="w-4 h-4" /> Browse Courses
          </Link>
        </div>
      </div>
    )
  }

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-16 px-4">
        <div className="relative">
           <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse" />
           <Loader2 className="relative h-16 w-12 text-[#223292] animate-spin mb-6" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Redirecting to Secure Payment</h1>
        <p className="text-gray-500 mt-3 text-center max-w-xs leading-relaxed font-medium">
          We are preparing your secure Stripe checkout session. Please do not refresh this page.
        </p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRedirecting(true)
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
      const res = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
            selectedDate: item.selectedDate,
            participants: item.participants,
            basePrice: item.basePrice,
            discountPercent: item.discountPercent,
            finalPrice: item.finalPrice,
            offerLabel: item.offerLabel,
            addOns: item.addOns,
          })),
          total,
        }),
      })

      if (!res.ok) throw new Error('Checkout request failed')

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Checkout failed. Please ensure the backend server is running and try again.')
      setIsRedirecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8faff] pt-16 sm:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#223292] font-bold text-sm mb-6 sm:mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-blue-900/5 border border-white">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="font-black text-gray-900 text-2xl tracking-tight flex items-center gap-3">
                    <Building2 className="w-7 h-7 text-[#223292]" /> Contact Details
                  </h2>
                  <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-full">Secure Checkout</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { key: 'firstName', label: 'First Name', type: 'text', required: true, col: 1, placeholder: 'e.g. John' },
                    { key: 'lastName', label: 'Last Name', type: 'text', required: true, col: 1, placeholder: 'e.g. Smith' },
                    { key: 'email', label: 'Professional Email', type: 'email', required: true, col: 2, placeholder: 'john.smith@university.edu' },
                    { key: 'organisation', label: 'Institution / Organisation', type: 'text', required: true, col: 2, placeholder: 'e.g. University of Malta' },
                    { key: 'role', label: 'Your Position', type: 'text', required: false, col: 1, placeholder: 'e.g. Senior Lecturer' },
                    { key: 'phone', label: 'Contact Phone (optional)', type: 'tel', required: false, col: 1, placeholder: '+356 ...' },
                  ].map(field => (
                    <div key={field.key} className={field.col === 2 ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">{field.label}</label>
                      <input
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:border-[#223292] focus:ring-4 focus:ring-blue-100 focus:bg-white focus:outline-none transition-all font-medium"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stripe Notice */}
              <div className="bg-[#223292] rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/10 flex flex-col sm:flex-row items-center gap-6 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                 <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shrink-0">
                    <ShieldCheck className="w-10 h-10 text-[#F2D03B]" />
                 </div>
                 <div className="text-center sm:text-left">
                    <h3 className="font-black text-xl tracking-tight">One Last Step</h3>
                    <p className="text-blue-100/80 text-sm mt-1 leading-relaxed font-medium">
                      After clicking the button below, you will be redirected to our encrypted Stripe payment gateway to complete your transaction securely.
                    </p>
                 </div>
              </div>

              <button
                type="submit"
                disabled={isRedirecting}
                className="w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-2xl shadow-blue-900/10 cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: '#F2D03B', color: '#0F1F12' }}
              >
                <Lock className="w-6 h-6" />
                Pay {formatPrice(total)} Now
              </button>
              
              <div className="flex items-center justify-center gap-6 pt-2">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-all" />
                 <p className="text-xs text-gray-400 font-medium max-w-[200px] text-center">
                   Payments are handled by Stripe. Your data is protected by industry-leading security.
                 </p>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/5 border border-white">
              <h3 className="font-black text-gray-900 text-xl mb-6 tracking-tight">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.cartId} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 shadow-lg shadow-blue-900/10 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#223292' }}>
                      {item.courseCode.slice(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900 line-clamp-1 leading-tight mb-1">{item.courseTitle}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter flex flex-wrap gap-x-2">
                         <span>{item.participants} attendee{item.participants > 1 ? 's' : ''}</span>
                         <span className="text-blue-200">|</span>
                         <span>{item.deliveryMethod.label}</span>
                      </div>
                      {item.selectedDate && (
                         <div className="text-[10px] font-bold text-[#223292] mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.selectedDate).toLocaleDateString()}
                         </div>
                      )}
                    </div>
                    <div className="text-sm font-black text-gray-900 flex-shrink-0">{formatPrice(item.finalPrice)}</div>
                  </div>
                ))}
              </div>
              
              <div className="border-t-2 border-dashed border-gray-100 pt-6 space-y-3">
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                  <span>Institutional Tax Exemption</span>
                  <span>0%</span>
                </div>
                <div className="flex justify-between font-black text-2xl pt-2 text-gray-900">
                  <span>Total</span>
                  <span style={{ color: '#223292' }}>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
                {trustBadges.map(b => (
                  <div key={b} className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
                    <div className="bg-emerald-50 p-1 rounded-md">
                       <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    </div>
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
