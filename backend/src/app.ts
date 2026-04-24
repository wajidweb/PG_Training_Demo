import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import coursesRouter from './routes/courses'
import pathsRouter from './routes/paths'
import ordersRouter from './routes/orders'
import chatRouter from './routes/chat'
import testimonialsRouter from './routes/testimonials'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/courses', coursesRouter)
app.use('/api/paths', pathsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/chat', chatRouter)
app.use('/api/testimonials', testimonialsRouter)

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

export default app
