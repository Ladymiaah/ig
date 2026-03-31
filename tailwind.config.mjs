/** @type {import('tailwindcss').Config} */
export default {

  darkMode: 'class',

  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
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