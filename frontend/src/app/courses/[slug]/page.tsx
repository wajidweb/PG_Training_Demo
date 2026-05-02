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
import { Target, Lightbulb } from 'lucide-react'

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
      
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Content Column */}
            <div className="flex-1 w-full space-y-12">
              <CourseDescription course={course} />

              {/* Dynamic Outcomes Section */}
              {course.outcomes && course.outcomes.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="bg-[#EBEFFF] p-2 rounded-xl text-[#223292]">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    Learning Outcomes
                  </h3>
                  <ul className="space-y-4">
                    {course.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{outcome}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dynamic Target Audience Section */}
              {course.targetAudience && course.targetAudience.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="bg-[#EBEFFF] p-2 rounded-xl text-[#223292]">
                      <Target className="w-6 h-6" />
                    </div>
                    Who is this for?
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {course.targetAudience.map((audience, idx) => (
                      <span key={idx} className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm">
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <WhyChooseUs course={course} />
              {/* <LimitedOffers course={course} /> */}
              <ComboAndBundleOffers course={course} allCourses={allCourses} />
            </div>

            {/* Right Sticky Sidebar */}
            <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0">
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
