import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'
import { TrainingPath } from '@/types'

export default function Footer({ paths }: { paths: TrainingPath[] }) {
  return (
    <footer className="text-white" style={{ backgroundColor: '#1D5C3A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6" style={{ color: '#1D5C3A' }} />
              </div>
              <div>
                <div className="font-bold text-lg">PG Training</div>
                <div className="text-green-200 text-xs">Higher Education Excellence</div>
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed mb-6">
              25 years of excellence in professional development for higher education institutions worldwide.
            </p>
            <div className="flex gap-3">
              {[['in', 'LinkedIn'], ['tw', 'Twitter'], ['fb', 'Facebook']].map(([label, name]) => (
                <a key={name} href="#" aria-label={name} className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors text-white text-xs font-bold">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Training Paths */}
          <div>
            <h4 className="font-semibold text-white mb-4">Training Paths</h4>
            <ul className="space-y-2">
              {paths.map(path => (
                <li key={path.id}>
                  <a href={`/#path-${path.id}`} className="text-green-200 hover:text-white text-sm transition-colors">
                    {path.title}
                  </a>
                </li>
              ))}
              <li><Link href="/courses/cultural-integration-diverse-environment" className="text-green-200 hover:text-white text-sm transition-colors">Featured: Cultural Integration</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'All Courses', 'Current Offers', 'ETS Programme', 'Testimonials', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-green-200 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-green-200 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@pgtraining.edu</span>
              </li>
              <li className="flex items-start gap-2 text-green-200 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+356 2000 0000</span>
              </li>
              <li className="flex items-start gap-2 text-green-200 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Malta, European Union</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-300 text-sm">© 2025 PG Training. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="text-green-300 hover:text-white text-sm transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
