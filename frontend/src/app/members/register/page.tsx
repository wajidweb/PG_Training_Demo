'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Loader2, KeyRound, Mail, User } from 'lucide-react'
import { registerUser } from '@/lib/api'
import { Button } from '@/components/ui/button'

export default function MembersRegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await registerUser(form)
      if (res.success && res.token) {
        localStorage.setItem('member_auth_token', res.token)
        localStorage.setItem('member_user_name', res.data.firstName)
        router.push('/members')
      } else {
        setError(res.message || 'Registration failed. Please try again.')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PGT MEMBERS HUB</span>
        <h2 className="text-3xl font-extrabold text-[#0B1B3D] uppercase tracking-tight">Create Free Account</h2>
        <p className="text-xs text-muted-foreground">Unlock elite planners, scorecards, checklists, and guides instantly.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-[#E2E8F0] shadow-sm rounded-2xl sm:px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 mb-6">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-xs font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                Professional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@organisation.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                Security Password (min 6 chars)
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-extrabold text-xs uppercase tracking-widest h-11 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin text-white" />
                    Registering Account...
                  </>
                ) : (
                  'Register Account'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 border-t border-[#E2E8F0] pt-6 text-center text-xs">
            <span className="text-muted-foreground">Already have an account?</span>{' '}
            <Link href="/members/login" className="font-bold text-[#B89047] hover:underline">
              Log In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
