import { Target, Compass } from 'lucide-react'

export default function VisionMission() {
  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#223292] rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the leading global provider of professional development and institutional capacity-building programmes that inspire growth, innovation, and lifelong learning.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#F2D03B] rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <Compass className="w-7 h-7 text-[#0F1F12]" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We partner with institutions and professionals to design and deliver transformative learning experiences that create measurable impact, strengthen professional competence, and support sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
