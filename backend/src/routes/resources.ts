import { Router } from 'express'
import { Resource } from '../models/Resource'
import { User } from '../models/User'
import { verifyToken } from '../lib/auth'
import Stripe from 'stripe'
import fs from 'fs'
import path from 'path'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

const router = Router()

// GET /api/resources - Get all published resources
router.get('/', async (req, res) => {
  try {
    const { includeUnpublished, category, type, tier } = req.query
    const query: any = {}
    
    if (includeUnpublished !== 'true') query.isPublished = true
    if (category) query.category = category
    if (type) query.type = type
    if (tier) query.tier = tier

    const resources = await Resource.find(query).sort({ createdAt: -1 })
    res.json({ success: true, data: resources })
  } catch (error) {
    console.error('Fetch resources error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// GET /api/resources/:slug - Get a single resource by slug
router.get('/:slug', async (req, res) => {
  try {
    const resource = await Resource.findOne({ slug: req.params.slug })
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' })
    }
    res.json({ success: true, data: resource })
  } catch (error) {
    console.error('Fetch resource by slug error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// POST /api/resources - Create a new resource (admin only)
router.post('/', async (req, res) => {
  try {
    const resource = new Resource(req.body)
    await resource.save()
    res.status(201).json({ success: true, data: resource })
  } catch (error) {
    console.error('Create resource error:', error)
    res.status(500).json({ success: false, message: 'Failed to create resource' })
  }
})

// PUT /api/resources/:id - Update a resource (admin only)
router.put('/:id', async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' })
    }
    res.json({ success: true, data: resource })
  } catch (error) {
    console.error('Update resource error:', error)
    res.status(500).json({ success: false, message: 'Failed to update resource' })
  }
})

// DELETE /api/resources/:id - Delete a resource (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id)
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' })
    }
    res.json({ success: true, message: 'Resource deleted successfully' })
  } catch (error) {
    console.error('Delete resource error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete resource' })
  }
})

// POST /api/resources/purchase - Create Stripe checkout session for resource
router.post('/purchase', async (req, res) => {
  try {
    const { resourceId, userId, email } = req.body

    if (!resourceId) {
      return res.status(400).json({ success: false, message: 'Resource ID is required.' })
    }

    const resource = await Resource.findById(resourceId)
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found.' })
    }

    if (resource.tier === 'free') {
      return res.status(400).json({ success: false, message: 'Cannot purchase a free resource.' })
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

    const absoluteImage = resource.coverImage && resource.coverImage.startsWith('/')
      ? `https://pgtraining.eu${resource.coverImage}`
      : resource.coverImage || 'https://pgtraining.eu/ai.png'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: resource.title,
            description: resource.description,
            images: [absoluteImage]
          },
          unit_amount: Math.round(resource.price * 100), // cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${frontendUrl}/members?purchase_success=true&resource_id=${resource._id}`,
      cancel_url: `${frontendUrl}/knowledge-hub`,
      customer_email: email,
      metadata: {
        resourceId: resource._id.toString(),
        userId: userId || ''
      }
    })

    res.json({
      success: true,
      url: session.url
    })
  } catch (error) {
    console.error('Create resource stripe session error:', error)
    res.status(500).json({ success: false, message: 'Failed to initiate purchase' })
  }
})

// POST /api/resources/upload - Upload resource document file (base64 helper)
router.post('/upload', async (req, res) => {
  try {
    const { fileName, fileData } = req.body
    if (!fileName || !fileData) {
      return res.status(400).json({ success: false, message: 'File name and data are required.' })
    }

    // Clean up filename to prevent directory traversal
    const safeName = Date.now() + '_' + fileName.replace(/[^a-zA-Z0-9.-]+/g, '_')
    const buffer = Buffer.from(fileData, 'base64')

    // Write directly to frontend public directory
    const uploadDir = path.join(__dirname, '../../../frontend/public/uploads')
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filePath = path.join(uploadDir, safeName)
    fs.writeFileSync(filePath, buffer)

    res.json({
      success: true,
      fileUrl: `/uploads/${safeName}`
    })
  } catch (error) {
    console.error('File upload error:', error)
    res.status(500).json({ success: false, message: 'Failed to upload file' })
  }
})

// POST /api/resources/unlock-purchase - Custom client-side direct sync backup unlock
router.post('/unlock-purchase', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    const payload = verifyToken(token)
    if (!payload) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    const { resourceId } = req.body
    if (!resourceId) {
      return res.status(400).json({ success: false, message: 'Resource ID is required.' })
    }

    // Directly append resourceId into purchased list
    await User.findByIdAndUpdate(
      payload.id,
      { $addToSet: { purchasedResources: resourceId } }
    )

    res.json({ success: true, message: 'Resource unlocked successfully.' })
  } catch (error) {
    console.error('Direct resource unlock error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

export default router
