import { Schema, model, Document } from 'mongoose'

export interface ICampaignEmail extends Document {
  email: string
  campaignName: string
  source: string
  createdAt: Date
}

const CampaignEmailSchema = new Schema<ICampaignEmail>({
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true,
    index: true
  },
  campaignName: { 
    type: String, 
    required: true,
    default: 'ebook_download'
  },
  source: { 
    type: String, 
    default: 'home_popup'
  }
}, { 
  timestamps: true,
  collection: 'campaignEmails'
})

// Add compound index for email and campaign to avoid duplicates in the same campaign if needed
CampaignEmailSchema.index({ email: 1, campaignName: 1 }, { unique: true })

export const CampaignEmail = model<ICampaignEmail>('CampaignEmail', CampaignEmailSchema)
