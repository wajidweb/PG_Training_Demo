import { Schema, model, Document } from 'mongoose'

export interface IDeliveryMethod {
  type: 'online-instructor' | 'self-paced' | 'onsite'
  label: string
  multiplier: number
}

export interface IVolumeDiscount {
  minQty: number
  discountPercent: number
}

export interface ICoursePricing {
  basePrice: number
  minParticipants: number
  maxParticipants: number
  volumeDiscounts: IVolumeDiscount[]
}

export interface IETSOffer {
  id: string
  title: string
  description: string
  pricePerPerson: number
  features: string[]
}

export interface ILimitedOffer {
  id: string
  title: string
  description: string
  discountPercent: number
  expiresAt: Date
}

export interface IComboOffer {
  id: string
  title: string
  courses: string[]
  discountPercent: number
  description: string
}

export interface IBundleOffer {
  id: string
  title: string
  minParticipants: number
  discountPercent: number
  description: string
}

export interface ICelebrationOffer {
  id: string
  title: string
  occasion: string
  discountPercent: number
  validUntil: string
}

export interface IOfferSet {
  ets?: IETSOffer[]
  limited?: ILimitedOffer[]
  combo?: IComboOffer[]
  bundle?: IBundleOffer[]
  celebration?: ICelebrationOffer[]
}

export interface ICourse extends Document {
  id: string
  slug: string
  code: string
  title: string
  shortDescription: string
  fullDescription: string
  outcomes: string[]
  targetAudience: string[]
  deliveryMethods: IDeliveryMethod[]
  upcomingDates: string[]
  pathId: string
  pricing: ICoursePricing
  offers: IOfferSet
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const DeliveryMethodSchema = new Schema<IDeliveryMethod>({
  type: { type: String, enum: ['online-instructor', 'self-paced', 'onsite'], required: true },
  label: { type: String, required: true },
  multiplier: { type: Number, required: true },
}, { _id: false })

const VolumeDiscountSchema = new Schema<IVolumeDiscount>({
  minQty: { type: Number, required: true },
  discountPercent: { type: Number, required: true },
}, { _id: false })

const ETSOfferSchema = new Schema<IETSOffer>({
  id: String,
  title: String,
  description: String,
  pricePerPerson: Number,
  features: [String],
}, { _id: false })

const LimitedOfferSchema = new Schema<ILimitedOffer>({
  id: String,
  title: String,
  description: String,
  discountPercent: Number,
  expiresAt: Date,
}, { _id: false })

const ComboOfferSchema = new Schema<IComboOffer>({
  id: String,
  title: String,
  courses: [String],
  discountPercent: Number,
  description: String,
}, { _id: false })

const BundleOfferSchema = new Schema<IBundleOffer>({
  id: String,
  title: String,
  minParticipants: Number,
  discountPercent: Number,
  description: String,
}, { _id: false })

const CelebrationOfferSchema = new Schema<ICelebrationOffer>({
  id: String,
  title: String,
  occasion: String,
  discountPercent: Number,
  validUntil: String,
}, { _id: false })

const CourseSchema = new Schema<ICourse>({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  outcomes: [String],
  targetAudience: [String],
  deliveryMethods: [DeliveryMethodSchema],
  upcomingDates: [String],
  pathId: { type: String, required: true },
  pricing: {
    basePrice: Number,
    minParticipants: Number,
    maxParticipants: Number,
    volumeDiscounts: [VolumeDiscountSchema],
  },
  offers: {
    ets: [ETSOfferSchema],
    limited: [LimitedOfferSchema],
    combo: [ComboOfferSchema],
    bundle: [BundleOfferSchema],
    celebration: [CelebrationOfferSchema],
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

CourseSchema.index({ slug: 1 })
CourseSchema.index({ pathId: 1 })

export const Course = model<ICourse>('Course', CourseSchema)
