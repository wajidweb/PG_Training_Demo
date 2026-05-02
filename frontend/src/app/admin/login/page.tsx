'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Loader2, AlertCircle, ArrowLeft, ShieldCheck, GraduationCap } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulating authentication delay
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === 'admin123') {
        localStorage.setItem('admin_auth', 'true')
        router.push('/admin/dashboard')
      } else {
        setError('Invalid credentials. Please verify your email and password.')
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      
      {/* Left Panel - Branding & Imagery */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-[#223292] relative flex-col justify-between p-12 text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-400 rounded-full blur-[120px] opacity-30" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#F2D03B] rounded-full blur-[120px] opacity-20" />

        <div className="relative z-10">
          <div className="bg-white inline-block rounded-xl p-3 shadow-sm mb-8">
            <img 
              src="/logo.jpg" 
              alt="Paragon Global Training Academy" 
              className="h-12 w-auto object-contain" 
            />
          </div>
        </div>

        <div className="relative z-10 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm font-medium mb-4">
            <ShieldCheck className="h-4 w-4" /> Secure Admin Portal
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Manage Global <br/>Professional Excellence.
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed">
            Access the Paragon Academy control center to oversee courses, manage orders, and analyze campaign performance in real-time.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-blue-200">
          <GraduationCap className="h-5 w-5" />
          <p>Empowering Higher Education Institutions Worldwide</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative">
        <Link href="/" className="absolute top-8 left-8 sm:left-12 flex items-center text-sm font-medium text-gray-500 hover:text-[#223292] transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Website
        </Link>

        <div className="w-full max-w-sm mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
            <p className="text-gray-500">Sign in to your administrator account.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-2xl flex items-start gap-3 border border-red-100 animate-in fade-in zoom-in-95">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="font-medium leading-relaxed">{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#223292]" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#223292] focus:bg-white transition-all text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#223292]" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#223292] focus:bg-white transition-all text-gray-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-7 text-lg font-bold rounded-2xl shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer bg-[#223292] hover:bg-[#1a2875] text-white mt-4" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin text-blue-200" />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="pt-8 text-center border-t border-gray-100">
            <p className="text-xs text-gray-400">
              By logging in, you agree to the security protocols of Paragon Global Academy.
              <br/>© 2026 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
