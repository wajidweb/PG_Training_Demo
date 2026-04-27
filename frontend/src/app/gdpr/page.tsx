import React from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export const metadata = {
  title: 'GDPR Compliance | Paragon Global Training Academy',
  description: 'General Data Protection Regulation (GDPR) compliance information and user rights.',
}

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#1D5C3A' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Data Protection
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">GDPR Compliance</h1>
          <p className="text-green-100 text-lg sm:text-xl max-w-2xl mx-auto">
            Our commitment to ensuring the security and protection of your personal information in accordance with European data protection laws.
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
                  <strong className="text-gray-900">Paragon Global Training Academy</strong> is committed to ensuring the security and protection of the personal information that we process, and to providing a compliant and consistent approach to data protection in accordance with the General Data Protection Regulation (GDPR).
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">1. Data Controller</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Paragon Global Training Academy (located in Malta, EU) is the Data Controller for the personal data collected through our platform. We determine the purposes and means of the processing of your personal data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">2. Lawful Basis for Processing</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">We process your personal data under the following lawful bases:</p>
                <ul className="list-none space-y-4">
                  <li className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4890A' }} />
                    <span><strong className="text-gray-900">Consent:</strong> You have given clear consent for us to process your personal data for a specific purpose (e.g., subscribing to our newsletter).</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4890A' }} />
                    <span><strong className="text-gray-900">Contract:</strong> The processing is necessary for a contract we have with you (e.g., fulfilling a course enrolment).</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4890A' }} />
                    <span><strong className="text-gray-900">Legal Obligation:</strong> The processing is necessary for us to comply with the law.</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed">
                    <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4890A' }} />
                    <span><strong className="text-gray-900">Legitimate Interests:</strong> The processing is necessary for our legitimate interests or the legitimate interests of a third party, unless there is a good reason to protect your personal data which overrides those legitimate interests.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">3. Your Data Protection Rights</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">Under the GDPR, you have the following rights regarding your personal data:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'The right to be informed', desc: 'About the collection and use of your personal data.' },
                    { title: 'The right of access', desc: 'To request copies of your personal data.' },
                    { title: 'The right to rectification', desc: 'To correct inaccurate or incomplete information.' },
                    { title: 'The right to erasure', desc: 'To request that we erase your personal data.' },
                    { title: 'The right to restrict processing', desc: 'To request that we restrict processing.' },
                    { title: 'The right to data portability', desc: 'To transfer the data to another organization.' },
                    { title: 'The right to object', desc: 'To object to our processing of your personal data.' }
                  ].map((right, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="font-bold text-gray-900 text-sm mb-1">{right.title}</p>
                      <p className="text-gray-500 text-sm">{right.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">4. Data Retention</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. When assessing what retention period is appropriate for your personal data, we take into consideration the requirements of our business and the services provided, any statutory or legal obligations, and the purposes for which we originally collected it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">5. Contacting the Data Protection Officer</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  If you would like to exercise any of your rights, or if you have any questions about our GDPR compliance, please contact our Data Protection Officer:
                </p>
                <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
                  <p className="text-xl font-bold text-gray-900 mb-2">Data Protection Officer</p>
                  <div className="text-gray-600 space-y-1 mb-6">
                    <p>Paragon Global Training Academy</p>
                    <p>Email: <a href="mailto:dpo@pgtraining.edu" className="font-semibold hover:underline" style={{ color: '#1D5C3A' }}>dpo@pgtraining.edu</a></p>
                    <p>Phone: +356 2000 0001</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-500 italic">
                      Should you wish to report a complaint or if you feel that we have not addressed your concern in a satisfactory manner, you may contact the Information and Data Protection Commissioner in Malta.
                    </p>
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
