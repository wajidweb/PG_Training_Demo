import Link from 'next/link'
import { ArrowRight, BookOpen, Building2, TrendingUp } from 'lucide-react'
import { TrainingPath } from '@/types'

const pathConfig = {
  academic: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-800',
    btn: 'bg-green-700 hover:bg-green-800',
    accent: '#1D5C3A',
    icon: BookOpen,
  },
  administrative: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-800',
    btn: 'bg-teal-700 hover:bg-teal-800',
    accent: '#1A5050',
    icon: Building2,
  },
  leadership: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-800',
    btn: 'bg-orange-700 hover:bg-orange-800',
    accent: '#7A3A1A',
    icon: TrendingUp,
  },
}

export default function TrainingPaths({ paths }: { paths: TrainingPath[] }) {
  return (
    <section id="courses" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Choose Your Path
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1D5C3A' }}>
            Three Paths to Professional Excellence
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you are an educator, administrator, or aspiring leader, PG Training has a structured path designed for your career stage and goals.
          </p>
        </div>

        {/* Paths grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {paths.map(path => {
            const config = pathConfig[path.id as keyof typeof pathConfig]
            const featured = path.courses.slice(0, 3)
            const Icon = config?.icon ?? BookOpen

            return (
              <div
                key={path.id}
                id={`path-${path.id}`}
                className={`rounded-2xl border-2 ${config?.bg} ${config?.border} p-6 sm:p-8 flex flex-col hover:shadow-xl transition-shadow`}
              >
                {/* Icon + title */}
                <div className="mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: config?.accent + '18' }}
                  >
                    <Icon className="w-7 h-7" style={{ color: config?.accent }} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-sm font-semibold" style={{ color: config?.accent }}>{path.subtitle}</p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">{path.description}</p>

                {/* Sample courses */}
                <div className="space-y-2 mb-6 flex-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Featured Courses</p>
                  {featured.map(course => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg ${config?.badge} text-xs font-medium hover:opacity-80 transition-opacity`}
                    >
                      <span className="line-clamp-1">{course.title}</span>
                      <ArrowRight className="w-3 h-3 flex-shrink-0 ml-2" />
                    </Link>
                  ))}
                  {path.courses.length > 3 && (
                    <p className="text-xs text-gray-400 px-3">+{path.courses.length - 3} more courses</p>
                  )}
                </div>

                {/* Price from */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${Math.min(...path.courses.map(c => c.pricing.basePrice)).toLocaleString()}
                    <span className="text-sm font-normal text-gray-500"> /person</span>
                  </p>
                </div>

                <Link
                  href={`/courses/${path.courses[0].slug}`}
                  className={`${config?.btn} text-white text-center py-3 rounded-xl font-semibold text-sm transition-colors`}
                >
                  Explore {path.title}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
