/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6b21a8', // deep purple
        accent: '#a45ca9',  // lighter purple
        muted: '#6b6b6b',
        subtle: '#f3e6fb',
        card: '#ffffff',
        background: '#f7f7f7'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'Inter', 'ui-sans-serif']
      }
    }
  },
  plugins: [],
};