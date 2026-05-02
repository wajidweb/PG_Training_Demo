import { Router } from 'express'
import { CampaignEmail } from '../models/CampaignEmail'

const router = Router()

// POST /api/campaign/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email, campaignName = 'ebook_download', source = 'home_popup' } = req.body

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Invalid email address' })
    }

    // Check if already subscribed to this campaign
    const existing = await CampaignEmail.findOne({ email, campaignName })
    if (existing) {
      return res.status(200).json({ 
        success: true, 
        message: 'Already subscribed', 
        alreadySubscribed: true 
      })
    }

    const subscription = new CampaignEmail({
      email,
      campaignName,
      source
    })

    await subscription.save()

    res.status(201).json({ 
      success: true, 
      message: 'Subscribed successfully' 
    })
  } catch (error) {
    console.error('Campaign subscription error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// GET /api/campaign/emails
router.get('/emails', async (req, res) => {
  try {
    const emails = await CampaignEmail.find().sort({ createdAt: -1 })
    res.json({ success: true, data: emails })
  } catch (error) {
    console.error('Fetch campaign emails error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

export default router
