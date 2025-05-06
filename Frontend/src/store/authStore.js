import { create } from 'zustand';
const useAuthStore = create(set => ({
  user: null,
  isAuthenticated: false,
  setUser: userData =>
    set({
      user: userData,
      isAuthenticated: false,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;
