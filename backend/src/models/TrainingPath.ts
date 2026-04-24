import { Schema, model, Document } from 'mongoose'

export interface ITrainingPath extends Document {
  id: string
  title: string
  subtitle: string
  description: string
  color: string
  bgColor: string
  icon: string
  courseIds: string[]
  isActive: boolean
}

const TrainingPathSchema = new Schema<ITrainingPath>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  color: String,
  bgColor: String,
  icon: String,
  courseIds: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export const TrainingPath = model<ITrainingPath>('TrainingPath', TrainingPathSchema)
