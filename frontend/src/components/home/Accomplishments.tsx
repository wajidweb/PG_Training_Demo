'use client'

import { useEffect, useRef, useState } from 'react'
import { Award, Users, BookOpen, Globe, Shield, Star } from 'lucide-react'

const stats = [
  { icon: Award, value: 25, suffix: '+', label: 'Years of Excellence', description: 'Serving higher education since 1999' },
  { icon: Users, value: 3000, suffix: '+', label: 'Staff Trained', description: 'Academic and administrative professionals' },
  { icon: BookOpen, value: 500, suffix: '+', label: 'Programmes', description: 'Tailored to institutional needs' },
  { icon: Globe, value: 50, suffix: '+', label: 'Countries', description: 'Global reach across Europe and beyond' },
  { icon: Shield, value: 4000, suffix: '+', label: 'Partner Institutions', description: 'Universities and colleges worldwide' },
  { icon: Star, value: 98, suffix: '%', label: 'Satisfaction Rate', description: 'Participants recommend PG Training' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function Accomplishments() {
  return (
    <section id="about" className="py-16 sm:py-20" style={{ backgroundColor: '#223292' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-400/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Our Accomplishments
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by Higher Education Leaders Worldwide
          </h2>
          <p className="text-blue-200 text-base sm:text-lg max-w-2xl mx-auto">
            For over two decades, PG Training has been the partner of choice for institutions committed to staff excellence and institutional success.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 text-center hover:bg-white/15 transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-400/20 mb-4">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white font-semibold mb-1 text-sm sm:text-base">{stat.label}</div>
                <div className="text-blue-300 text-xs sm:text-sm">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
