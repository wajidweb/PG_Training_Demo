'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  AlertCircle 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function NewResourcePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    coverImage: '/development.png',
    type: 'guide',
    category: 'executive',
    tier: 'free' as 'free' | 'premium',
    price: 0,
    fileUrl: '/ebook-placeholder.pdf',
    isPublished: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => {
      const updated = { ...prev, [name]: value }
      
      // Auto-generate slug from title
      if (name === 'title' && !prev.slug) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      }

      // Convert pricing types correctly
      if (name === 'price') {
        updated.price = parseFloat(value) || 0
      }

      return updated
    })
  }

  const handleTierChange = (tier: 'free' | 'premium') => {
    setForm(prev => ({
      ...prev,
      tier,
      price: tier === 'free' ? 0 : prev.price || 49.00
    }))
  }

  const handleToggle = () => {
    setForm(prev => ({ ...prev, isPublished: !prev.isPublished }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const res = await fetch(`${apiBaseUrl}/api/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to create resource')
      }

      router.push('/admin/resources')
    } catch (err: any) {
      setError(err.message || 'An error occurred while uploading the resource.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      <div className="flex items-center gap-4">
        <Link href="/admin/resources">
          <Button variant="outline" size="icon" className="h-9 w-9 border-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload New Resource</h1>
          <p className="text-muted-foreground mt-1">Sponsor a new planning checklist, digital toolkit, or premium guide.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-bold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="border border-[#E2E8F0] overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">
            
            {/* Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Resource Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Erasmus Plus Proposal Toolkit"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  URL Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  required
                  placeholder="e.g. erasmus-proposal-toolkit"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal font-mono"
                />
              </div>
            </div>

            {/* Category & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Subject Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                >
                  <option value="executive">Executive Success</option>
                  <option value="academic">Academic Excellence</option>
                  <option value="erasmus">Erasmus Plus</option>
                  <option value="ai">Artificial Intelligence</option>
                  <option value="workforce">Workforce Development</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Resource Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal capitalize"
                >
                  <option value="guide">Guide Book</option>
                  <option value="toolkit">Toolkit Bundle</option>
                  <option value="video">Video Briefing</option>
                  <option value="assessment">Assessment Scorecard</option>
                  <option value="checklist">Action Checklist</option>
                  <option value="report">Research Report</option>
                </select>
              </div>
            </div>

            {/* Pricing Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center border-y border-[#E2E8F0]/60 py-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Pricing Tier
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={form.tier === 'free' ? 'default' : 'outline'}
                    onClick={() => handleTierChange('free')}
                    className="flex-1 h-10 cursor-pointer"
                  >
                    Free (Lead Magnet)
                  </Button>
                  <Button
                    type="button"
                    variant={form.tier === 'premium' ? 'default' : 'outline'}
                    onClick={() => handleTierChange('premium')}
                    className="flex-1 h-10 cursor-pointer"
                  >
                    Premium (Paid)
                  </Button>
                </div>
              </div>

              {form.tier === 'premium' && (
                <div className="space-y-1.5 animate-in slide-in-from-top duration-200">
                  <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                    Product Price (USD)
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min={0.99}
                    step={0.01}
                    value={form.price}
                    onChange={handleChange}
                    className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal font-mono"
                  />
                </div>
              )}
            </div>

            {/* S3 File Path & Cover Image placeholder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Secure Download File URL
                </label>
                <input
                  type="text"
                  name="fileUrl"
                  required
                  value={form.fileUrl}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  name="coverImage"
                  required
                  value={form.coverImage}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal font-mono"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                Resource Description
              </label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Details of what this resource is and why the user should download or purchase it..."
                value={form.description}
                onChange={handleChange}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
              />
            </div>

            {/* Toggle publishing */}
            <div className="border-t border-[#E2E8F0]/60 pt-6 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">PUBLISHING STATUS</span>
                <span className="text-xs text-muted-foreground">{form.isPublished ? 'Publish Immediately to Hub' : 'Save as Draft'}</span>
              </div>
              <button
                type="button"
                onClick={handleToggle}
                className={`w-12 h-6 rounded-full p-1 transition-all ${form.isPublished ? 'bg-green-600' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${form.isPublished ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Action buttons */}
            <div className="border-t border-[#E2E8F0]/60 pt-6 flex justify-end gap-3">
              <Link href="/admin/resources">
                <Button variant="outline" disabled={loading} className="border-2 h-10 text-xs font-bold uppercase tracking-wider">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#0B1B3D] hover:bg-[#0B1B3D]/90 text-white font-bold text-xs uppercase tracking-wider h-10 px-6 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Resource
                  </>
                )}
              </Button>
            </div>

          </CardContent>
        </Card>
      </form>
    </div>
  )
}
