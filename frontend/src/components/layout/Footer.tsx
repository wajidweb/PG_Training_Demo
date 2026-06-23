import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { TrainingPath } from '@/types'
import { FooterSubscription } from './FooterSubscription'

export default function Footer({}: { paths: TrainingPath[] }) {
  const programmes = [
    { name: 'Academic Excellence', href: '/programmes#path-academic' },
    { name: 'Administrative Excellence', href: '/programmes#path-administrative' },
    { name: 'Leadership & Strategic Management', href: '/programmes#path-leadership' }
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Programmes', href: '/programmes' },
    { name: 'About Us', href: '/#who-we-are' },
    { name: 'Why Choose Us', href: '/#why-choose-us' },
    { name: 'Contact Us', href: '/contact-us' }
  ]

  return (
    <footer className="text-white" style={{ backgroundColor: '#223292' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
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

          {/* Our Programmes */}
          <div>
            <h4 className="font-semibold text-white mb-4">Our Programmes</h4>
            <ul className="space-y-2">
              {programmes.map(prog => (
                <li key={prog.name}>
                  <Link href={prog.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {prog.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact" className="scroll-mt-24">
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
              <li className="flex items-start gap-2 text-[#223292] text-sm">
                {/* Keep Malta EU text clean and readable */}
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-200" />
                <span className="text-blue-200">Malta, European Union</span>
              </li>
            </ul>
          </div>

          {/* E-Book Subscription */}
          <div className="sm:col-span-2 lg:col-span-1 border-t border-white/10 lg:border-none pt-10 lg:pt-0">
            <FooterSubscription />
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-blue-300 text-sm">© 2026 Paragon Global Training Academy. All rights reserved.</p>
            <p className="text-blue-400 text-xs font-semibold">
              Developed by{' '}
              <a 
                href="https://wajidalikhan-portfolio.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-300 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
              >
                Wajid Ali Khan
              </a>
            </p>
          </div>
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
