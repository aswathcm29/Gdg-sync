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
          DEFAULT: '#4285F4',  // Hex
        },
        red: {
          DEFAULT: '#DB4437',  // Hex
        },
        yellow: {
          DEFAULT: '#F4B400',  // Hex
        },
        green: {
          DEFAULT: '#0F9D58',  // Hex
        },
      },
    },
  },
  plugins: [],
}