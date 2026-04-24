import { Router, Request, Response } from 'express'
import { TrainingPath } from '../models/TrainingPath'
import { Course } from '../models/Course'

const router = Router()

// GET /api/paths — all paths with their courses populated
router.get('/', async (_req: Request, res: Response) => {
  try {
    const paths = await TrainingPath.find({ isActive: true }).select('-__v').lean()

    // Populate courses for each path
    const pathsWithCourses = await Promise.all(
      paths.map(async (path) => {
        const courses = await Course.find({ pathId: path.id, isActive: true }).select('-__v').lean()
        return { ...path, courses }
      })
    )

    res.json({ success: true, data: pathsWithCourses })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch training paths' })
  }
})

// GET /api/paths/:id — single path with courses
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const path = await TrainingPath.findOne({ id: req.params.id, isActive: true }).select('-__v').lean()
    if (!path) {
      res.status(404).json({ success: false, message: 'Training path not found' })
      return
    }
    const courses = await Course.find({ pathId: path.id, isActive: true }).select('-__v').lean()
    res.json({ success: true, data: { ...path, courses } })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch training path' })
  }
})

export default router
