import { Router } from 'express'
import { Article } from '../models/Article'

const router = Router()

// GET /api/articles - Get all published articles (public)
router.get('/', async (req, res) => {
  try {
    const { includeUnpublished } = req.query
    const query = includeUnpublished === 'true' ? {} : { isPublished: true }
    const articles = await Article.find(query).sort({ publishedAt: -1 })
    res.json({ success: true, data: articles })
  } catch (error) {
    console.error('Fetch articles error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// GET /api/articles/:slug - Get a single article by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' })
    }
    res.json({ success: true, data: article })
  } catch (error) {
    console.error('Fetch article by slug error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// POST /api/articles - Create a new article (admin only)
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body)
    await article.save()
    res.status(201).json({ success: true, data: article })
  } catch (error) {
    console.error('Create article error:', error)
    res.status(500).json({ success: false, message: 'Failed to create article' })
  }
})

// PUT /api/articles/:id - Update an article (admin only)
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' })
    }
    res.json({ success: true, data: article })
  } catch (error) {
    console.error('Update article error:', error)
    res.status(500).json({ success: false, message: 'Failed to update article' })
  }
})

// DELETE /api/articles/:id - Delete an article (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' })
    }
    res.json({ success: true, message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Delete article error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete article' })
  }
})

export default router
