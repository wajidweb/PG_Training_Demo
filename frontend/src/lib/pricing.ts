import { Course, DeliveryMethod, PriceBreakdown, VolumeDiscount, PackageTier, CartAddon } from '@/types'

function getVolumeDiscount(discounts: VolumeDiscount[], qty: number): number {
  const applicable = [...discounts]
    .filter(d => qty >= d.minQty)
    .sort((a, b) => b.minQty - a.minQty)
  return applicable[0]?.discountPercent ?? 0
}

export function calculatePrice(
  course: Course,
  delivery: DeliveryMethod,
  participants: number,
  offerDiscountPercent = 0,
  packageTier?: PackageTier,
  addOns: CartAddon[] = []
): PriceBreakdown {
  const { basePrice, volumeDiscounts } = course.pricing
  const packageMultiplier = packageTier?.multiplier ?? 1.0
  const packageName = packageTier?.name ?? 'Essentials'

  const deliveryMultiplier = delivery.multiplier
  const volumeDiscount = getVolumeDiscount(volumeDiscounts, participants) / 100
  const offerDiscount = offerDiscountPercent / 100

  const pricePerPerson = basePrice * packageMultiplier * deliveryMultiplier
  const afterVolume = pricePerPerson * (1 - volumeDiscount)
  const afterOffer = afterVolume * (1 - offerDiscount)
  const courseSubtotal = Math.round(afterOffer * participants * 100) / 100

  const total = courseSubtotal

  return {
    basePrice,
    packageName,
    packageMultiplier,
    participants,
    deliveryMultiplier,
    deliveryLabel: delivery.label,
    volumeDiscount: volumeDiscount * 100,
    offerDiscount: offerDiscountPercent,
    courseSubtotal,
    total,
  }
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount)
}

export function getVolumeDiscountLabel(discounts: VolumeDiscount[], qty: number): string {
  const pct = getVolumeDiscount(discounts, qty)
  if (pct === 0) return ''
  return `${pct}% volume discount applied`
}
