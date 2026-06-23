'use client'

import { Award, GraduationCap, Users } from 'lucide-react'

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-slate-50 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Visual Image with Floating Badge */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-60" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-60" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" 
                alt="PG Training Professional Development"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Achievement */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#223292]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-black text-gray-900 leading-tight">Decades</div>
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Of Educational Legacy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EBEFFF] px-4 py-2 rounded-full mb-6 border border-[#223292]/10">
              <span className="text-[#223292] text-xs font-bold uppercase tracking-wider">
                About PG Training
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              Nurturing Professional and <span style={{ color: '#223292' }}>Educational Mastery</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
              <p>
                At Paragon Global Training Academy, we are dedicated to facilitating comprehensive professional development and institutional advancement. We deliver exceptional learning experiences designed to help educators, administrative teams, and executives achieve sustainable growth and unlock their potential.
              </p>
              <p>
                Our multidisciplinary faculty combines expertise from academic scholarship, organizational management, and executive leadership. Through a comprehensive portfolio of bespoke workshops and training modules, we continue to support individuals in building capability, strategic confidence, and recognized excellence.
              </p>
              <p>
                We work in close collaboration with our educational and public partners, tailoring our curricula to meet localized requirements and fostering a global network of empowered alumni.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#223292]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-gray-900 uppercase text-xs tracking-wider">Global Alumni Network</div>
                  <div className="text-xs text-gray-500 font-semibold mt-0.5">Thousands of Graduates</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#223292]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-gray-900 uppercase text-xs tracking-wider">Custom Curricula</div>
                  <div className="text-xs text-gray-500 font-semibold mt-0.5">Hundreds of Programmes</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
