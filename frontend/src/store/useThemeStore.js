import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("preferred-theme") || "forest", // Default theme
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    localStorage.setItem("preferred-theme", newTheme); // Save to localStorage
  },
}));

export default useThemeStore;
