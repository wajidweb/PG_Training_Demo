'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  BookOpen, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  GraduationCap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Campaign Emails', href: '/admin/emails', icon: Mail },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Basic auth check
    const auth = localStorage.getItem('admin_auth')
    if (pathname === '/admin/login') {
      if (auth === 'true') router.push('/admin/courses')
      setIsLoading(false)
      return
    }

    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      // Redirect from dashboard to courses if dashboard is removed
      if (pathname === '/admin/dashboard') {
        router.push('/admin/courses')
      }
    }
    setIsLoading(false)
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  if (isLoading) return null
  if (pathname === '/admin/login') return <>{children}</>
  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden h-16 bg-[#223292] px-4 flex items-center justify-between sticky top-0 z-50 text-white shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold tracking-tight">PG Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "hidden md:flex flex-col fixed inset-y-0 left-0 z-50 bg-white border-r transition-all duration-300 shadow-sm",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="h-20 flex items-center px-6 border-b">
            <Link href="/admin/courses" className="flex items-center gap-3">
              <div className="bg-[#223292] h-10 w-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-900/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              {isSidebarOpen && (
                <span className="font-bold text-lg tracking-tight text-foreground whitespace-nowrap">
                  PG Admin
                </span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-3 py-3 rounded-xl transition-all group relative",
                    isActive 
                      ? "bg-[#223292] text-white shadow-md shadow-blue-900/10" 
                      : "hover:bg-muted text-muted-foreground hover:text-[#223292]"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                  {isSidebarOpen && (
                    <span className="font-medium text-sm">
                      {item.name}
                    </span>
                  )}
                </Link>
              )
            })}
            
            <div className="pt-4 mt-4 border-t border-muted mx-2" />
            
            <Link
              href="/"
              className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all group text-muted-foreground hover:bg-blue-50 hover:text-[#223292]"
            >
              <ChevronRight className="h-5 w-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              {isSidebarOpen && (
                <span className="font-medium text-sm">View Website</span>
              )}
            </Link>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t space-y-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center gap-4 w-full px-3 py-3 rounded-xl hover:bg-muted text-muted-foreground transition-all cursor-pointer"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              {isSidebarOpen && <span className="font-medium text-sm">Collapse</span>}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 w-full px-3 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
              {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileOpen(false)}>
          <div className="w-72 h-full bg-white animate-in slide-in-from-left duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 bg-[#223292] text-white flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  <span className="font-bold">PG Admin</span>
               </div>
               <button onClick={() => setIsMobileOpen(false)} className="cursor-pointer p-1 hover:bg-white/10 rounded-lg">
                <X className="h-6 w-6" />
               </button>
            </div>
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl",
                    pathname === item.href ? "bg-[#223292] text-white shadow-lg shadow-blue-900/10" : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="border-t my-4 pt-4" />
              <Link href="/" className="flex items-center gap-4 px-4 py-3 text-muted-foreground hover:bg-blue-50 hover:text-[#223292] rounded-xl transition-colors">
                <ChevronRight className="h-5 w-5" />
                <span>View Website</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-4 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer mt-auto">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 min-w-0",
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        )}
      >
        {/* Top Header - Desktop */}
        <header className="hidden md:flex h-20 bg-white border-b px-8 items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-foreground capitalize">
              {navItems.find(i => i.href === pathname)?.name || 'Management'}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm font-semibold text-[#223292] bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors border border-blue-100"
            >
              View Site
            </Link>
            <div className="flex items-center gap-3 pl-6 border-l">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-foreground leading-none mb-1">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center font-bold text-[#223292]">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8 max-w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}
