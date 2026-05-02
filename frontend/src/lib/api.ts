import { Course, TrainingPath, Testimonial } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

export async function fetchPaths(): Promise<TrainingPath[]> {
  try {
    const res = await fetch(`${API_URL}/api/paths`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return (data.data ?? []) as TrainingPath[]
  } catch {
    const { TRAINING_PATHS } = await import('@/data/courses')
    return TRAINING_PATHS
  }
}

export async function fetchCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_URL}/api/courses`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return (data.data ?? []) as Course[]
  } catch {
    const { COURSES } = await import('@/data/courses')
    return COURSES
  }
}

export async function fetchAllCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_URL}/api/courses?all=true`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return (data.data ?? []) as Course[]
  } catch {
    const { COURSES } = await import('@/data/courses')
    return COURSES
  }
}

export async function createCourse(courseData: Partial<Course>): Promise<Course> {
  const res = await fetch(`${API_URL}/api/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courseData),
  })
  if (!res.ok) throw new Error('Failed to create course')
  const data = await res.json()
  return data.data
}

export async function updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
  const res = await fetch(`${API_URL}/api/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error('Failed to update course')
  const data = await res.json()
  return data.data
}

export async function deleteCourse(id: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/api/courses/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete course')
  return true
}

export async function fetchCourse(slug: string): Promise<Course | null> {
  try {
    const res = await fetch(`${API_URL}/api/courses/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return (data.data ?? null) as Course | null
  } catch {
    const { getCourseBySlug } = await import('@/data/courses')
    return getCourseBySlug(slug) ?? null
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_URL}/api/testimonials`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return (data.data ?? []) as Testimonial[]
  } catch {
    const { TESTIMONIALS } = await import('@/data/testimonials')
    return TESTIMONIALS
  }
}

export async function createOrder(body: Record<string, unknown>): Promise<{ orderNumber: string }> {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Order creation failed')
  const data = await res.json()
  return data.data
}

export async function subscribeToCampaign(email: string, campaignName: string = 'ebook_download'): Promise<any> {
  const res = await fetch(`${API_URL}/api/campaign/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, campaignName }),
  })
  if (!res.ok) throw new Error('Subscription failed')
  return res.json()
}

export async function fetchCampaignEmails(): Promise<any[]> {
  const res = await fetch(`${API_URL}/api/campaign/emails`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch emails')
  const data = await res.json()
  return data.data || []
}

export async function fetchOrders(): Promise<any[]> {
  const res = await fetch(`${API_URL}/api/orders`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch orders')
  const data = await res.json()
  return data.data || []
}
