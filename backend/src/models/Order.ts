import { Schema, model, Document } from 'mongoose'

export interface IOrderItem {
  courseId: string
  courseTitle: string
  courseCode: string
  deliveryMethod: {
    type: string
    label: string
    multiplier: number
  }
  participants: number
  basePrice: number
  discountPercent: number
  finalPrice: number
  offerLabel?: string
}

export interface IOrderContact {
  firstName: string
  lastName: string
  email: string
  organisation: string
  role?: string
  phone?: string
}

export interface IOrder extends Document {
  orderNumber: string
  contact: IOrderContact
  items: IOrderItem[]
  subtotal: number
  total: number
  status: 'pending' | 'confirmed' | 'cancelled'
  paymentMethod: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>({
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  courseCode: { type: String, required: true },
  deliveryMethod: {
    type: { type: String, required: true },
    label: { type: String, required: true },
    multiplier: { type: Number, required: true },
  },
  participants: { type: Number, required: true, min: 1 },
  basePrice: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true },
  offerLabel: String,
}, { _id: false })

const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    organisation: { type: String, required: true },
    role: String,
    phone: String,
  },
  items: { type: [OrderItemSchema], required: true },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed',
  },
  paymentMethod: { type: String, default: 'card' },
  notes: String,
}, { timestamps: true })

OrderSchema.index({ orderNumber: 1 })
OrderSchema.index({ 'contact.email': 1 })
OrderSchema.index({ createdAt: -1 })

function generateOrderNumber(): string {
  const prefix = 'PGT'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

OrderSchema.pre('validate', function () {
  if (!this.orderNumber) {
    this.orderNumber = generateOrderNumber()
  }
})

export const Order = model<IOrder>('Order', OrderSchema)
