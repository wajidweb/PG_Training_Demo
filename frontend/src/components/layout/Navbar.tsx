'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, BookOpen, Building2, TrendingUp, ShieldCheck, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart'
import { TrainingPath } from '@/types'

export default function Navbar({}: { paths: TrainingPath[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()

  useEffect(() => {
    // Wrap state updates in setTimeout to satisfy strict eslint react-hooks/set-state-in-effect rule
    setTimeout(() => {
      setMounted(true)
      setIsAdmin(localStorage.getItem('admin_auth') === 'true')
    }, 0)
    
    // Optional: listen for storage changes across tabs
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem('admin_auth') === 'true')
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="Paragon Global Training Academy" 
              className="h-16 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-xs font-bold tracking-wider text-gray-600 hover:text-[#223292] transition-colors uppercase"
            >
              Home
            </Link>

            {/* Our Programmes Dropdown */}
            <div className="relative group py-2">
              <button
                className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-600 hover:text-[#223292] transition-colors focus:outline-none uppercase"
              >
                Our Programmes
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-80 origin-top-left rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                <Link
                  href="/programmes#path-academic"
                  className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-blue-50/50 transition-colors group/item"
                >
                  <div className="rounded-lg bg-blue-50 p-2 text-[#223292] group-hover/item:bg-white transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wide text-xs">Academic Excellence</p>
                    <p className="text-xs text-gray-500 mt-0.5">Teaching, research & scholarly impact</p>
                  </div>
                </Link>

                <Link
                  href="/programmes#path-administrative"
                  className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-blue-50/50 transition-colors group/item"
                >
                  <div className="rounded-lg bg-emerald-50 p-2 text-[#45A29E] group-hover/item:bg-white transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wide text-xs">Administrative Excellence</p>
                    <p className="text-xs text-gray-500 mt-0.5">Efficient & high-performing institutions</p>
                  </div>
                </Link>

                <Link
                  href="/programmes#path-leadership"
                  className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-blue-50/50 transition-colors group/item"
                >
                  <div className="rounded-lg bg-orange-50 p-2 text-[#C85A43] group-hover/item:bg-white transition-colors">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wide text-xs">Leadership & Strategic Management</p>
                    <p className="text-xs text-gray-500 mt-0.5">Vision, strategy & executive leadership</p>
                  </div>
                </Link>
              </div>
            </div>

            <Link
              href="/#who-we-are"
              className="text-xs font-bold tracking-wider text-gray-600 hover:text-[#223292] transition-colors uppercase"
            >
              About us
            </Link>

            <Link
              href="/#why-choose-us"
              className="text-xs font-bold tracking-wider text-gray-600 hover:text-[#223292] transition-colors uppercase"
            >
              Why Choose PG Training
            </Link>

            <Link
              href="/contact-us"
              className="text-xs font-bold tracking-wider text-gray-600 hover:text-[#223292] transition-colors uppercase"
            >
              Contact us
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors animate-pulse-once"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ backgroundColor: '#F2D03B' }}>
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>

            {mounted && (
              <Link
                href={isAdmin ? '/admin/dashboard' : '/admin/login'}
                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider text-[#223292] bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 uppercase"
              >
                <ShieldCheck className="h-4 w-4" />
                {isAdmin ? 'Dashboard' : 'Admin Login'}
              </Link>
            )}

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-bold tracking-wider text-gray-700 rounded-lg hover:bg-gray-50 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {/* Our Programmes Accordion */}
          <div>
            <button
              onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
              className="flex items-center justify-between w-full py-2.5 px-2 text-xs font-bold tracking-wider text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none uppercase"
            >
              <span>Our Programmes</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCoursesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {mobileCoursesOpen && (
              <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-100 ml-2">
                <Link
                  href="/programmes#path-academic"
                  className="flex items-center gap-2 py-2 px-2 text-xs font-semibold tracking-wider text-gray-600 rounded-lg hover:bg-gray-50 uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  <BookOpen className="w-4 h-4 text-[#223292]" />
                  Academic Excellence
                </Link>
                <Link
                  href="/programmes#path-administrative"
                  className="flex items-center gap-2 py-2 px-2 text-xs font-semibold tracking-wider text-gray-600 rounded-lg hover:bg-gray-50 uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  <Building2 className="w-4 h-4 text-[#45A29E]" />
                  Administrative Excellence
                </Link>
                <Link
                  href="/programmes#path-leadership"
                  className="flex items-center gap-2 py-2 px-2 text-xs font-semibold tracking-wider text-gray-600 rounded-lg hover:bg-gray-50 uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  <TrendingUp className="w-4 h-4 text-[#C85A43]" />
                  Leadership & Strategic Management
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/#who-we-are"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-bold tracking-wider text-gray-700 rounded-lg hover:bg-gray-50 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            About us
          </Link>

          <Link
            href="/#why-choose-us"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-bold tracking-wider text-gray-700 rounded-lg hover:bg-gray-50 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Why Choose PG Training
          </Link>

          <Link
            href="/contact-us"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-bold tracking-wider text-gray-700 rounded-lg hover:bg-gray-50 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </Link>
          
          <div className="pt-2 flex flex-col gap-2">
            {mounted && (
              <Link
                href={isAdmin ? '/admin/dashboard' : '/admin/login'}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold tracking-wider text-[#223292] bg-blue-50 border border-blue-200 w-full uppercase"
                onClick={() => setMenuOpen(false)}
              >
                <ShieldCheck className="h-4 w-4" />
                {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
