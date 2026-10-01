import { create } from "zustand";

interface CountState {
  count: number;
  increase: () => void;
}

export const useCountStore = create<CountState>()((set) => ({
  count: 0,
  increase: () => set((s) => ({ count: s.count + 1 })),
}));
