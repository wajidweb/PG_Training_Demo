'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  Mail, 
  BookOpen, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  Loader2,
  MessageSquare,
  FileText,
  FolderDown,
  BarChart3,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  fetchCourses, 
  fetchCampaignEmails, 
  fetchOrders, 
  fetchEnquiries,
  fetchArticles,
  fetchResources,
  fetchUsers
} from '@/lib/api'
import { cn } from '@/lib/utils'

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  
  // Dynamic statistics
  const [courses, setCourses] = useState<any[]>([])
  const [emails, setEmails] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [resources, setResources] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Parallel DB load
      const [
        coursesData, 
        emailsData, 
        ordersData, 
        enquiriesData, 
        articlesData, 
        resourcesData,
        usersData
      ] = await Promise.all([
        fetchCourses().catch(() => []),
        fetchCampaignEmails().catch(() => []),
        fetchOrders().catch(() => []),
        fetchEnquiries().catch(() => []),
        fetchArticles(true).catch(() => []),
        fetchResources({ includeUnpublished: true }).catch(() => []),
        fetchUsers().catch(() => [])
      ])

      setCourses(coursesData)
      setEmails(emailsData)
      setOrders(ordersData)
      setEnquiries(enquiriesData)
      setArticles(articlesData)
      setResources(resourcesData)
      setUsers(usersData)
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  // Calculate metrics distribution percentages
  const totalFreeResources = resources.filter(r => r.tier === 'free').length
  const totalPremiumResources = resources.filter(r => r.tier === 'premium').length
  const freePercentage = resources.length ? Math.round((totalFreeResources / resources.length) * 100) : 0
  const premiumPercentage = resources.length ? Math.round((totalPremiumResources / resources.length) * 100) : 0

  const totalInquiries = enquiries.length
  const totalCampaigns = emails.length
  const totalStripeBookings = orders.length
  const totalTransactions = totalInquiries + totalCampaigns + totalStripeBookings
  const inquiryPercentage = totalTransactions ? Math.round((totalInquiries / totalTransactions) * 100) : 0
  const campaignPercentage = totalTransactions ? Math.round((totalCampaigns / totalTransactions) * 100) : 0
  const orderPercentage = totalTransactions ? Math.round((totalStripeBookings / totalTransactions) * 100) : 0

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B1B3D]">Command Cockpit</h1>
          <p className="text-muted-foreground mt-1">Unified administrative telemetry and dynamic database insight feeds.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={loadDashboardData} 
            disabled={loading}
            className="cursor-pointer border-2"
          >
            <RefreshCcwIcon className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            Sync Telemetry
          </Button>
        </div>
      </div>

      {/* Grid: 7 Micro-Cards represent all collections */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        
        {/* Users Card */}
        <Card className="border border-[#E2E8F0] shadow-xs text-left">
          <CardContent className="p-4 flex flex-col justify-between h-24">
            <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">MEMBERS</span>
            <span className="text-2xl font-extrabold text-[#0B1B3D] mt-1">{loading ? '...' : users.length}</span>
            <span className="text-[10px] text-green-600 font-semibold mt-auto flex items-center">Active Portal</span>
          </CardContent>
        </Card>

        {/* Resources Card */}
        <Card className="border border-[#E2E8F0] shadow-xs text-left">
          <CardContent className="p-4 flex flex-col justify-between h-24">
            <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">RESOURCES</span>
            <span className="text-2xl font-extrabold text-[#0B1B3D] mt-1">{loading ? '...' : resources.length}</span>
            <span className="text-[10px] text-muted-foreground mt-auto truncate">{totalPremiumResources} Paid, {totalFreeResources} Free</span>
          </CardContent>
        </Card>

        {/* Articles Card */}
        <Card className="border border-[#E2E8F0] shadow-xs text-left">
          <CardContent className="p-4 flex flex-col justify-between h-24">
            <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">JOURNAL</span>
            <span className="text-2xl font-extrabold text-[#0B1B3D] mt-1">{loading ? '...' : articles.length}</span>
            <span className="text-[10px] text-muted-foreground mt-auto truncate">{articles.filter(a => a.isPublished).length} Published</span>
          </CardContent>
        </Card>

        {/* Enquiries Card */}
        <Card className="border border-[#E2E8F0] shadow-xs text-left">
          <CardContent className="p-4 flex flex-col justify-between h-24">
            <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">ENQUIRIES</span>
            <span className="text-2xl font-extrabold text-[#0B1B3D] mt-1">{loading ? '...' : enquiries.length}</span>
            <span className="text-[10px] text-green-600 font-semibold mt-auto">Consult Forms</span>
          </CardContent>
        </Card>

        {/* Orders Card */}
        <Card className="border border-[#E2E8F0] shadow-xs text-left">
          <CardContent className="p-4 flex flex-col justify-between h-24">
            <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">STRIPE BILLS</span>
            <span className="text-2xl font-extrabold text-[#0B1B3D] mt-1">{loading ? '...' : orders.length}</span>
            <span className="text-[10px] text-muted-foreground mt-auto font-mono">${orders.reduce((acc, o) => acc + (o.total || 0), 0).toFixed(0)} Volume</span>
          </CardContent>
        </Card>

        {/* Courses Card */}
        <Card className="border border-[#E2E8F0] shadow-xs text-left">
          <CardContent className="p-4 flex flex-col justify-between h-24">
            <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">COURSES</span>
            <span className="text-2xl font-extrabold text-[#0B1B3D] mt-1">{loading ? '...' : courses.length}</span>
            <span className="text-[10px] text-muted-foreground mt-auto truncate">Active Programs</span>
          </CardContent>
        </Card>

        {/* Campaign Emails Card */}
        <Card className="border border-[#E2E8F0] shadow-xs text-left col-span-2 sm:col-span-1">
          <CardContent className="p-4 flex flex-col justify-between h-24">
            <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">CAMPAIGNS</span>
            <span className="text-2xl font-extrabold text-[#0B1B3D] mt-1">{loading ? '...' : emails.length}</span>
            <span className="text-[10px] text-muted-foreground mt-auto truncate">Subscribers list</span>
          </CardContent>
        </Card>

      </div>

      {/* Charts / Progress Distribution Shelves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Business Operations Volume Distribution */}
        <Card className="border border-[#E2E8F0] shadow-sm text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047] flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />
              <span>Business Funnel Volume Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-slate-500 font-normal">Visual representation of total user engagement segments ({totalTransactions} total entries):</p>
              
              {/* Native Segmented Bar */}
              <div className="h-6 w-full rounded-full overflow-hidden flex bg-slate-100">
                <div style={{ width: `${orderPercentage}%` }} className="bg-[#B89047] h-full transition-all" title="Paid Bookings" />
                <div style={{ width: `${inquiryPercentage}%` }} className="bg-[#0B1B3D] h-full transition-all" title="Inquiries" />
                <div style={{ width: `${campaignPercentage}%` }} className="bg-slate-400 h-full transition-all" title="Campaign Opt-ins" />
              </div>
            </div>

            {/* Legend Indicators */}
            <div className="grid grid-cols-3 gap-4 text-xs font-sans">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0B1B3D]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B89047]" />
                  <span>Stripe Bookings</span>
                </div>
                <p className="text-[11px] text-muted-foreground font-mono">{orderPercentage}% ({totalStripeBookings} orders)</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0B1B3D]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0B1B3D]" />
                  <span>Inquiries</span>
                </div>
                <p className="text-[11px] text-muted-foreground font-mono">{inquiryPercentage}% ({totalInquiries} submissions)</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0B1B3D]">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>Mailing Subs</span>
                </div>
                <p className="text-[11px] text-muted-foreground font-mono">{campaignPercentage}% ({totalCampaigns} subscribers)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2: E-Commerce Catalog Distribution (Free vs Premium) */}
        <Card className="border border-[#E2E8F0] shadow-sm text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047] flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Knowledge Hub Digital Shelf Split</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-slate-500 font-normal">Catalog split between lead magnets (Free) and revenue drivers (Premium):</p>
              
              {/* Native Split Meter */}
              <div className="h-6 w-full rounded-full overflow-hidden flex bg-slate-100">
                <div style={{ width: `${premiumPercentage}%` }} className="bg-[#B89047] h-full transition-all" />
                <div style={{ width: `${freePercentage}%` }} className="bg-slate-300 h-full transition-all" />
              </div>
            </div>

            {/* Legend Indicators */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0B1B3D]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B89047]" />
                  <span>Premium Toolkits (Paid)</span>
                </div>
                <p className="text-[11px] text-muted-foreground font-mono">{premiumPercentage}% ({totalPremiumResources} toolkits)</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0B1B3D]">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span>Lead Magnets (Free)</span>
                </div>
                <p className="text-[11px] text-muted-foreground font-mono">{freePercentage}% ({totalFreeResources} guides)</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Double Live Feed Roster Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Panel 1: Newest Registered Members */}
        <Card className="border border-[#E2E8F0] shadow-sm text-left">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
            <CardTitle className="text-sm font-extrabold text-[#0B1B3D] uppercase tracking-wider">Newest Members Activity</CardTitle>
            <Link href="/admin/users" className="text-xs text-[#B89047] font-semibold hover:underline cursor-pointer flex items-center">
              <span>Roster Database</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-[#B89047]" />
              </div>
            ) : users.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-xs font-medium">
                No registered users found.
              </div>
            ) : (
              <div className="space-y-4">
                {users.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center justify-between group border-b border-[#E2E8F0]/30 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] font-bold text-xs uppercase font-mono">
                        {item.firstName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-[#0B1B3D] capitalize">{item.firstName} {item.lastName}</p>
                        <p className="text-[10px] text-muted-foreground">{item.email}</p>
                      </div>
                    </div>
                    <div className="text-right text-[10px] font-mono text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#B89047]" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Panel 2: Stripe E-Commerce Sales */}
        <Card className="border border-[#E2E8F0] shadow-sm text-left">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
            <CardTitle className="text-sm font-extrabold text-[#0B1B3D] uppercase tracking-wider">Newest Sales & Payments</CardTitle>
            <Link href="/admin/orders" className="text-xs text-[#B89047] font-semibold hover:underline cursor-pointer flex items-center">
              <span>Checkout Ledgers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-[#B89047]" />
              </div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-xs font-medium">
                No processed checkout orders found.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-[#E2E8F0]/30 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                        item.status === 'paid' ? "bg-green-50 text-green-600 border border-green-200" : "bg-orange-50 text-orange-600 border border-orange-200"
                      )}>
                        $
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-[#0B1B3D]">{item.orderNumber}</p>
                        <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{item.contact?.organisation || 'Individual'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-extrabold text-[#0B1B3D] font-mono">${item.total.toFixed(2)}</p>
                      <p className={cn(
                        "text-[9px] font-bold uppercase tracking-widest",
                        item.status === 'paid' ? "text-green-600" : "text-orange-600"
                      )}>
                        {item.status === 'paid' ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>

    </div>
  )
}

function RefreshCcwIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}
