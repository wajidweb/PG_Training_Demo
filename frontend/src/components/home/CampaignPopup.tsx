'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { subscribeToCampaign } from '@/lib/api'
import { Download, Loader2, Mail, Sparkles, CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CampaignPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const hasSubmitted = localStorage.getItem('campaign_submitted')
    const hasSeen = localStorage.getItem('campaign_popup_seen')

    if (!hasSubmitted && !hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('campaign_popup_seen', 'true')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError('')

    try {
      await subscribeToCampaign(email)
      setIsSubmitted(true)
      localStorage.setItem('campaign_submitted', 'true')
    } catch (err) {
      // Check if we should allow download anyway for testing if the user wants
      setError('Database connection error. Please ensure your IP is whitelisted in MongoDB Atlas.')
      console.error(err)
      
      // OPTIONAL: For demo purposes, you can uncomment the lines below to allow download even on error
      // setIsSubmitted(true) 
      // localStorage.setItem('campaign_submitted', 'true')
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
    
    // Reset state after a delay before closing, so it's fresh if opened again
    setTimeout(() => {
      setIsOpen(false)
      setIsSubmitted(false)
      setEmail('')
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl p-0 overflow-hidden border-none bg-transparent">
        <div className="flex flex-col md:flex-row min-h-[500px] bg-background rounded-3xl overflow-hidden shadow-2xl ring-1 ring-foreground/5">
          {/* Left Side - Visual / Brand */}
          <div className="relative w-full md:w-2/5 bg-primary p-8 md:p-12 flex flex-col justify-center items-center text-primary-foreground overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            </div>
            
            <div className="relative z-10 text-center space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Unlock Your Potential</h2>
              <p className="text-primary-foreground/80 text-lg">
                Master the strategies used by top industry leaders to accelerate your professional growth.
              </p>
              
              {/* Floating Ebook Visual Representation */}
              <div className="relative mt-8 group">
                <div className="absolute -inset-1 bg-white/30 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative aspect-[3/4] w-32 md:w-40 bg-white rounded-lg shadow-2xl flex items-center justify-center p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                   <div className="border-2 border-primary/20 w-full h-full flex flex-col items-center justify-center text-primary p-2">
                      <span className="text-[8px] font-bold uppercase tracking-tighter mb-1 opacity-60">Success Guide</span>
                      <div className="h-0.5 w-8 bg-primary mb-2"></div>
                      <span className="text-[10px] font-black text-center leading-none mb-1">PROFESSIONAL GROWTH</span>
                      <div className="mt-auto">
                        <Download className="h-4 w-4 opacity-40" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-card">
            {/* Close Button Override */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors md:hidden"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSubmitted ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <span className="text-primary font-semibold text-sm tracking-wider uppercase">Exclusive Access</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">Download Your Free Guide</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gain instant access to our comprehensive E-book, <span className="font-semibold text-foreground italic">"The Blueprint for Career Excellence."</span> Simply enter your email address below to start your journey and join our community of high-achievers.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="campaign-email" className="text-sm font-medium ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        id="campaign-email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-input bg-background transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p className="text-destructive text-sm ml-1">{error}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-7 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Preparing your guide...
                      </>
                    ) : (
                      'Get The Guide Now'
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      <span>Free Forever</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      <span>Join 5,000+ Professionals</span>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-8 text-center animate-in zoom-in-95 duration-500">
                <div className="flex justify-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-full ring-8 ring-green-50 dark:ring-green-900/10">
                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold">You're All Set!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Your professional guide is ready for download. Click the button below to start mastering your career growth.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleDownload} 
                    className="w-full py-7 text-lg font-bold rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download E-Book Now
                  </Button>
                </div>
                
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Close this window
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
