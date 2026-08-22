'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  User, 
  LogOut, 
  Download, 
  Lock, 
  Unlock, 
  Loader2,
  CheckCircle2,
  Bookmark
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fetchCurrentUserMe, fetchResources, purchaseResource, unlockPurchaseDirectly } from '@/lib/api'

interface MemberProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  purchasedResources: string[]
  downloadedFreeResources: string[]
}

function MembersDashboardContent() {
  const router = useRouter()
  const [profile, setProfile] = useState<MemberProfile | null>(null)
  
  // Dynamic categories shelves
  const [freeResources, setFreeResources] = useState<any[]>([])
  const [purchasedResources, setPurchasedResources] = useState<any[]>([])
  const [lockedResources, setLockedResources] = useState<any[]>([])
  
  const [loading, setLoading] = useState(true)
  const [purchasingId, setPurchasingId] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const verifySession = async () => {
    const token = localStorage.getItem('member_auth_token')
    if (!token) {
      router.push('/members/login')
      return
    }

    try {
      // Client-side checkout session sync fallback
      // Forces writing resourceId into DB purchases immediately if purchase_success param is present
      const pSuccess = new URLSearchParams(window.location.search).get('purchase_success')
      const rId = new URLSearchParams(window.location.search).get('resource_id')
      if (pSuccess === 'true' && rId) {
        try {
          await unlockPurchaseDirectly(rId, token)
        } catch (syncErr) {
          console.error('Local sync fallback failed:', syncErr)
        }
      }

      const data = await fetchCurrentUserMe(token)
      setProfile(data)
      
      // Load all catalog resources dynamically
      const allResources = await fetchResources({ includeUnpublished: true }).catch(() => [])
      
      // Category 1: Free Resources
      const free = allResources.filter(res => res.tier === 'free')
      setFreeResources(free)

      // Category 2: Unlocked/Purchased Premium Resources
      const purchased = allResources.filter(res => 
        res.tier === 'premium' && 
        (data.purchasedResources?.includes(res._id) || data.purchasedResources?.includes(res.id))
      )
      setPurchasedResources(purchased)

      // Category 3: Locked Premium Resources (Unpurchased)
      const locked = allResources.filter(res => 
        res.tier === 'premium' && 
        !(data.purchasedResources?.includes(res._id) || data.purchasedResources?.includes(res.id))
      )
      setLockedResources(locked)
    } catch (err) {
      console.error('Session verification failed, logging out:', err)
      handleLogout()
    } finally {
      setLoading(false)
    }
  }

  const searchParams = useSearchParams()
  const purchaseSuccess = searchParams.get('purchase_success')
  const resourceId = searchParams.get('resource_id')

  useEffect(() => {
    verifySession()
  }, [])

  useEffect(() => {
    // Auto-download purchased resource on redirect
    if (purchaseSuccess === 'true' && resourceId && purchasedResources.length > 0) {
      const match = purchasedResources.find(r => r._id === resourceId || r.id === resourceId)
      if (match) {
        window.open(match.fileUrl || '/ebook-placeholder.pdf', '_blank')
        // Clean URL params so it doesn't trigger again on reload!
        router.replace('/members')
      }
    }
  }, [purchasedResources, purchaseSuccess, resourceId])

  const handleLogout = () => {
    localStorage.removeItem('member_auth_token')
    localStorage.removeItem('member_user_name')
    router.push('/members/login')
  }

  const handleDownloadFree = async (resourceId: string, fileUrl: string) => {
    const token = localStorage.getItem('member_auth_token')
    if (!token) return

    setDownloadingId(resourceId)
    try {
      // Record download activity dynamically
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      await fetch(`${apiBaseUrl}/api/auth/log-download`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ resourceId })
      })
    } catch (err) {
      console.error('Failed to log free download:', err)
    }

    setTimeout(() => {
      setDownloadingId(null)
      window.open(fileUrl, '_blank')
    }, 800)
  }

  const handlePurchasePremium = async (resourceId: string) => {
    setPurchasingId(resourceId)
    try {
      const res = await purchaseResource({
        resourceId,
        userId: profile?.id,
        email: profile?.email
      })

      if (res.success && res.url) {
        window.location.href = res.url
      } else {
        alert('Failed to initiate Stripe session.')
      }
    } catch (err: any) {
      console.error(err)
      alert(err.message || 'Payment initiation failed.')
    } finally {
      setPurchasingId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#B89047]" />
        <p className="text-xs text-muted-foreground font-mono">Verifying Member Session...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B1B3D] font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Sticky Premium Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-[0.2em] text-[#B89047] uppercase block font-sans">PGT MEMBERS PORTAL</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047]">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-[#0B1B3D] capitalize">
                Welcome, {profile?.firstName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider animate-in"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Widescreen Stack */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-12">
        
        {/* Welcome Climax Banner */}
        <div className="bg-[#0B1B3D] text-white rounded-3xl p-6 sm:p-10 border border-slate-900 shadow-xl relative overflow-hidden text-left">
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/15 rounded-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">CONTINUOUS ACADEMIC DEVELOPMENT</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight uppercase">
              Your Professional Resource Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Every partnership with PGT goes beyond classroom instruction. Below is your private learning environment, where you can download lead magnets, access premium purchased toolkits, or unlock advanced strategic templates to enhance your team's capability.
            </p>
          </div>
        </div>

        {/* Dynamic Multi-Shelf Full-Width Layout Stack */}
        <div className="space-y-12">
          
          {/* SHELF 1: Free Lead Magnet Library (Fully Unlocked & Downloadable) */}
          <div className="space-y-5">
            <div className="border-b border-[#E2E8F0] pb-2.5 text-left">
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#B89047] uppercase block">TIER 1 BENEFITS</span>
              <h2 className="text-lg font-bold text-[#0B1B3D] uppercase tracking-wider flex items-center gap-1.5">
                <Bookmark className="w-5 h-5 text-[#B89047]" />
                <span>Free Scoping Guides Library</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeResources.length === 0 ? (
                <div className="col-span-full bg-white border border-[#E2E8F0] p-8 text-center text-muted-foreground text-xs rounded-2xl">
                  No free library items found.
                </div>
              ) : (
                freeResources.map((res) => (
                  <div 
                    key={res._id} 
                    className="bg-white border border-[#E2E8F0]/80 rounded-2xl p-6 flex flex-col justify-between h-40 hover:shadow-md hover:border-[#B89047]/15 transition-all duration-300 text-left"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-[#B89047] font-bold uppercase tracking-wider block">UNLOCKED LEAD MAGNET</span>
                      <h3 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide leading-tight line-clamp-1">{res.title}</h3>
                      <p className="text-[11px] text-[#0B1B3D] font-normal leading-relaxed line-clamp-2">{res.description}</p>
                    </div>
                    <button 
                      onClick={() => handleDownloadFree(res._id, res.fileUrl)}
                      disabled={downloadingId !== null}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#B89047] uppercase tracking-widest hover:text-[#0B1B3D] transition-colors border-t border-[#E2E8F0]/40 pt-3 text-left w-full cursor-pointer"
                    >
                      {downloadingId === res._id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 shrink-0" />
                          <span>Download PDF Guide</span>
                        </>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SHELF 2: My Purchased Premium Library (Unlocks dynamic bought items) */}
          <div className="space-y-5">
            <div className="border-b border-[#E2E8F0] pb-2.5 text-left">
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#B89047] uppercase block">TIER 2 OWNED</span>
              <h2 className="text-lg font-bold text-[#0B1B3D] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>My Unlocked Premium Toolkits</span>
              </h2>
            </div>

            {purchasedResources.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center text-left">
                <h4 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wider">No Premium Toolkits Unlocked Yet</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1">
                  Upgrade your partnership to unlock corporate slide-decks, Excel calculations sheets, and checklists built directly by PGT consultants. Browse our available catalog below to unlock.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedResources.map((res) => (
                  <div 
                    key={res._id} 
                    className="bg-green-50/10 border border-green-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between h-40 hover:border-green-300 transition-all duration-300 text-left"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-green-700 font-bold uppercase tracking-wider block flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> Fully Unlocked
                      </span>
                      <h3 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide leading-tight line-clamp-1">{res.title}</h3>
                      <p className="text-[11px] text-[#0B1B3D] font-normal leading-relaxed line-clamp-2">{res.description}</p>
                    </div>
                    <a 
                      href={res.fileUrl || '/ebook-placeholder.pdf'} 
                      download
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-green-700 uppercase tracking-widest hover:text-[#0B1B3D] transition-colors border-t border-green-200/50 pt-3"
                    >
                      <Download className="w-4 h-4 shrink-0" />
                      <span>Download ZIP Toolkit</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SHELF 3: Premium Executive Store (Locked Up-selling Showcase) */}
          <div className="space-y-5">
            <div className="border-b border-[#E2E8F0] pb-2.5 text-left">
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#B89047] uppercase block">PARTNERSHIP UPGRADE</span>
              <h2 className="text-lg font-bold text-[#0B1B3D] uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-5 h-5 text-[#B89047]" />
                <span>Available Corporate Toolkits Catalog</span>
              </h2>
            </div>

            {lockedResources.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] p-8 text-center text-muted-foreground text-xs rounded-2xl">
                You have unlocked all premium resources in our catalog! Outstanding partnership status.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lockedResources.map((res) => (
                  <div 
                    key={res._id} 
                    className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-44 hover:shadow-md hover:border-[#B89047]/15 transition-all duration-300 text-left relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-mono text-[#B89047] font-bold uppercase tracking-wider">
                          PREMIUM CATALOG
                        </span>
                        <span className="text-[10px] font-extrabold text-[#B89047] bg-[#B89047]/10 px-2 py-0.5 rounded border border-[#B89047]/20 font-mono">
                          ${res.price.toFixed(2)}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide leading-tight line-clamp-1">{res.title}</h3>
                      <p className="text-[11px] text-[#0B1B3D] font-normal leading-relaxed line-clamp-2 mt-1">{res.description}</p>
                    </div>
                    <button 
                      onClick={() => handlePurchasePremium(res._id)}
                      disabled={purchasingId !== null}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all w-full text-center mt-3 cursor-pointer shadow-xs hover:shadow"
                    >
                      {purchasingId === res._id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Redirecting to Stripe...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Unlock Toolkit</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  )
}

export default function MembersDashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#B89047]" />
        <p className="text-xs text-muted-foreground font-mono">Verifying Member Session...</p>
      </div>
    }>
      <MembersDashboardContent />
    </Suspense>
  )
}
