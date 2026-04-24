import { notFound } from 'next/navigation'
import { fetchCourse, fetchCourses } from '@/lib/api'
import CourseHero from '@/components/course/CourseHero'
import CourseDescription from '@/components/course/CourseDescription'
import WhyChooseUs from '@/components/course/WhyChooseUs'
import CourseBookingWidget from '@/components/course/CourseBookingWidget'
import LimitedOffers from '@/components/course/LimitedOffers'
import ComboAndBundleOffers from '@/components/course/ComboAndBundleOffers'
import Testimonials from '@/components/home/Testimonials'
import { fetchTestimonials } from '@/lib/api'
import { COURSES } from '@/data/courses'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const courses = await fetchCourses()
    return courses.map(c => ({ slug: c.slug }))
  } catch {
    return COURSES.map(c => ({ slug: c.slug }))
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await fetchCourse(slug)
  if (!course) return {}
  return {
    title: `${course.title} | PG Training`,
    description: course.shortDescription,
  }
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [course, allCourses, testimonials] = await Promise.all([
    fetchCourse(slug),
    fetchCourses(),
    fetchTestimonials(),
  ])

  if (!course) notFound()

  return (
    <>
      <CourseHero course={course} />
      <CourseDescription course={course} />
      <WhyChooseUs course={course} />
      <CourseBookingWidget course={course} />
      <LimitedOffers course={course} />
      <ComboAndBundleOffers course={course} allCourses={allCourses} />
      <Testimonials testimonials={testimonials} />
    </>
  )
}
