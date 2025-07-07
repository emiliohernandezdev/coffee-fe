import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuthenticated: !!localStorage.getItem('coffeeToken'),

    login: (token) => {
        localStorage.setItem('coffeeToken', token);
        set({ isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('coffeeToken');
        set({ isAuthenticated: false });
    },
}));