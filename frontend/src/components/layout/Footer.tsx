import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'
import { TrainingPath } from '@/types'

export default function Footer({ paths }: { paths: TrainingPath[] }) {
  return (
    <footer className="text-white" style={{ backgroundColor: '#223292' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6 bg-white inline-block rounded-xl p-3 shadow-sm">
              <img 
                src="/logo.jpg" 
                alt="Paragon Global Training Academy" 
                className="h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
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
                  <a href={`/#path-${path.id}`} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {path.title}
                  </a>
                </li>
              ))}
              <li><Link href="/courses/cultural-integration-diverse-environment" className="text-blue-200 hover:text-white text-sm transition-colors">Featured: Cultural Integration</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'About Us', href: '/#about' },
                { name: 'All Courses', href: '/#courses' },
                { name: 'Current Offers', href: '/#offers' },
                { name: 'ETS Programme', href: '/courses/general-english-programme' },
                { name: 'Testimonials', href: '/#testimonials' },
                { name: 'Contact', href: 'mailto:info@pgtraining.edu' }
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="text-blue-200 hover:text-white text-sm transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-blue-200 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@pgtraining.edu</span>
              </li>
              <li className="flex items-start gap-2 text-blue-200 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+356 2000 0000</span>
              </li>
              <li className="flex items-start gap-2 text-blue-200 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Malta, European Union</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-blue-300 text-sm">© 2025 Paragon Global Training Academy. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Privacy Policy', href: '/privacy-policy' },
              { name: 'GDPR', href: '/gdpr' }
            ].map(item => (
              <Link key={item.name} href={item.href} className="text-blue-300 hover:text-white text-sm transition-colors">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
