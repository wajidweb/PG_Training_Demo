import { Router, Request, Response } from 'express'
import { Course } from '../models/Course'

const router = Router()

// GET /api/courses — all active courses
router.get('/', async (_req: Request, res: Response) => {
  try {
    const courses = await Course.find({ isActive: true }).select('-__v').lean()
    res.json({ success: true, data: courses, count: courses.length })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses' })
  }
})

// GET /api/courses/:slug — single course by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, isActive: true }).select('-__v').lean()
    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found' })
      return
    }
    res.json({ success: true, data: course })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch course' })
  }
})

// GET /api/courses/path/:pathId — courses by training path
router.get('/path/:pathId', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ pathId: req.params.pathId, isActive: true }).select('-__v').lean()
    res.json({ success: true, data: courses, count: courses.length })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses for path' })
  }
})

export default router
