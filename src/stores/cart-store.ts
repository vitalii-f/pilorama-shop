import { Tables } from '@/types/supabase'
import { create } from 'zustand'

interface CartState {
  cart: Tables<'games'>[]
  addToCart: (game: Tables<'games'>) => void
}

export const useCartStore = create<CartState>()((set) => ({
  cart: [],
  addToCart: (newItem) => set((state) => ({ cart: [...state.cart, newItem] })),
}))