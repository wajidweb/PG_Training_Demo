import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import coursesRouter from './routes/courses'
import pathsRouter from './routes/paths'
import ordersRouter from './routes/orders'
import chatRouter from './routes/chat'
import testimonialsRouter from './routes/testimonials'
import campaignRouter from './routes/campaign'
import enquiriesRouter from './routes/enquiries'
import articlesRouter from './routes/articles'
import resourcesRouter from './routes/resources'
import authRouter from './routes/auth'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}))

// Use raw body for Stripe webhook before express.json()
app.use('/api/orders/webhook', express.raw({ type: 'application/json' }))

app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ limit: '200mb', extended: true }))

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Paragon Global Training Academy API is active and running',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

app.get('/api', (_req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Paragon Global Training Academy API Endpoint',
    endpoints: {
      health: '/api/health',
      courses: '/api/courses',
      paths: '/api/paths',
      testimonials: '/api/testimonials'
    }
  })
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/courses', coursesRouter)
app.use('/api/paths', pathsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/chat', chatRouter)
app.use('/api/testimonials', testimonialsRouter)
app.use('/api/campaign', campaignRouter)
app.use('/api/enquiries', enquiriesRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/resources', resourcesRouter)
app.use('/api/auth', authRouter)

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

export default app
