import { Router, Request, Response } from 'express'
import { Course } from '../models/Course'

const router = Router()

// GET /api/courses — all courses (active only by default, ?all=true for admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    const query = req.query.all === 'true' ? {} : { isActive: true }
    const courses = await Course.find(query).select('-__v').lean()
    res.json({ success: true, data: courses, count: courses.length })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses' })
  }
})

// GET /api/courses/:slug — single course by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).select('-__v').lean()
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
    const query = req.query.all === 'true' ? { pathId: req.params.pathId } : { pathId: req.params.pathId, isActive: true }
    const courses = await Course.find(query).select('-__v').lean()
    res.json({ success: true, data: courses, count: courses.length })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses for path' })
  }
})

// POST /api/courses — create course (admin)
router.post('/', async (req: Request, res: Response) => {
  try {
    const newCourse = new Course(req.body)
    await newCourse.save()
    res.status(201).json({ success: true, data: newCourse })
  } catch (error) {
    console.error('Create course error:', error)
    res.status(500).json({ success: false, message: 'Failed to create course' })
  }
})

// PUT /api/courses/:id — update course (admin)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!updatedCourse) {
      res.status(404).json({ success: false, message: 'Course not found' })
      return
    }
    res.json({ success: true, data: updatedCourse })
  } catch (error) {
    console.error('Update course error:', error)
    res.status(500).json({ success: false, message: 'Failed to update course' })
  }
})

// DELETE /api/courses/:id — delete course (admin)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedCourse = await Course.findOneAndDelete({ id: req.params.id })
    if (!deletedCourse) {
      res.status(404).json({ success: false, message: 'Course not found' })
      return
    }
    res.json({ success: true, message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Delete course error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete course' })
  }
})

export default router
