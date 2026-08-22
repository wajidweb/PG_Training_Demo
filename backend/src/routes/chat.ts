import { Router, Request, Response } from 'express'
import OpenAI from 'openai'
import { Course } from '../models/Course'
import { TrainingPath } from '../models/TrainingPath'
import { Resource } from '../models/Resource'
import { Article } from '../models/Article'

const router = Router()
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Premium fallback catalogs ensuring PGT Advisor always has full context (even during DB sleep/cold starts)
const FALLBACK_RESOURCES = [
  {
    title: 'The Successful CEO Guide',
    slug: 'successful-ceo-guide',
    description: 'Practical strategies for building resilient organisations and high-performing executive teams in volatile markets.',
    tier: 'free',
    price: 0,
    category: 'executive',
    type: 'guide',
    fileUrl: '/ebook-placeholder.pdf'
  },
  {
    title: 'The Erasmus+ Planning Guide',
    slug: 'erasmus-planning-guide',
    description: 'A practical handbook for planning impactful mobilities, learning agreements, and professional development programs.',
    tier: 'free',
    price: 0,
    category: 'erasmus',
    type: 'guide',
    fileUrl: '/ebook-placeholder.pdf'
  },
  {
    title: 'Artificial Intelligence for Organisations',
    slug: 'ai-for-organisations',
    description: 'A practical introduction to AI implementation, prompt engineering, and policy formulation for leaders and corporate teams.',
    tier: 'free',
    price: 0,
    category: 'ai',
    type: 'guide',
    fileUrl: '/ebook-placeholder.pdf'
  },
  {
    title: 'CEO Success Playbook & Toolkit',
    slug: 'ceo-success-playbook',
    description: 'A comprehensive kit containing editable strategic matrices, assessment scorecards, and board slide templates.',
    tier: 'premium',
    price: 49,
    category: 'executive',
    type: 'toolkit',
    fileUrl: '/ebook-placeholder.pdf'
  },
  {
    title: 'Erasmus+ Proposal Toolkit',
    slug: 'erasmus-proposal-toolkit',
    description: 'Exhaustive mobility worksheets, QA checklists, learning outcomes plans, and successful proposal copy guidelines.',
    tier: 'premium',
    price: 129,
    category: 'erasmus',
    type: 'toolkit',
    fileUrl: '/ebook-placeholder.pdf'
  },
  {
    title: 'AI Education Blueprint & Planner',
    slug: 'ai-education-blueprint',
    description: 'Bespoke templates, prompt libraries, classroom integration policies, and teacher productivity checklists.',
    tier: 'premium',
    price: 89,
    category: 'ai',
    type: 'toolkit',
    fileUrl: '/ebook-placeholder.pdf'
  }
]

const FALLBACK_ARTICLES = [
  {
    title: 'Leading Through Change: Why Adaptability Is the New Competitive Advantage',
    slug: 'leading-through-change',
    excerpt: 'Every generation of leaders faces change, but modern executives face transformation at unprecedented speed.',
    series: 'CEO Briefing',
    tags: ['Leadership', 'Adaptability']
  },
  {
    title: 'The Future Skills Every Organisation Needs by 2030',
    slug: 'future-skills-2030',
    excerpt: 'Comprehensive analysis of the key technological forces shaping the future of the global workplace.',
    series: 'Future Learning Review',
    tags: ['Skills', 'Future']
  },
  {
    title: 'How Artificial Intelligence Is Transforming Professional Learning',
    slug: 'ai-transforming-learning',
    excerpt: 'Practical applications of Artificial Intelligence across educational, business, and corporate spaces.',
    series: 'AI in Practice',
    tags: ['AI', 'Education']
  },
  {
    title: 'Five Characteristics of High Performing Executive Teams',
    slug: 'high-performing-executive-teams',
    excerpt: 'Strategic insights on leadership, executive decision making, corporate strategy, and sustainable growth.',
    series: 'CEO Briefing',
    tags: ['Executive', 'Teams']
  },
  {
    title: 'Designing Erasmus Plus Mobilities That Create Lasting Impact',
    slug: 'designing-erasmus-plus-mobilities',
    excerpt: 'Core funding opportunities, mobility trends, international collaboration, and modern program design.',
    series: 'Mobility Matters',
    tags: ['Erasmus', 'Mobility']
  },
  {
    title: 'Why Continuous Learning Is Becoming Every Organisation\'s Competitive Advantage',
    slug: 'continuous-learning-advantage',
    excerpt: 'Techniques for building capable teams, developing talent, and elevating overall corporate performance.',
    series: 'Capability Quarterly',
    tags: ['Learning', 'Advantage']
  },
  {
    title: 'From Knowledge to Capability: The Next Evolution of Professional Development',
    slug: 'knowledge-to-capability',
    excerpt: 'New thinking on education, employability, professional development and future skills.',
    series: 'Capability Quarterly',
    tags: ['Knowledge', 'Capability']
  }
]

