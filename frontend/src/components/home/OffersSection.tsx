'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, Package, Layers, Gift, ArrowRight, Zap, Flame } from 'lucide-react'

const offerTypes = [
  {
    icon: Package,
    label: 'ETS Packages',
    color: 'bg-green-700',
    lightBg: 'bg-green-50',
    borderColor: 'border-green-200',
    title: 'Standard Packages',
    description: 'Our flagship ETS packages offer fixed, transparent pricing for all our core programmes. Choose individual or team enrolment.',
    example: 'Academic Writing Skills — from €497/person',
    badge: 'Always Available',
    badgeColor: 'bg-green-100 text-green-800',
    cta: 'View Packages',
    href: '/courses/academic-writing-skills',
  },
  {
    icon: Clock,
    label: 'Limited Time',
    color: 'bg-red-500',
    lightBg: 'bg-red-50',
    borderColor: 'border-red-200',
    title: 'Limited Time Offers',
    description: 'Time-sensitive discounts on selected courses. Act fast — these offers expire and won\'t be repeated at this price.',
    example: 'Save 15% on any course — offer ends soon!',
    badge: 'Ends Soon',
    badgeColor: 'bg-red-100 text-red-700',
    cta: 'Claim Offer',
    href: '/courses/cultural-integration-diverse-environment',
  },
  {
    icon: Layers,
    label: 'Combo Offers',
    color: 'bg-teal-600',
    lightBg: 'bg-teal-50',
    borderColor: 'border-teal-200',
    title: 'Combo Offers',
    description: 'Bundle two complementary courses together and save 10% on both. Perfect for a holistic professional development plan.',
    example: 'Cultural Integration + Team Building — 10% off',
    badge: '10% Savings',
    badgeColor: 'bg-teal-100 text-teal-800',
    cta: 'See Combos',
    href: '/courses/cultural-integration-diverse-environment',
  },
  {
    icon: Zap,
    label: 'Bundle Offers',
    color: 'bg-amber-600',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    title: 'Bundle Offers',
    description: 'Train 10+ participants and unlock up to 20% group discounts. Ideal for departments and institutions.',
    example: 'Train 20+ people — save up to 20%',
    badge: 'Best Value',
    badgeColor: 'bg-amber-100 text-amber-800',
    cta: 'Group Enrolment',
    href: '/courses/leadership-management',
  },
  {
    icon: Gift,
    label: 'Celebration',
    color: 'bg-orange-600',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-200',
    title: 'Celebration Offers',
    description: 'Seasonal and special occasion discounts throughout the year. Academic year, holidays, and international awareness days.',
    example: 'Academic Year 2025 — 12% off selected courses',
    badge: 'Seasonal',
    badgeColor: 'bg-orange-100 text-orange-800',
    cta: 'See Celebrations',
    href: '/courses/academic-writing-skills',
  },
]

function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = new Date(expiresAt).getTime() - Date.now()
      if (diff <= 0) return
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const t = setInterval(calc, 1000)
    return () => clearInterval(t)
  }, [expiresAt])

  return (
    <div className="flex gap-2 text-center">
      {[{ v: timeLeft.d, l: 'Days' }, { v: timeLeft.h, l: 'Hrs' }, { v: timeLeft.m, l: 'Min' }, { v: timeLeft.s, l: 'Sec' }].map(({ v, l }) => (
        <div key={l} className="bg-red-500 text-white rounded-lg px-2 py-1 min-w-[44px]">
          <div className="text-lg font-bold leading-none">{String(v).padStart(2, '0')}</div>
          <div className="text-xs opacity-80">{l}</div>
        </div>
      ))}
    </div>
  )
}

export default function OffersSection() {
  return (
    <section id="offers" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Special Offers
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1D5C3A' }}>
            Ways to Enrol &amp; Save
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            From standard packages to time-limited deals, we have flexible options designed to fit every budget and team size.
          </p>
        </div>

        {/* Limited Time highlighted */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="text-white">
            <div className="font-bold text-lg sm:text-xl mb-1 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-200" />
              Early Bird Special — 15% Off Any Course
            </div>
            <div className="text-red-100 text-sm sm:text-base">Book before the deadline and lock in your discount. Limited availability per cohort.</div>
          </div>
          <div className="flex flex-col items-start sm:items-center gap-3 flex-shrink-0">
            <CountdownTimer expiresAt="2025-06-30T23:59:59Z" />
            <Link href="/courses/cultural-integration-diverse-environment" className="bg-white text-red-600 font-bold px-5 py-2 rounded-xl hover:bg-red-50 transition-colors text-sm whitespace-nowrap">
              Claim 15% Off →
            </Link>
          </div>
        </div>

        {/* Offer cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {offerTypes.map((offer) => {
            const Icon = offer.icon
            return (
              <div key={offer.label} className={`${offer.lightBg} border-2 ${offer.borderColor} rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-shadow`}>
                <div className={`inline-flex items-center justify-center w-11 h-11 ${offer.color} rounded-xl mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${offer.badgeColor} mb-3`}>
                  {offer.badge}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{offer.description}</p>
                <p className="text-xs font-semibold text-gray-500 mb-4 italic">e.g. {offer.example}</p>
                <Link href={offer.href} className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all" style={{ color: '#1D5C3A' }}>
                  {offer.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
