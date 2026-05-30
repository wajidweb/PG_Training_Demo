'use client'

import { Course } from '@/types'
import { CheckCircle2, Users, Target, Globe, MapPin } from 'lucide-react'

export default function CourseDescription({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      
      {/* Quick Facts Section */}
      {(course.language || course.location) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {course.language && (
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="bg-[#EBEFFF] p-2 rounded-lg text-[#223292]">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Language</div>
                <div className="font-semibold text-gray-900 text-sm">{course.language}</div>
              </div>
            </div>
          )}
          {course.location && (
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="bg-[#EBEFFF] p-2 rounded-lg text-[#223292]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Location</div>
                <div className="font-semibold text-gray-900 text-sm">{course.location}</div>
              </div>
            </div>
          )}
        </div>
      )}

      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">About This Course</h2>
      <div className="prose prose-blue max-w-none text-gray-600 mb-8 leading-relaxed text-sm">
        <p>{course.fullDescription}</p>
      </div>

      <div className="border-t border-gray-100 pt-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-[#223292]" />
          Key Learning Outcomes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {course.outcomes.map((o, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <CheckCircle2 className="w-4 h-4 text-[#45A29E] mt-0.5 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-700 leading-relaxed">{o}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#223292]" />
          Who Should Attend
        </h3>
        <div className="flex flex-wrap gap-2">
          {course.targetAudience.map((a, i) => (
            <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EBEFFF] text-[#223292]">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
