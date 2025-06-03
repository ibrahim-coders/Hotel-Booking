import { create } from 'zustand';

const useAuthStore = create(set => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  setUser: userData =>
    set({
      user: userData,
      isAuthenticated: !!userData,
      loading: false,
    }),
  setLoading: loading => set({ loading }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    }),
}));

export default useAuthStore;
