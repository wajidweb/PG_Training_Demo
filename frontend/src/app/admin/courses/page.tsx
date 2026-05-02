'use client'

import React, { useEffect, useState } from 'react'
import { 
  Search, 
  RefreshCcw, 
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  BookOpen,
  Calendar,
  X,
  MonitorPlay,
  Presentation,
  Laptop,
  CheckCircle2,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { fetchAllCourses, updateCourse, deleteCourse, createCourse } from '@/lib/api'
import { Course, DeliveryMethod, DeliveryType } from '@/types'
import { ADD_ONS } from '@/data/packages'
import { cn } from '@/lib/utils'

const DEFAULT_DELIVERY_METHODS: Record<DeliveryType, DeliveryMethod> = {
  'online-instructor': { type: 'online-instructor', label: 'Online Instructor-Led', multiplier: 1 },
  'self-paced': { type: 'self-paced', label: 'Online Self-Paced (Recorded/PDFs)', multiplier: 0.8 },
  'onsite': { type: 'onsite', label: 'Onsite (At Academy)', multiplier: 1.5 }
}

const PATHS = [
  { id: 'academic', title: 'Academic Excellence' },
  { id: 'leadership', title: 'Leadership & Strategy' },
  { id: 'administrative', title: 'Administrative Growth' }
]

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Modal State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isNewCourse, setIsNewCourse] = useState(false)

  // Edit Form State
  const [formData, setFormData] = useState<Partial<Course>>({})
  const [newStartDate, setNewStartDate] = useState('')
  const [newEndDate, setNewEndDate] = useState('')
  const [newOutcome, setNewOutcome] = useState('')
  const [newAudience, setNewAudience] = useState('')

  const loadCourses = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAllCourses()
      setCourses(data)
    } catch (err) {
      setError('Failed to load courses. Ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  const filteredCourses = courses.filter(c => 
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddClick = () => {
    setIsNewCourse(true)
    setSelectedCourse(null)
    setFormData({
      id: `course-${Date.now()}`,
      slug: `new-course-${Date.now()}`,
      title: '',
      code: '',
      shortDescription: '',
      fullDescription: '',
      isActive: true,
      pathId: 'leadership',
      pricing: { basePrice: 0, minParticipants: 1, maxParticipants: 50, volumeDiscounts: [] },
      deliveryMethods: [],
      upcomingDates: [],
      outcomes: [],
      targetAudience: [],
      addOnIds: []
    })
    setNewStartDate('')
    setNewEndDate('')
    setNewOutcome('')
    setNewAudience('')
    setIsEditModalOpen(true)
  }

  const handleEditClick = (course: Course) => {
    setIsNewCourse(false)
    setSelectedCourse(course)
    setFormData({
      ...course,
      deliveryMethods: course.deliveryMethods || [],
      upcomingDates: course.upcomingDates || [],
      outcomes: course.outcomes || [],
      targetAudience: course.targetAudience || [],
      addOnIds: course.addOnIds || []
    })
    setNewStartDate('')
    setNewEndDate('')
    setNewOutcome('')
    setNewAudience('')
    setIsEditModalOpen(true)
  }

  const handleSave = async () => {
    if (!formData.title?.trim() || !formData.code?.trim()) {
      alert('Course Title and Code are required.')
      return
    }
    if (!formData.shortDescription?.trim()) {
      alert('Short Description is required.')
      return
    }
    if (!formData.fullDescription?.trim()) {
      alert('Full Description is required.')
      return
    }

    setIsSaving(true)
    try {
      if (isNewCourse) {
        await createCourse(formData as Course)
      } else if (selectedCourse) {
        await updateCourse(selectedCourse.id, formData)
      }
      setIsEditModalOpen(false)
      loadCourses()
    } catch (err: any) {
      alert('Failed to save course. Please ensure all required fields are filled out properly.')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedCourse) return
    const confirmed = confirm('Are you sure you want to delete this course? This action cannot be undone.')
    if (!confirmed) return

    setIsSaving(true)
    try {
      await deleteCourse(selectedCourse.id)
      setIsEditModalOpen(false)
      loadCourses()
    } catch (err) {
      alert('Failed to delete course')
    } finally {
      setIsSaving(false)
    }
  }

  const toggleDeliveryMethod = (type: DeliveryType) => {
    const methods = formData.deliveryMethods || []
    const exists = methods.some(m => m.type === type)
    if (exists) {
      setFormData({ ...formData, deliveryMethods: methods.filter(m => m.type !== type) })
    } else {
      setFormData({ ...formData, deliveryMethods: [...methods, DEFAULT_DELIVERY_METHODS[type]] })
    }
  }

  const toggleAddOn = (id: string) => {
    const ids = formData.addOnIds || []
    if (ids.includes(id)) {
      setFormData({ ...formData, addOnIds: ids.filter(i => i !== id) })
    } else {
      setFormData({ ...formData, addOnIds: [...ids, id] })
    }
  }

  const addItemToList = (field: 'outcomes' | 'targetAudience', value: string, setter: (v: string) => void) => {
    if (!value) return
    const list = (formData[field] as string[]) || []
    if (!list.includes(value)) {
      setFormData({ ...formData, [field]: [...list, value] })
    }
    setter('')
  }

  const removeItemFromList = (field: 'outcomes' | 'targetAudience', value: string) => {
    const list = (formData[field] as string[]) || []
    setFormData({ ...formData, [field]: list.filter(item => item !== value) })
  }

  const hasScheduledMethod = formData.deliveryMethods?.some(m => m.type === 'online-instructor' || m.type === 'onsite')

  const addDate = () => {
    if (!newStartDate || !newEndDate) {
      alert('Please select both a start date and an end date.')
      return
    }
    if (new Date(newStartDate) >= new Date(newEndDate)) {
      alert('End date must be after the start date.')
      return
    }

    const dateRangeString = `${newStartDate}|${newEndDate}`
    const dates = formData.upcomingDates || []
    if (!dates.includes(dateRangeString)) {
      setFormData({ ...formData, upcomingDates: [...dates, dateRangeString] })
    }
    setNewStartDate('')
    setNewEndDate('')
  }

  const removeDate = (dateToRemove: string) => {
    const dates = formData.upcomingDates || []
    setFormData({ ...formData, upcomingDates: dates.filter(d => d !== dateToRemove) })
  }

  const formatDateRangeDisplay = (dateString: string) => {
    if (dateString.includes('|')) {
      const [start, end] = dateString.split('|')
      return `${new Date(start).toLocaleDateString()} to ${new Date(end).toLocaleDateString()}`
    }
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Courses</h1>
          <p className="text-muted-foreground mt-1">View, edit, and manage all your training programs.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={loadCourses} 
            disabled={loading}
            className="cursor-pointer border-2"
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleAddClick} className="bg-[#223292] hover:bg-[#1a2875] text-white cursor-pointer border-2 border-[#1a2875]">
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      <Card className="border-2 shadow-md overflow-hidden">
        <CardHeader className="bg-white border-b-2 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#223292] transition-colors" />
              <input
                type="text"
                placeholder="Search by course title or code..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223292]/20 focus:bg-white focus:border-[#223292] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {filteredCourses.length} Courses
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 text-[#223292] animate-spin" />
              <p className="text-muted-foreground font-medium">Fetching courses...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 px-6 text-center">
              <div className="bg-red-50 p-4 rounded-full text-red-500">
                <AlertCircle className="h-10 w-10" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg text-foreground">{error}</p>
                <p className="text-muted-foreground max-sm:">Please check if the backend server is running.</p>
              </div>
              <Button onClick={loadCourses} variant="outline" className="mt-2 border-2">Try Again</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b-2">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-r-2">Course Name</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-r-2">Code</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-r-2">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-r-2">Schedules</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Base Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => handleEditClick(course)}>
                      <td className="px-6 py-4 border-r-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-[#223292]">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-bold text-foreground block group-hover:text-[#223292] transition-colors">
                              {course.title}
                            </span>
                            <span className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                              {course.shortDescription}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-r-2">
                        <span className="font-mono text-sm font-semibold bg-slate-100 px-2 py-1 rounded border-2 border-slate-200">
                          {course.code}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-r-2">
                        <span className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border-2",
                          course.isActive 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        )}>
                          {course.isActive ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-r-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-600">
                            {course.upcomingDates?.length || 0} Sets
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">
                        €{course.pricing?.basePrice?.toLocaleString() || '0'}
                      </td>
                    </tr>
                  ))}

                  {filteredCourses.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                        No courses found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit/Add Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-4xl border-2 p-0 overflow-hidden">
          <div className="bg-[#223292] p-6 text-white">
            <DialogTitle className="text-2xl font-bold text-white">
              {isNewCourse ? 'Create New Course' : 'Edit Course Details'}
            </DialogTitle>
            <DialogDescription className="text-blue-100 mt-1">
              Configure course content, delivery methods, schedules, and pricing.
            </DialogDescription>
          </div>
          
          <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto bg-white">
            
            {/* Basic Info & Pricing */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-800 border-b-2 pb-2">1. General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Course Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-slate-50 border-2 rounded-lg focus:outline-none focus:border-[#223292]"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Course Code</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-slate-50 border-2 rounded-lg focus:outline-none focus:border-[#223292]"
                    value={formData.code || ''}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Training Path</label>
                  <select 
                    className="w-full px-3 py-2 bg-slate-50 border-2 rounded-lg focus:outline-none focus:border-[#223292]"
                    value={formData.pathId || ''}
                    onChange={(e) => setFormData({...formData, pathId: e.target.value})}
                  >
                    {PATHS.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Base Price (€)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-slate-50 border-2 rounded-lg focus:outline-none focus:border-[#223292]"
                    value={formData.pricing?.basePrice || 0}
                    onChange={(e) => setFormData({...formData, pricing: { ...formData.pricing!, basePrice: Number(e.target.value) }})}
                  />
                </div>
                <div className="space-y-2 flex flex-col justify-end">
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 border-2 border-dashed rounded-lg">
                    <input
                      type="checkbox"
                      id="isActive"
                      className="h-5 w-5 rounded border-2 text-[#223292] focus:ring-[#223292]"
                      checked={formData.isActive || false}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    />
                    <label htmlFor="isActive" className="text-sm font-bold text-slate-800 cursor-pointer">
                      Published (Live)
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border-2 border-slate-100">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Min Participants
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-white border-2 rounded-lg focus:outline-none focus:border-[#223292]"
                    value={formData.pricing?.minParticipants || 1}
                    onChange={(e) => setFormData({...formData, pricing: { ...formData.pricing!, minParticipants: Number(e.target.value) }})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Max Participants
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-white border-2 rounded-lg focus:outline-none focus:border-[#223292]"
                    value={formData.pricing?.maxParticipants || 50}
                    onChange={(e) => setFormData({...formData, pricing: { ...formData.pricing!, maxParticipants: Number(e.target.value) }})}
                  />
                </div>
              </div>
            </div>

            {/* Delivery Methods & Scheduling */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-800 border-b-2 pb-2">2. Delivery Methods & Schedule</h3>
              <p className="text-sm text-muted-foreground">Select available delivery methods and schedule live sessions.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'online-instructor', label: 'Online Instructor-Led', icon: MonitorPlay },
                  { id: 'self-paced', label: 'Online Self-Paced', icon: Laptop },
                  { id: 'onsite', label: 'Onsite (At Academy)', icon: Presentation }
                ].map((method) => {
                  const isSelected = formData.deliveryMethods?.some(m => m.type === method.id)
                  return (
                    <div 
                      key={method.id}
                      onClick={() => toggleDeliveryMethod(method.id as DeliveryType)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        isSelected ? "border-[#223292] bg-blue-50" : "border-slate-200 bg-slate-50 hover:border-blue-200"
                      )}
                    >
                      <div className={cn("p-2 rounded-lg", isSelected ? "bg-[#223292] text-white" : "bg-slate-200 text-slate-500")}>
                        <method.icon className="h-5 w-5" />
                      </div>
                      <span className={cn("font-bold text-sm", isSelected ? "text-[#223292]" : "text-slate-600")}>
                        {method.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {hasScheduledMethod && (
                <div className="mt-6 bg-slate-50 p-5 rounded-xl border-2 border-slate-200 space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#223292]" /> Schedule Live Sessions
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">Add start and end date ranges for live/onsite courses.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-end gap-2">
                    <div className="w-full sm:flex-1">
                      <label className="text-xs font-bold text-slate-500 mb-1 block">Start Date & Time</label>
                      <input 
                        type="datetime-local" 
                        className="w-full px-3 py-2 bg-white border-2 rounded-lg focus:outline-none focus:border-[#223292] text-sm font-medium"
                        value={newStartDate}
                        onChange={(e) => setNewStartDate(e.target.value)}
                      />
                    </div>
                    <div className="w-full sm:flex-1">
                      <label className="text-xs font-bold text-slate-500 mb-1 block">End Date & Time</label>
                      <input 
                        type="datetime-local" 
                        className="w-full px-3 py-2 bg-white border-2 rounded-lg focus:outline-none focus:border-[#223292] text-sm font-medium"
                        value={newEndDate}
                        onChange={(e) => setNewEndDate(e.target.value)}
                      />
                    </div>
                    <Button type="button" onClick={addDate} className="w-full sm:w-auto h-[42px] bg-[#223292] hover:bg-[#1a2875] font-bold shrink-0 text-white">Add Range</Button>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    {formData.upcomingDates?.map((dateStr, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white border-2 border-slate-200 px-3 py-2 rounded-lg text-sm font-bold text-slate-700 w-full">
                        <span className="flex items-center gap-2">
                           <CheckCircle2 className="h-4 w-4 text-green-500" />
                           {formatDateRangeDisplay(dateStr)}
                        </span>
                        <button onClick={() => removeDate(dateStr)} className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded-md transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {(!formData.upcomingDates || formData.upcomingDates.length === 0) && (
                      <span className="text-sm text-slate-500 italic">No schedules added yet.</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Add-ons */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-800 border-b-2 pb-2">3. Available Add-ons</h3>
              <p className="text-sm text-muted-foreground">Toggle add-ons that will be available for this specific course.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ONS.map((addon) => {
                  const isSelected = formData.addOnIds?.includes(addon.id)
                  return (
                    <div 
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all",
                        isSelected ? "border-[#223292] bg-blue-50" : "border-slate-200 bg-slate-50 hover:border-blue-100"
                      )}
                    >
                      <div className={cn("p-1 rounded mt-0.5", isSelected ? "bg-[#223292] text-white" : "bg-slate-200 text-slate-500")}>
                        <Plus className="h-3 w-3" />
                      </div>
                      <div>
                        <div className={cn("font-bold text-xs", isSelected ? "text-[#223292]" : "text-slate-600")}>{addon.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{addon.description}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Outcomes & Audience */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-slate-800 border-b-2 pb-2">4. Learning Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Outcomes */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 block">Course Outcomes</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Master strategic planning..."
                      className="flex-1 px-3 py-2 bg-slate-50 border-2 rounded-lg focus:outline-none focus:border-[#223292] text-sm"
                      value={newOutcome}
                      onChange={(e) => setNewOutcome(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addItemToList('outcomes', newOutcome, setNewOutcome)}
                    />
                    <Button type="button" size="sm" onClick={() => addItemToList('outcomes', newOutcome, setNewOutcome)} className="bg-[#223292] text-white font-bold">Add</Button>
                  </div>
                  <div className="space-y-2">
                    {formData.outcomes?.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between bg-slate-50 p-2 rounded-lg border-2 border-slate-100 text-sm">
                        <span className="flex-1 pr-2">{item}</span>
                        <button onClick={() => removeItemFromList('outcomes', item)} className="text-red-400 hover:text-red-600 transition-colors"><X className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Audience */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 block">Target Audience</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Higher Ed Leaders..."
                      className="flex-1 px-3 py-2 bg-slate-50 border-2 rounded-lg focus:outline-none focus:border-[#223292] text-sm"
                      value={newAudience}
                      onChange={(e) => setNewAudience(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addItemToList('targetAudience', newAudience, setNewAudience)}
                    />
                    <Button type="button" size="sm" onClick={() => addItemToList('targetAudience', newAudience, setNewAudience)} className="bg-[#223292] text-white font-bold">Add</Button>
                  </div>
                  <div className="space-y-2">
                    {formData.targetAudience?.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between bg-slate-50 p-2 rounded-lg border-2 border-slate-100 text-sm">
                        <span className="flex-1 pr-2">{item}</span>
                        <button onClick={() => removeItemFromList('targetAudience', item)} className="text-red-400 hover:text-red-600 transition-colors"><X className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Descriptions */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-800 border-b-2 pb-2">5. Full Descriptions</h3>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block ml-1 text-[#223292]">Short Marketing Pitch</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none focus:border-[#223292] resize-none text-sm font-medium"
                  placeholder="One sentence that summarizes the value of this course..."
                  value={formData.shortDescription || ''}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block ml-1 text-[#223292]">Comprehensive Course Overview</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none focus:border-[#223292] resize-y text-sm leading-relaxed"
                  placeholder="Detailed breakdown of what the course covers, its methodology, and why it is important..."
                  value={formData.fullDescription || ''}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                />
              </div>
            </div>

          </div>

          <div className="bg-slate-50 border-t-2 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {!isNewCourse ? (
              <Button 
                variant="destructive" 
                className="w-full sm:w-auto border-2 border-red-700 bg-red-600 hover:bg-red-700 text-white font-bold h-12"
                onClick={handleDelete}
                disabled={isSaving}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Course
              </Button>
            ) : <div />}
            
            <div className="flex w-full sm:w-auto gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
                className="w-full sm:w-auto border-2 font-bold h-12"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="w-full sm:w-auto bg-[#223292] hover:bg-[#1a2875] border-2 border-[#1a2875] text-white font-bold h-12"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                {isNewCourse ? 'Create Program' : 'Save All Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
