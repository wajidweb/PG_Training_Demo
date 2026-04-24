import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { Order } from '../models/Order'

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

// POST /api/orders — create a new order
router.post('/', orderValidation, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() })
    return
  }

  try {
    const { contact, items, total, paymentMethod, notes } = req.body

    const subtotal = items.reduce((sum: number, item: { finalPrice: number }) => sum + item.finalPrice, 0)

    const order = await Order.create({
      contact,
      items,
      subtotal,
      total,
      paymentMethod: paymentMethod || 'card',
      notes,
      status: 'confirmed',
    })

    res.status(201).json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        id: order._id,
        status: order.status,
        total: order.total,
        contact: order.contact,
        items: order.items,
        createdAt: order.createdAt,
      },
    })
  } catch (error) {
    console.error('Order creation error:', error)
    res.status(500).json({ success: false, message: 'Failed to create order' })
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
