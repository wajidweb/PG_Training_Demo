'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('pg_cookie_consent')
    if (!consent) {
      // Small delay to ensure smooth hydration and prevent layout shifts
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('pg_cookie_consent', 'accepted')
    setIsVisible(false)
    // Future integration: Initialize Google Analytics, Meta Pixel, or other non-essential trackers here.
  }

  const handleReject = () => {
    localStorage.setItem('pg_cookie_consent', 'rejected')
    setIsVisible(false)
    // Future integration: Ensure no non-essential tracking scripts are fired.
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pointer-events-none flex justify-center">
      <div className="bg-background border border-border/50 shadow-2xl rounded-2xl p-6 max-w-5xl w-full pointer-events-auto flex flex-col md:flex-row gap-6 items-center justify-between animate-in slide-in-from-bottom-10 fade-in duration-500 ring-1 ring-black/5">
        
        <div className="flex items-start gap-5 flex-1">
          <div className="bg-primary/10 p-3 rounded-full hidden sm:block shrink-0">
            <Cookie className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary sm:hidden" />
              We Value Your Privacy
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and serve tailored content. 
              By clicking <strong className="font-semibold text-foreground">"Accept All"</strong>, you consent to our use of cookies. 
              If you choose <strong className="font-semibold text-foreground">"Reject All"</strong>, we will only use strictly necessary cookies to run the site. 
              Read our <Link href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link> and <Link href="/gdpr" className="text-primary hover:underline font-medium">GDPR Compliance</Link> to learn more.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Button 
            variant="outline" 
            onClick={handleReject} 
            className="w-full sm:w-auto px-6 h-11 font-semibold cursor-pointer border-input hover:bg-muted"
          >
            Reject All
          </Button>
          <Button 
            onClick={handleAccept} 
            className="w-full sm:w-auto px-8 h-11 font-semibold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Accept All
          </Button>
        </div>
        
      </div>
    </div>
  )
}
