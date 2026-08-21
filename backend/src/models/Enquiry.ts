import { Schema, model, Document } from 'mongoose'

export interface IEnquiry extends Document {
  name: string
  email: string
  org: string
  category: string
  message: string
  createdAt: Date
  updatedAt: Date
}

const EnquirySchema = new Schema<IEnquiry>({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true 
  },
  org: { 
    type: String, 
    required: true, 
    trim: true 
  },
  category: { 
    type: String, 
    required: true, 
    trim: true 
  },
  message: { 
    type: String, 
    required: true, 
    trim: true 
  }
}, { 
  timestamps: true,
  collection: 'enquiries'
})

export const Enquiry = model<IEnquiry>('Enquiry', EnquirySchema)
