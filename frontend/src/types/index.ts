export type DeliveryType = 'online-instructor' | 'self-paced' | 'onsite'

export interface DeliveryMethod {
  type: DeliveryType
  label: string
  multiplier: number
}

export interface VolumeDiscount {
  minQty: number
  discountPercent: number
}

export interface CoursePricing {
  basePrice: number
  minParticipants: number
  maxParticipants: number
  volumeDiscounts: VolumeDiscount[]
}

export interface ETSOffer {
  id: string
  title: string
  description: string
  pricePerPerson: number
  features: string[]
}

export interface LimitedOffer {
  id: string
  title: string
  description: string
  discountPercent: number
  expiresAt: string // ISO date string
}

export interface ComboOffer {
  id: string
  title: string
  courses: string[] // course IDs
  discountPercent: number
  description: string
}

export interface BundleOffer {
  id: string
  title: string
  minParticipants: number
  discountPercent: number
  description: string
}

export interface CelebrationOffer {
  id: string
  title: string
  occasion: string
  discountPercent: number
  validUntil: string
}

export interface OfferSet {
  ets?: ETSOffer[]
  limited?: LimitedOffer[]
  combo?: ComboOffer[]
  bundle?: BundleOffer[]
  celebration?: CelebrationOffer[]
}

export interface Course {
  id: string
  slug: string
  code: string
  title: string
  shortDescription: string
  fullDescription: string
  outcomes: string[]
  targetAudience: string[]
  deliveryMethods: DeliveryMethod[]
  upcomingDates: string[]
  pathId: string
  pricing: CoursePricing
  offers: OfferSet
  imageUrl?: string
}

export interface TrainingPath {
  id: string
  title: string
  subtitle: string
  description: string
  color: string
  bgColor: string
  icon: string
  courses: Course[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  institution: string
  content: string
  rating: number
}

export interface PackageTier {
  id: 'essentials' | 'professional' | 'executive'
  name: string
  description: string
  multiplier: number
  features: string[]
  badge?: string
}

export interface AddOn {
  id: string
  name: string
  description: string
  category: 'materials' | 'support' | 'assessment' | 'extras'
}

export interface CartAddon {
  id: string
  name: string
}

export interface CartItem {
  cartId: string
  courseId: string
  courseTitle: string
  courseCode: string
  deliveryMethod: DeliveryMethod
  participants: number
  basePrice: number
  packageTier?: PackageTier
  addOns?: CartAddon[]
  discountPercent: number
  finalPrice: number
  offerLabel?: string
}

export interface PriceBreakdown {
  basePrice: number
  packageName: string
  packageMultiplier: number
  participants: number
  deliveryMultiplier: number
  deliveryLabel: string
  volumeDiscount: number
  offerDiscount: number
  courseSubtotal: number
  total: number
}

export type ChatMessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatMessageRole
  content: string
  timestamp: Date
  priceBreakdown?: PriceBreakdown
  actionType?: string
}
