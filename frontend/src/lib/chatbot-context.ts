import { CartItem } from '@/types'
import { PACKAGE_TIERS, ADD_ONS } from '@/data/packages'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

export async function buildSystemPrompt(cartItems: CartItem[]): Promise<string> {
  let pathSummary: unknown[] = []

  try {
    const res = await fetch(`${API_URL}/api/paths`, { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      const paths = (data.data ?? []) as Array<{
        id: string; title: string; subtitle: string;
        courses?: Array<{
          id: string; slug: string; code: string; title: string;
          shortDescription: string;
          pricing: { basePrice: number; volumeDiscounts: unknown[] };
          deliveryMethods: Array<{ type: string; label: string; multiplier: number }>;
          upcomingDates: string[];
        }>;
      }>
      pathSummary = paths.map(p => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        courses: (p.courses ?? []).map(c => ({
          id: c.id,
          slug: c.slug,
          code: c.code,
          title: c.title,
          shortDescription: c.shortDescription,
          basePrice: c.pricing.basePrice,
          deliveryMethods: c.deliveryMethods,
          upcomingDates: c.upcomingDates,
        })),
      }))
    }
  } catch {
    // Fallback: use static data so chatbot always works
    const { TRAINING_PATHS } = await import('@/data/courses')
    pathSummary = TRAINING_PATHS.map(p => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      courses: p.courses.map(c => ({
        id: c.id,
        slug: c.slug,
        code: c.code,
        title: c.title,
        shortDescription: c.shortDescription,
        basePrice: c.pricing.basePrice,
        deliveryMethods: c.deliveryMethods.map(d => ({ type: d.type, label: d.label, multiplier: d.multiplier })),
        upcomingDates: c.upcomingDates,
      })),
    }))
  }

  const cartSummary = cartItems.length > 0
    ? cartItems.map(i => `${i.courseTitle} (${i.participants} participants, ${i.deliveryMethod.label}, Date: ${i.selectedDate || 'N/A'}) — €${i.finalPrice}`).join('\n')
    : 'Empty'

  return `You are Alex, a professional and helpful sales assistant for Paragon Global Training Academy.

YOUR GOAL: Guide users to find the right training course and complete their order accurately.

AVAILABLE COURSES (Live from Database):
${JSON.stringify(pathSummary, null, 2)}

CURRENT CART:
${cartSummary}

---
CONVERSATION FLOW:
1. Warm greeting + ask their role or what they are looking to learn.
2. Recommend 1-2 highly relevant courses with their base price. **CRITICAL: You MUST list the available delivery methods and \`upcomingDates\` (if any) when presenting a course.**
3. If they show interest in a course, you MUST ask for their preferred Delivery Method first. Look at the specific course's \`deliveryMethods\` array (e.g., 'online-instructor', 'self-paced', 'onsite').
4. IF they choose a live method ('online-instructor' or 'onsite'), you MUST ask them to choose a date from the course's \`upcomingDates\` list. Provide the dates clearly.
5. Ask for the number of participants.
6. Calculate the final price and provide a clear, bolded price breakdown.
7. Ask if they want you to add it to their cart.

PRICING CALCULATION:
- Course price = basePrice × deliveryMultiplier × participants × (1 - volumeDiscount)
- Volume discounts: 1-4 people = 0%, 5-9 = 10%, 10-19 = 15%, 20+ = 20%
- Add-ons are FREE.

IMPORTANT RULES:
- Do NOT assume standard defaults anymore. You MUST ask for delivery method, date (if applicable), and participants.
- Always be polite, concise, and helpful.
- Formatting: ALWAYS use proper Markdown formatting. Use double line breaks (\\n\\n) to separate distinct paragraphs. Use bullet points (- ) to list courses and dates.
- Currency is always EUR (€).

WHEN TRIGGERING ACTIONS:
When the user agrees to add a course to the cart, end your message with exactly this JSON on a new line. Replace values dynamically. 'selectedDate' is the exact string they chose, or "" if self-paced.
ACTION:{"type":"ADD_TO_CART","courseId":"COURSE_ID","deliveryType":"online-instructor|self-paced|onsite","selectedDate":"DATE_STRING","participants":NUMBER,"offerDiscount":0,"addOnIds":[]}

When you want to show a specific course page, end with:
ACTION:{"type":"SHOW_COURSE","slug":"COURSE_SLUG"}

When the user is ready to checkout or asks to pay, end with:
ACTION:{"type":"GO_TO_CHECKOUT"}`
}

export function parseAction(content: string): { text: string; action: Record<string, unknown> | null } {
  const actionMatch = content.match(/ACTION:(\{.*?\})/)
  if (!actionMatch) return { text: content, action: null }
  try {
    const action = JSON.parse(actionMatch[1])
    const text = content.replace(/ACTION:\{.*?\}/, '').trim()
    return { text, action }
  } catch {
    return { text: content, action: null }
  }
}
