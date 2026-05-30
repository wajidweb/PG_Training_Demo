import { CheckCircle2, HeartHandshake, Settings2 } from 'lucide-react'

export default function BespokeLearning() {
  return (
    <section className="py-24 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F2D03B]/20 px-4 py-2 rounded-full mb-6 border border-[#F2D03B]/20">
              <Settings2 className="w-4 h-4 text-[#7A3A1A]" />
              <span className="text-[#7A3A1A] text-xs font-bold uppercase tracking-wider">
                Bespoke Learning
              </span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
              Designed Around You: <br/>
              <span style={{ color: '#223292' }}>One Focus, Your Growth</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              No two professionals face the same challenges. While many providers rely on generic programmes, PG Training takes a collaborative approach to create learning solutions that deliver maximum relevance.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                'Your unique objectives',
                'Your institutional challenges',
                'Your current capabilities',
                'Your organisational context',
                'Your desired outcomes'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#45A29E]" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <HeartHandshake className="w-6 h-6 text-[#223292]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">A Long-Term Growth Partner</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We do not see ourselves as simply training providers. We are partners in your professional journey, providing practical guidance, expert insight, and proven development strategies.
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-6 border-t border-gray-100">
                {[
                  'Personalised learning experiences',
                  'Experienced facilitators',
                  'Practical implementation guidance',
                  'Long-term professional support',
                  'Industry and academic expertise',
                  'Continuous development opportunities'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#223292] mt-2 flex-shrink-0" />
                    <span className="text-xs text-gray-600 font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" 
                  alt="Tailored Workshop" 
                  className="rounded-3xl shadow-lg w-full aspect-[4/5] object-cover"
                />
                <div className="bg-[#223292] p-6 rounded-3xl text-white">
                  <div className="text-3xl font-black mb-1">500+</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-70">Programmes</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#F2D03B] p-6 rounded-3xl">
                  <div className="text-3xl font-black text-[#0F1F12] mb-1">25+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0F1F12]/70">Years</div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600" 
                  alt="Professional Growth" 
                  className="rounded-3xl shadow-lg w-full aspect-[4/5] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
