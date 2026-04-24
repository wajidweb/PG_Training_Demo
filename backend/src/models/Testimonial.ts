import { Schema, model, Document } from 'mongoose'

export interface ITestimonial extends Document {
  id: string
  name: string
  role: string
  institution: string
  content: string
  rating: number
  isActive: boolean
}

const TestimonialSchema = new Schema<ITestimonial>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  institution: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export const Testimonial = model<ITestimonial>('Testimonial', TestimonialSchema)
