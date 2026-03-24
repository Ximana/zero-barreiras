/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        laranja: {
          DEFAULT: '#F46300',
          escuro: '#D45500',
          claro: '#FF8C38',
          palido: '#FFF0E6',
          suave: '#FFF8F3',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
