'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2, 
  ShoppingCart, 
  User, 
  Mail, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Check,
  Bookmark
} from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { COURSES } from '@/data/courses'
import { PACKAGE_TIERS, ADD_ONS } from '@/data/packages'
import { calculatePrice } from '@/lib/pricing'
import { nanoid } from 'nanoid'
import { CartAddon, ChatMessage } from '@/types'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { subscribeToCampaign } from '@/lib/api'
import { cn } from '@/lib/utils'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { items, addItem, openCart, isOpen: isCartOpen } = useCartStore()
  const router = useRouter()

  // Lead Generation Gating states (Device-cached)
  const [hasSubmittedLead, setHasSubmittedLead] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '' })
  const [leadLoading, setLeadLoading] = useState(false)
  const [leadError, setLeadError] = useState('')

  useEffect(() => {
    // Check if device already completed lead scoping
    const submitted = localStorage.getItem('chatbot_lead_submitted') === 'true'
    const cachedName = localStorage.getItem('chatbot_lead_name') || ''
    
    if (submitted && cachedName) {
      setHasSubmittedLead(true)
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `Hello **${cachedName}**! Welcome back to Paragon Global Advisory.\n\nHow can I support your strategy, international VET mobilities, or workforce capability plans today? Ask me about our courses, downloadable store blueprints, or recent journal articles!`,
          timestamp: new Date(),
        }
      ])
    } else {
      setHasSubmittedLead(false)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open && hasSubmittedLead) inputRef.current?.focus()
  }, [open, hasSubmittedLead])

  if (isCartOpen) return null

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLeadLoading(true)
    setLeadError('')

    if (!leadForm.name.trim() || !leadForm.email.trim()) {
      setLeadError('All fields are required.')
      setLeadLoading(false)
      return
    }

    try {
      // 1. Submit lead to database organically under 'chatbot_lead' campaign
      await subscribeToCampaign(leadForm.email, 'chatbot_lead')

      // 2. Set Local storage caches
      localStorage.setItem('chatbot_lead_submitted', 'true')
      localStorage.setItem('chatbot_lead_name', leadForm.name.trim())
      localStorage.setItem('chatbot_lead_email', leadForm.email.trim())

      // 3. Unlock Chatbot
      setHasSubmittedLead(true)
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `Hello **${leadForm.name}**! Thank you for activating PGT Advisory.\n\nI have pre-populated your scoping credentials. How can I support your strategy today? I can guide you through our **School of Executive Success**, describe planning toolkits inside the **Knowledge Hub**, or list active course pricing!`,
          timestamp: new Date(),
        }
      ])
    } catch (err: any) {
      setLeadError(err.message || 'Verification failed. Please ensure your email is correct.')
    } finally {
      setLeadLoading(false)
    }
  }

  const sendMessage = async (text?: string) => {
    const userText = text ?? input.trim()
    if (!userText || loading) return

    // Intercept storefront redirect
    if (userText === 'Visit Storefront') {
      setInput('')
      setOpen(false)
      router.push('/knowledge-hub')
      return
    }

    const userMsg: ChatMessage = { id: nanoid(), role: 'user', content: userText, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, cartItems: items }),
      })
      const data = await res.json()

      if (data.action) {
        const action = data.action
        if (action.type === 'ADD_TO_CART') {
          let course = COURSES.find(c => c.id === action.courseId)
          if (!course) {
            try {
              const res = await fetch(`/api/courses`)
              const data = await res.json()
              const dbCourses = data.data || []
              course = dbCourses.find((c: any) => c.id === action.courseId)
            } catch (e) {
              console.error(e)
            }
          }

          if (course) {
            const deliveryMethod = course.deliveryMethods.find((d: any) => d.type === action.deliveryType) ?? course.deliveryMethods[0]
            const participants = action.participants as number
            const selectedDate = action.selectedDate as string | undefined
            const selectedAddOns: CartAddon[] = ((action.addOnIds as string[]) ?? [])
              .map(id => ADD_ONS.find(a => a.id === id))
              .filter((a): a is NonNullable<typeof a> => Boolean(a))
              .map(a => ({
                id: a.id,
                name: a.name,
              }))
            const breakdown = calculatePrice(course, deliveryMethod, participants, action.offerDiscount ?? 0, undefined, selectedAddOns)
            addItem({
              cartId: nanoid(),
              courseId: course.id,
              courseTitle: course.title,
              courseCode: course.code,
              deliveryMethod,
              selectedDate,
              participants,
              basePrice: course.pricing.basePrice,
              addOns: selectedAddOns,
              discountPercent: action.offerDiscount ?? 0,
              finalPrice: breakdown.total,
              offerLabel: 'Added via Chat',
            })
          }
        }
        if (action.type === 'SHOW_COURSE') {
          setTimeout(() => router.push(`/courses/${action.slug}`), 1500)
        }
        if (action.type === 'GO_TO_CHECKOUT') {
          setTimeout(() => router.push('/cart'), 1500)
        }
      }

      const assistantMsg: ChatMessage = {
        id: nanoid(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch {
      setMessages(prev => [...prev, {
        id: nanoid(),
        role: 'assistant',
        content: "I apologize, I encountered a brief telemetry error. Please verify your connection or browse our dynamic courses directly.",
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  const quickReplies = [
    'School of Executive Success',
    'Erasmus+ Mobility Planning',
    'Show me pricing',
    'Visit Storefront',
  ]

  return (
    <>
      {/* Trigger button */}
      <button
        id="chatbot-trigger"
        onClick={() => setOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-2xl text-white font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${open ? 'hidden' : 'flex'}`}
        style={{ backgroundColor: '#0B1B3D', border: '1px solid rgba(184, 144, 71, 0.2)' }}
      >
        <MessageCircle className="w-5 h-5 text-[#B89047]" />
        <span className="text-xs uppercase tracking-wider font-extrabold">PGT Advisory</span>
        {items.length > 0 && (
          <span className="bg-amber-500 text-amber-950 text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-sm chat-slide-up">
          <div className="bg-white sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in duration-300" style={{ height: '100dvh', maxHeight: '580px' }}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white flex-shrink-0" style={{ backgroundColor: '#0B1B3D', borderBottom: '1px solid rgba(184, 144, 71, 0.2)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-500/10 rounded-full flex items-center justify-center text-[#B89047] border border-[#B89047]/30 font-bold text-sm flex-shrink-0">
                  A
                </div>
                <div className="text-left">
                  <div className="font-extrabold text-xs uppercase tracking-wider">Alex — PGT Advisory</div>
                  <div className="text-green-400 text-[10px] flex items-center gap-1 font-mono uppercase tracking-widest mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Online now
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setOpen(false); openCart() }}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors relative cursor-pointer"
                  title="Open cart"
                >
                  <ShoppingCart className="w-4 h-4 text-slate-200 hover:text-white" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[9px] rounded-full flex items-center justify-center font-bold font-mono">
                      {items.length}
                    </span>
                  )}
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-200" />
                </button>
              </div>
            </div>

            {/* IF LEAD IS NOT SUBMITTED: RENDER GATED FORM */}
            {!hasSubmittedLead ? (
              <div className="flex-1 bg-[#FAF9F6] p-6 sm:p-8 flex flex-col justify-center text-center space-y-6">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold tracking-[0.25em] text-[#B89047] uppercase block">PGT CONSULTING TELEMETRY</span>
                  <h3 className="text-lg font-extrabold text-[#0B1B3D] uppercase tracking-tight">Activate Advisory</h3>
                  <div className="h-0.5 w-12 bg-[#B89047] mx-auto rounded mt-2" />
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                  Unlock PGT's McKinsey-grade AI consulting assistant. Enter your name and professional email to register and initiate your custom organizational scoping dialog.
                </p>

                {leadError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center gap-2 text-[10px] font-bold text-left">
                    <X className="h-4 w-4 shrink-0 text-red-600" />
                    <span>{leadError}</span>
                  </div>
                )}

                <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={leadForm.name}
                        onChange={e => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white border border-[#E2E8F0] text-[#0B1B3D] rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#B89047] uppercase tracking-widest block">Professional Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="john@organisation.com"
                        value={leadForm.email}
                        onChange={e => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white border border-[#E2E8F0] text-[#0B1B3D] rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#B89047] font-normal"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={leadLoading}
                    className="w-full py-3 bg-[#0B1B3D] hover:bg-[#0B1B3D]/95 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
                  >
                    {leadLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#B89047]" />
                        <span>Unlock Assistant</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* IF LEAD IS SUBMITTED: RENDER ACTIVE MESSENGER PLATFORM */
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF9F6]">
                  {messages.map(msg => (
                    <div key={msg.id} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 bg-[#B89047]/10 border border-[#B89047]/20 rounded-full flex items-center justify-center text-[#B89047] font-bold text-xs mr-2 flex-shrink-0 mt-1">
                          A
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3 text-[11px] sm:text-xs leading-relaxed border shadow-xs text-left",
                          msg.role === 'user'
                            ? 'text-white rounded-br-none bg-[#0B1B3D] border-[#0B1B3D]'
                            : 'bg-white text-[#0B1B3D] rounded-bl-none border-[#E2E8F0]'
                        )}
                      >
                        {msg.role === 'assistant' ? (
                          /* MCKINSEY SPECIFIC BEAUTIFIED BUBBLES OUTLINES */
                          <div className="prose prose-sm max-w-none text-[#0B1B3D] leading-relaxed font-normal selection:bg-[#B89047]/20
                            prose-p:leading-relaxed prose-p:mb-4 prose-p:mt-0 prose-p:text-[#0B1B3D] prose-p:font-normal
                            prose-ul:list-disc prose-ul:pl-4 prose-ul:my-2 prose-li:my-0.5 prose-li:text-[#0B1B3D]
                            prose-strong:font-extrabold prose-strong:text-[#0B1B3D] prose-code:font-mono prose-code:text-[10px]
                            prose-blockquote:border-l-4 prose-blockquote:border-[#B89047] prose-blockquote:pl-3 prose-blockquote:italic"
                          >
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        ) : (
                          msg.content
                        )}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="w-7 h-7 bg-[#B89047]/10 border border-[#B89047]/20 rounded-full flex items-center justify-center text-[#B89047] font-bold text-xs mr-2 flex-shrink-0">A</div>
                      <div className="bg-white border border-[#E2E8F0] rounded-2xl rounded-bl-none px-4 py-3 shadow-xs">
                        <Loader2 className="w-4 h-4 animate-spin text-[#B89047]" />
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Quick replies (only show at start) */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0 bg-[#FAF9F6]">
                    {quickReplies.map(r => (
                      <button
                        key={r}
                        onClick={() => sendMessage(r)}
                        className="text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#E2E8F0] bg-white text-[#0B1B3D] hover:border-[#B89047]/40 transition-colors cursor-pointer"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input form */}
                <div className="p-4 border-t border-slate-200 flex-shrink-0 bg-white">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      placeholder="Ask about strategy, toolkits, or courses…"
                      className="flex-1 text-xs px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#B89047] focus:outline-none text-[#0B1B3D] font-normal"
                      disabled={loading}
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || loading}
                      className="p-2.5 rounded-xl text-white transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center"
                      style={{ backgroundColor: '#0B1B3D' }}
                    >
                      <Send className="w-4 h-4 text-[#B89047]" />
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  )
}
