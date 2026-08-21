import { Router } from 'express'
import { Enquiry } from '../models/Enquiry'

const router = Router()

// POST /api/enquiries - Create a new enquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, org, category, message } = req.body

    if (!name || !email || !org || !category || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' })
    }

    if (!email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Invalid email address' })
    }

    const newEnquiry = new Enquiry({
      name,
      email,
      org,
      category,
      message
    })

    await newEnquiry.save()

    res.status(201).json({ 
      success: true, 
      message: 'Enquiry saved successfully',
      data: newEnquiry
    })
  } catch (error) {
    console.error('Create enquiry error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// GET /api/enquiries - Retrieve all enquiries for the admin dashboard
router.get('/', async (_req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 })
    res.json({ success: true, data: enquiries })
  } catch (error) {
    console.error('Fetch enquiries error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

export default router
