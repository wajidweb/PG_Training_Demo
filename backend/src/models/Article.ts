import { Schema, model, Document } from 'mongoose'

export interface IArticle extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  series: string
  tags: string[]
  publishedAt: Date
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, default: '' },
  author: { type: String, default: 'PGT Contributors' },
  series: { type: String, default: '' },
  tags: [{ type: String }],
  publishedAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false }
}, {
  timestamps: true,
  collection: 'articles'
})

export const Article = model<IArticle>('Article', ArticleSchema)
