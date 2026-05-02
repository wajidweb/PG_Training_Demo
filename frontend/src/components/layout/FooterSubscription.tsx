'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { subscribeToCampaign } from '@/lib/api'
import { Download, Loader2, Mail, CheckCircle2 } from 'lucide-react'

export function FooterSubscription() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError('')

    try {
      await subscribeToCampaign(email, 'footer_subscription')
      setIsSubmitted(true)
      localStorage.setItem('campaign_submitted', 'true')
    } catch (err) {
      setError('Connection error. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/ebook-placeholder.pdf'
    link.download = 'Blueprint_for_Career_Excellence.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Reset form after 5 seconds so it shows the subscription input again
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 5000)
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-semibold text-white mb-0">Get Free E-Book</h4>
      <p className="text-sm text-blue-100">
        {isSubmitted 
          ? "Thank you! Your professional guide is ready." 
          : "Subscribe to unlock our 'Blueprint for Career Excellence' guide."}
      </p>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300 group-focus-within:text-white transition-colors" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/10 pl-9 pr-3 py-2 text-sm rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-xs text-orange-300">{error}</p>}
          <Button 
            type="submit" 
            className="w-full h-10 bg-white text-blue-900 hover:bg-blue-50 font-bold cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Unlock E-Book'
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
          <Button 
            onClick={handleDownload} 
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-black/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Now
          </Button>
          <div className="flex items-center justify-center gap-1.5 text-xs text-green-300 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Successfully Subscribed</span>
          </div>
        </div>
      )}
    </div>
  )
}
