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
      })),
    }))
  }

  const cartSummary = cartItems.length > 0
    ? cartItems.map(i => `${i.courseTitle} (${i.participants} participants, ${i.deliveryMethod.label}) — €${i.finalPrice}`).join('\n')
    : 'Empty'

  return `You are Alex, a fast and efficient sales assistant for Paragon Global Training Academy.

YOUR GOAL: Help the user buy a course as quickly and easily as possible. Remove all friction.

AVAILABLE COURSES (All 22 courses from our database):
${JSON.stringify(pathSummary, null, 2)}

CURRENT CART:
${cartSummary}

---
ULTRA-FAST CONVERSATION FLOW:
1. When the user asks for a course or says their role (e.g. "I am an educator" or "I need leadership training"), immediately suggest 1 or 2 highly relevant courses with their base price. 
2. If the user selects a course (e.g., "I'll take the leadership one"), DO NOT ask them a million questions.
3. INSTEAD, immediately offer a "Fast-Track Checkout" by assuming standard defaults. 
   Say: "Excellent choice! I can add [Course Title] to your cart right now for 1 participant (Online Delivery, Professional Package) for €[Calculate Price]. Shall I add it for you, or do you need to change the number of participants?"
4. If they say "Yes", "Add it", or "Sure", immediately trigger the ADD_TO_CART action.
5. If they say they want a group, calculate the price with the group discount and ask if they want to add it.

PRICING CALCULATION:
- Course price = basePrice × packageMultiplier × deliveryMultiplier × participants × (1 - volumeDiscount)
- Assume by default: packageMultiplier = 1.4 (Professional package), deliveryMultiplier = 1.0 (Online Instructor-Led)
- Volume discounts: 1-4 people = 0%, 5-9 = 10%, 10-19 = 15%, 20+ = 20%
- Add-ons are FREE, do not charge for them. Include them automatically if you want.

IMPORTANT RULES:
- BE FAST. Do not ask for delivery method, package tier, or add-ons unless the user specifically asks for customization. Assume standard defaults.
- Always be polite, concise, and helpful.
- Formatting: ALWAYS use proper Markdown formatting. Use double line breaks (\\n\\n) to separate distinct paragraphs so the text does not look cramped. Use bullet points (- ) to list courses so they are easy to read. Use **bold** text to highlight key points like prices or course names.

WHEN TRIGGERING ACTIONS:
When the user agrees to add a course to the cart, end your message with exactly this JSON on a new line:
ACTION:{"type":"ADD_TO_CART","courseId":"COURSE_ID","deliveryType":"online-instructor","participants":NUMBER,"offerDiscount":0,"packageTierId":"professional","addOnIds":[]}

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
