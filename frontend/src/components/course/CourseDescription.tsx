'use client'

import { Course } from '@/types'
import { CheckCircle2, Users, Monitor, MapPin, Target } from 'lucide-react'

export default function CourseDescription({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">About This Course</h2>
      <div className="prose prose-blue max-w-none text-gray-600 mb-10 leading-relaxed text-base sm:text-lg">
        <p>{course.fullDescription}</p>
      </div>

      <div className="border-t border-gray-100 pt-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#223292]" />
          Key Learning Outcomes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {course.outcomes.map((o, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-[#45A29E] mt-0.5 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">{o}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#223292]" />
          Who Should Attend
        </h3>
        <div className="flex flex-wrap gap-2">
          {course.targetAudience.map((a, i) => (
            <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#EBEFFF] text-[#223292]">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
