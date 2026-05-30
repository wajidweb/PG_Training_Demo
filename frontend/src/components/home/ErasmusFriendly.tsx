import { Globe, CheckCircle2, ShieldCheck } from 'lucide-react'

export default function ErasmusFriendly() {
  return (
    <section className="py-24 bg-[#223292] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -ml-48 -mb-48" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/20">
              <Globe className="w-4 h-4 text-blue-200" />
              <span className="text-white text-xs font-bold uppercase tracking-widest">Erasmus+ Friendly Training</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-6 leading-tight tracking-tight">
              Supporting International Learning and Collaboration
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-10">
              PG Training proudly aligns many of its programmes with Erasmus+ objectives and learning outcomes. This enables institutions and professionals to access European funding while participating in high-quality professional development.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Lifelong learning',
                'Professional competence',
                'Inclusion and diversity',
                'Digital transformation',
                'Sustainability',
                'Innovation',
                'International collaboration',
                'Cross-border mobility'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  <span className="text-blue-50 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 rounded-3xl flex items-center justify-center shadow-lg rotate-12">
                <ShieldCheck className="w-12 h-12 text-[#0F1F12]" />
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-6">Maximise Funding & Outcomes</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                By aligning our programmes with Erasmus+ goals, we help participants maximise both their learning outcomes and their eligibility for European mobility grants.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold">1</div>
                  <p className="text-sm text-gray-700 font-medium pt-2">Select an Erasmus+ compatible course</p>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold">2</div>
                  <p className="text-sm text-gray-700 font-medium pt-2">Verify eligibility with your home institution</p>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold">3</div>
                  <p className="text-sm text-gray-700 font-medium pt-2">Apply for funding and join our international community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
