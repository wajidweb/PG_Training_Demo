import { Award, GraduationCap, Users } from 'lucide-react'

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-60" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-60" />
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
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">25+</div>
                  <div className="text-sm text-gray-500 font-medium">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-[#EBEFFF] px-4 py-2 rounded-full mb-6 border border-[#223292]/10">
              <span className="text-[#223292] text-xs font-bold uppercase tracking-wider">
                About PG Training
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
              A Dedicated Division of <span style={{ color: '#223292' }}>Paragon Global Internships</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
              <p>
                PG Training is the professional development division of <strong className="text-gray-900">Paragon Global Internships (PGI)</strong>. For over 25 years, we have delivered high-quality learning experiences that help professionals, teams, and institutions achieve meaningful growth.
              </p>
              <p>
                Our multidisciplinary team combines expertise from academia, leadership, administration, organisational development, and international education. With more than <strong>500 bespoke programmes</strong> and over <strong>6,000 professionals trained</strong>, we continue to support institutions and individuals in building capability, confidence, and sustainable success.
              </p>
              <p>
                Our commitment extends beyond training delivery. We work alongside our partners to unlock potential, nurture resilience, and create lasting positive impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#223292]" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">6,000+</div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Professionals Trained</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#223292]" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">500+</div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Bespoke Programmes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
