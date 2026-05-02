import { Router, Request, Response } from 'express'
import OpenAI from 'openai'
import { Course } from '../models/Course'
import { TrainingPath } from '../models/TrainingPath'

const router = Router()
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function buildSystemPrompt(cartItems: unknown[]): Promise<string> {
  const paths = await TrainingPath.find({ isActive: true }).lean()
  const courses = await Course.find({ isActive: true })
    .select('id slug code title shortDescription pricing deliveryMethods upcomingDates pathId offers')
    .lean()

  const pathSummary = paths.map(p => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    courses: courses
      .filter(c => c.pathId === p.id)
      .map(c => ({
        id: c.id,
        slug: c.slug,
        code: c.code,
        title: c.title,
        shortDescription: c.shortDescription,
        basePricePerPerson: c.pricing.basePrice,
        deliveryMethods: c.deliveryMethods,
        volumeDiscounts: c.pricing.volumeDiscounts,
        upcomingDates: c.upcomingDates,
      })),
  }))

  const cartSummary = Array.isArray(cartItems) && cartItems.length > 0
    ? (cartItems as Array<{ courseTitle: string; participants: number; deliveryMethod: { label: string }; finalPrice: number }>)
        .map(i => `${i.courseTitle} (${i.participants} participants, ${i.deliveryMethod.label}) — $${i.finalPrice}`)
        .join('\n')
    : 'Empty'

  return `You are Alex, a professional and friendly sales assistant for PG Training — a leading higher education professional development company with 25 years of experience.

YOUR ROLE: Guide users to find the right training course and complete their order. You are a sales assistant, not just a support bot. Your goal is conversion.

COMPANY FACTS:
- 25-year legacy of excellence
- 3,000+ academic and administrative staff trained
- 500+ tailored programmes
- Serves universities and higher education institutions worldwide

TRAINING PATHS AND COURSES:
${JSON.stringify(pathSummary, null, 2)}

PRICING RULES:
- Final price = basePrice × deliveryMultiplier × (1 - volumeDiscount) × participants
- Delivery multipliers: Refer to the specific course's deliveryMethods array.
- Volume discounts: Refer to the specific course's volumeDiscounts array.
- Always calculate and show the price breakdown clearly.

CURRENT CART:
${cartSummary}

CONVERSATION FLOW — guide users naturally:
1. Warm greeting + ask their role (academic / administrative / leadership)
2. Recommend the matching training path
3. Present 2-3 relevant courses. **CRITICAL: When presenting a course, you MUST list its available delivery methods and its available \`upcomingDates\` (if any).**
4. Ask preferred delivery method (e.g., Live Online, Self-Paced, Onsite). Look at the course's available methods first!
5. IF they chose Live Online (online-instructor) or Onsite, you MUST ask them which date they prefer from the course's \`upcomingDates\` list.
6. Ask number of participants
7. Calculate price with clear breakdown
8. Present applicable offers
9. Ask if they want to add to cart
10. After adding, offer to find another course or go to checkout


WHEN CALCULATING PRICE — always format like this:
📊 **Price Breakdown:**
- Base price: €X per person
- Delivery (method): ×X.X
- Participants: X people
- Volume discount: X%
- **Total: €X,XXX**

RULES:
- Be concise and conversational
- Always guide toward a purchase
- Ask one question at a time
- Currency is always EUR (€)
- Use emojis sparingly

When user wants to add to cart, end your message with exactly:
ACTION:{"type":"ADD_TO_CART","courseId":"COURSE_ID","deliveryType":"online-instructor|self-paced|onsite","selectedDate":"DATE_STRING_IF_APPLICABLE","participants":NUMBER,"offerDiscount":NUMBER}

When showing a course page:
ACTION:{"type":"SHOW_COURSE","slug":"COURSE_SLUG"}

When ready to checkout:
ACTION:{"type":"GO_TO_CHECKOUT"}`
}

function parseAction(content: string): { text: string; action: Record<string, unknown> | null } {
  const match = content.match(/ACTION:(\{.*\})/)
  if (!match) return { text: content, action: null }
  try {
    const action = JSON.parse(match[1])
    return { text: content.replace(/ACTION:\{.*\}/, '').trim(), action }
  } catch {
    return { text: content, action: null }
  }
}

// POST /api/chat
router.post('/', async (req: Request, res: Response) => {
  try {
    const { messages, cartItems = [] } = req.body

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ success: false, message: 'messages array is required' })
      return
    }

    const systemPrompt = await buildSystemPrompt(cartItems)

    // Convert messages to OpenAI format
    const openAIMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
        content: m.content,
      })),
    ]

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      messages: openAIMessages,
    })

    const rawContent = response.choices[0]?.message?.content || ''
    const { text, action } = parseAction(rawContent)

    res.json({ success: true, content: text, action })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ success: false, message: 'Failed to get AI response' })
  }
})

export default router
