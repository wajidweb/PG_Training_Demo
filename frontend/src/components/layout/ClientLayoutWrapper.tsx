'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ChatWidget from '@/components/chatbot/ChatWidget'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { TrainingPath } from '@/types'

interface ClientLayoutWrapperProps {
  children: React.ReactNode
  paths: TrainingPath[]
}

export function ClientLayoutWrapper({ children, paths }: ClientLayoutWrapperProps) {
  const pathname = usePathname()
  
  // Check if we are in the admin section
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    // For admin routes, we only render the children (which includes the AdminLayout)
    // No public Navbar, Footer, Cart, or Chat widget
    return <main>{children}</main>
  }

  // Public website layout
  return (
    <>
      <Navbar paths={paths} />
      <main className="pt-20"> {/* Add padding top to account for fixed navbar */}
        {children}
      </main>
      <Footer paths={paths} />
      <CartDrawer />
      <ChatWidget />
      <CookieConsent />
    </>
  )
}
