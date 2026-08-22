import { Schema, model, Document } from 'mongoose'

export interface IResource extends Document {
  title: string
  slug: string
  description: string
  coverImage: string
  type: string
  category: string
  tier: 'free' | 'premium'
  price: number
  stripeProductId?: string
  stripePriceId?: string
  fileUrl: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const ResourceSchema = new Schema<IResource>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  coverImage: { type: String, default: '' },
  type: { type: String, required: true, enum: ['guide', 'toolkit', 'video', 'assessment', 'checklist', 'report'] },
  category: { type: String, required: true },
  tier: { type: String, enum: ['free', 'premium'], default: 'free' },
  price: { type: Number, default: 0 },
  stripeProductId: { type: String },
  stripePriceId: { type: String },
  fileUrl: { type: String, required: true },
  isPublished: { type: Boolean, default: false }
}, {
  timestamps: true,
  collection: 'resources'
})

export const Resource = model<IResource>('Resource', ResourceSchema)