/**
 * Dynamically builds a comprehensive, real-time database contextual prompt for OpenAI
 * Consolidates all Courses, Pathways, Knowledge Hub resources, and Journal Articles live.
 */
async function buildSystemPrompt(cartItems: unknown[]): Promise<{ systemPrompt: string, dbResources: any[], dbArticles: any[] }> {
  // Query all active platform data in parallel
  const [paths, courses, dbRes, dbArt] = await Promise.all([
    TrainingPath.find({ isActive: true }).lean(),
    Course.find({ isActive: true }).select('id slug code title shortDescription pricing deliveryMethods upcomingDates pathId offers').lean(),
    Resource.find({ isPublished: true }).select('title slug description tier price category type fileUrl').lean(),
    Article.find({ isPublished: true }).select('title slug excerpt series tags').lean()
  ])

  // Fallback merge to guarantee AI never experiences empty catalogs
  const resources = dbRes.length > 0 ? dbRes : FALLBACK_RESOURCES
  const articles = dbArt.length > 0 ? dbArt : FALLBACK_ARTICLES

  console.log(`[CHAT ADVISOR COMPILER] Loaded ${courses.length} courses, ${resources.length} resources, and ${articles.length} articles from live database.`)

  // Map courses to training pathways
  const pathSummary = paths.map(p => ({
    pathwayName: p.title,
    pathwaySubtitle: p.subtitle,
    courses: courses
      .filter(c => c.pathId === p.id)
      .map(c => ({
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

  const cartSummary = Array.isArray(cartItems) && cartItems.length > 0
    ? (cartItems as Array<{ courseTitle: string; participants: number; deliveryMethod: { label: string }; finalPrice: number }>)
        .map(i => `${i.courseTitle} (${i.participants} participants, ${i.deliveryMethod.label}) — $${i.finalPrice}`)
        .join('\n')
    : 'Empty'

  const systemPrompt = `You are Alex, an elite McKinsey-grade Senior Strategic Advisor for Paragon Global Training (PGT) — a premium professional capability company with over 25 years of experience.

YOUR PRIMARY ADVISORY FOCUS (CRITICAL ZERO COURSE-BIAS):
- You possess equal authority and an equal mandate to advise on all three pillars of our platform with absolute zero course-bias:
  1. **Our Dynamic Knowledge Hub & Store (Digital Planners, Blueprints, Guides, Files, Downloads, Checklists)**: Highlight free guides and premium paid toolkits ($USD). Direct users to browse, download, or buy these digital assets directly on our public \`/knowledge-hub\` page.
  2. **Our Dynamic Journal Publications (News, Briefings, Insights, Research Articles)**: Direct users to read these publications at \`/journal/[slug]\` (where [slug] is the article's actual URL slug!).
  3. **Our Dynamic Training Courses (Learning Programs, Certifications, Group Training)**: High-level programs (€EUR).
- **STRICT MANDATE**: You are NOT restricted to training courses! Do NOT assume the user wants a course if they are asking about resources, planners, checklists, downloads, files, templates, or articles!
- If a user asks about templates, blueprints, planners, checklists, downloads, articles, news, or guides (e.g. they ask about the "AI for Organisations" guide, or "Successful CEO" checklist):
  - **You MUST focus 100% on the KNOWLEDGE HUB or JOURNAL catalogs and describe those specific files!**
  - **STRICT NEGATIVE CONSTRAINT**: DO NOT suggest or recommend training courses, DO NOT ask about delivery methods, DO NOT ask for participants, DO NOT ask for dates, and DO NOT trigger cart actions! Keep the conversation focused 100% on the requested library resource or article!

THE PGT KNOWLEDGE HUB RESOURCES (UP-TO-DATE FROM DATABASE):
${JSON.stringify(resources, null, 2)}

THE LATEST PUBLISHED JOURNAL ARTICLES (UP-TO-DATE FROM DATABASE):
${JSON.stringify(articles, null, 2)}

TRAINING PATHS AND COURSES:
${JSON.stringify(pathSummary, null, 2)}

PRICING & COURSE BOOKING RULES:
- Final price = basePrice × deliveryMultiplier × participants (with volume discounts).
- Emojis should be used very sparingly.
- Always provide structured, formal paragraphs and clear bulleted outlines.

CURRENT CART:
${cartSummary}

CONVERSATION INTENT ROUTING (HIGHEST PRIORITY - DYNAMIC DATABASE MATCHING):
- You MUST perform an active semantic scan of the user's input against our live catalogs (THE PGT KNOWLEDGE HUB RESOURCES and THE LATEST PUBLISHED JOURNAL ARTICLES lists above).
- If the user is asking about or referencing ANY item present in those database catalogs (e.g. they ask about a title, slug, or topic that has a match in resources or articles, regardless of spelling or word order):
  - **You MUST focus 100% on that dynamic database item first!**
  - Summarize its description, explain if it is a Free Download (or Paid Premium Toolkit for $USD price), and direct them to obtain it directly on our public \`/knowledge-hub\` page (or read the article at \`/journal/[slug]\`).
  - **STRICT NEGATIVE CONSTRAINT**: DO NOT recommend training courses, DO NOT ask about delivery methods, DO NOT ask for participants, DO NOT ask for dates, and DO NOT trigger cart actions when a catalog match is active! Bypass course suggestions entirely and focus 100% on delivering that requested database asset!

CONVERSATION SEGMENT ROUTING (SECONDARY PRIORITY):
- If there is NO direct match in the resources or articles, route the conversation dynamically:
  - **IF user asks about guides, resources, blueprints, toolkits, planners, checklists, or files**:
    - Focus 100% on the KNOWLEDGE HUB. Describe matching toolkits and direct them to \`/knowledge-hub\`.
    - **STRICT NEGATIVE CONSTRAINT**: DO NOT recommend courses or ask for participants/dates!
  - **IF user asks about articles, news, insights, or recent research publications**:
    - Focus 100% on THE JOURNAL. Summarize matching articles and direct them to \`/journal/[slug]\`.
    - **STRICT NEGATIVE CONSTRAINT**: DO NOT suggest courses or ask about delivery methods!
  - **IF user asks about training courses, certification, or learning paths**:
    - Guide them through the courses catalog inside TRAINING PATHS AND COURSES.

CONVERSATION ADVISORY STEPS:
1. Welcome the visitor by name (if they provided it in the lead form).
2. Follow the CONVERSATION INTENT ROUTING rules above strictly as your highest priority.
3. If they seek customized compliance schedules, direct them to complete the consult booking form inside \`/contact\`.

RULES:
- Maintain elite structural clarity. Use paragraph breaks (\n\n) between distinct concepts.
- Bold important keywords (e.g., **Members' Hub**, **Executive Success**, **Erasmus+ Proposal Toolkit**).
- Format calculations with pristine codeblocks or lists.
- Currency is always EUR (€) for courses, USD ($) for toolkits.

When user wants to add a course to their cart, end your message with exactly:
ACTION:{"type":"ADD_TO_CART","courseId":"COURSE_ID","deliveryType":"online-instructor|self-paced|onsite","selectedDate":"DATE_STRING_IF_APPLICABLE","participants":NUMBER,"offerDiscount":NUMBER}

When showing a course page:
ACTION:{"type":"SHOW_COURSE","slug":"COURSE_SLUG"}

When ready to checkout:
ACTION:{"type":"GO_TO_CHECKOUT"}`

  return { systemPrompt, dbResources: resources, dbArticles: articles }
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

// POST /api/chat - Dynamic Advisor OpenAI Pipeline
router.post('/', async (req: Request, res: Response) => {
  try {
    const { messages, cartItems = [] } = req.body

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ success: false, message: 'messages array is required' })
      return
    }
    const { systemPrompt, dbResources, dbArticles } = await buildSystemPrompt(cartItems)

    // Programmatic hybrid semantic scanner interceptor
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
    let directOverride = ''
    let matchedRes: any = null
    let matchedArt: any = null

    if (lastUserMessage) {
      // Find matching resource by title, slug, or keywords
      matchedRes = dbResources.find((r: any) => {
        const titleLower = r.title.toLowerCase()
        const slugText = r.slug.replace(/-/g, ' ')
        return lastUserMessage.includes(titleLower) || 
               lastUserMessage.includes(slugText) ||
               (titleLower.split(' ').filter((w: any) => w.length > 3).every((w: any) => lastUserMessage.includes(w)))
      })

      if (matchedRes) {
        directOverride = "[SYSTEM MANDATE - ABSOLUTE REQUIRED FORCE] The user is explicitly asking about the PGT Knowledge Hub Resource: \"" + matchedRes.title + "\".\n" +
          "YOU ARE STRICTLY FORBIDDEN FROM RECOMMEND OR DISCUSSING REGULAR TRAINING COURSES! DO NOT MENTION COURSES OR CART ACTIONS!\n" +
          "Explain that this is a " + (matchedRes.tier === 'free' ? 'Free Lead Magnet Guide' : "Premium Paid Toolkit ($" + matchedRes.price.toFixed(2) + ")") + ".\n" +
          "Summarize its description from our live database: \"" + matchedRes.description + "\".\n" +
          "Instruct them to navigate directly to our public **/knowledge-hub** page to download or buy this asset.\n" +
          "Do NOT ask about participants, dates, or delivery methods. Focus 100% on this resource only!"
      } else {
        // Find matching article by title, slug, or keywords
        matchedArt = dbArticles.find((a: any) => {
          const titleLower = a.title.toLowerCase()
          const slugText = a.slug.replace(/-/g, ' ')
          return lastUserMessage.includes(titleLower) || 
                 lastUserMessage.includes(slugText) ||
                 (titleLower.split(' ').filter((w: any) => w.length > 3).every((w: any) => lastUserMessage.includes(w)))
        })

        if (matchedArt) {
          directOverride = "[SYSTEM MANDATE - ABSOLUTE REQUIRED FORCE] The user is explicitly asking about the Journal Article: \"" + matchedArt.title + "\".\n" +
            "YOU ARE STRICTLY FORBIDDEN FROM RECOMMEND OR DISCUSSING COURSES!\n" +
            "Summarize its excerpt from our live database: \"" + matchedArt.excerpt + "\".\n" +
            "Instruct them to navigate directly to **/journal/" + matchedArt.slug + "** to read the full briefing.\n" +
            "Do NOT mention courses, shopping carts, or delivery methods!"
        } else if (
          lastUserMessage.includes('guide') || 
          lastUserMessage.includes('knowledge hub') || 
          lastUserMessage.includes('resources') || 
          lastUserMessage.includes('blueprints') || 
          lastUserMessage.includes('toolkits') || 
          lastUserMessage.includes('checklists') ||
          lastUserMessage.includes('store') ||
          lastUserMessage.includes('files')
        ) {
          // General Knowledge Hub/Guides query interceptor
          directOverride = "[SYSTEM MANDATE - ABSOLUTE REQUIRED FORCE] The user is asking a general question about PGT's Guides and Knowledge Hub resources.\n" +
            "YOU ARE STRICTLY FORBIDDEN FROM SUGGESTING COURSES OR MENTIONING TRAINING!\n" +
            "Introduce our dynamic database Knowledge Hub resources catalog:\n" +
            dbResources.map((r: any) => `- **${r.title}** (${r.tier === 'free' ? 'Free Guide' : `Premium Toolkit - $${r.price.toFixed(2)}`}): ${r.description}`).join('\n') + "\n\n" +
            "Instruct the user to visit our public **/knowledge-hub** page where they can instantly download free planners or purchase premium tools.\n" +
            "Do NOT ask about participants, delivery methods, or shopping carts! Focus 100% on describing this resource catalog!"
        }
      }
    }

// Convert messages to OpenAI format
const openAIMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
  { role: 'system', content: systemPrompt },
  ...messages.map((m: { role: string; content: string }) => ({
    role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
    content: m.content,
  })),
]

// Diagnostic Log & Bulletproof User-Prompt Injection
console.log(`[CHAT LOG] User: "${lastUserMessage}"`)
console.log(`[CHAT LOG] Matched: ${matchedRes ? `Resource "${matchedRes.title}"` : (matchedArt ? `Article "${matchedArt.title}"` : 'NONE')}`)

if (directOverride && openAIMessages.length > 0) {
  const lastMsg = openAIMessages[openAIMessages.length - 1]
  if (lastMsg && lastMsg.role === 'user') {
    lastMsg.content = lastMsg.content + "\n\n[MANDATORY SYSTEM DIRECTIVE - BYPASS COURSES]\n" + directOverride
  }
}

const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      messages: openAIMessages,
    })

    const rawContent = response.choices[0]?.message?.content || ''
    const { text, action } = parseAction(rawContent)

    res.json({ success: true, content: text, action })
  } catch (error) {
    console.error('Advisor Chat Error:', error)
    res.status(500).json({ success: false, message: 'Failed to get advisory response' })
  }
})

export default router
