'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, Package, Layers, Gift, ArrowRight, Zap, Flame } from 'lucide-react'

const offerTypes = [
  {
    icon: Package,
    label: 'Standard Packages',
    theme: 'blue',
    title: 'Transparent ETS Packages',
    description: 'Our flagship packages offer fixed, transparent pricing for all core programmes. Choose individual or team enrolment based on your department\'s needs.',
    example: 'Leadership Essentials — from €747/person',
    badge: 'Always Available',
    cta: 'View Packages',
    href: '/courses/leadership-management',
  },
  {
    icon: Clock,
    label: 'Limited Time',
    theme: 'teal',
    title: 'Flash Discounts',
    description: 'Time-sensitive discounts on selected high-demand courses. Act fast — these early-bird offers expire before the cohort begins.',
    example: 'Save 15% on any course — offer ends soon!',
    badge: 'Ends Soon',
    cta: 'Claim Offer',
    href: '/courses/cultural-integration-diverse-environment',
  },
  {
    icon: Layers,
    label: 'Combo Offers',
    theme: 'blue',
    title: 'Dual Programme Savings',
    description: 'Bundle two complementary courses together and automatically save 10% on both. Perfect for a holistic professional development plan.',
    example: 'Cultural Integration + Team Building — 10% off',
    badge: '10% Savings',
    cta: 'See Combos',
    href: '/courses/cultural-integration-diverse-environment',
  },
  {
    icon: Zap,
    label: 'Bundle Offers',
    theme: 'terracotta',
    title: 'Departmental Group Rates',
    description: 'Train 10+ participants and unlock up to 20% group discounts. The ideal solution for upskilling entire departments or faculties at once.',
    example: 'Train 20+ people — save up to 20%',
    badge: 'Best Value',
    cta: 'Group Enrolment',
    href: '/courses/leadership-management',
  },
  {
    icon: Gift,
    label: 'Celebration',
    theme: 'teal',
    title: 'Seasonal Celebrations',
    description: 'Special occasion discounts throughout the year honoring the Academic year kickoff, holidays, and international awareness days.',
    example: 'Academic Year 2025 — 12% off selected courses',
    badge: 'Seasonal',
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
        <div key={l} className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl px-2 sm:px-3 py-1.5 min-w-[50px] sm:min-w-[60px] shadow-sm">
          <div className="text-xl sm:text-2xl font-black leading-none tracking-tight">{String(v).padStart(2, '0')}</div>
          <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-0.5 opacity-90">{l}</div>
        </div>
      ))}
    </div>
  )
}

export default function OffersSection() {
  return (
    <section id="offers" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gray-50 rounded-bl-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#EBEFFF] rounded-tr-full -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Special Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-gray-900 tracking-tight">
            Ways to Enrol <span style={{ color: '#223292' }}>&amp; Save</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            From standard packages to time-limited deals, we have flexible pricing options designed to fit every institutional budget and team size.
          </p>
        </div>

        {/* Highlighted Master Offer */}
        <div className="bg-gradient-to-br from-[#C85A43] to-[#a34734] rounded-3xl p-6 sm:p-10 mb-10 shadow-2xl shadow-[#C85A43]/20 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
            <div className="text-white max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase">
                <Flame className="w-3.5 h-3.5 text-[#F2D03B]" />
                Featured Deal
              </div>
              <h3 className="text-3xl sm:text-4xl font-black mb-3 leading-tight text-white drop-shadow-sm">
                Early Bird Special — <span className="text-[#F2D03B]">15% Off</span>
              </h3>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed">
                Book before the deadline and lock in your discount on any upcoming cohort. 
                Limited availability per programme to ensure high-quality faculty interaction.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center gap-6 flex-shrink-0 w-full lg:w-auto">
              <CountdownTimer expiresAt="2025-06-30T23:59:59Z" />
              <Link 
                href="/courses/cultural-integration-diverse-environment" 
                className="w-full sm:w-auto text-center font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-xl text-sm"
                style={{ backgroundColor: '#F2D03B', color: '#0F1F12' }}
              >
                Claim 15% Off Now →
              </Link>
            </div>
          </div>
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerTypes.map((offer) => {
            const Icon = offer.icon
            
            // Map theme to exact brand colors
            let accentColor = '#223292' // Royal Blue default
            let bgLight = '#EBEFFF'
            if (offer.theme === 'teal') {
              accentColor = '#45A29E'
              bgLight = '#E6F4F3'
            } else if (offer.theme === 'terracotta') {
              accentColor = '#C85A43'
              bgLight = '#FDF1EE'
            }

            return (
              <div 
                key={offer.label} 
                className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-300"
                    style={{ backgroundColor: bgLight }}
                  >
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-gray-100 text-gray-600">
                    {offer.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  {offer.description}
                </p>
                
                <div className="border-t border-gray-100 pt-5 mt-auto">
                  <p className="text-[11px] font-medium text-gray-400 mb-3 uppercase tracking-wide">
                    Example: <span className="text-gray-600 normal-case tracking-normal font-semibold">{offer.example}</span>
                  </p>
                  <Link 
                    href={offer.href} 
                    className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3" 
                    style={{ color: accentColor }}
                  >
                    {offer.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
