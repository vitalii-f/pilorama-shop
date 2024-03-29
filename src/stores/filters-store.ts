import { create } from 'zustand';

interface CartState {
  open: boolean;
  setOpen: (open: boolean) => void
}

export const useFiltersStore = create<CartState>()((set) => ({
  open: false,
  setOpen: (newItem) => set((_state) => ({ open: newItem})),
}));
