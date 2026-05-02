import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { Order } from '../models/Order'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia',
})

const router = Router()

const orderValidation = [
  body('contact.firstName').trim().notEmpty().withMessage('First name is required'),
  body('contact.lastName').trim().notEmpty().withMessage('Last name is required'),
  body('contact.email').isEmail().withMessage('Valid email is required'),
  body('contact.organisation').trim().notEmpty().withMessage('Organisation is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.courseId').notEmpty().withMessage('Course ID is required'),
  body('items.*.participants').isInt({ min: 1 }).withMessage('Participants must be at least 1'),
  body('items.*.finalPrice').isFloat({ min: 0 }).withMessage('Final price must be a positive number'),
  body('total').isFloat({ min: 0 }).withMessage('Total must be a positive number'),
]

// POST /api/orders — create a new order and Stripe session
router.post('/', orderValidation, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() })
    return
  }

  try {
    const { contact, items, total, notes } = req.body
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

    // 1. Create the dynamic Stripe line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.courseTitle,
          description: `${item.deliveryMethod.label} - ${item.participants} participant(s) ${item.selectedDate ? `(${new Date(item.selectedDate).toLocaleDateString()})` : ''}`,
        },
        unit_amount: Math.round((item.finalPrice / item.participants) * 100), // Stripe expects cents
      },
      quantity: item.participants,
    }))

    // 2. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/cart`,
      customer_email: contact.email,
      metadata: {
        organisation: contact.organisation
      }
    })

    // 3. Save Order to DB as 'pending'
    const order = await Order.create({
      contact,
      items,
      subtotal: total, // For now assuming total is passed correctly
      total,
      paymentMethod: 'stripe',
      stripeSessionId: session.id,
      status: 'pending',
      notes
    })

    res.status(201).json({
      success: true,
      url: session.url,
      orderNumber: order.orderNumber
    })
  } catch (error) {
    console.error('Order/Stripe creation error:', error)
    res.status(500).json({ success: false, message: 'Failed to initiate checkout' })
  }
})

// POST /api/orders/webhook — Stripe Webhook
router.post('/webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    // Update order status to paid
    try {
      await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        { 
          status: 'paid',
          stripePaymentIntentId: session.payment_intent as string
        }
      )
      console.log(`Order paid: ${session.id}`)
    } catch (dbErr) {
      console.error('Database update error in webhook:', dbErr)
    }
  }

  res.json({ received: true })
})

// GET /api/orders — get all orders (admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).select('-__v').lean()
    res.json({ success: true, data: orders })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' })
  }
})

// GET /api/orders/:orderNumber — get order by order number
router.get('/:orderNumber', async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber }).select('-__v').lean()
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' })
      return
    }
    res.json({ success: true, data: order })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch order' })
  }
})

export default router
