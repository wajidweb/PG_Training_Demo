import { Router } from 'express'
import { User } from '../models/User'
import { hashPassword, verifyPassword, signToken, verifyToken } from '../lib/auth'

const router = Router()

// POST /api/auth/register - Register a new member
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' })
    }

    const hashed = hashPassword(password)
    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash: hashed,
      role: 'user'
    })

    await newUser.save()

    const token = signToken({ id: newUser._id, email: newUser.email, role: newUser.role })

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      data: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        purchasedResources: newUser.purchasedResources,
        downloadedFreeResources: newUser.downloadedFreeResources
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// POST /api/auth/login - Log in an existing member
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    const isValid = verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    const token = signToken({ id: user._id, email: user.email, role: user.role })

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        purchasedResources: user.purchasedResources,
        downloadedFreeResources: user.downloadedFreeResources
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// GET /api/auth/me - Verify current user session details
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authorization token provided' })
    }

    const token = authHeader.split(' ')[1]
    const payload = verifyToken(token)

    if (!payload) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }

    const user = await User.findById(payload.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User session not found' })
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        purchasedResources: user.purchasedResources,
        downloadedFreeResources: user.downloadedFreeResources
      }
    })
  } catch (error) {
    console.error('Verify user me error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// GET /api/auth/users - Get all registered users (admin only)
router.get('/users', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json({ success: true, data: users })
  } catch (error) {
    console.error('Fetch admin users error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// POST /api/auth/log-download - Record free downloads for the logged-in user
router.post('/log-download', async (req, res) => {
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
      return res.status(400).json({ success: false, message: 'Resource ID is required' })
    }

    await User.findByIdAndUpdate(
      payload.id,
      { $addToSet: { downloadedFreeResources: resourceId } }
    )

    res.json({ success: true, message: 'Download logged successfully' })
  } catch (error) {
    console.error('Log free download error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

export default router
