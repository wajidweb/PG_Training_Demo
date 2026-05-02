'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { CheckCircle, Home, ShoppingBag, Loader2 } from 'lucide-react'
import Link from 'next/link'

function SuccessContent() {
  const { clearCart } = useCartStore()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Clear cart on successful payment
    if (sessionId) {
      clearCart()
    }
    setLoading(false)
  }, [sessionId, clearCart])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 text-[#223292] animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Confirming your payment...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16 px-4">
      <div className="max-w-md w-full mx-auto text-center animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Payment Successful!</h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Thank you for choosing Paragon Academy. Your enrolment is being processed and you will receive a confirmation email shortly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[#223292] bg-white border-2 border-[#223292] font-bold hover:bg-gray-50 transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link 
            href="/#courses" 
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white bg-[#223292] font-bold hover:opacity-90 shadow-lg transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            More Courses
          </Link>
        </div>

        <p className="mt-12 text-xs text-gray-400">
          Order Reference: <span className="font-mono text-gray-500">{sessionId?.slice(-12) || 'N/A'}</span>
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#223292]" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
