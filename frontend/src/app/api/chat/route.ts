import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { buildSystemPrompt, parseAction } from '@/lib/chatbot-context'
import { CartItem } from '@/types'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, cartItems = [] } = await req.json() as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>
      cartItems: CartItem[]
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array is required' }, { status: 400 })
    }

    // Fetch live course data from backend to build the system prompt
    const systemPrompt = await buildSystemPrompt(cartItems)

    const openAIMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({
        role: (m.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
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

    return NextResponse.json({ content: text, action })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
