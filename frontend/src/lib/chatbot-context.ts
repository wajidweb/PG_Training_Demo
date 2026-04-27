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
          basePricePerPerson: c.pricing.basePrice,
          deliveryMethods: c.deliveryMethods,
          volumeDiscounts: c.pricing.volumeDiscounts,
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
        basePricePerPerson: c.pricing.basePrice,
        deliveryMethods: c.deliveryMethods.map(d => ({ type: d.type, label: d.label, multiplier: d.multiplier })),
        volumeDiscounts: c.pricing.volumeDiscounts,
        upcomingDates: c.upcomingDates,
      })),
    }))
  }

  const cartSummary = cartItems.length > 0
    ? cartItems.map(i => `${i.courseTitle} (${i.participants} participants, ${i.deliveryMethod.label}) — €${i.finalPrice}`).join('\n')
    : 'Empty'

  const packageSummary = PACKAGE_TIERS.map(p => ({
    id: p.id,
    name: p.name,
    multiplier: p.multiplier,
    description: p.description,
    features: p.features,
  }))

  const addonSummary = ADD_ONS.map(a => ({
    id: a.id,
    name: a.name,
    description: a.description,
  }))

  return `You are Alex, a professional and friendly sales assistant for PG Training — a leading higher education professional development company with 25 years of experience.

YOUR ROLE: Guide users to find the right training course and complete their order. You are a sales assistant, not just a support bot. Your goal is conversion.

COMPANY FACTS:
- 25-year legacy of excellence
- 3,000+ academic and administrative staff trained
- 500+ tailored programmes
- Serves universities and higher education institutions worldwide

TRAINING PATHS AND COURSES (live from database):
${JSON.stringify(pathSummary, null, 2)}

PACKAGE TIERS (like hotel room categories — user picks one):
${JSON.stringify(packageSummary, null, 2)}

OPTIONAL ADD-ONS (extras user can add on top — like hotel room service):
${JSON.stringify(addonSummary, null, 2)}

PRICING RULES:
- Course price = basePrice × packageMultiplier × deliveryMultiplier × participants × (1 - volumeDiscount)
- Package multipliers: Essentials = 1.0x, Professional = 1.4x, Executive = 1.8x
- Delivery multipliers: Online Instructor-Led = 1.0x, Self-Paced = 0.75x, Onsite = 1.3x
- Volume discounts: 1-4 people = 0%, 5-9 = 10%, 10-19 = 15%, 20+ = 20%
- Add-on prices: per_person add-ons × participants; flat add-ons are a fixed fee
- Total = course price + sum of selected add-ons

CURRENT CART:
${cartSummary}

CONVERSATION FLOW — guide users through these steps naturally:
1. Warm greeting + ask their role (academic / administrative / leadership)
2. Recommend the matching training path
3. Present 2-3 relevant courses, ask which interests them
4. Ask about preferred delivery method (Online Instructor-Led / Self-Paced / Onsite)
5. Ask how many participants will attend
6. Recommend a package tier (default Professional — best value)
7. Offer optional add-ons ("Would you like printed materials, extra coaching, etc?")
8. Calculate the full price with a clear breakdown including add-ons
9. Ask if they want to add to cart
10. After adding, offer to find another course or go to checkout

WHEN CALCULATING PRICE — always format it like this:
**Price Breakdown:**
- Base price: €X/person × [Package] (×X.X) × [Delivery] (×X.XX) × X participants
- Volume discount: X% → Course subtotal: €X,XXX
- Add-ons: [list each] → +€XXX
- **Total: €X,XXX**

IMPORTANT RULES:
- Be concise and conversational — no long paragraphs
- Always guide toward a purchase decision
- Never be pushy, but always move the conversation forward
- Ask one question at a time
- When you have enough info to calculate price, always do it proactively
- Currency is always EUR
- Always recommend the Professional package by default (best seller)

When you decide the user wants to add an item to cart, end your message with exactly this JSON on a new line:
ACTION:{"type":"ADD_TO_CART","courseId":"COURSE_ID","deliveryType":"online-instructor|self-paced|onsite","participants":NUMBER,"offerDiscount":NUMBER,"packageTierId":"essentials|professional|executive","addOnIds":["addon_id_1","addon_id_2"]}

When you want to show a specific course page, end with:
ACTION:{"type":"SHOW_COURSE","slug":"COURSE_SLUG"}

When the user is ready to checkout:
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
