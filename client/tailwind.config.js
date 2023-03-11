/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'monsLight': ['MontserratLight', 'sans-serif'],
        'monsLightItalic': ['MontserratLightItalic', 'sans-serif'],
        'mons': ['Montserrat', 'sans-serif'],
        'monsItalic': ['MontserratItalic', 'sans-serif'],
        'monsMedium': ['MontserratMedium', 'sans-serif'],
        'monsMediumItalic': ['MontserratMediumItalic', 'sans-serif'],
        'monsSemiBold': ['MontserratSemiBold', 'sans-serif'],
        'monsSemiBolItalic': ['MontserratSemiBoldItalic', 'sans-serif'],
        'monsBold': ['MontserratBold', 'sans-serif'],
        'monsBoldItalic': ['MontserratBoldItalic', 'sans-serif'],
        'monsExtraBold': ['MontserratExtraBold', 'sans-serif'],
        'monsExtraBoldItalic': ['MontserratExtraBoldItalic', 'sans-serif'],
      },
      colors: {
        // bp -> barber pole
        'bp-red': '#E24C3B',
        'bp-beige': '#FBF3EF',
        'bp-blue': '#0088E0',
      }
    },
  },
  plugins: [],
}
