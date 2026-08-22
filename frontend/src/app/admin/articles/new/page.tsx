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

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'PGT Contributors',
    series: 'CEO Briefing',
    tags: '',
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
      return updated
    })
  }

  const handleToggle = () => {
    setForm(prev => ({ ...prev, isPublished: !prev.isPublished }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const res = await fetch(`${apiBaseUrl}/api/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to create article')
      }

      router.push('/admin/articles')
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the article.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      <div className="flex items-center gap-4">
        <Link href="/admin/articles">
          <Button variant="outline" size="icon" className="h-9 w-9 border-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Article</h1>
          <p className="text-muted-foreground mt-1">Draft a new editorial piece, CEO Briefing, or future ready insight.</p>
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
                  Article Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Leading Through Technological Turbulence"
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
                  placeholder="e.g. leading-through-turbulence"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal font-mono"
                />
              </div>
            </div>

            {/* Author & Series */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  value={form.author}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Editorial Series
                </label>
                <select
                  name="series"
                  value={form.series}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal capitalize"
                >
                  <option value="CEO Briefing">CEO Briefing</option>
                  <option value="Future Learning Review">Future Learning Review</option>
                  <option value="AI in Practice">AI in Practice</option>
                  <option value="Mobility Matters">Mobility Matters</option>
                  <option value="Capability Quarterly">Capability Quarterly</option>
                </select>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                Short Excerpt
              </label>
              <textarea
                name="excerpt"
                required
                rows={2}
                maxLength={200}
                placeholder="Brief summary of the article (maximum 200 characters)"
                value={form.excerpt}
                onChange={handleChange}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
              />
            </div>

            {/* Content (Prose WYSIWYG) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                Article Body Content (Markdown/HTML Support)
              </label>
              <textarea
                name="content"
                required
                rows={10}
                placeholder="Write the full body prose here. Support rich paragraphs, lists, and quotes..."
                value={form.content}
                onChange={handleChange}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
              />
            </div>

            {/* Tags & Publishing status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center border-t border-[#E2E8F0]/60 pt-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="e.g. AI, Leadership, Erasmus"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                />
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">PUBLISHING STATUS</span>
                  <span className="text-xs text-muted-foreground">{form.isPublished ? 'Publish Immediately' : 'Save as Draft'}</span>
                </div>
                <button
                  type="button"
                  onClick={handleToggle}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${form.isPublished ? 'bg-green-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-all ${form.isPublished ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="border-t border-[#E2E8F0]/60 pt-6 flex justify-end gap-3">
              <Link href="/admin/articles">
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
                    Save Article
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
