/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaria: {
          50: '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          900: '#7c2d12',
        },
        escura: {
          800: '#1a1a2e',
          900: '#0f0f1a',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        corpo: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'pulsar': 'pulsar 2s ease-in-out infinite',
        'flutuar': 'flutuar 3s ease-in-out infinite',
        'aparecer': 'aparecer 0.5s ease-out forwards',
        'deslizar-cima': 'deslizarCima 0.4s ease-out forwards',
      },
      keyframes: {
        pulsar: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        flutuar: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        aparecer: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        deslizarCima: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
