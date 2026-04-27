import { Course } from '@/types'
import { CheckCircle, Users, Calendar, Monitor, Timer, Building2 } from 'lucide-react'

const deliveryIcons: Record<string, React.ElementType> = {
  'online-instructor': Monitor,
  'self-paced': Timer,
  'onsite': Building2,
}

export default function CourseDescription({ course }: { course: Course }) {
  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Main description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#1D5C3A' }}>About This Course</h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-8">{course.fullDescription}</p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Learning Outcomes</h3>
            <ul className="space-y-3 mb-8">
              {course.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{o}</span>
                </li>
              ))}
            </ul>

            {/* Delivery */}
            <div className="bg-gray-50 rounded-2xl p-5 sm:p-6">
              <h3 className="font-bold text-gray-900 mb-4">Delivery Methods Available</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {course.deliveryMethods.map(d => {
                  const Icon = deliveryIcons[d.type] ?? Monitor
                  return (
                    <div key={d.type} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="w-6 h-6" style={{ color: '#1D5C3A' }} />
                      </div>
                      <div className="font-semibold text-sm text-gray-900">{d.label}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {d.multiplier === 1 ? 'Standard price' : d.multiplier < 1 ? `${Math.round((1 - d.multiplier) * 100)}% less` : `+${Math.round((d.multiplier - 1) * 100)}% for onsite`}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 sm:space-y-6">
            {/* Price snapshot */}
            <div className="rounded-2xl p-5 sm:p-6 border-2" style={{ borderColor: '#D4890A', backgroundColor: '#FFFBF0' }}>
              <div className="text-sm text-gray-500 mb-1">Starting from</div>
              <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#1D5C3A' }}>
                €{course.pricing.basePrice.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 mb-4">per person (online)</div>
              <a
                href="#packages"
                className="block text-center py-3 rounded-xl font-bold w-full transition-colors"
                style={{ backgroundColor: '#D4890A', color: '#0F1F12' }}
              >
                See All Packages
              </a>
              <p className="text-xs text-gray-400 text-center mt-2">Volume discounts available for 5+ participants</p>
            </div>

            {/* Upcoming dates */}
            <div className="bg-gray-50 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4" style={{ color: '#1D5C3A' }} />
                <h4 className="font-bold text-gray-900">Upcoming Dates</h4>
              </div>
              <ul className="space-y-2">
                {course.upcomingDates.map((d, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Who attends */}
            <div className="bg-green-50 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-green-700" />
                <h4 className="font-bold text-gray-900">Who Should Attend</h4>
              </div>
              <ul className="space-y-1">
                {course.targetAudience.slice(0, 6).map((a, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {a}
                  </li>
                ))}
                {course.targetAudience.length > 6 && (
                  <li className="text-sm font-medium" style={{ color: '#1D5C3A' }}>+{course.targetAudience.length - 6} more roles</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
