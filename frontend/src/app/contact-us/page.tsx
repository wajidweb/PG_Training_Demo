'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Sparkles, CheckCircle2, Send, Loader2 } from 'lucide-react'

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    role: '',
    phone: '',
    interest: 'Academic Excellence',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
      } else {
        setError(data.error || 'An error occurred. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setError('A network error occurred. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact info and context */}
          <div className="lg:col-span-5 space-y-8 mt-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-[#223292]" />
              <span className="text-[#223292] text-xs font-extrabold uppercase tracking-widest">
                Get In Touch
              </span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                How Can We Support Your Institution?
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Whether you want to design a custom professional development curriculum, request a proposal for your administrative team, or explore our flexible delivery options, our dedicated team is here to assist you.
              </p>
            </div>

            {/* Direct Contact Information Cards */}
            <div className="space-y-4 pt-4">
              <a 
                href="mailto:info@pgtraining.edu"
                className="flex items-center gap-4 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#223292] group-hover:scale-105 transition-transform flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</div>
                  <div className="text-base font-extrabold text-gray-900 mt-0.5">info@pgtraining.edu</div>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex-shrink-0">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#223292]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Direct Phone</div>
                  <div className="text-base font-extrabold text-gray-900 mt-0.5">+356 2000 0000</div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex-shrink-0">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#223292]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Academy Office</div>
                  <div className="text-base font-extrabold text-gray-900 mt-0.5">Malta, European Union</div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex-shrink-0">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#223292]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Office Hours</div>
                  <div className="text-base font-extrabold text-gray-900 mt-0.5">Monday to Friday, 9:00 AM to 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 sm:p-10 md:p-12 shadow-xl relative overflow-hidden">
              
              {isSuccess ? (
                /* Success/Thank You state */
                <div className="text-center py-16 px-4 space-y-6 animate-fadeIn">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl border border-emerald-100 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">Message Sent!</h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                      Thank you for contacting us! Your inquiry has been routed directly to <strong className="text-gray-900">info@pgtraining.edu</strong>. One of our senior advisors will review your goals and reach out to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSuccess(false)
                      setFormData({
                        name: '',
                        email: '',
                        institution: '',
                        role: '',
                        phone: '',
                        interest: 'Academic Excellence',
                        message: ''
                      })
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#223292] text-xs font-extrabold uppercase tracking-wider rounded-xl text-white hover:opacity-90 shadow-lg shadow-blue-900/20 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Form Display */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 border-b border-gray-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase">Submit an Inquiry</h2>
                    <p className="text-xs sm:text-sm text-gray-500 font-semibold">Please complete the fields below to connect with our advisory desk.</p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-600 font-semibold">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-gray-500">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Dr. Sarah Mitchell"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#223292]/30 focus:border-[#223292] transition-colors"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-gray-500">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="sarah.mitchell@academy.org"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#223292]/30 focus:border-[#223292] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Institution Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="institution" className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-gray-500">
                        Institution / Organization <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        required
                        value={formData.institution}
                        onChange={handleInputChange}
                        placeholder="Educational Leadership Board"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#223292]/30 focus:border-[#223292] transition-colors"
                      />
                    </div>

                    {/* Professional Role */}
                    <div className="space-y-1.5">
                      <label htmlFor="role" className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-gray-500">
                        Professional Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="Director of Academic Development"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#223292]/30 focus:border-[#223292] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-gray-500">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+356 2000 0000"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#223292]/30 focus:border-[#223292] transition-colors"
                      />
                    </div>

                    {/* Program Interest */}
                    <div className="space-y-1.5">
                      <label htmlFor="interest" className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-gray-500">
                        Program Interest
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#223292]/30 focus:border-[#223292] bg-white transition-colors"
                      >
                        <option value="Academic Excellence">Academic Excellence</option>
                        <option value="Administrative Excellence">Administrative Excellence</option>
                        <option value="Leadership & Strategic Management">Leadership & Strategic Management</option>
                        <option value="Bespoke Custom Training">Bespoke Custom Training</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-gray-500">
                      Detailed Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your training objectives, estimated group sizes, and timeline preferences..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#223292]/30 focus:border-[#223292] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#223292] text-xs font-extrabold uppercase tracking-wider rounded-xl text-white hover:opacity-90 shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Inquiry to Academy</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
