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
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'coffee-light': '#6f4f37',
        'coffee-dark': '#3e2a1f',
        'coffee-bg': '#f4f1ea',
      },
    },
  },
  plugins: [],
}

