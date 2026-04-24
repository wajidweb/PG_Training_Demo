import { CheckCircle } from 'lucide-react'

const values = [
  'Extensive experience and proven results across 50+ countries',
  'Expert curriculum design tailored to higher education needs',
  'Scenario-based learning with measurable real-world outcomes',
  'Flexible delivery: online instructor-led, self-paced, and onsite',
  'Dedicated support from enrolment through certification',
]

export default function AboutUs() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              About PG Training
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#1D5C3A' }}>
              A Proven Leader in Higher Education Development
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              With a 25-year legacy of excellence, PG Training has empowered over 3,000 academic and administrative staff through our innovative, useful, and practical training programmes. Our expertise in curriculum development has led to the creation of 500+ tailored programmes that address the unique needs of higher education institutions.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We are committed to delivering high-impact training solutions that drive institutional success. Our proven track record and deep understanding of the higher education landscape make us the ideal partner for your professional development needs.
            </p>
            <ul className="space-y-3">
              {values.map((v, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Our Mission', text: 'Equip higher education professionals with the skills, confidence, and frameworks to excel in an ever-evolving academic landscape.', color: 'bg-[#1D5C3A]' },
              { label: 'Our Approach', text: 'Scenario-based learning, real-world simulations, and expert mentorship that translate directly into day-to-day institutional impact.', color: 'bg-[#1A5050]' },
              { label: 'Our Reach', text: 'From Malta to the world, serving over 4,000 partner institutions across Europe, the Middle East, and beyond.', color: 'bg-[#7A3A1A]' },
              { label: 'Our Commitment', text: 'Every programme is designed with measurable outcomes. We do not just train — we transform careers and institutions.', color: 'bg-[#D4890A]' },
            ].map((card, i) => (
              <div key={i} className={`${card.color} rounded-2xl p-5 sm:p-6 text-white`}>
                <div className="font-bold mb-2 text-xs uppercase tracking-wide opacity-80">{card.label}</div>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
