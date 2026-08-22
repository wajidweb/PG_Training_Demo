'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  BookOpen, 
  Download, 
  Check, 
  PlayCircle, 
  ArrowRight, 
  Cpu,
  Compass,
  Users,
  Award,
  FileText,
  Lock,
  Unlock,
  Loader2,
  X,
  AlertCircle
} from 'lucide-react'
import { purchaseResource, logFreeDownload, fetchResources, fetchCurrentUserMe } from '@/lib/api'

export default function KnowledgeHubPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  
  // Scoping dynamic states
  const [memberToken, setMemberToken] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [purchasingId, setPurchasingId] = useState<string | null>(null)
  
  // Live Database resources state
  const [resources, setResources] = useState<any[]>([])
  const [loadingResources, setLoadingResources] = useState(true)
  const [purchasedResourceIds, setPurchasedResourceIds] = useState<string[]>([])

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('member_auth_token')
    if (token) {
      setMemberToken(token)
      // Retrieve purchased resources list
      fetchCurrentUserMe(token)
        .then(profile => {
          if (profile && profile.purchasedResources) {
            setPurchasedResourceIds(profile.purchasedResources)
          }
        })
        .catch(err => console.error('Failed to load user purchases:', err))
    }

    const loadLiveResources = async () => {
      try {
        const data = await fetchResources()
        setResources(data)
      } catch (err) {
        console.error('Failed to load dynamic resources from DB:', err)
      } finally {
        setLoadingResources(false)
      }
    }

    loadLiveResources()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const handleDownload = async (id: string, fileLink: string) => {
    // Lead generation gating logic
    if (!memberToken) {
      setShowAuthModal(true)
      return
    }

    setDownloadingId(id)
    try {
      // Record the download dynamically in the database
      await logFreeDownload(id, memberToken)
    } catch (err) {
      console.error('Failed to log free download:', err)
    }

    setTimeout(() => {
      setDownloadingId(null)
      // Open placeholder file
      window.open(fileLink, '_blank')
    }, 1000)
  }

  const handlePurchase = async (resourceId: string) => {
    setPurchasingId(resourceId)
    try {
      // Decode JWT token payload safely in browser using standard atob
      let payload = null
      if (memberToken) {
        try {
          const base64Url = memberToken.split('.')[1]
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          payload = JSON.parse(window.atob(base64))
        } catch (jwtErr) {
          console.error('JWT Decode Error:', jwtErr)
        }
      }
      
      const res = await purchaseResource({
        resourceId,
        userId: payload?.id || undefined,
        email: payload?.email || undefined
      })

      if (res.success && res.url) {
        // Redirect to secure Stripe checkout session page
        window.location.href = res.url
      } else {
        alert('Failed to initiate checkout. Please try again.')
      }
    } catch (err: any) {
      console.error(err)
      alert(err.message || 'Payment initiation failed. Please try again.')
    } finally {
      setPurchasingId(null)
    }
  }

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === activeCategory)

  return (
    <main className="pt-20 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Intro/Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 sm:pt-6 pb-16 sm:pb-20 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block">
            THE KNOWLEDGE HUB
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] leading-tight max-w-5xl mx-auto">
            Practical Knowledge. Real World Insights. Measurable Impact.
          </h1>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
        </div>

        {/* Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (7 Cols): Editorial Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
              <p>
                Learning does not end when a training programme finishes. In an era of rapid technological change and industrial disruption, the organisations that continue to grow are those that continue to learn. Human capital development remains the single most reliable driver of long term success.
              </p>
              <p>
                Our Knowledge Hub brings together practical resources, expert insights, and proven academic frameworks to help leaders, educators, and organisations stay ahead. Explore our publications to equip your teams with actionable capability.
              </p>
              <p>
                By compiling elite case studies, operational checklists, and comprehensive reports, PGT empowers executives and team leaders to make better decisions with confidence. Our publications bridge the gap between theoretical frameworks and daily business execution, ensuring your organisation remains prepared for future market shifts.
              </p>
            </div>
          </div>

          {/* Right Column (5 Cols): Class Environment Visual Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/research.jpg"
              alt="Strategic planning research session"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
          </div>

        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">CURATED COLLECTIONS</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">Explore Knowledge by Topic</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Executive Success */}
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center mb-4">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">EXECUTIVE SUCCESS</h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">For CEOs and Executive Teams looking to strengthen strategic thinking, decision-making and governance.</p>
              <ul className="space-y-1 text-[10px] text-[#64748B] border-t border-[#E2E8F0]/50 pt-2.5 font-semibold">
                {['CEO Guides', 'Executive Scorecards', 'Planning Templates', 'Decision Frameworks', 'Executive Checklists'].map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="w-3 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveCategory('executive')} className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest text-left mt-5 hover:text-[#0B1B3D] transition-colors flex items-center gap-1">
              <span>View Collection</span>
              <ArrowRight className="w-3" />
            </button>
          </div>

          {/* Erasmus+ Resource Centre */}
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center mb-4">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">ERASMUS+ CENTRE</h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">Everything institutions need to plan, design, and execute high-impact European funded mobilities.</p>
              <ul className="space-y-1 text-[10px] text-[#64748B] border-t border-[#E2E8F0]/50 pt-2.5 font-semibold">
                {['Planning Guides', 'Learning Outcome Templates', 'Mobility Checklists', 'Proposal Resources', 'Best Practice Guides'].map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="w-3 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveCategory('erasmus')} className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest text-left mt-5 hover:text-[#0B1B3D] transition-colors flex items-center gap-1">
              <span>View Collection</span>
              <ArrowRight className="w-3" />
            </button>
          </div>

          {/* AI Knowledge Centre */}
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center mb-4">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">AI KNOWLEDGE</h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">Discover practical ways to integrate Artificial Intelligence into classrooms, business workflows, and operations.</p>
              <ul className="space-y-1 text-[10px] text-[#64748B] border-t border-[#E2E8F0]/50 pt-2.5 font-semibold">
                {['AI Implementation Guides', 'Productivity Frameworks', 'Prompt Libraries', 'AI Policies', 'Practical Tutorials'].map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="w-3 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveCategory('ai')} className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest text-left mt-5 hover:text-[#0B1B3D] transition-colors flex items-center gap-1">
              <span>View Collection</span>
              <ArrowRight className="w-3" />
            </button>
          </div>

          {/* Workforce Development */}
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#B89047]/10 text-[#B89047] flex items-center justify-center mb-4">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wide mb-1.5">WORKFORCE DEV</h3>
              <p className="text-[11px] text-[#64748B] leading-relaxed mb-4 font-light">Build highly collaborative, adaptable, and future-focused professional staff and teams.</p>
              <ul className="space-y-1 text-[10px] text-[#64748B] border-t border-[#E2E8F0]/50 pt-2.5 font-semibold">
                {['Workforce Planning Guides', 'Future Skills Frameworks', 'Employability Toolkits', 'PD Resources', 'Capability Indicators'].map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="w-3 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveCategory('workforce')} className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest text-left mt-5 hover:text-[#0B1B3D] transition-colors flex items-center gap-1">
              <span>View Collection</span>
              <ArrowRight className="w-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-[#E2E8F0]/40 mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-0.5">FEATURED PUBLICATIONS</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">Our Most Popular Guides</h2>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'executive', label: 'Executive' },
              { id: 'erasmus', label: 'Erasmus+' },
              { id: 'ai', label: 'AI Programs' },
              { id: 'workforce', label: 'Workforce' }
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setActiveCategory(pill.id)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors border ${
                  activeCategory === pill.id 
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]' 
                    : 'bg-white hover:bg-[#FAF9F6] text-[#64748B] border-[#E2E8F0]'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {loadingResources ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#B89047]" />
              <p className="text-xs text-muted-foreground font-mono">Syncing Catalog Shelf...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="col-span-full py-16 text-center text-muted-foreground text-xs">
              No published resources found in this collection track.
            </div>
          ) : (
            filteredResources.map((res) => {
              const isPremium = res.tier === 'premium'
              const isPurchasedPremium = isPremium && (purchasedResourceIds.includes(res._id) || purchasedResourceIds.includes(res.id))
              const isDownloading = downloadingId === res._id
              const isPurchasing = purchasingId === res._id

              return (
                <div key={res._id} className="bg-white border border-[#E2E8F0]/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#B89047]/15 transition-all text-left">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold text-[#B89047] uppercase tracking-wider bg-[#B89047]/10 px-2.5 py-1 rounded">
                        {res.type}
                      </span>
                      {isPremium ? (
                        isPurchasedPremium ? (
                          <span className="text-xs font-bold text-green-700 font-mono bg-green-50 border border-green-200 px-2.5 py-1 rounded flex items-center gap-1">
                            <Unlock className="w-3.5 h-3.5" />
                            <span>UNLOCKED</span>
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-[#B89047] font-mono bg-amber-50 border border-amber-200 px-2.5 py-1 rounded flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" />
                            <span>${res.price.toFixed(2)}</span>
                          </span>
                        )
                      ) : (
                        <span className="text-xs font-bold text-green-700 font-mono bg-green-50 border border-green-200 px-2.5 py-1 rounded">
                          FREE
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0B1B3D] mb-2 uppercase tracking-wide leading-tight">{res.title}</h3>
                    <p className="text-[11px] text-[#0B1B3D] leading-relaxed mb-6 font-normal">{res.description}</p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0]/40 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest">{res.category} Collection</span>
                    {isPremium && !isPurchasedPremium ? (
                      <button
                        onClick={() => handlePurchase(res._id)}
                        disabled={purchasingId !== null}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        {isPurchasing ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Preparing...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5 text-white" />
                            <span>Purchase</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDownload(res._id, res.fileUrl)}
                        disabled={downloadingId !== null}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Starting...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5 text-white" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>

      {/* Tools & Templates (Centered Header & Symmetrical Grid with Image) */}
      <section className="bg-[#FAF9F6] border-y border-[#E2E8F0] py-16 mb-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PRACTICAL RESOURCES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Tools and Templates Download Centre
            </h2>
            <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
            <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
              Save hours of institutional design and administrative work with our specialized toolkits and checklists created directly by Paragon Global Training specialists.
            </p>
          </div>

          {/* Symmetric Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
            
            {/* Left Column (7 Cols): Symmetrical Checklists Card */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between text-left">
              <div>
                <h3 className="font-bold text-[#0B1B3D] text-xs sm:text-sm uppercase tracking-wide border-b border-[#E2E8F0]/50 pb-2 mb-4">
                  Available Toolkit Checklists
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 font-sans">
                  {[
                    'CEO Assessment Scorecard',
                    'Erasmus Quality Assurance',
                    'AI Classroom Integration',
                    'Strategic Planning Tools',
                    'Workforce Capability Map',
                    'Learning Outcome Blueprints',
                    'Credit Mobility Templates',
                    'AI Prompt Library Lists'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0B1B3D] font-normal">
                      <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/members"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all text-center"
              >
                Access Complete Download Centre
              </Link>
            </div>

            {/* Right Column (5 Cols): Class Environment Visual Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto border border-[#E2E8F0]/80 shadow-md">
              <Image
                src="/development.png"
                alt="Practical toolkits and checklist scoping workshops"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Video Learning (Centered Header & Symmetrical Grid - No Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10 mb-16 border-b border-[#E2E8F0]/40 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">MICRO LEARNING</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Video Learning Library
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal">
            Watch compact, practical, five to ten minute briefings from our Managing Partners and field specialists covering executive strategy, artificial intelligence policies, and Erasmus Plus compliance standards.
          </p>
        </div>

        {/* Full Content Grid (3 Columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {[
            { title: 'Executive Success', duration: '8 mins' },
            { title: 'Artificial Intelligence', duration: '12 mins' },
            { title: 'Erasmus Plus Mobility', duration: '9 mins' },
            { title: 'Workforce Development', duration: '11 mins' },
            { title: 'Future Ready Skills', duration: '6 mins' },
            { title: 'Organisational Change', duration: '10 mins' }
          ].map((video, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-[#E2E8F0] p-6 rounded-xl shadow-sm flex flex-col justify-between h-36 hover:shadow-md hover:border-[#B89047]/20 transition-all duration-300 text-left"
            >
              <PlayCircle className="w-8 h-8 text-[#B89047]/80 hover:text-[#B89047] transition-all cursor-pointer hover:scale-105" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-[#0B1B3D] text-xs uppercase tracking-wide leading-tight">
                  {video.title}
                </h4>
                <span className="text-[10px] text-[#64748B] block font-mono">
                  {video.duration} watch duration
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leads capture */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B89047] uppercase block mb-2">THE PGT LEARNING COMMUNITY</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 uppercase tracking-tight">Keep Learning Beyond the Classroom</h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-6 font-light">
            Join thousands of professionals across Europe who receive our practical guides, research briefings, prompt checklists, and exclusive masterclass webinar invites.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
              <input
                type="email"
                required
                placeholder="Professional email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/60 border border-slate-800 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-[#B89047]"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-bold uppercase tracking-wider text-[10px] rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-[#B89047]/10 border border-[#B89047]/20 rounded-xl p-3 max-w-sm mx-auto text-[#B89047] text-xs font-bold">
              ✓ Welcome to the community. You are subscribed!
            </div>
          )}
        </div>
      </section>

      {/* Final CTA (Premium Soft-Beige Card - Widened with Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative z-10 font-sans">
        <div className="bg-[#FAF9F6] border border-[#E2E8F0]/80 rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden group">
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/10 rounded-xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
            
            {/* Left Column (7 Cols): Editorial Text Content & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">
                  THE KNOWLEDGE HUB
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none">
                  Knowledge Creates Opportunity
                </h2>
                <div className="h-0.5 w-12 bg-[#B89047] rounded mt-4" />
              </div>

              {/* Narrative text in black */}
              <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed font-normal">
                <p>
                  Whether you are leading an enterprise, instructing learners, or planning an upcoming mobility, the right insights help you deliver measurable, structural results. Explore our curated publications to equip your teams with actionable capability.
                </p>
              </div>
              
              {/* Widened Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/contact"
                  className="px-12 sm:px-16 py-3.5 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all text-center"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/journal"
                  className="px-12 sm:px-16 py-3.5 bg-white border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:bg-[#FAF9F6] transition-all text-center"
                >
                  Read Our Journal
                </Link>
              </div>
            </div>

            {/* Right Column (5 Cols): Classroom Environment Visual Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
              <Image
                src="/paragonimage2.png"
                alt="PGT modern university VET classroom environment"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

          </div>
        </div>
      </section>
      {/* Gated Auth Modal Overlay Dialog */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border border-[#E2E8F0] shadow-2xl relative p-6 sm:p-8 text-center space-y-6">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">JOIN THE PGT COMMUNITY</span>
              <h3 className="text-xl font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-tight">Gated Free Download</h3>
              <div className="h-0.5 w-12 bg-[#B89047] mx-auto mt-2 rounded" />
            </div>

            <p className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed font-normal">
              To download this free professional resource, please create a free members account or log in. Every partnership with PGT provides access to our growing ecosystem of practical planning tools, checklists, and guides.
            </p>

            <div className="flex flex-col gap-2.5 pt-2">
              <Link
                href="/members/register"
                className="w-full py-3 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-sm hover:shadow-md transition-all text-center"
              >
                Create Free Account
              </Link>
              <Link
                href="/members/login"
                className="w-full py-3 border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-[#FAF9F6] transition-all text-center"
              >
                Log In to Member Hub
              </Link>
            </div>
            
            <p className="text-[9px] text-slate-500 uppercase font-mono">
              (Takes less than 10 seconds to unlock your library)
            </p>
          </div>
        </div>
      )}

    </main>
  )
}
