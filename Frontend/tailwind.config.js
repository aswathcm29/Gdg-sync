/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#4285F4', 
        },
        red: {
          DEFAULT: '#DB4437', 
        },
        yellow: {
          DEFAULT: '#F4B400', 
        },
        green: {
          DEFAULT: '#0F9D58', 
        },
      },
    },
  },
  plugins: [],
}