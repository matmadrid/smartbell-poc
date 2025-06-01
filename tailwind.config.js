/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'smartbell-blue': '#1e40af',
        'smartbell-light': '#dbeafe',
        'smartbell-dark': '#1e3a8a',
      },
    },
  },
  plugins: [],
}