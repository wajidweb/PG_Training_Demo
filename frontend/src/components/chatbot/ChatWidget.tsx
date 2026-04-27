'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { COURSES } from '@/data/courses'
import { PACKAGE_TIERS, ADD_ONS } from '@/data/packages'
import { calculatePrice } from '@/lib/pricing'
import { nanoid } from 'nanoid'
import { CartAddon, ChatMessage } from '@/types'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm **Alex**, your PG Training advisor\n\nI can help you find the perfect professional development course and get you enrolled in minutes.\n\nWhat brings you here today — are you an educator, administrator, or looking to step into leadership?",
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { items, addItem, openCart, isOpen: isCartOpen } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  if (isCartOpen) return null

  const sendMessage = async (text?: string) => {
    const userText = text ?? input.trim()
    if (!userText || loading) return

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
          const course = COURSES.find(c => c.id === action.courseId)
          if (course) {
            const deliveryMethod = course.deliveryMethods.find(d => d.type === action.deliveryType) ?? course.deliveryMethods[0]
            const packageTier = PACKAGE_TIERS.find(p => p.id === action.packageTierId) ?? PACKAGE_TIERS[1]
            const participants = action.participants as number
            const selectedAddOns: CartAddon[] = ((action.addOnIds as string[]) ?? [])
              .map(id => ADD_ONS.find(a => a.id === id))
              .filter((a): a is NonNullable<typeof a> => Boolean(a))
              .map(a => ({
                id: a.id,
                name: a.name,
              }))
            const breakdown = calculatePrice(course, deliveryMethod, participants, action.offerDiscount ?? 0, packageTier, selectedAddOns)
            addItem({
              cartId: nanoid(),
              courseId: course.id,
              courseTitle: course.title,
              courseCode: course.code,
              deliveryMethod,
              participants,
              basePrice: course.pricing.basePrice,
              packageTier,
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
        content: "Sorry, I'm having trouble connecting. Please try again or browse our courses directly.",
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  const quickReplies = [
    'I\'m an educator',
    'I\'m in administration',
    'I\'m a leader/manager',
    'Show me offers',
  ]

  return (
    <>
      {/* Trigger button */}
      <button
        id="chatbot-trigger"
        onClick={() => setOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl text-white font-semibold shadow-2xl transition-all hover:scale-105 ${open ? 'hidden' : 'flex'}`}
        style={{ backgroundColor: '#223292' }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">Chat to Order</span>
        {items.length > 0 && (
          <span className="bg-amber-400 text-amber-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-sm chat-slide-up">
          <div className="bg-white sm:rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: '100dvh', maxHeight: '580px' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white flex-shrink-0" style={{ backgroundColor: '#223292' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">A</div>
                <div>
                  <div className="font-semibold text-sm">Alex — PG Training Advisor</div>
                  <div className="text-green-200 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Online now
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setOpen(false); openCart() }}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors relative"
                  title="Open cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {items.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-gray-900 text-xs rounded-full flex items-center justify-center font-bold">{items.length}</span>}
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xs mr-2 flex-shrink-0 mt-1">A</div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === 'user'
                        ? 'text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                    style={msg.role === 'user' ? { backgroundColor: '#223292' } : {}}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:mb-3 prose-p:mt-0 prose-ul:my-2 prose-li:my-0">
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
                  <div className="w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xs mr-2 flex-shrink-0">A</div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies (only show at start) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {quickReplies.map(r => (
                  <button
                    key={r}
                    onClick={() => sendMessage(r)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask about courses, pricing, or offers…"
                  className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none"
                  disabled={loading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="p-2.5 rounded-xl text-white transition-colors disabled:opacity-50"
                  style={{ backgroundColor: '#223292' }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
