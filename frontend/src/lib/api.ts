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

export async function createEnquiry(enquiryData: { name: string, email: string, org: string, category: string, message: string }): Promise<any> {
  const res = await fetch(`${API_URL}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiryData),
  })
  if (!res.ok) throw new Error('Enquiry submission failed')
  return res.json()
}

export async function fetchEnquiries(): Promise<any[]> {
  const res = await fetch(`${API_URL}/api/enquiries`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch enquiries')
  const data = await res.json()
  return data.data || []
}

export async function fetchArticles(includeUnpublished = false): Promise<any[]> {
  const res = await fetch(`${API_URL}/api/articles?includeUnpublished=${includeUnpublished}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch articles')
  const data = await res.json()
  return data.data || []
}

export async function fetchArticleBySlug(slug: string): Promise<any> {
  const res = await fetch(`${API_URL}/api/articles/${slug}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch article')
  const data = await res.json()
  return data.data || null
}

export async function fetchResources(params?: { category?: string, type?: string, tier?: string, includeUnpublished?: boolean }): Promise<any[]> {
  const queryParams = new URLSearchParams(params as any).toString()
  const url = `${API_URL}/api/resources${queryParams ? `?${queryParams}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch resources')
  const data = await res.json()
  return data.data || []
}

export async function updateResource(id: string, resourceData: any): Promise<any> {
  const res = await fetch(`${API_URL}/api/resources/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resourceData)
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Failed to update resource')
  }
  return res.json()
}

export async function deleteResource(id: string): Promise<any> {
  const res = await fetch(`${API_URL}/api/resources/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Failed to delete resource')
  }
  return res.json()
}

export async function fetchResourceBySlug(slug: string): Promise<any> {
  const res = await fetch(`${API_URL}/api/resources/${slug}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch resource')
  const data = await res.json()
  return data.data || null
}

export async function registerUser(userData: { firstName: string, lastName: string, email: string, password: string }): Promise<any> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Registration failed')
  }
  return res.json()
}

export async function loginUser(credentials: { email: string, password: string }): Promise<any> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Login failed')
  }
  return res.json()
}

export async function fetchCurrentUserMe(token: string): Promise<any> {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` },
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Session verification failed')
  const data = await res.json()
  return data.data || null
}

export async function purchaseResource(purchaseData: { resourceId: string, userId?: string, email?: string }): Promise<{ success: boolean, url: string }> {
  const res = await fetch(`${API_URL}/api/resources/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchaseData)
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Checkout creation failed')
  }
  return res.json()
}

export async function fetchUsers(): Promise<any[]> {
  const res = await fetch(`${API_URL}/api/auth/users`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch users')
  const data = await res.json()
  return data.data || []
}

export async function logFreeDownload(resourceId: string, token: string): Promise<any> {
  const res = await fetch(`${API_URL}/api/auth/log-download`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ resourceId })
  })
  if (!res.ok) throw new Error('Failed to record free download')
  return res.json()
}

export async function uploadFile(fileName: string, fileData: string): Promise<{ success: boolean, fileUrl: string }> {
  const res = await fetch(`${API_URL}/api/resources/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileData })
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'File upload failed')
  }
  return res.json()
}

export async function unlockPurchaseDirectly(resourceId: string, token: string): Promise<any> {
  const res = await fetch(`${API_URL}/api/resources/unlock-purchase`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ resourceId })
  })
  if (!res.ok) throw new Error('Failed to unlock purchase on client sync')
  return res.json()
}

export async function createArticle(articleData: any): Promise<any> {
  const res = await fetch(`${API_URL}/api/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData)
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Failed to create article')
  }
  return res.json()
}

export async function updateArticle(id: string, articleData: any): Promise<any> {
  const res = await fetch(`${API_URL}/api/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData)
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Failed to update article')
  }
  return res.json()
}

export async function deleteArticle(id: string): Promise<any> {
  const res = await fetch(`${API_URL}/api/articles/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Failed to delete article')
  }
  return res.json()
}
