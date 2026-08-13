'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, BookOpen, ChevronDown, Compass, Award, Cpu, ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart'
import { TrainingPath } from '@/types'

export default function Navbar({}: { paths?: TrainingPath[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSchoolsOpen, setMobileSchoolsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
      setIsAdmin(localStorage.getItem('admin_auth') === 'true')
    }, 0)
    
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem('admin_auth') === 'true')
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="Paragon Global Training" 
              className="h-16 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="text-xs font-black tracking-wider text-primary hover:text-accent transition-colors uppercase"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-xs font-black tracking-wider text-primary hover:text-accent transition-colors uppercase"
            >
              About
            </Link>

            {/* Our Schools Dropdown */}
            <div className="relative group py-2">
              <button
                className="flex items-center gap-1.5 text-xs font-black tracking-wider text-primary hover:text-accent transition-colors focus:outline-none uppercase"
              >
                Our Schools
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-accent" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-80 origin-top-left rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                <Link
                  href="/executive-success"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary/40 transition-colors group/item"
                >
                  <div className="rounded-lg bg-slate-900 p-2 text-accent">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-primary uppercase tracking-wide text-xs">School of Executive Success</p>
                    <p className="text-xs text-muted-foreground mt-0.5">For CEOs, Managing Directors & Boards</p>
                  </div>
                </Link>

                <Link
                  href="/academic-excellence"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary/40 transition-colors group/item"
                >
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-primary uppercase tracking-wide text-xs">Academic & Workforce Excellence</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Erasmus+, AI capability & workforce training</p>
                  </div>
                </Link>

                <div className="border-t border-[#E2E8F0]/40 my-1" />

                <Link
                  href="/programmes"
                  className="flex items-start gap-3 rounded-lg p-3 bg-secondary/10 hover:bg-secondary/35 transition-colors group/item"
                >
                  <div className="rounded-lg bg-accent/10 p-2 text-accent">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-primary uppercase tracking-wide text-xs">All Course Programmes</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Explore single courses, bootcamps & buy packages</p>
                  </div>
                </Link>
              </div>
            </div>

            <Link
              href="/learning-pathways"
              className="text-xs font-black tracking-wider text-primary hover:text-accent transition-colors uppercase"
            >
              Pathways
            </Link>

            <Link
              href="/knowledge-hub"
              className="text-xs font-black tracking-wider text-primary hover:text-accent transition-colors uppercase"
            >
              Knowledge Hub
            </Link>

            <Link
              href="/journal"
              className="text-xs font-black tracking-wider text-primary hover:text-accent transition-colors uppercase"
            >
              Journal
            </Link>

            <Link
              href="/contact"
              className="text-xs font-black tracking-wider text-primary hover:text-accent transition-colors uppercase"
            >
              Contact
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-primary" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-bold bg-accent">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>

            {mounted && (
              <Link
                href={isAdmin ? '/admin/dashboard' : '/admin/login'}
                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider text-primary bg-secondary hover:bg-secondary/80 transition-colors border border-border uppercase"
              >
                <ShieldCheck className="h-4 w-4 text-accent" />
                {isAdmin ? 'Dashboard' : 'Admin'}
              </Link>
            )}

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-black tracking-wider text-primary rounded-lg hover:bg-secondary/40 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-black tracking-wider text-primary rounded-lg hover:bg-secondary/40 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            About us
          </Link>

          {/* Our Schools Accordion */}
          <div>
            <button
              onClick={() => setMobileSchoolsOpen(!mobileSchoolsOpen)}
              className="flex items-center justify-between w-full py-2.5 px-2 text-xs font-black tracking-wider text-primary rounded-lg hover:bg-secondary/40 focus:outline-none uppercase"
            >
              <span>Our Schools</span>
              <ChevronDown className={`w-4 h-4 text-accent transition-transform duration-200 ${mobileSchoolsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {mobileSchoolsOpen && (
              <div className="pl-4 mt-1 space-y-1 border-l-2 border-border ml-2">
                <Link
                  href="/executive-success"
                  className="flex items-center gap-2 py-2 px-2 text-xs font-bold tracking-wider text-primary rounded-lg hover:bg-secondary/40 uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  <Award className="w-4 h-4 text-accent" />
                  Executive Success
                </Link>
                <Link
                  href="/academic-excellence"
                  className="flex items-center gap-2 py-2 px-2 text-xs font-bold tracking-wider text-primary rounded-lg hover:bg-secondary/40 uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  <Compass className="w-4 h-4 text-accent" />
                  Academic Excellence
                </Link>
                <Link
                  href="/programmes"
                  className="flex items-center gap-2 py-2 px-2 text-xs font-bold tracking-wider text-primary rounded-lg hover:bg-secondary/40 uppercase border-t border-[#E2E8F0]/30 pt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <BookOpen className="w-4 h-4 text-accent" />
                  All Course Programmes
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/learning-pathways"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-black tracking-wider text-primary rounded-lg hover:bg-secondary/40 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Pathways
          </Link>

          <Link
            href="/knowledge-hub"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-black tracking-wider text-primary rounded-lg hover:bg-secondary/40 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Knowledge Hub
          </Link>

          <Link
            href="/journal"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-black tracking-wider text-primary rounded-lg hover:bg-secondary/40 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Journal
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 py-2.5 px-2 text-xs font-black tracking-wider text-primary rounded-lg hover:bg-secondary/40 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </Link>
          
          <div className="pt-2 flex flex-col gap-2">
            {mounted && (
              <Link
                href={isAdmin ? '/admin/dashboard' : '/admin/login'}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold tracking-wider text-primary bg-secondary border border-border w-full uppercase"
                onClick={() => setMenuOpen(false)}
              >
                <ShieldCheck className="h-4 w-4 text-accent" />
                {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
