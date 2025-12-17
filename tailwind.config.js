/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef1f9',
          100: '#fee5f3',
          200: '#fdd6ea',
          300: '#fcc5e0',
          400: '#f9a8d1',
          500: '#f58dc4',
          600: '#e876b4',
          700: '#d15fa0',
          800: '#b04d85',
          900: '#8a3d69',
          950: '#5a2145',
        },
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
