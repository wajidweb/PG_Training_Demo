import { Course } from '@/types'
import { Target, TrendingUp, Award } from 'lucide-react'

const icons = [Target, TrendingUp, Award]
const colors = ['bg-green-600', 'bg-teal-600', 'bg-amber-600']

export default function WhyChooseUs({ course }: { course: Course }) {
  const topOutcomes = course.outcomes.slice(0, 3)

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            Why Choose This Course
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1D5C3A' }}>Three Transformative Outcomes</h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Every PG Training course is designed around concrete, measurable outcomes that translate directly into your professional practice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {topOutcomes.map((outcome, i) => {
            const Icon = icons[i]
            return (
              <div key={i} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${colors[i]} rounded-2xl mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">Outcome {i + 1}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{outcome}</p>
              </div>
            )
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-14 sm:mt-16 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { v: '98%', l: 'Satisfaction Rate' },
              { v: '25+', l: 'Years Experience' },
              { v: '500+', l: 'Programmes' },
              { v: '50+', l: 'Countries Served' },
            ].map(s => (
              <div key={s.l}>
                <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: '#1D5C3A' }}>{s.v}</div>
                <div className="text-gray-600 text-xs sm:text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
