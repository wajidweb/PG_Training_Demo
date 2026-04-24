'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (cartId: string) => void
  updateQuantity: (cartId: string, participants: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set(state => {
          const existing = state.items.find(
            i => i.courseId === item.courseId &&
                 i.deliveryMethod.type === item.deliveryMethod.type &&
                 (i.packageTier?.id ?? 'essentials') === (item.packageTier?.id ?? 'essentials')
          )
          if (existing) {
            return {
              items: state.items.map(i =>
                i.cartId === existing.cartId ? { ...item, cartId: existing.cartId } : i
              ),
              isOpen: true,
            }
          }
          return { items: [...state.items, item], isOpen: true }
        })
      },

      removeItem: (cartId) =>
        set(state => ({ items: state.items.filter(i => i.cartId !== cartId) })),

      updateQuantity: (cartId, participants) =>
        set(state => ({
          items: state.items.map(i => i.cartId === cartId ? { ...i, participants } : i),
        })),

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.participants, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.finalPrice, 0),
    }),
    { name: 'pg-training-cart' }
  )
)
