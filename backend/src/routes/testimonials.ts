import { Router, Request, Response } from 'express'
import { Testimonial } from '../models/Testimonial'

const router = Router()

// GET /api/testimonials — all active testimonials
router.get('/', async (_req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).select('-__v').lean()
    res.json({ success: true, data: testimonials, count: testimonials.length })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials' })
  }
})

export default router
