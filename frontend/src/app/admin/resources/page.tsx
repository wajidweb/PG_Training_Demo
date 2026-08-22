'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FolderDown, 
  Search, 
  RefreshCcw, 
  AlertCircle,
  Loader2,
  Plus,
  Eye,
  Edit,
  Trash,
  Tag,
  Save,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchResources, uploadFile, updateResource, deleteResource } from '@/lib/api'
import { cn } from '@/lib/utils'

interface Resource {
  _id: string
  title: string
  slug: string
  type: string
  category: string
  tier: string
  price: number
  isPublished: boolean
  createdAt: string
}

export default function AdminResourcesPage() {
  const router = useRouter()
  const [resources, setResources] = useState<Resource[]>([])
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
    description: '',
    coverImage: '/development.png',
    type: 'guide',
    category: 'executive',
    tier: 'free' as 'free' | 'premium',
    price: 0,
    fileUrl: '/ebook-placeholder.pdf',
    isPublished: false
  })

  // Popup Modal Edit states
  const [editResource, setEditResource] = useState<any | null>(null)
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')
  const [editUploading, setEditUploading] = useState(false)
  const [editUploadSuccess, setEditUploadSuccess] = useState('')
  const [editForm, setEditForm] = useState({
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

  // Popup Modal Delete states
  const [deleteResourceItem, setDeleteResourceItem] = useState<any | null>(null)
  const [deleteSaving, setDeleteSaving] = useState(false)

  const loadResources = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchResources({ includeUnpublished: true })
      setResources(data)
    } catch (err) {
      setError('Failed to load resources. Ensure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadResources()
  }, [])

  const handleStartEdit = (resource: any) => {
    setEditResource(resource)
    setEditError('')
    setEditUploadSuccess('')
    setEditForm({
      title: resource.title || '',
      slug: resource.slug || '',
      description: resource.description || '',
      coverImage: resource.coverImage || '/development.png',
      type: resource.type || 'guide',
      category: resource.category || 'executive',
      tier: resource.tier || 'free',
      price: resource.price || 0,
      fileUrl: resource.fileUrl || '/ebook-placeholder.pdf',
      isPublished: resource.isPublished || false
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
      if (name === 'price') {
        updated.price = parseFloat(value) || 0
      }
      return updated
    })
  }

  const handleEditTierChange = (tier: 'free' | 'premium') => {
    setEditForm(prev => ({
      ...prev,
      tier,
      price: tier === 'free' ? 0 : prev.price || 49.00
    }))
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
          setEditForm(prev => ({ ...prev, fileUrl: res.fileUrl }))
          setEditUploadSuccess(`✓ File "${file.name}" uploaded successfully!`)
        }
      } catch (err: any) {
        setEditError(err.message || 'File upload failed.')
        console.error(err)
      } finally {
        setEditUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUpdateResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEditSaving(true)
    setEditError('')

    try {
      await updateResource(editResource._id, editForm)
      setEditResource(null)
      await loadResources()
    } catch (err: any) {
      setEditError(err.message || 'Failed to update resource')
      console.error(err)
    } finally {
      setEditSaving(false)
    }
  }

  const handleDeleteResourceSubmit = async () => {
    setDeleteSaving(true)
    try {
      await deleteResource(deleteResourceItem._id)
      setDeleteResourceItem(null)
      await loadResources()
    } catch (err: any) {
      alert(err.message || 'Failed to delete resource')
      console.error(err)
    } finally {
      setDeleteSaving(false)
    }
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
          setForm(prev => ({ ...prev, fileUrl: res.fileUrl }))
          setUploadSuccess(`✓ File "${file.name}" uploaded successfully!`)
        }
      } catch (err: any) {
        setCreateError(err.message || 'File upload failed.')
        console.error(err)
      } finally {
        setUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

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

      // Format pricing types
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

  const handleTogglePublished = () => {
    setForm(prev => ({ ...prev, isPublished: !prev.isPublished }))
  }

  const handleSubmitResource = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setCreateError('')

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

      // Close modal, clear form and reload list!
      setShowCreateModal(false)
      setForm({
        title: '',
        slug: '',
        description: '',
        coverImage: '/development.png',
        type: 'guide',
        category: 'executive',
        tier: 'free',
        price: 0,
        fileUrl: '/ebook-placeholder.pdf',
        isPublished: false
      })
      await loadResources()
    } catch (err: any) {
      setCreateError(err.message || 'An error occurred while saving.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const filteredResources = resources.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Knowledge Hub Resources</h1>
          <p className="text-muted-foreground mt-1">Manage downloadable toolkits, guides, reports, and digital products.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={loadResources} 
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
            New Resource
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">TOTAL</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{resources.length}</p>
          </CardContent>
        </Card>
        
        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">PREMIUM</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{resources.filter(r => r.tier === 'premium').length}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">FREE (LEAD MAGNETS)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{resources.filter(r => r.tier === 'free').length}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#E2E8F0]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-[#B89047]">DRAFTS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-[#0B1B3D]">{resources.filter(r => !r.isPublished).length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-[#E2E8F0]">
        <CardContent className="p-0">
          {/* Search bar */}
          <div className="p-4 border-b flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#B89047] font-normal"
              />
            </div>
          </div>

          {/* Table list */}
          {error && (
            <div className="p-6 flex flex-col items-center justify-center text-center text-red-600 gap-2">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-bold">{error}</p>
              <Button size="sm" variant="outline" onClick={loadResources} className="mt-2">Try Again</Button>
            </div>
          )}

          {!error && loading && (
            <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#B89047]" />
              <p className="text-xs text-muted-foreground">Loading resources database...</p>
            </div>
          )}

          {!error && !loading && filteredResources.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <FolderDown className="h-8 w-8 mx-auto mb-2 opacity-40 text-[#B89047]" />
              <p className="text-sm font-bold">No resources found</p>
              <p className="text-xs">Adjust your search parameters or upload a new resource.</p>
            </div>
          )}

          {!error && !loading && filteredResources.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-muted/40 border-b border-[#E2E8F0] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="p-4">Title</th>
                    <th className="p-4">Category / Type</th>
                    <th className="p-4">Pricing Tier</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]/60 text-xs sm:text-sm">
                  {filteredResources.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#0B1B3D] max-w-[300px] truncate">{item.title}</div>
                        <div className="text-[11px] text-muted-foreground truncate max-w-[300px]">/{item.slug}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[#0B1B3D] font-medium capitalize">{item.category}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {item.type}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={cn(
                          "inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                          item.tier === 'premium' ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-700"
                        )}>
                          {item.tier}
                        </div>
                        {item.tier === 'premium' && (
                          <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">${item.price.toFixed(2)}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-block border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                          item.isPublished 
                            ? "bg-green-100 text-green-700 border-green-200" 
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        )}>
                          {item.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
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
                          onClick={() => setDeleteResourceItem(item)}
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

      {/* Resource Creator Popup Modal Overlay */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden border border-[#E2E8F0] shadow-2xl relative my-8">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <form onSubmit={handleSubmitResource}>
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header */}
                <div className="border-b pb-4">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-1">KNOWLEDGE HUB SHELF</span>
                  <h3 className="text-xl font-bold text-[#0B1B3D] uppercase tracking-tight">Create New Resource</h3>
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
                      Resource Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Erasmus QA Checklist"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Category & Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Subject Category
                      </label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                      >
                        <option value="executive">Executive Success</option>
                        <option value="academic">Academic Excellence</option>
                        <option value="erasmus">Erasmus Plus</option>
                        <option value="ai">Artificial Intelligence</option>
                        <option value="workforce">Workforce Development</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Resource Type
                      </label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal capitalize"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center border-y border-[#E2E8F0]/60 py-4 my-2">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Pricing Tier
                      </label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={form.tier === 'free' ? 'default' : 'outline'}
                          onClick={() => handleTierChange('free')}
                          className="flex-1 h-9 cursor-pointer text-xs"
                        >
                          Free (Lead Magnet)
                        </Button>
                        <Button
                          type="button"
                          variant={form.tier === 'premium' ? 'default' : 'outline'}
                          onClick={() => handleTierChange('premium')}
                          className="flex-1 h-9 cursor-pointer text-xs"
                        >
                          Premium (Paid)
                        </Button>
                      </div>
                    </div>

                    {form.tier === 'premium' && (
                      <div className="space-y-1 animate-in slide-in-from-top duration-200">
                        <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
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
                          className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#B89047] font-normal font-mono"
                        />
                      </div>
                    )}
                  </div>

                  {/* File Upload Selector & S3 Path */}
                  <div className="grid grid-cols-1 gap-4 border-t pt-4 my-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Upload Document File (PDF, Word, Excel, ZIP)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                          onChange={handleFileUpload}
                          disabled={uploading}
                          className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-[#0B1B3D] file:text-white file:cursor-pointer hover:file:bg-[#0B1B3D]/90"
                        />
                        {uploading && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                            <Loader2 className="w-4 h-4 animate-spin text-[#B89047]" />
                            <span>Uploading file...</span>
                          </div>
                        )}
                        {uploadSuccess && (
                          <div className="text-xs font-bold text-green-600 font-mono">
                            {uploadSuccess}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Resource Description
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      placeholder="Details of what this resource is and why the user should download or purchase it..."
                      value={form.description}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Publishing Status Toggle */}
                  <div className="border-t border-[#E2E8F0]/60 pt-4 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">PUBLISHING STATUS</span>
                      <span className="text-xs text-muted-foreground">{form.isPublished ? 'Publish Immediately to Hub' : 'Save as Draft'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleTogglePublished}
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
                      Save Resource
                    </>
                  )}
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Resource Editor Popup Modal Overlay */}
      {editResource && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden border border-[#E2E8F0] shadow-2xl relative my-8">
            <button 
              onClick={() => setEditResource(null)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <form onSubmit={handleUpdateResourceSubmit}>
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header */}
                <div className="border-b pb-4">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-1">KNOWLEDGE HUB SHELF</span>
                  <h3 className="text-xl font-bold text-[#0B1B3D] uppercase tracking-tight">Edit Resource</h3>
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
                      Resource Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Erasmus QA Checklist"
                      value={editForm.title}
                      onChange={handleEditFormChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Category & Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Subject Category
                      </label>
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditFormChange}
                        className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                      >
                        <option value="executive">Executive Success</option>
                        <option value="academic">Academic Excellence</option>
                        <option value="erasmus">Erasmus Plus</option>
                        <option value="ai">Artificial Intelligence</option>
                        <option value="workforce">Workforce Development</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Resource Type
                      </label>
                      <select
                        name="type"
                        value={editForm.type}
                        onChange={handleEditFormChange}
                        className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal capitalize"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center border-y border-[#E2E8F0]/60 py-4 my-2">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Pricing Tier
                      </label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={editForm.tier === 'free' ? 'default' : 'outline'}
                          onClick={() => handleEditTierChange('free')}
                          className="flex-1 h-9 cursor-pointer text-xs"
                        >
                          Free (Lead Magnet)
                        </Button>
                        <Button
                          type="button"
                          variant={editForm.tier === 'premium' ? 'default' : 'outline'}
                          onClick={() => handleEditTierChange('premium')}
                          className="flex-1 h-9 cursor-pointer text-xs"
                        >
                          Premium (Paid)
                        </Button>
                      </div>
                    </div>

                    {editForm.tier === 'premium' && (
                      <div className="space-y-1 animate-in slide-in-from-top duration-200">
                        <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                          Product Price (USD)
                        </label>
                        <input
                          type="number"
                          name="price"
                          required
                          min={0.99}
                          step={0.01}
                          value={editForm.price}
                          onChange={handleEditFormChange}
                          className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#B89047] font-normal font-mono"
                        />
                      </div>
                    )}
                  </div>

                  {/* File Upload Selector & S3 Path */}
                  <div className="grid grid-cols-1 gap-4 border-t pt-4 my-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                        Upload Replacement File (Optional)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                          onChange={handleEditFileUpload}
                          disabled={editUploading}
                          className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-[#0B1B3D] file:text-white file:cursor-pointer hover:file:bg-[#0B1B3D]/90"
                        />
                        {editUploading && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                            <Loader2 className="w-4 h-4 animate-spin text-[#B89047]" />
                            <span>Uploading file...</span>
                          </div>
                        )}
                        {editUploadSuccess && (
                          <div className="text-xs font-bold text-green-600 font-mono">
                            {editUploadSuccess}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">
                      Resource Description
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      placeholder="Details of what this resource is and why..."
                      value={editForm.description}
                      onChange={handleEditFormChange}
                      className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                    />
                  </div>

                  {/* Publishing Status Toggle */}
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
                  onClick={() => setEditResource(null)}
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

      {/* Resource Delete Confirmation Modal Overlay */}
      {deleteResourceItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border border-[#E2E8F0] shadow-2xl relative p-6 sm:p-8 text-center space-y-6">
            <button 
              onClick={() => setDeleteResourceItem(null)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[9px] font-bold tracking-[0.25em] text-red-600 uppercase block">PERMANENT ACTION</span>
              <h3 className="text-xl font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-tight">Delete Resource?</h3>
              <div className="h-0.5 w-12 bg-red-600 mx-auto mt-2 rounded" />
            </div>

            <p className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed font-normal">
              Are you sure you want to permanently delete <strong className="text-red-600 font-extrabold">"{deleteResourceItem.title}"</strong>? This will remove the file and block access for members immediately. This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-stretch">
              <Button
                type="button"
                variant="outline"
                disabled={deleteSaving}
                onClick={() => setDeleteResourceItem(null)}
                className="flex-1 border-2 h-11 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                No, Keep It
              </Button>
              <Button
                type="button"
                disabled={deleteSaving}
                onClick={handleDeleteResourceSubmit}
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
