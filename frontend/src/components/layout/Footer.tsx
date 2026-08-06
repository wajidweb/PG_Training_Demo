import Link from 'next/link'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { TrainingPath } from '@/types'
import { FooterSubscription } from './FooterSubscription'

export default function Footer({}: { paths?: TrainingPath[] }) {
  const aboutLinks = [
    { name: 'Our Story', href: '/about' },
    { name: 'Our Philosophy', href: '/about' },
    { name: 'Schools', href: '/about#schools' },
    { name: 'Learning Pathways', href: '/learning-pathways' }
  ]

  const solutionsLinks = [
    { name: 'Executive Success', href: '/executive-success' },
    { name: 'Academic & Workforce Excellence', href: '/academic-excellence' },
    { name: 'Erasmus+', href: '/academic-excellence?tab=erasmus' },
    { name: 'AI Programmes', href: '/academic-excellence?tab=ai' },
    { name: 'Tailored Solutions', href: '/learning-pathways' }
  ]

  const resourcesLinks = [
    { name: 'Knowledge Hub', href: '/knowledge-hub' },
    { name: 'PGT Journal', href: '/journal' },
    { name: 'Downloads', href: '/knowledge-hub' },
    { name: 'Webinars', href: '/journal' }
  ]

  const contactLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Book a Consultation', href: '/contact?reason=consultation' },
    { name: 'FAQs', href: '/contact?tab=faqs' }
  ]

  return (
    <footer className="bg-[#0B1B3D] text-white border-t border-slate-900 font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1 (Brand Column - span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white inline-block rounded-xl p-3 shadow-sm border border-slate-800">
              <img 
                src="/logo.jpg" 
                alt="Paragon Global Training" 
                className="h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed italic font-light">
              Developing Exceptional People. Building Stronger Organisations. Creating Lasting Impact.
            </p>
            <div className="flex gap-3">
              {[['in', 'LinkedIn'], ['yt', 'YouTube']].map(([label, name]) => (
                <a 
                  key={name} 
                  href="#" 
                  aria-label={name} 
                  className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-slate-800 rounded-lg flex items-center justify-center transition-colors text-white text-[10px] font-bold uppercase tracking-wider"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 (About Links Column - span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest mb-4">About</h4>
            <ul className="space-y-2.5">
              {aboutLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent text-[11px] font-bold uppercase tracking-wider transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (Solutions Links Column - span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest mb-4">Solutions</h4>
            <ul className="space-y-2.5">
              {solutionsLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent text-[11px] font-bold uppercase tracking-wider transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (Resources Links Column - span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resourcesLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent text-[11px] font-bold uppercase tracking-wider transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 (Contact & Scoping - span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="font-extrabold text-white text-xs uppercase tracking-widest mb-4">Contact</h4>
              <ul className="space-y-2.5">
                {contactLinks.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-400 hover:text-accent text-[11px] font-bold uppercase tracking-wider transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Embedded Lead subscription / Ebook box */}
            <div className="border-t border-slate-800 pt-6">
              <FooterSubscription />
            </div>
          </div>

        </div>

        {/* Subfooter Panel with custom credit links */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
          <div className="text-center sm:text-left space-y-2">
            <p className="text-slate-500 text-[10px] uppercase tracking-wider">
              © 2026 Paragon Global Training. All rights reserved.
            </p>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider">
              Developed by : <a href="https://wajidalikhan-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent font-bold transition-colors">Wajid Ali Khan</a>
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-wider">
            {[
              { name: 'Privacy Policy', href: '/privacy-policy' },
              { name: 'GDPR Compliance', href: '/gdpr' }
            ].map(item => (
              <Link key={item.name} href={item.href} className="text-slate-400 hover:text-accent transition-colors">
                {item.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
