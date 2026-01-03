/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IRANSans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.05)',
          'white-light': 'rgba(255, 255, 255, 0.08)',
          gray: 'rgba(148, 163, 184, 0.1)',
        },
        buy: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
          glass: 'rgba(16, 185, 129, 0.15)',
        },
        sell: {
          DEFAULT: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
          glass: 'rgba(239, 68, 68, 0.15)',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}

