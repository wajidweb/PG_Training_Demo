import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { connectDB } from './lib/db'
import coursesRouter from './routes/courses'
import pathsRouter from './routes/paths'
import ordersRouter from './routes/orders'
import chatRouter from './routes/chat'
import testimonialsRouter from './routes/testimonials'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/courses', coursesRouter)
app.use('/api/paths', pathsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/chat', chatRouter)
app.use('/api/testimonials', testimonialsRouter)

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

async function startServer() {
  try {
    await connectDB()
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`📚 API endpoints:`)
      console.log(`   GET  /api/health`)
      console.log(`   GET  /api/courses`)
      console.log(`   GET  /api/courses/:slug`)
      console.log(`   GET  /api/courses/path/:pathId`)
      console.log(`   GET  /api/paths`)
      console.log(`   GET  /api/paths/:id`)
      console.log(`   POST /api/orders`)
      console.log(`   GET  /api/orders/:orderNumber`)
      console.log(`   POST /api/chat`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()