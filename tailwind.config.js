/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'], // Coincide con MUI
      },
      colors: {
        // Light theme colors
        'coffee-primary': '#6D4C41',
        'coffee-secondary': '#D7CCC8',
        'coffee-bg-light': '#FFF8F0',
        'coffee-text-primary': '#3E2723',
        'coffee-text-secondary': '#5D4037',
        'coffee-paper': '#FFFFFF',
        
        // Dark theme colors
        'coffee-dark-primary': '#D7CCC8',
        'coffee-dark-secondary': '#6D4C41',
        'coffee-bg-dark': '#1A120B',
        'coffee-dark-text-primary': '#EFEBE9',
        'coffee-dark-text-secondary': '#D7CCC8',
        'coffee-dark-paper': '#2A211C',
        
        // Common colors
        'coffee-error': '#D32F2F',
        'coffee-error-dark': '#FF6E6E',
        
        // Aliases para coincidir con tus nombres originales
        'coffee-light': '#6D4C41', // primary light
        'coffee-dark': '#3E2723', // appbar dark
        'coffee-bg': '#FFF8F0', // background light
      },
    },
  },
  plugins: [],
}