import { create } from "zustand";

export const useThemeStore = create((set) => ({
    darkMode: (() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : false;
    })(),
    setDarkMode: (value) => {
        localStorage.setItem("theme", value ? "dark" : "light");
        set({ darkMode: value });
    },
    toggleDarkMode: () => set((state) => {
        const newDarkMode = !state.darkMode;
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
        return { darkMode: newDarkMode };
    }),
}));