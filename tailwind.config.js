/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hoverColor: '#f3e8ff', // Optional
      },
    },
  },
  plugins: [],
}

