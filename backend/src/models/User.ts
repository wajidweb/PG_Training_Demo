import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: 'user' | 'admin'
  purchasedResources: string[] // List of Resource object ids
  downloadedFreeResources: string[] // List of Resource object ids
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  purchasedResources: [{ type: String }],
  downloadedFreeResources: [{ type: String }]
}, {
  timestamps: true,
  collection: 'users'
})

export const User = model<IUser>('User', UserSchema)
