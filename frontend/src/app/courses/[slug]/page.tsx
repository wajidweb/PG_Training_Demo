import { notFound } from 'next/navigation'
import { fetchCourse, fetchCourses } from '@/lib/api'
import CourseHero from '@/components/course/CourseHero'
import CourseDescription from '@/components/course/CourseDescription'
import WhyChooseUs from '@/components/course/WhyChooseUs'
import CourseBookingWidget from '@/components/course/CourseBookingWidget'
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
      
      <div className="bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Content Column */}
            <div className="flex-1 w-full space-y-8">
              <CourseDescription course={course} />
              <WhyChooseUs course={course} />
              <ComboAndBundleOffers course={course} allCourses={allCourses} />
            </div>

            {/* Right Sticky Sidebar */}
            <div className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0">
              <CourseBookingWidget course={course} />
            </div>

          </div>
        </div>
      </div>

      <div className="bg-white">
        <Testimonials testimonials={testimonials} />
      </div>
    </>
  )
}
