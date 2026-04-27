'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, GraduationCap, BookOpen, Building2, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { TrainingPath } from '@/types'

const pathIcons: Record<string, React.ElementType> = {
  academic: BookOpen,
  administrative: Building2,
  leadership: TrendingUp,
}

export default function Navbar({ paths }: { paths: TrainingPath[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="Paragon Global Training Academy" 
              className="h-14 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {paths.map(path => (
              <a
                key={path.id}
                href={`/#path-${path.id}`}
                className="text-sm font-medium text-gray-600 hover:text-[#1D5C3A] transition-colors"
              >
                {path.title}
              </a>
            ))}
            <a href="/#offers" className="text-sm font-medium text-gray-600 hover:text-[#1D5C3A] transition-colors">
              Offers
            </a>
            <a href="/#about" className="text-sm font-medium text-gray-600 hover:text-[#1D5C3A] transition-colors">
              About
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ backgroundColor: '#D4890A' }}>
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>

            <Link
              href="/#courses"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#1D5C3A' }}
            >
              Browse Courses
            </Link>

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
          {paths.map(path => {
            const Icon = pathIcons[path.id] ?? BookOpen
            return (
              <a
                key={path.id}
                href={`/#path-${path.id}`}
                className="flex items-center gap-2 py-2.5 px-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                <Icon className="w-4 h-4 text-gray-500" />
                {path.title}
              </a>
            )
          })}
          <a href="/#offers" className="flex items-center gap-2 py-2.5 px-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Offers</a>
          <a href="/#about" className="flex items-center gap-2 py-2.5 px-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50" onClick={() => setMenuOpen(false)}>About</a>
          <div className="pt-2">
            <Link
              href="/#courses"
              className="flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white w-full"
              style={{ backgroundColor: '#1D5C3A' }}
              onClick={() => setMenuOpen(false)}
            >
              Browse Courses
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
