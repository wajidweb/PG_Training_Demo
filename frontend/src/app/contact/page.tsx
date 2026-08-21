'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Check, 
  Calendar, 
  ChevronDown, 
  ChevronUp,
  Globe,
  Award,
  Users,
  Target
} from 'lucide-react'
import { createEnquiry } from '@/lib/api'

const ENQUIRY_CATEGORIES = [
  { id: 'executive', title: 'Executive Success', desc: 'Executive coaching, strategic mentoring, CEO masterclasses, and organisational transformation.' },
  { id: 'academic', title: 'Academic Excellence', desc: 'Professional development, future ready skill acquisitions, and workforce capabilities.' },
  { id: 'erasmus', title: 'Erasmus Plus Programs', desc: 'Accredited educator development, funded staff mobility, and international collaborations.' },
  { id: 'ai', title: 'Artificial Intelligence', desc: 'Practical AI training, digital transformation, and modern administrative workflow systems.' },
  { id: 'bespoke', title: 'Tailored Solutions', desc: 'Customized learning paths and bespoke training programs created around your specific goals.' },
  { id: 'general', title: 'General Enquiries', desc: 'Our experienced executive team is here to answer any questions or inquiries you may have.' }
]

const FAQS = [
  {
    question: 'How are programmes delivered?',
    answer: 'We offer in person, online, and blended learning solutions designed to align specifically with your organisation schedule and resources. Whether you require intensive on site bootcamps, structured virtual sessions, or a combined delivery method, our team ensures a seamless educational experience across Europe.'
  },
  {
    question: 'Can programmes be customised?',
    answer: 'Yes, absolutely. Every organisation faces unique challenges, and we specialize in designing customized, bespoke learning paths. We work closely with your directors to analyze goals and restructure our certified curriculums, ensuring the final training program directly maps to your institutional priorities.'
  },
  {
    question: 'Are your programmes eligible for Erasmus Plus funding?',
    answer: 'Yes. Many of our professional development programmes are designed to align directly with Erasmus Plus priorities. Our team regularly assists partners in navigating the structural application process, and we can discuss specific funding opportunities and eligible allocations during your initial scoping consultation.'
  },
  {
    question: 'Do you work with organisations outside Europe?',
    answer: 'Yes, PGT regularly partners with international institutions, employers, and educational bodies globally. We adapt our delivery formats, schedules, and case study contents to meet local operational requirements, ensuring our courses remain highly relevant and actionable regardless of your geographical region.'
  },
  {
    question: 'How quickly can a programme be organised?',
    answer: 'Our timelines are highly flexible and vary depending on the depth of program customization and curriculum scoping required. While standard courses can be arranged relatively quickly, bespoke pathways generally take more preparation. Our executive team will coordinate with you to establish the most suitable schedule.'
  }
]

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState('executive')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  // Scoping inputs state
  const [formState, setFormState] = useState({ name: '', email: '', org: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    try {
      const categoryTitle = ENQUIRY_CATEGORIES.find(c => c.id === selectedCategory)?.title || selectedCategory
      await createEnquiry({
        name: formState.name,
        email: formState.email,
        org: formState.org,
        category: categoryTitle,
        message: formState.message
      })
      setFormState({ name: '', email: '', org: '', message: '' })
      alert('Your enquiry has been received and saved successfully. A PGT advisor will contact you within 24 business hours.')
    } catch (error) {
      console.error('Failed to submit enquiry:', error)
      alert('Enquiry submission failed. Please try again shortly.')
    } finally {
      setFormSubmitted(false)
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleScrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="pt-20 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* Intro/Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 sm:pt-6 pb-16 sm:pb-20 relative font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block">
            CONTACT US
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] leading-tight max-w-5xl mx-auto">
            Let's Start the Conversation
          </h1>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-4 rounded" />
        </div>

        {/* Symmetric Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
          
          {/* Left Column (7 Cols): Editorial Text Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <div className="text-xs sm:text-sm text-[#0B1B3D] leading-relaxed space-y-4 font-normal">
              <p>
                Every successful partnership begins with a conversation. Whether you are exploring executive development, planning an Erasmus mobility, strengthening your workforce, or looking for a tailored learning solution, our team is here to help.
              </p>
              <p>
                Together, we will identify the best pathway for your organisation and design a custom solution that delivers measurable results. Let us start building your next success story.
              </p>
              <p>
                Our scoping consultants work directly with your stakeholders to analyze key objectives, map competency gaps, and build custom certified curriculums. By matching your timeline and schedule requirements, we ensure your team gains the actionable capability needed to drive long term growth, innovation, and measurable performance success.
              </p>
            </div>
            
            {/* Clean layout of button actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E2E8F0]/80">
              <button
                onClick={() => handleScrollToSection('consultation')}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all w-full sm:w-auto text-center"
              >
                Book a Consultation
              </button>
              <button
                onClick={() => handleScrollToSection('enquiry')}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-bold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:bg-[#FAF9F6] transition-all w-full sm:w-auto text-center"
              >
                Contact Our Team
              </button>
            </div>
          </div>

          {/* Right Column (5 Cols): Whiteboard Strategic Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-[#E2E8F0]/80 shadow-md">
            <Image
              src="/development.png"
              alt="Coaching and whiteboard strategic drawing session"
              fill
              className="object-cover select-none"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
          </div>

        </div>
      </section>

      {/* Main Grid: Form Scoping & Sidebar */}
      <section id="enquiry" className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 scroll-mt-24">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] p-6 sm:p-10 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B89047]" />
          
          <div>
            <div className="space-y-1 mb-6 text-left border-b border-[#E2E8F0]/60 pb-4">
              <h2 className="text-lg font-bold text-[#0B1B3D] uppercase tracking-tight">HOW CAN WE HELP?</h2>
              <p className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">Choose the Reason for Your Enquiry</p>
              <p className="text-xs text-[#0B1B3D] pt-1.5 leading-relaxed font-normal">
                Rather than a generic contact form, select the purpose of your enquiry to help us route your request to the appropriate specialist team.
              </p>
            </div>
            
            {/* Enquiry category selector cards */}
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ENQUIRY_CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between h-28 ${
                      selectedCategory === cat.id 
                        ? 'border-[#B89047] bg-[#B89047]/5 ring-1 ring-[#B89047]' 
                        : 'border-[#E2E8F0] bg-white hover:border-[#64748B]'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-sm font-bold text-[#0B1B3D] block uppercase tracking-wider">{cat.title}</span>
                      <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest border border-[#B89047]/30 px-1.5 py-0.5 rounded-md">Enquire</span>
                    </div>
                    <span className="text-xs text-[#0B1B3D] leading-relaxed mt-2 font-normal">{cat.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form details input */}
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-4 border-t border-[#E2E8F0]/60">
            <label className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block mb-1">
              Your Enquiry Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Professional Email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                required
                placeholder="Organisation Name"
                value={formState.org}
                onChange={(e) => setFormState(prev => ({ ...prev, org: e.target.value }))}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
              />
            </div>
            <div>
              <textarea
                required
                rows={3}
                placeholder="Tell us about your requirements, timeline, and goals..."
                value={formState.message}
                onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
              />
            </div>

            <button
              type="submit"
              disabled={formSubmitted}
              className="px-12 py-3 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all w-full sm:w-auto text-center"
            >
              {formSubmitted ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Sidebar Info Column */}
        <div className="lg:col-span-4 flex flex-col gap-6 font-sans">
          
          {/* Booking Consultation details */}
          <div id="consultation" className="bg-[#0E1629] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md scroll-mt-24">
            <span className="text-[9px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">PARTNERSHIP REVIEW</span>
            <h3 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wide">BOOK A CONSULTATION</h3>
            <p className="text-[#B89047] text-xs sm:text-sm leading-relaxed mt-2 mb-4 font-bold">
              Let's Explore Your Goals Together
            </p>
            <div className="text-[11px] sm:text-xs text-white space-y-3 leading-relaxed mb-6 font-normal border-y border-slate-800 py-4">
              <p>Every organisation is different, which is why every engagement begins with an active, scoping conversation.</p>
              <p className="font-bold text-[#B89047]">During your consultation, we will discuss:</p>
              <div className="space-y-2 pl-1.5">
                {[
                  'Your objectives',
                  'Your audience',
                  'Your challenges',
                  'Your expected outcomes',
                  'The most appropriate learning pathway',
                  'Delivery options',
                  'Next steps'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white font-medium">
                    <Check className="w-3.5 h-3.5 text-[#B89047] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => alert('Calendly scheduling modal triggered.')}
              className="w-full py-3 bg-[#B89047] hover:bg-[#B89047]/90 text-white text-center font-bold uppercase tracking-wider text-[10px] rounded-lg shadow-sm transition-colors"
            >
              Schedule Your Consultation
            </button>
           
          </div>

          {/* Contact Info block */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wider mb-1">CONTACT INFORMATION</h3>
            <p className="text-[10px] text-[#B89047] uppercase font-bold tracking-widest mb-4">We're Here to Help</p>
            <ul className="space-y-3.5 text-[11px] font-normal text-[#0B1B3D]">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#B89047] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#0B1B3D] block font-bold mb-0.5 uppercase tracking-wide">Paragon Global Training</span>
                  <span className="font-light">Malta</span>
                </div>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-[#B89047] flex-shrink-0" />
                <span className="font-light">+356 XXX XXXX</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-[#B89047] flex-shrink-0" />
                <span className="font-light">info@pgtraining.eu</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Globe className="w-4 h-4 text-[#B89047] flex-shrink-0" />
                <a 
                  href="https://pgtraining.eu/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-light hover:text-[#B89047] transition-colors"
                >
                  https://pgtraining.eu/
                </a>
              </li>
              <li className="flex gap-2.5 items-start border-t border-[#E2E8F0]/40 pt-3 mt-3">
                <Clock className="w-4 h-4 text-[#B89047] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#0B1B3D] block font-bold mb-0.5">Business Hours</span>
                  <span className="font-light">Monday to Friday</span>
                  <span className="block mt-0.5 font-light">09:00 to 17:00 CET</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY ORGANISATIONS CHOOSE PGT (Centered & Full Content Grid) */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60 relative font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Centered Header Block */}
          <div className="text-center max-w-3xl lg:max-w-none mx-auto mb-12 lg:mb-16 space-y-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PARTNERSHIP ASSURANCE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
              Why Organisations Choose PGT
            </h2>
            <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
            <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal mt-2">
              Before submitting an enquiry, explore the clear operational advantages and outcomes you gain when partnering with PGT:
            </p>
          </div>

          {/* Full Content Grid (4 Columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              {
                title: 'Development Experience',
                desc: 'Over twenty five years of supporting executive development across Europe.'
              },
              {
                title: 'Professionals Developed',
                desc: 'More than six thousand leaders trained through expert practical learning.'
              },
              {
                title: 'Programmes Delivered',
                desc: 'Over five hundred certified courses designed to build structural growth.'
              },
              {
                title: 'Global Partnerships',
                desc: 'Collaborating closely with leading universities and employers globally.'
              },
              {
                title: 'Tailored Solutions',
                desc: 'Customized educational pathways aligned with your institutional goals.'
              },
              {
                title: 'Outcome Focused',
                desc: 'Delivering empirical improvements in both capability and performance.'
              },
              {
                title: 'Erasmus Plus Expertise',
                desc: 'Maximizing funded mobility programs to integrate global academic standards.'
              },
              {
                title: 'Future Skills Experts',
                desc: 'Accredited specialists in artificial intelligence and modern technology.'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E2E8F0]/40 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#B89047]/20 transition-all duration-300 text-left"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mb-4">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0B1B3D] uppercase tracking-wide leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQS Accordion (Centered Header & Premium Expanded Answers) */}
      <section className="max-w-4xl mx-auto px-6 mb-20 font-sans">
        
        {/* Centered Header Block */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PARTNERSHIP CLARITY</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1B3D] uppercase tracking-tight leading-none whitespace-normal lg:whitespace-nowrap">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-12 bg-[#B89047] mx-auto mt-3 rounded" />
          <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto font-normal mt-2">
            Explore detailed operational clarifications regarding PGT course delivery, Erasmus allocations, and bespoke solutions:
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div key={idx} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm transition-all">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4.5 sm:p-5 text-left text-[#0B1B3D] font-bold text-xs sm:text-sm focus:outline-none uppercase tracking-wide hover:bg-[#FAF9F6]/60 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#B89047]" /> : <ChevronDown className="w-4 h-4 text-[#B89047]" />}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 border-t border-[#E2E8F0]/40 text-xs sm:text-sm text-[#0B1B3D] leading-relaxed font-normal">
                    <p className="mt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* READY TO BUILD YOUR NEXT SUCCESS STORY? (Premium Deep Navy Card - Widened with Image) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative z-10 font-sans">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-8 sm:p-12 border border-slate-900 shadow-xl relative overflow-hidden group">
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/10 rounded-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
            
            {/* Left Column (7 Cols): Editorial Text Content & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">
                  READY TO BUILD WHAT'S NEXT
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-none">
                  Ready to Build Your Next Success Story?
                </h2>
                <p className="text-sm sm:text-base font-light italic text-[#B89047]">
                  Let's Create Meaningful Learning Together
                </p>
                <div className="h-0.5 w-12 bg-[#B89047] rounded mt-4" />
              </div>

              {/* Narrative text in white */}
              <div className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal space-y-4">
                <p>
                  Whether you are investing in your executives, developing your workforce, planning an Erasmus project, or embracing Artificial Intelligence securely, we are ready to help you achieve measurable outcomes.
                </p>
                <p className="italic border-t border-slate-800/80 pt-4 font-light">
                  We look forward to learning more about your organisation and supporting your professional growth journey.
                </p>
              </div>
              
              {/* Widened Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => handleScrollToSection('consultation')}
                  className="px-12 sm:px-16 py-3.5 bg-[#B89047] hover:bg-[#B89047]/90 text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl transition-all whitespace-nowrap shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto text-center"
                >
                  Book Your Consultation
                </button>
                <button
                  onClick={() => handleScrollToSection('enquiry')}
                  className="px-12 sm:px-16 py-3.5 bg-slate-900/40 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-extrabold uppercase tracking-wider text-[10px] sm:text-xs rounded-xl transition-all whitespace-nowrap shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto text-center"
                >
                  Send Us a Message
                </button>
              </div>
            </div>

            {/* Right Column (5 Cols): Classroom Environment Visual Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[260px] lg:h-auto lg:min-h-[340px] border border-slate-800 shadow-md">
              <Image
                src="/bgimage.png"
                alt="PGT modern boardroom classroom training environment"
                fill
                className="object-cover select-none"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

          </div>
        </div>
      </section>

      {/* CONNECT WITH PGT (Centered & Symmetrical Social Row) */}
      <section className="max-w-4xl mx-auto px-6 text-center font-sans border-t border-[#E2E8F0]/40 pt-12">
        <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">PGT CHANNELS</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] uppercase tracking-tight mb-2">Connect With PGT</h2>
        <p className="text-xs sm:text-sm text-[#0B1B3D] max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Stay connected through our professional channels for real time updates, new publications, webinars, and practical insights. Follow our corporate networks to join the conversation and access elite resources.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-[10px] font-extrabold uppercase tracking-widest text-[#0B1B3D]">
          {['LinkedIn', 'YouTube', 'Newsletter', 'Knowledge Hub'].map((chan) => (
            <Link 
              key={chan} 
              href={chan === 'Knowledge Hub' ? '/knowledge-hub' : '#'} 
              className="border border-[#E2E8F0] hover:border-[#B89047] px-6 py-2.5 rounded-xl bg-white shadow-sm hover:text-[#B89047] transition-all"
            >
              {chan}
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
