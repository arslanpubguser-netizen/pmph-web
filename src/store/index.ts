import { create } from 'zustand';

interface UIState {
  mobileNavOpen: boolean;
  searchOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileNavOpen: false,
  searchOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
}));

interface AuthState {
  user: { id: string; email: string; username: string; role: string } | null;
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
