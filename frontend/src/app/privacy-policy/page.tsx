import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Paragon Global Training Academy',
  description: 'Privacy Policy and data collection practices for Paragon Global Training Academy.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#1D5C3A' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            Legal Documentation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-green-100 text-lg sm:text-xl max-w-2xl mx-auto">
            How we collect, use, disclose, and safeguard your information when you visit our website or enrol in our professional development programmes.
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 sm:px-12 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-gray-500 font-medium text-sm">Last Updated: <span className="text-gray-900">April 2026</span></p>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-green-700 transition-colors" style={{ color: '#1D5C3A' }}>
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="p-6 sm:p-12 lg:p-16">
            <div className="space-y-12">
              
              <section>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  At <strong className="text-gray-900">Paragon Global Training Academy</strong> ("we", "our", "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">1. Information We Collect</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                <ul className="list-none space-y-4">
                  <li className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4890A' }} />
                    <span><strong className="text-gray-900">Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us when registering for a course or contacting us.</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4890A' }} />
                    <span><strong className="text-gray-900">Professional Data:</strong> Information related to your employment, such as your job title, department, and the higher education institution you represent.</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4890A' }} />
                    <span><strong className="text-gray-900">Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, or request information about our services.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">2. Use of Your Information</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
                <ul className="list-none space-y-4">
                  {[
                    'Create and manage your account and course enrolments.',
                    'Process your transactions and send you related information, including purchase confirmations and invoices.',
                    'Deliver targeted course materials, certificates, and access to online portals.',
                    'Email you regarding your account, course updates, or requested information.',
                    'Fulfill and manage purchases, orders, payments, and other transactions.'
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                      <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#1D5C3A' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">3. Disclosure of Your Information</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                <ul className="list-none space-y-4">
                  <li className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-gray-400" />
                    <span><strong className="text-gray-900">By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-gray-400" />
                    <span><strong className="text-gray-900">Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">4. Security of Your Information</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">5. Contact Us</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
                  <p className="text-xl font-bold text-gray-900 mb-2">Paragon Global Training Academy</p>
                  <div className="text-gray-600 space-y-1">
                    <p>Malta, European Union</p>
                    <p>Email: <a href="mailto:privacy@pgtraining.edu" className="font-semibold hover:underline" style={{ color: '#1D5C3A' }}>privacy@pgtraining.edu</a></p>
                    <p>Phone: +356 2000 0000</p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
