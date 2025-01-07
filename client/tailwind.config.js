/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121575',
        green: {
          light: '#ccdfd8',
          normal: '#1c7c5c'
        }
      },
      animation: {
        scale: 'scale .5s linear'
      },
      keyframes: {
        scale: {
          '0%': {opacity: 0},
          '50%': {opacity: .5},
          '100%': {opacity: 1},
        }
      }
    },
  },
  plugins: [],
}

