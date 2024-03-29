import { create } from 'zustand'

interface CartState {
  theme: 'light' | 'dark'
  toggleTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<CartState>()((set) => ({
    theme: 'dark',
    toggleTheme: (newItem) => set((_state) => ({ theme: newItem })),
}))