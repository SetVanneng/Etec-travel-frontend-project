/** @type {import('tailwindcss').Config} */
export default {
  // 'class' means dark mode is toggled by adding a "dark" class to <html>.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-english)'],
        khmer: ['var(--font-khmer)'],
        'khmer-display': ['var(--font-khmer-display)'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(2, 6, 23, 0.18)',
      },
    },
  },
  plugins: [],
}