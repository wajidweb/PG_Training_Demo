'use client'

import { useState } from 'react'
import Link from 'next/link'
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

const ENQUIRY_CATEGORIES = [
  { id: 'executive', title: 'Executive Success', desc: 'Executive coaching, mentoring, masterclasses and organisational development.' },
  { id: 'academic', title: 'Academic & Workforce Excellence', desc: 'Professional development, future skills and workforce capability programmes.' },
  { id: 'erasmus', title: 'Erasmus+ Programmes', desc: 'Professional development, staff mobility and international learning opportunities.' },
  { id: 'ai', title: 'Artificial Intelligence', desc: 'AI training, digital transformation and practical implementation programmes.' },
  { id: 'bespoke', title: 'Tailored Learning Solutions', desc: 'Custom-designed programmes created around your organisation\'s goals.' },
  { id: 'general', title: 'General Enquiries', desc: 'We\'re here to answer any questions you may have.' }
]

const FAQS = [
  {
    question: 'How are programmes delivered?',
    answer: 'We offer in-person, online and blended learning solutions tailored to your organisation\'s needs.'
  },
  {
    question: 'Can programmes be customised?',
    answer: 'Yes. Every organisation has unique objectives, and we regularly design bespoke learning solutions.'
  },
  {
    question: 'Are your programmes eligible for Erasmus+ funding?',
    answer: 'Many of our professional development programmes are designed to align with Erasmus+ priorities. We can discuss funding opportunities during your consultation.'
  },
  {
    question: 'Do you work with organisations outside Europe?',
    answer: 'Yes. We partner with organisations internationally, adapting delivery formats and content to local needs where appropriate.'
  },
  {
    question: 'How quickly can a programme be organised?',
    answer: 'Timelines vary depending on the programme and level of customisation. Our team will work with you to identify the most suitable schedule.'
  }
]

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState('executive')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  // Scoping inputs state
  const [formState, setFormState] = useState({ name: '', email: '', org: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormState({ name: '', email: '', org: '', message: '' })
      alert('Your enquiry has been received. A PGT advisor will contact you within 24 business hours.')
    }, 1000)
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleScrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="pt-28 pb-20 bg-[#FAF9F6] text-[#0B1B3D] min-h-screen font-sans selection:bg-[#B89047]/30 selection:text-[#0B1B3D]">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-12">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase bg-[#B89047]/10 border border-[#B89047]/20 px-4 py-1.5 rounded-full inline-block mb-3">
          CONTACT US
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1B3D] mb-4 leading-tight uppercase">
          Let's Start the Conversation
        </h1>
        <div className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-2xl mx-auto space-y-4 font-light mb-8">
          <p>
            Every successful partnership begins with a conversation.
          </p>
          <p>
            Whether you're exploring executive development, planning an Erasmus+ mobility, strengthening your workforce or looking for a tailored learning solution, our team is here to help.
          </p>
          <p className="font-semibold text-[#0B1B3D]">
            Together, we'll identify the best pathway for your organisation and design a solution that delivers measurable results.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => handleScrollToSection('consultation')}
            className="w-full sm:w-auto px-6 py-3 bg-[#0B1B3D] text-white font-bold tracking-wider rounded-lg uppercase text-[10px] shadow-sm hover:bg-[#0B1B3D]/95 transition-colors"
          >
            Book a Consultation
          </button>
          <button
            onClick={() => handleScrollToSection('enquiry')}
            className="w-full sm:w-auto px-6 py-3 bg-white border border-[#E2E8F0] hover:border-[#B89047]/40 text-[#0B1B3D] font-bold tracking-wider rounded-lg uppercase text-[10px] shadow-sm hover:bg-[#FAF9F6] transition-colors"
          >
            Contact Our Team
          </button>
        </div>
      </section>

      {/* Main Grid: Form Scoping & Sidebar */}
      <section id="enquiry" className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 scroll-mt-24">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] p-6 sm:p-10 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B89047]" />
          
          <div className="space-y-1 mb-6">
            <h2 className="text-lg font-bold text-[#0B1B3D] uppercase tracking-tight">HOW CAN WE HELP?</h2>
            <p className="text-[10px] font-bold text-[#B89047] uppercase tracking-widest block">Choose the Reason for Your Enquiry</p>
            <p className="text-[11px] text-[#64748B] font-light pt-1 leading-relaxed">
              Rather than a generic contact form, allow visitors to select the purpose of their enquiry.
            </p>
          </div>
          
          {/* Enquiry category selector cards */}
          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ENQUIRY_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    selectedCategory === cat.id 
                      ? 'border-[#B89047] bg-[#B89047]/5 ring-1 ring-[#B89047]' 
                      : 'border-[#E2E8F0] bg-white hover:border-[#64748B]'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="text-xs font-bold text-[#0B1B3D] block uppercase tracking-wider">{cat.title}</span>
                    <span className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest border border-[#B89047]/30 px-1.5 py-0.5 rounded-md">Enquire</span>
                  </div>
                  <span className="text-[10px] text-[#64748B] leading-relaxed mt-2 font-light">{cat.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form details input */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
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
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[#B89047]"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Professional Email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[#B89047]"
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
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[#B89047]"
              />
            </div>
            <div>
              <textarea
                required
                rows={3}
                placeholder="Tell us about your requirements, timeline, and goals..."
                value={formState.message}
                onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-[#FAF9F6] border border-[#E2E8F0] text-[#0B1B3D] rounded-lg px-3 p-2.5 text-xs focus:outline-none focus:border-[#B89047]"
              />
            </div>

            <button
              type="submit"
              disabled={formSubmitted}
              className="w-full sm:w-auto px-6 py-3 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-bold uppercase tracking-wider text-[10px] rounded-lg transition-colors shadow-sm"
            >
              {formSubmitted ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Sidebar Info Column */}
        <div className="lg:col-span-4 flex flex-col gap-6 font-sans">
          
          {/* Booking Consultation details */}
          <div id="consultation" className="bg-[#0E1629] text-white rounded-2xl p-6 border border-slate-800 shadow-md scroll-mt-24">
            <span className="text-[9px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">PARTNERSHIP REVIEW</span>
            <h3 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wide">BOOK A CONSULTATION</h3>
            <p className="text-slate-300 text-[11px] leading-relaxed mt-2 mb-4 font-light">
              Let\'s Explore Your Goals Together
            </p>
            <div className="text-[11px] text-slate-400 space-y-3 leading-relaxed mb-6 font-light border-y border-slate-800 py-4">
              <p>Every organisation is different.</p>
              <p>That\'s why every engagement begins with a conversation.</p>
              <p className="font-semibold text-white">During your consultation, we\'ll discuss:</p>
              <div className="space-y-1.5 pl-1.5">
                {[
                  'Your objectives',
                  'Your audience',
                  'Your challenges',
                  'Your expected outcomes',
                  'The most appropriate learning pathway',
                  'Delivery options',
                  'Next steps'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
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
            <p className="text-[8px] text-slate-500 uppercase font-mono text-center mt-2.5">
              (Integrate directly with your Calendly booking system.)
            </p>
          </div>

          {/* Contact Info block */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-[#0B1B3D] text-xs uppercase tracking-wider mb-1">CONTACT INFORMATION</h3>
            <p className="text-[10px] text-[#B89047] uppercase font-bold tracking-widest mb-4">We\'re Here to Help</p>
            <ul className="space-y-3.5 text-[11px] font-semibold text-[#64748B]">
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
                <span className="font-light">info@pgtraining.net</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Globe className="w-4 h-4 text-[#B89047] flex-shrink-0" />
                <span className="font-light">www.pgtraining.net</span>
              </li>
              <li className="flex gap-2.5 items-start border-t border-[#E2E8F0]/40 pt-3 mt-3">
                <Clock className="w-4 h-4 text-[#B89047] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#0B1B3D] block font-bold mb-0.5">Business Hours</span>
                  <span className="font-light">Monday – Friday</span>
                  <span className="block mt-0.5 font-light">09:00 – 17:00 CET</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY ORGANISATIONS CHOOSE PGT */}
      <section className="bg-white py-16 mb-16 border-y border-[#E2E8F0]/60">
        <div className="max-w-5xl mx-auto px-6 font-sans">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">PARTNERSHIP ASSURANCE</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">WHY ORGANISATIONS CHOOSE PGT</h2>
            <p className="text-xs text-[#64748B] mt-1 font-light">
              Before visitors submit an enquiry, reinforce the reasons to choose PGT.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              '25+ Years of Professional Development Experience',
              '6,000+ Professionals Trained',
              '500+ Learning Programmes Delivered',
              'International Partnerships Across Europe',
              'Tailored Learning Solutions',
              'Practical, Outcome-Focused Approach',
              'Erasmus+ Expertise',
              'AI & Future Skills Specialists'
            ].map((reason, idx) => (
              <div key={idx} className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E2E8F0]/40 flex gap-3 shadow-sm" >
                <div className="w-4 h-4 rounded-full bg-[#B89047]/10 flex items-center justify-center text-[#B89047] flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wide leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS Accordion */}
      <section className="max-w-4xl mx-auto px-6 mb-20 font-sans">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">PARTNERSHIP CLARITY</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-xs text-[#64748B] mt-1 font-light">Questions We Often Receive</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div key={idx} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm transition-all">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left text-[#0B1B3D] font-bold text-xs sm:text-sm focus:outline-none uppercase tracking-wide hover:bg-[#FAF9F6]/60"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#B89047]" /> : <ChevronDown className="w-4 h-4 text-[#B89047]" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 border-t border-[#E2E8F0]/40 text-xs text-[#64748B] leading-relaxed font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* READY TO BUILD YOUR NEXT SUCCESS STORY? */}
      <section className="max-w-4xl mx-auto px-6 text-center font-sans mb-16">
        <div className="bg-[#0B1B3D] text-white rounded-2xl p-8 sm:p-12 border border-[#0B1B3D]/80 relative overflow-hidden">
          <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#B89047]/10 rounded-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89047]/5 rounded-full blur-[90px] pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#B89047] uppercase block mb-2 font-mono">// WHAT'S NEXT</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 uppercase tracking-tight">
            READY TO BUILD YOUR NEXT SUCCESS STORY?
          </h2>
          <h3 className="text-xs sm:text-sm text-[#B89047] font-bold uppercase tracking-wide mb-4">
            Let's Create Meaningful Learning Together
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-6 text-xs font-light">
            Whether you're investing in your executives, developing your workforce, planning an Erasmus+ project or embracing Artificial Intelligence, we're ready to help you achieve measurable outcomes.
          </p>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 text-xs font-light italic border-t border-slate-800/80 pt-4">
            We look forward to learning more about your organisation and supporting your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <button
              onClick={() => handleScrollToSection('consultation')}
              className="px-6 py-3 bg-[#B89047] text-white font-bold text-[10px] uppercase tracking-widest hover:bg-[#B89047]/90 transition-all rounded-lg shadow-sm"
            >
              Book Your Consultation
            </button>
            <button
              onClick={() => handleScrollToSection('enquiry')}
              className="px-6 py-3 bg-white border border-slate-700 text-[#0B1B3D] font-bold text-[10px] uppercase tracking-widest hover:bg-[#FAF9F6] transition-all rounded-lg shadow-sm"
            >
              Send Us a Message
            </button>
          </div>
        </div>
      </section>

      {/* CONNECT WITH PGT */}
      <section className="max-w-4xl mx-auto px-6 text-center font-sans border-t border-[#E2E8F0]/40 pt-12">
        <span className="text-[10px] font-bold tracking-widest text-[#B89047] uppercase block mb-1">PGT CHANNELS</span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] uppercase tracking-tight">CONNECT WITH PGT</h2>
        <p className="text-[#64748B] max-w-md mx-auto leading-relaxed mb-6 text-xs font-light">
          Stay connected through our professional channels for updates, new publications, webinars and practical insights.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-extrabold uppercase tracking-widest text-[#0B1B3D]">
          {['LinkedIn', 'YouTube', 'Newsletter', 'Knowledge Hub'].map((chan) => (
            <Link 
              key={chan} 
              href={chan === 'Knowledge Hub' ? '/knowledge-hub' : '#'} 
              className="border border-[#E2E8F0] hover:border-[#B89047] px-4 py-2 rounded-lg bg-white shadow-sm hover:text-[#B89047] transition-all"
            >
              {chan}
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
