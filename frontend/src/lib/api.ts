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
