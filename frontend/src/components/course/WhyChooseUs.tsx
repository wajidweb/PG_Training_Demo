import { Course } from '@/types'
import { Target, TrendingUp, Award, CheckCircle2 } from 'lucide-react'

export default function WhyChooseUs({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#223292' }}>Why Paragon Global Training?</h2>
        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          Our programmes are designed for tangible impact within higher education institutions.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-10">
        {[
          { v: '98%', l: 'Satisfaction Rate' },
          { v: '25+', l: 'Years Experience' },
          { v: '500+', l: 'Programmes' },
          { v: '50+', l: 'Countries Served' },
        ].map(s => (
          <div key={s.l} className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100">
            <div className="text-2xl sm:text-3xl font-black mb-1" style={{ color: '#C85A43' }}>{s.v}</div>
            <div className="text-gray-600 text-xs sm:text-sm font-semibold">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#EBEFFF] to-[#E6F4F3] rounded-2xl p-6 sm:p-8">
        <h3 className="font-bold text-gray-900 mb-4 text-center">What Sets Us Apart</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 shadow-sm text-[#223292]">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-2">Scenario-Based Learning</h4>
            <p className="text-xs text-gray-600">Practical applications directly relevant to your daily role.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 shadow-sm text-[#45A29E]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-2">Measurable Outcomes</h4>
            <p className="text-xs text-gray-600">Strategies that improve efficiency and institutional performance.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 shadow-sm text-[#C85A43]">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-2">Expert Faculty</h4>
            <p className="text-xs text-gray-600">Learn from seasoned higher education leaders.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

