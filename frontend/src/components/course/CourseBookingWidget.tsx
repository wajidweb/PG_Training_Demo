'use client'

import { useState, useMemo, useEffect } from 'react'
import { Course, CartAddon } from '@/types'
import { ADD_ONS } from '@/data/packages'
import { calculatePrice, formatPrice } from '@/lib/pricing'
import { useCartStore } from '@/store/cart'
import { nanoid } from 'nanoid'
import {
  Users, Monitor, MapPin, Check, Plus, Minus,
  ShoppingCart, BookOpen, Play, MessageCircle, Award, ClipboardCheck, Calendar, CheckCircle2, ChevronLeft, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set())
  const [added, setAdded] = useState(false)
  const [showError, setShowError] = useState(false)
  
  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const { addItem } = useCartStore()
  const accent = pathColors[course.pathId] ?? '#223292'

  // Parse ranges from course data
  const dateRanges = useMemo(() => {
    return (course.upcomingDates || []).map(rangeStr => {
      if (rangeStr.includes('|')) {
        const [start, end] = rangeStr.split('|')
        return { start: new Date(start), end: new Date(end) }
      }
      const date = new Date(rangeStr)
      return { start: date, end: date }
    })
  }, [course.upcomingDates])

  // Reset selected date if delivery method changes to self-paced
  useEffect(() => {
    if (delivery.type === 'self-paced') {
      setSelectedDate(null)
      setShowError(false)
    } else if (dateRanges.length > 0 && !selectedDate) {
      // Set calendar to show the first available date's month
      setCurrentMonth(new Date(dateRanges[0].start))
    }
  }, [delivery.type, dateRanges, selectedDate])

  // Calendar Logic
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  
  const calendarDays = useMemo(() => {
    const days = []
    const count = daysInMonth(currentMonth)
    const offset = firstDayOfMonth(currentMonth)
    
    // Previous month padding
    for (let i = 0; i < offset; i++) days.push(null)
    
    // Current month days
    for (let i = 1; i <= count; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      
      // Check if this date is within any available range
      const isAvailable = dateRanges.some(range => {
        const d = new Date(date).setHours(0,0,0,0)
        const s = new Date(range.start).setHours(0,0,0,0)
        const e = new Date(range.end).setHours(23,59,59,999)
        return d >= s && d <= e
      })
      
      days.push({ day: i, date, isAvailable })
    }
    return days
  }, [currentMonth, dateRanges])

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))

  const toggleAddOn = (id: string) =>
    setSelectedAddOns(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const cartAddOns: CartAddon[] = useMemo(() =>
    ADD_ONS
      .filter(a => selectedAddOns.has(a.id) && course.addOnIds?.includes(a.id))
      .map(a => ({
        id: a.id,
        name: a.name,
      })),
    [selectedAddOns, course.addOnIds]
  )

  const breakdown = useMemo(
    () => calculatePrice(course, delivery, participants, 0, undefined, cartAddOns),
    [course, delivery, participants, cartAddOns]
  )

  const handleAddToCart = () => {
    if ((delivery.type === 'online-instructor' || delivery.type === 'onsite') && !selectedDate && course.upcomingDates.length > 0) {
      setShowError(true)
      document.getElementById('date-selection')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    addItem({
      cartId: nanoid(),
      courseId: course.id,
      courseTitle: course.title,
      courseCode: course.code,
      deliveryMethod: delivery,
      selectedDate: selectedDate || undefined,
      participants,
      basePrice: course.pricing.basePrice,
      addOns: cartAddOns,
      discountPercent: 0,
      finalPrice: breakdown.total,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const stepLabel = (n: number | string) => (
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
                    : d.type === 'online-instructor' 
                      ? <Monitor className="w-4 h-4" style={{ color: accent }} />
                      : <BookOpen className="w-4 h-4" style={{ color: accent }} />}
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

      {/* Step Date – Selection (Conditional) */}
      {(delivery.type === 'online-instructor' || delivery.type === 'onsite') && course.upcomingDates.length > 0 && (
        <div id="date-selection" className={cn("p-5 rounded-3xl border-2 transition-all", showError && !selectedDate ? "border-red-300 bg-red-50" : "border-slate-100 bg-slate-50")}>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
            {stepLabel('D')} Select Your Session Date
          </h3>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm text-slate-800">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h4>
              <div className="flex gap-1">
                <button onClick={prevMonth} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"><ChevronLeft className="h-4 w-4" /></button>
                <button onClick={nextMonth} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <span key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, i) => {
                if (!d) return <div key={`empty-${i}`} />
                
                const isSelected = selectedDate === d.date.toISOString()
                
                return (
                  <button
                    key={i}
                    disabled={!d.isAvailable}
                    onClick={() => {
                      setSelectedDate(d.date.toISOString())
                      setShowError(false)
                    }}
                    className={cn(
                      "aspect-square flex items-center justify-center text-xs rounded-lg transition-all font-bold",
                      d.isAvailable 
                        ? isSelected 
                          ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-100 scale-105" 
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer"
                        : "text-slate-300 bg-transparent cursor-not-allowed opacity-50"
                    )}
                  >
                    {d.day}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-100 border border-blue-300" />
                  <span className="text-[10px] font-medium text-slate-500">Available Session</span>
               </div>
               {selectedDate && (
                 <span className="text-[10px] font-bold text-blue-700">
                    Selected: {new Date(selectedDate).toLocaleDateString()}
                 </span>
               )}
            </div>
          </div>

          {showError && !selectedDate && (
            <p className="text-[10px] text-red-600 font-bold mt-3 text-center bg-red-100/50 py-1 rounded-full">
              Please click an available date on the calendar
            </p>
          )}
        </div>
      )}

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

      {/* Step 3 – Add-ons */}
      {course.addOnIds && course.addOnIds.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            {stepLabel(3)} Add-ons <span className="text-[10px] font-normal text-gray-400">(Free)</span>
          </h3>
          <div className="flex flex-col gap-2">
            {ADD_ONS.filter(addon => course.addOnIds?.includes(addon.id)).map(addon => {
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
      )}


      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-5">
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Course Subtotal</span>
            <span>{formatPrice(breakdown.courseSubtotal)}</span>
          </div>
          {selectedDate && (
            <div className="flex justify-between text-gray-600">
              <span>Selected Date</span>
              <span className="font-bold text-blue-700 text-right max-w-[150px] truncate">
                {new Date(selectedDate).toLocaleDateString()}
              </span>
            </div>
          )}
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
          className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md active:scale-100 cursor-pointer"
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
