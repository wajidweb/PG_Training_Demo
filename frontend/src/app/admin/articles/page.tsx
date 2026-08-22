'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FileText, 
  Search, 
  RefreshCcw, 
  AlertCircle,
  Loader2,
  Plus,
  Eye,
  Edit,
  Trash,
  X,
  Save,
  Tag,
  Image as ImageIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  fetchArticles, 
  createArticle, 
  updateArticle, 
  deleteArticle, 
  uploadFile 
} from '@/lib/api'
import { cn } from '@/lib/utils'

interface Article {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  series: string
  tags: string[]
  isPublished: boolean
  publishedAt: string
}

export default function AdminArticlesPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Popup Modal Creator states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [createError, setCreateError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '/research.jpg',
    author: 'PGT Contributors',
    series: 'CEO Briefing',
    tags: '',
    isPublished: false
  })

  // Popup Modal Edit states
  const [editArticle, setEditArticle] = useState<any | null>(null)
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')
  const [editUploading, setEditUploading] = useState(false)
  const [editUploadSuccess, setEditUploadSuccess] = useState('')
  const [editForm, setEditForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '/research.jpg',
    author: 'PGT Contributors',
    series: 'CEO Briefing',
    tags: '',
    isPublished: false
  })

  // Popup Modal Delete states
  const [deleteArticleItem, setDeleteArticleItem] = useState<any | null>(null)
  const [deleteSaving, setDeleteSaving] = useState(false)

  const loadArticles = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchArticles(true) // Include unpublished
      setArticles(data)
    } catch (err) {
      setError('Failed to load articles. Ensure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => {
      const updated = { ...prev, [name]: value }
      if (name === 'title' && !prev.slug) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      }
      return updated
    })
  }

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditForm(prev => {
      const updated = { ...prev, [name]: value }
      if (name === 'title' && !prev.slug) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      }
      return updated
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadSuccess('')
    setCreateError('')

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const base64Data = (event.target?.result as string).split(',')[1]
        const res = await uploadFile(file.name, base64Data)
        if (res.success && res.fileUrl) {
          setForm(prev => ({ ...prev, coverImage: res.fileUrl }))
          setUploadSuccess(`✓ Thumbnail "${file.name}" uploaded successfully!`)
        }
      } catch (err: any) {
        setCreateError(err.message || 'Thumbnail upload failed.')
        console.error(err)
      } finally {
        setUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleEditFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setEditUploading(true)
    setEditUploadSuccess('')
    setEditError('')

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const base64Data = (event.target?.result as string).split(',')[1]
        const res = await uploadFile(file.name, base64Data)
        if (res.success && res.fileUrl) {
          setEditForm(prev => ({ ...prev, coverImage: res.fileUrl }))
          setEditUploadSuccess(`✓ Thumbnail "${file.name}" uploaded successfully!`)
        }
      } catch (err: any) {
        setEditError(err.message || 'Thumbnail upload failed.')
        console.error(err)
      } finally {
        setEditUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleStartEdit = (article: any) => {
    setEditArticle(article)
    setEditError('')
    setEditUploadSuccess('')
    setEditForm({
      title: article.title || '',
      slug: article.slug || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      coverImage: article.coverImage || '/research.jpg',
      author: article.author || 'PGT Contributors',
      series: article.series || 'CEO Briefing',
      tags: article.tags ? article.tags.join(', ') : '',
      isPublished: article.isPublished || false
    })
  }

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setCreateError('')

    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    try {
      await createArticle(payload)
      setShowCreateModal(false)
      setForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '/research.jpg',
        author: 'PGT Contributors',
        series: 'CEO Briefing',
        tags: '',
        isPublished: false
      })
      await loadArticles()
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create article')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEditSaving(true)
    setEditError('')

    const payload = {
      ...editForm,
      tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    try {
      await updateArticle(editArticle._id, payload)
      setEditArticle(null)
      await loadArticles()
    } catch (err: any) {
      setEditError(err.message || 'Failed to update article')
      console.error(err)
    } finally {
      setEditSaving(false)
    }
  }

  const handleDeleteSubmit = async () => {
    setDeleteSaving(true)
    try {
      await deleteArticle(deleteArticleItem._id)
      setDeleteArticleItem(null)
      await loadArticles()
    } catch (err: any) {
      alert(err.message || 'Failed to delete article')
      console.error(err)
    } finally {
      setDeleteSaving(false)
    }
  }

  const filteredArticles = articles.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.series.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Journal Articles</h1>
          <p className="text-muted-foreground mt-1">Manage PGT Journal editorial content, insights, and series.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={loadArticles} 
            disabled={loading}
            className="cursor-pointer border-2"
          >
            <RefreshCcw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="bg-[#0B1B3D] hover:bg-[#0B1B3D]/90 text-white cursor-pointer border-2 border-[#0B1B3D]"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">TOTAL ARTICLES</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{articles.length}</p>
          </CardContent>
        </Card>
        
        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">PUBLISHED</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{articles.filter(a => a.isPublished).length}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">DRAFTS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{articles.filter(a => !a.isPublished).length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Card Panel */}
      <Card className="border border-[#E2E8F0]">
        <CardContent className="p-0">
          
          {/* Search filter bar */}
          <div className="p-4 border-b flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#B89047] font-normal"
              />
            </div>
          </div>

          {/* Error and Loading indicators */}
          {error && (
            <div className="p-6 flex flex-col items-center justify-center text-center text-red-600 gap-2">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-bold">{error}</p>
              <Button size="sm" variant="outline" onClick={loadArticles} className="mt-2">Try Again</Button>
            </div>
          )}

          {!error && loading && (
            <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#B89047]" />
              <p className="text-xs text-muted-foreground">Loading editorial briefings...</p>
            </div>
          )}

          {!error && !loading && filteredArticles.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-40 text-[#B89047]" />
              <p className="text-sm font-bold">No articles found</p>
              <p className="text-xs">Create a new article or adjust your filters.</p>
            </div>
          )}

          {/* Dynamic Table list */}
          {!error && !loading && filteredArticles.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-muted/40 border-b border-[#E2E8F0] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="p-4">Article Title & Slug</th>
                    <th className="p-4">Author / Series</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]/60 text-xs sm:text-sm">
                  {filteredArticles.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4 text-left">
                        <div className="font-bold text-[#0B1B3D] truncate max-w-[280px]">{item.title}</div>
                        <div className="text-[11px] text-muted-foreground truncate max-w-[280px]">/{item.slug}</div>
                      </td>
                      <td className="p-4 text-left">
                        <div className="text-[#0B1B3D] font-medium capitalize">{item.author}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#B89047]" /> {item.series}
                        </div>
                      </td>
                      <td className="p-4 text-left">
                        <span className={cn(
                          "inline-block border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                          item.isPublished 
                            ? "bg-green-100 text-green-700 border-green-200" 
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        )}>
                          {item.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        <Link href={`/journal/${item.slug}`} target="_blank">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-[#B89047] hover:text-[#B89047]/90 hover:bg-[#B89047]/10 cursor-pointer">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleStartEdit(item)}
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => setDeleteArticleItem(item)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </CardContent>
      </Card>

      {/* Article Creator Popup Modal Overlay */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden border border-[#E2E8F0] shadow-2xl relative my-8">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <form onSubmit={handleSubmitCreate}>
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header */}
                <div className="border-b pb-4">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-1">PGT JOURNAL EDITORIALS</span>
                  <h3 className="text-xl font-bold text-[#0B1B3D] uppercase tracking-tight">Create New Article</h3>
                </div>

                {createError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p className="text-xs font-bold">{createError}</p>
                  </div>
                )}

                {/* Form Fields - Grid */}
                <div className="space-y-4 text-left">
                  
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Article Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Preparing boards for AI Turbulent Decades"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Author & Series */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Author Name
                      </label>
                      <input
                        type="text"
                        name="author"
                        required
                        value={form.author}
                        onChange={handleChange}
                        className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Editorial Series
                      </label>
                      <select
                        name="series"
                        value={form.series}
                        onChange={handleChange}
                        className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
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
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Short Excerpt (Teaser text)
                    </label>
                    <textarea
                      name="excerpt"
                      required
                      rows={2}
                      maxLength={180}
                      placeholder="Brief teaser of what the reader will learn (maximum 180 characters)..."
                      value={form.excerpt}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Article Prose Content (Rich formatting support)
                    </label>
                    <textarea
                      name="content"
                      required
                      rows={6}
                      placeholder="Write the full publication content prose here. Support line breaks by hitting Enter twice."
                      value={form.content}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      placeholder="e.g. AI, Leadership, Erasmus"
                      value={form.tags}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Publishing Toggle */}
                  <div className="border-t border-[#E2E8F0]/60 pt-4 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">PUBLISHING STATUS</span>
                      <span className="text-xs text-muted-foreground">{form.isPublished ? 'Publish Immediately to Hub' : 'Save as Draft'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, isPublished: !prev.isPublished }))}
                      className={`w-12 h-6 rounded-full p-1 transition-all ${form.isPublished ? 'bg-green-600' : 'bg-slate-300'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-all ${form.isPublished ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                </div>

              </div>

              {/* Action Buttons */}
              <div className="bg-muted/40 px-6 py-4 flex justify-end gap-3 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={saving} 
                  onClick={() => setShowCreateModal(false)}
                  className="border-2 h-10 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-[#0B1B3D] hover:bg-[#0B1B3D]/90 text-white font-bold text-xs uppercase tracking-wider h-10 px-6 cursor-pointer"
                >
                  {saving ? (
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

            </form>
          </div>
        </div>
      )}

      {/* Article Editor Popup Modal Overlay */}
      {editArticle && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden border border-[#E2E8F0] shadow-2xl relative my-8">
            <button 
              onClick={() => setEditArticle(null)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <form onSubmit={handleUpdateSubmit}>
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header */}
                <div className="border-b pb-4">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-1">PGT JOURNAL EDITORIALS</span>
                  <h3 className="text-xl font-bold text-[#0B1B3D] uppercase tracking-tight">Edit Article</h3>
                </div>

                {editError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p className="text-xs font-bold">{editError}</p>
                  </div>
                )}

                {/* Form Fields - Grid */}
                <div className="space-y-4 text-left">
                  
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Article Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Preparing boards for AI Turbulent Decades"
                      value={editForm.title}
                      onChange={handleEditFormChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Author & Series */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Author Name
                      </label>
                      <input
                        type="text"
                        name="author"
                        required
                        value={editForm.author}
                        onChange={handleEditFormChange}
                        className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Editorial Series
                      </label>
                      <select
                        name="series"
                        value={editForm.series}
                        onChange={handleEditFormChange}
                        className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
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
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Short Excerpt (Teaser text)
                    </label>
                    <textarea
                      name="excerpt"
                      required
                      rows={2}
                      maxLength={180}
                      placeholder="Brief teaser of what the reader will learn (maximum 180 characters)..."
                      value={editForm.excerpt}
                      onChange={handleEditFormChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Article Prose Content (Rich formatting support)
                    </label>
                    <textarea
                      name="content"
                      required
                      rows={6}
                      placeholder="Write the full publication content prose here. Support line breaks by hitting Enter twice."
                      value={editForm.content}
                      onChange={handleEditFormChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      placeholder="e.g. AI, Leadership, Erasmus"
                      value={editForm.tags}
                      onChange={handleEditFormChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Publishing Toggle */}
                  <div className="border-t border-[#E2E8F0]/60 pt-4 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">PUBLISHING STATUS</span>
                      <span className="text-xs text-muted-foreground">{editForm.isPublished ? 'Publish Immediately to Hub' : 'Save as Draft'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditForm(prev => ({ ...prev, isPublished: !prev.isPublished }))}
                      className={`w-12 h-6 rounded-full p-1 transition-all ${editForm.isPublished ? 'bg-green-600' : 'bg-slate-300'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-all ${editForm.isPublished ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                </div>

              </div>

              {/* Action Buttons */}
              <div className="bg-muted/40 px-6 py-4 flex justify-end gap-3 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={editSaving} 
                  onClick={() => setEditArticle(null)}
                  className="border-2 h-10 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={editSaving}
                  className="bg-[#0B1B3D] hover:bg-[#0B1B3D]/90 text-white font-bold text-xs uppercase tracking-wider h-10 px-6 cursor-pointer"
                >
                  {editSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Article Delete Confirmation Modal Overlay */}
      {deleteArticleItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border border-[#E2E8F0] shadow-2xl relative p-6 sm:p-8 text-center space-y-6">
            <button 
              onClick={() => setDeleteArticleItem(null)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[9px] font-bold tracking-[0.25em] text-red-600 uppercase block">PERMANENT ACTION</span>
              <h3 className="text-xl font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-tight">Delete Article?</h3>
              <div className="h-0.5 w-12 bg-red-600 mx-auto mt-2 rounded" />
            </div>

            <p className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed font-normal">
              Are you sure you want to permanently delete <strong className="text-red-600 font-extrabold">"{deleteArticleItem.title}"</strong>? This will remove the article and take it down from the public journal stream immediately. This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-stretch">
              <Button
                type="button"
                variant="outline"
                disabled={deleteSaving}
                onClick={() => setDeleteArticleItem(null)}
                className="flex-1 border-2 h-11 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                No, Keep It
              </Button>
              <Button
                type="button"
                disabled={deleteSaving}
                onClick={handleDeleteSubmit}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider h-11 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
              >
                {deleteSaving ? (
                  <div className="flex items-center justify-center gap-1.5">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Deleting...</span>
                  </div>
                ) : (
                  'Yes, Delete'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
